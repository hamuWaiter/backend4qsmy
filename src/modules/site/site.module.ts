import { Module } from '@nestjs/common'
import { SiteController } from './site.controller'
import { PrismaService } from '../../prisma/prisma.service'
import { SiteService } from './site.service';

@Module({
  imports: [],
  controllers: [SiteController],
  providers: [
    PrismaService,
    SiteService,
  ],
})
export class SiteModule {}
