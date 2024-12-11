import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service'

@Injectable()
export class AppService {
  // prismaService是prisma中访问数据库的入口
  constructor(private readonly prismaService: PrismaService) {}

  sayHello(): string {
    return 'today is a nice day!';
  }
}