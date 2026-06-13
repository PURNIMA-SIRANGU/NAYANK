import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimelineService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getTimeline(caseId: string) {
    const audits =
      await this.prisma.auditLog.findMany({
        where: {
          caseId,
        },
        include: {
          user: true,
        },
      });

    const alerts =
      await this.prisma.alert.findMany({
        where: {
          caseId,
        },
      });

    const timeline = [
      ...audits.map((audit) => ({
        timestamp: audit.createdAt,
        type: 'AUDIT',
        event: audit.action,
        details: audit.details,
        officer: audit.user.name,
      })),

      ...alerts.map((alert) => ({
        timestamp: alert.createdAt,
        type: 'ALERT',
        event: alert.type,
        details: alert.message,
      })),
    ];

    timeline.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() -
        new Date(b.timestamp).getTime(),
    );

    return timeline;
  }
}