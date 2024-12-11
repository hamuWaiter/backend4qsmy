import { Module } from '@nestjs/common'
import { CommonController } from './common.controller';
import { PrismaService } from '../../prisma/prisma.service'
import { CommonService } from './common.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    FileModule
  ],
  controllers: [CommonController],
  providers: [
    PrismaService,
    CommonService,
  ],
})
export class CommonModule {}
