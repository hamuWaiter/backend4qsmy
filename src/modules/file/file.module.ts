/**
 * 文件模块（其他所有需要上传的模块直接导入此模块即可使用FileInterceptor将文件上传到根目录下的uploads中）
 * */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { extname } from 'path';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // const ext = extname(file.originalname);
    // cb(null, file.fieldname + '-' + uniqueSuffix + ext);

    const parseCNName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, parseCNName);
  },
});


@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
    // 静态文件服务
    ServeStaticModule.forRoot({
      // 目标目录
      rootPath: './uploads',
      // 访问静态文件的前缀
      serveRoot: '/uploads',
    }),
  ],
  exports: [MulterModule],
})
export class FileModule {}
