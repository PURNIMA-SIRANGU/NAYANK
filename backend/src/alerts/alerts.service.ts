import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertsService {
  constructor(
    private prisma: PrismaService,
  ) {}

async create(
  type: string,
  severity: string,
  message: string,
  caseId: string,
) {
  return this.prisma.alert.create({
    data: {
      type,
      severity,
      message,
      caseId,
    },
  });
}

  async findAll() {
    return this.prisma.alert.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markRead(id: string) {
    return this.prisma.alert.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }
}