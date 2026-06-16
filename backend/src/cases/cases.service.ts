import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { CaseStatus } from '@prisma/client';
@Injectable()
export class CasesService {
  constructor(
  private prisma: PrismaService,
  private auditService: AuditService,
) {}
async findByUser(
  userId: string,
) {
  return this.prisma.case.findMany({
    where: {
      createdById: userId,
    },
    include: {
      evidences: true,
    },
  });
}
async create(data: any) {

  const newCase =
    await this.prisma.case.create({
      data,
    });

  await this.auditService.log(
    'Case Created',
    data.createdById,
  );

  return newCase;
}
  async findAll() {
    return this.prisma.case.findMany({
      include: {
        evidences: true,
        interviews: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.case.findUnique({
      where: { id },
      include: {
        evidences: true,
        interviews: true,
      },
    });
  }

 async updateStatus(
  id: string,
  status: CaseStatus,
) {
  const updatedCase =
    await this.prisma.case.update({
      where: { id },
      data: {
        status,
      },
    });

  await this.auditService.log(
    `Case Status Updated to ${status}`,
    'abdfc403-2940-4280-a135-34116e7d199a',
  );

  return updatedCase;
}

  async delete(id: string) {
    return this.prisma.case.delete({
      where: {
        id,
      },
    });
  }
}