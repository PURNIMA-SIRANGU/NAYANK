import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
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

    const closedCases =
      await this.prisma.case.count({
        where: {
          status: 'CLOSED',
        },
      });

    const totalEvidence =
      await this.prisma.evidence.count();

    const audioEvidence =
      await this.prisma.evidence.count({
        where: {
          type: 'AUDIO',
        },
      });

    const videoEvidence =
      await this.prisma.evidence.count({
        where: {
          type: 'VIDEO',
        },
      });

    const imageEvidence =
      await this.prisma.evidence.count({
        where: {
          type: 'IMAGE',
        },
      });

    const documentEvidence =
      await this.prisma.evidence.count({
        where: {
          type: 'DOCUMENT',
        },
      });

    const totalInterviews =
      await this.prisma.interview.count();

    const totalOfficers =
      await this.prisma.user.count({
        where: {
          role: 'OFFICER',
        },
      });

    const recentActivity =
      await this.prisma.auditLog.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      });

    return {
      totalCases,
      openCases,
      inProgressCases,
      closedCases,

      totalEvidence,
      audioEvidence,
      videoEvidence,
      imageEvidence,
      documentEvidence,

      totalInterviews,
      totalOfficers,

      recentActivity: recentActivity.map(
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