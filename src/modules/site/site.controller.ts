import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import { Site } from '@prisma/client';

// api-doc文档用
@ApiTags('site')
// 路径前缀
@Controller()
export class SiteController {
  constructor(private readonly prismaService: PrismaService) {}

  // 已启用的记录
  @Get('sitesForShow')
  async getAvailableSites(page = 1, pageSize = 10): Promise<Site[]> {
    const skip = (page - 1) * pageSize;

    return this.prismaService.site.findMany({
      // orderBy: { updateTime: "desc" },
      where: { isDelete: false },
      take: pageSize,
      skip,
    });
  }

  @Get('sites')
  async getSites(page = 1, pageSize = 10): Promise<Site[]> {
    const skip = (page - 1) * pageSize;

    return this.prismaService.site.findMany({
      // orderBy: { updateTime: "desc" },
      take: pageSize,
      skip,
    });
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
