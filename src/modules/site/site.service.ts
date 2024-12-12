import { Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SiteService {
  constructor(private readonly prismaService: PrismaService) {}
  getHello(): string {
    return 'today is a nice day!';
  }

  async getItems(page = 1, pageSize = 10): Promise<Blog[]> {
    const skip = (page - 1) * pageSize;

    return this.prismaService.site.findMany({
      orderBy: { updateTime: "desc" },
      take: pageSize,
      skip,
    });
  }

  async getShowItems(page = 1, pageSize = 10): Promise<Blog[]> {
    const skip = (page - 1) * pageSize;

    return this.prismaService.site.findMany({
      orderBy: { updateTime: "desc" },
      where: { isDelete: false },
      take: pageSize,
      skip,
    });
  }
}