import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupervisorService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async dashboard() {
    const totalCases =
      await this.prisma.case.count();

    const openCases =
      await this.prisma.case.count({
        where: {
          status: 'OPEN',
        },
      });

    const inProgressCases =
      await this.prisma.case.count({
        where: {
          status: 'IN_PROGRESS',
        },
      });

    const totalEvidence =
      await this.prisma.evidence.count();

    const unreadAlerts =
      await this.prisma.alert.count({
        where: {
          isRead: false,
        },
      });

    const criticalAlerts =
      await this.prisma.alert.count({
        where: {
          severity: 'CRITICAL',
        },
      });

    const alerts =
      await this.prisma.alert.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      });

    const recentActivity =
      await this.prisma.auditLog.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        include: {
          user: true,
        },
      });

    const topPriorityCases =
      await this.prisma.case.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      });

    const highRiskCases =
      await this.prisma.alert.count({
        where: {
          type: 'HIGH_RISK_CASE',
        },
      });

    return {
      totalCases,
      openCases,
      inProgressCases,

      totalEvidence,

      highRiskCases,
      unreadAlerts,
      criticalAlerts,

      alerts,

      topPriorityCases,

      recentActivity:
        recentActivity.map(
          (activity) => ({
            timestamp:
              activity.createdAt,

            action:
              activity.action,

            officer:
              activity.user.name,

            details:
              activity.details,
          }),
        ),
    };
  }
}