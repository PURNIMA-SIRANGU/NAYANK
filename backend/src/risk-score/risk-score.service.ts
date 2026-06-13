import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AlertsService } from '../alerts/alerts.service';

@Injectable()
export class RiskScoreService {
  constructor(
    private prisma: PrismaService,
    private alertsService: AlertsService,
  ) {}

  async calculate(caseId: string) {
    const caseData =
      await this.prisma.case.findUnique({
        where: {
          id: caseId,
        },
        include: {
          evidences: {
            include: {
              videoAnalysis: true,
            },
          },
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

    let riskScore = 0;

    const contributingFactors: string[] = [];

    // =====================
    // Evidence Intelligence
    // =====================

    for (const evidence of caseData.evidences) {
      switch (evidence.type) {
        case 'VIDEO':
          riskScore += 25;
          contributingFactors.push(
            'Video evidence available',
          );
          break;

        case 'AUDIO':
          riskScore += 10;
          contributingFactors.push(
            'Audio evidence available',
          );
          break;

        case 'IMAGE':
          riskScore += 20;
          contributingFactors.push(
            'Image evidence available',
          );
          break;

        case 'DOCUMENT':
          riskScore += 15;
          contributingFactors.push(
            'Document evidence available',
          );
          break;
      }

      // =====================
      // Video Intelligence
      // =====================

      const video =
        evidence.videoAnalysis;

      if (video) {
        const persons =
          video.persons ?? 0;

        const vehicles =
          video.vehicles ?? 0;

        if (persons > 0) {
          riskScore += 10;

          contributingFactors.push(
            `${persons} persons detected`,
          );
        }

        if (vehicles > 0) {
          riskScore += 15;

          contributingFactors.push(
            `${vehicles} vehicles detected`,
          );
        }

        if (persons > 5) {
          riskScore += 20;

          contributingFactors.push(
            'High crowd activity detected',
          );
        }

        if (vehicles > 5) {
          riskScore += 20;

          contributingFactors.push(
            'Heavy vehicle activity detected',
          );
        }
      }
    }

    // =====================
    // Interviews
    // =====================

    if (
      caseData.interviews.length > 0
    ) {
      riskScore +=
        caseData.interviews.length * 10;

      contributingFactors.push(
        `${caseData.interviews.length} interviews conducted`,
      );
    }

    // =====================
    // Behavioral Analysis
    // =====================

    let behaviorCount = 0;

    for (
      const interview
      of caseData.interviews
    ) {
      const behavior =
        interview.behavior;

      if (!behavior) {
        continue;
      }

      behaviorCount++;

      riskScore += 10;

      if (
        (behavior.pauseDuration ?? 0) > 2
      ) {
        riskScore += 5;

        contributingFactors.push(
          'Long pauses detected during interview',
        );
      }

      if (
        (behavior.speechRate ?? 0) > 160
      ) {
        riskScore += 5;

        contributingFactors.push(
          'Abnormal speech rate detected',
        );
      }
    }

    if (behaviorCount > 0) {
      contributingFactors.push(
        `${behaviorCount} behavioral analyses available`,
      );
    }

    // =====================
    // Evidence Volume
    // =====================

    if (
      caseData.evidences.length >= 5
    ) {
      riskScore += 10;

      contributingFactors.push(
        'Large volume of evidence submitted',
      );
    }

    // =====================
    // Normalize
    // =====================

    if (riskScore > 100) {
      riskScore = 100;
    }

    // =====================
    // Risk Level
    // =====================

    let riskLevel = 'LOW';

    if (riskScore > 30) {
      riskLevel = 'MEDIUM';
    }

    if (riskScore > 70) {
      riskLevel = 'HIGH';
    }

    // =====================
    // Severity
    // =====================

    let severity = 'LOW';

    if (riskScore > 30) {
      severity = 'MEDIUM';
    }

    if (riskScore > 70) {
      severity = 'HIGH';
    }

    if (riskScore > 90) {
      severity = 'CRITICAL';
    }

    // =====================
    // Alert Generation
    // =====================

    if (riskScore > 70) {
      const existingAlert =
        await this.prisma.alert.findFirst({
          where: {
            caseId,
            type: 'HIGH_RISK_CASE',
          },
        });

      if (!existingAlert) {
       await this.alertsService.create(
  'HIGH_RISK_CASE',
  severity,
  `Supervisor attention required for case: ${caseData.title}`,
  caseId,
);
      }
    }

    return {
      caseId,
      caseTitle: caseData.title,

      riskScore,
      riskLevel,
      severity,

      contributingFactors,
    };
  }
}