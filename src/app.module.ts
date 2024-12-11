import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma/prisma.service'
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { SiteModule, BlogModule, CommonModule } from './modules'
import { diskStorage } from 'multer';

@Module({
  imports: [
    BlogModule,
    SiteModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
  ],
})
export class AppModule {}
