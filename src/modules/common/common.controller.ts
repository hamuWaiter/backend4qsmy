import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { UploadDto } from './common.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// api-doc文档用
@ApiTags('common')
// 路径前缀
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  // 获取网络文件
  @Post('download')
  async getFileStream(@Body() data: { file:string }): Promise<{ data: string }> {
    return this.commonService.getFile(data.file);
  }

  // 获取网络文件
  @Post('markdown2html')
  async markdown2html(@Body() data: { file:string }): Promise<{ data: string }> {
    return this.commonService.markdown2html(data.file);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile2(@UploadedFile() file:Express.Multer.File){
    console.log(file.path);
  }
}
