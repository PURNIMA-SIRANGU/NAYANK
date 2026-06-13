import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { SupervisorController } from './supervisor.controller';
import { SupervisorService } from './supervisor.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    SupervisorController,
  ],
  providers: [
    SupervisorService,
  ],
})
export class SupervisorModule {}