import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { Blog } from '@prisma/client';
import { PaginationDto } from '../../types';

// api-doc文档用
@ApiTags('blog')
// 路径前缀
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // 获取博客列表（全量）
  @Get('')
  async getItems(@Query() query: PaginationDto): Promise<Blog[]> {
    return this.blogService.getItems(Number(query.page), Number(query.pageSize));
  }

  // 获取展示给前端的博客列表
  @Get('/blog4show')
  async getShowItems(@Query() query: PaginationDto): Promise<Blog[]> {
    return this.blogService.getShowItems(Number(query.page), Number(query.pageSize));
  }

  // 根据id查询记录
  @Get(':id')
  async getSiteById(@Param('id') id: string) {
    return this.blogService.getItem(+id);
  }

  // 追加记录
  @Post('')
  async createSite(
    @Body() params: { title: string; url: string },
  ) {
    return this.blogService.createItem(params);
  }

  // 修改记录
  @Post(':id')
  async updateSiteById(
    @Param('id') id: string,
    @Body() data: Blog
  ) {
    return this.blogService.updateItem(+id, data)
  }
}
