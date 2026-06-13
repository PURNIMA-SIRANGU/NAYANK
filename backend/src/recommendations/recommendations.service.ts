import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class RecommendationsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async generate(caseId: string) {
    const caseData =
      await this.prisma.case.findUnique({
        where: {
          id: caseId,
        },
        include: {
          evidences: true,
          interviews: true,
        },
      });

    if (!caseData) {
      return {
        message: 'Case not found',
      };
    }

    let riskLevel = 'LOW';

    if (
      caseData.evidences.length > 2
    ) {
      riskLevel = 'MEDIUM';
    }

    if (
      caseData.evidences.length > 3
    ) {
      riskLevel = 'HIGH';
    }

    const aiResponse =
      await axios.post(
        'http://127.0.0.1:8000/investigation-recommendations',
        {
          case_title:
            caseData.title,

          summary:
            caseData.description,

          risk_level:
            riskLevel,
        },
      );

    return {
      caseId,
      caseTitle:
        caseData.title,

      riskLevel,

      recommendations:
        aiResponse.data
          .recommendations,
    };
  }
}