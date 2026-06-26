import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CasesModule } from './cases/cases.module';
import { EvidenceModule } from './evidence/evidence.module';
import { InterviewsModule } from './interviews/interviews.module';
import { AuditModule } from './audit/audit.module';
import { PrismaModule } from './prisma/prisma.module';
import { OfficerProfileModule } from './officer-profile/officer-profile.module';
import { AiModule } from './ai/ai.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ReportsModule } from './reports/reports.module';
import { RiskScoreModule } from './risk-score/risk-score.module';
import { AlertsModule } from './alerts/alerts.module';
import { TimelineModule } from './timeline/timeline.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CasesModule,
    EvidenceModule,
    InterviewsModule,
    AuditModule,
    PrismaModule,
    OfficerProfileModule,
    AiModule,
    AnalyticsModule,
    ReportsModule,
    RiskScoreModule,
    AlertsModule,
    TimelineModule,
    SupervisorModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}