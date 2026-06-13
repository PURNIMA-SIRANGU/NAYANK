import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { AlertsModule } from '../alerts/alerts.module';

import { RiskScoreController } from './risk-score.controller';
import { RiskScoreService } from './risk-score.service';

@Module({
  imports: [
    PrismaModule,
    AlertsModule, // IMPORTANT
  ],
  controllers: [
    RiskScoreController,
  ],
  providers: [
    RiskScoreService,
  ],
})
export class RiskScoreModule {}