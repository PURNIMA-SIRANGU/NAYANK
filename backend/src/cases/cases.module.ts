import { Module } from '@nestjs/common';

import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';

import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    PrismaModule,
    AuditModule,
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}