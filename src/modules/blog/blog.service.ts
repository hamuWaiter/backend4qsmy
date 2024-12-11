import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Blog } from '@prisma/client';
import * as http from 'http';

@Injectable()
export class BlogService {
  constructor(private readonly prismaService: PrismaService) {}

  // 查询博客列表
  async getItems(page = 1, pageSize = 10): Promise<Blog[]> {
    const skip = (page - 1) * pageSize;

    return this.prismaService.blog.findMany({
      orderBy: { updateTime: "desc" },
      take: pageSize,
      skip,
    });
  }

  // 单个查询
  async getItem(id: number): Promise<Blog> {
    return this.prismaService.blog.findUnique({
      where: { id }
    });
  }

  // 新增博客
  async createItem({ title, url }): Promise<Blog> {
    return this.prismaService.blog.create({
      data: {
        title,
        url
      },
    })
  }

  // 修改博客
  async updateItem(id: number, data: Blog): Promise<Blog> {
    return this.prismaService.blog.update({
      where: { id: Number(id) },
      data,
    })
  }
}
