import { Module } from '@nestjs/common'
import { CommonController } from './common.controller';
import { PrismaService } from '../../prisma/prisma.service'
import { CommonService } from './common.service';

@Module({
  imports: [],
  controllers: [CommonController],
  providers: [
    PrismaService,
    CommonService,
  ],
})
export class CommonModule {}
