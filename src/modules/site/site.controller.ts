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
import { Site } from '@prisma/client';
import { PaginationDto } from '../../types';
import { PrismaService } from '../../prisma/prisma.service';
import { SiteService } from './site.service';

// api-doc文档用
@ApiTags('site')
// 路径前缀
@Controller()
export class SiteController {
  constructor(private readonly prismaService: PrismaService, private readonly siteService: SiteService) {}

  // 全量
  @Get('sites')
  async getSites(@Query() query: PaginationDto): Promise<Site[]> {
    return this.siteService.getItems(Number(query.page), Number(query.pageSize));
  }

  // 已启用的记录
  @Get('sites4Show')
  async getShowSites(@Query() query: PaginationDto): Promise<Site[]> {
    return this.siteService.getShowItems(Number(query.page), Number(query.pageSize));
  }

  // 根据id查询记录
  @Get('site/:id')
  async getSiteById(@Param('id') id: string): Promise<Site> {
    return this.prismaService.site.findFirst({
      where: { id: Number(id) }
    })
  }

  // 追加记录
  @Post('site')
  async createSite(
    @Body() params: { title: string; url: string },
  ): Promise<Site> {
    console.log(params);

    const { title, url } = params
    return this.prismaService.site.create({
      data: {
        title,
        url
      },
    })
  }

  // 修改记录
  @Post('site/:id')
  async updateSiteById(
    @Param('id') id: string,
    @Body() data: Site
  ): Promise<Site> {
    console.log(data);

    return this.prismaService.site.update({
      where: { id: Number(id) },
      data,
    })
  }
}
