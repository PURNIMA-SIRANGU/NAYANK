import { Module } from '@nestjs/common';

import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';

import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    PrismaModule,
    AuditModule,
  ],
  controllers: [InterviewsController],
  providers: [InterviewsService],
})
export class InterviewsModule {}