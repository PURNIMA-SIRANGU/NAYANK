import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
@Injectable()
export class ReportsService {
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
        interviews: {
          include: {
            behavior: true,
          },
        },
      },
    });

  if (!caseData) {
    return {
      message: 'Case not found',
    };
  }

  const evidenceText =
    caseData.evidences
      .map(e => e.summary)
      .join('\n\n');

  const interviewText =
    caseData.interviews
      .map(i => i.summary)
      .join('\n\n');

  const reportText = `
Case Title:
${caseData.title}

Description:
${caseData.description}

Evidence Findings:
${evidenceText}

Interview Findings:
${interviewText}
`;

  const aiResponse =
    await axios.post(
      'http://127.0.0.1:8000/investigation-report',
      {
        text: reportText,
      },
    );

  return {
    caseTitle: caseData.title,

    evidenceCount:
      caseData.evidences.length,

    interviewCount:
      caseData.interviews.length,

    finalReport:
      aiResponse.data.report,
  };
}
}