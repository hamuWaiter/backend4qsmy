import { Controller, Get, Post, UseInterceptors,UploadedFile,Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  async sayHello() {
    return this.appService.sayHello()
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest:'uploads'
  }))
  uploadFile(@UploadedFile() file:Express.Multer.File,@Body() body){
    console.log('body', body);
    console.log('file', file);
  }
}
