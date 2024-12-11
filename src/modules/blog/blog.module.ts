import { Module } from '@nestjs/common'
import { BlogController } from './blog.controller'
import { PrismaService } from '../../prisma/prisma.service'
import { BlogService } from './blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [
    PrismaService,
    BlogService,
  ],
})
export class BlogModule {}
