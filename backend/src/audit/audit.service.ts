import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async log(
    action: string,
    userId: string,
    caseId?: string,
    details?: string,
  ) {
    return this.prisma.auditLog.create({
      data: {
        action,
        userId,
        caseId,
        details,
      },
    });
  }

  async findAll() {
    return this.prisma.auditLog.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

 async findCaseTimeline(caseId: string) {

  const logs =
    await this.prisma.auditLog.findMany({
      where: {
        caseId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

  return logs.map((log) => ({
    timestamp: log.createdAt,

    officer:
      log.user.name,

    event:
      log.action.replaceAll('_', ' '),

    details:
      log.details,
  }));
}
}