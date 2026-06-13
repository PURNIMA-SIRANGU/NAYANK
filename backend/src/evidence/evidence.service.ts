import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import axios from 'axios';

@Injectable()
export class EvidenceService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(data: any) {
    console.log('EVIDENCE REQUEST BODY');
    console.log(data);

    const evidence =
      await this.prisma.evidence.create({
        data: {
          caseId: data.caseId,
          type: data.type,
          fileUrl: data.fileUrl,
        },
      });

    await this.auditService.log(
      'EVIDENCE_UPLOADED',
      data.userId,
      data.caseId,
      `${data.type} evidence uploaded`,
    );

    // AUDIO ANALYSIS
    if (data.type === 'AUDIO') {
      try {
        const transcriptResponse =
          await axios.post(
            'http://127.0.0.1:8000/transcribe',
            {
              audio_url: data.fileUrl,
            },
          );

        const transcript =
          transcriptResponse.data.transcript;

        const languageResponse =
          await axios.post(
            'http://127.0.0.1:8000/detect-language',
            {
              text: transcript,
            },
          );

        const language =
          languageResponse.data.language;

        const summaryResponse =
          await axios.post(
            'http://127.0.0.1:8000/summarize',
            {
              text: transcript,
            },
          );

        const summary =
          summaryResponse.data.summary;

        await this.prisma.evidence.update({
          where: {
            id: evidence.id,
          },
          data: {
            summary: `
Language: ${language}

Transcript:
${transcript}

Summary:
${summary}
            `,
          },
        });

        console.log(
          'AUDIO ANALYSIS SAVED',
        );

      } catch (error: any) {
        console.log(
          'AUDIO AI Processing Failed',
        );

        console.log(error.message);
      }
    }

    // VIDEO ANALYSIS
    if (data.type === 'VIDEO') {
      try {
        const videoResponse =
          await axios.post(
            'http://127.0.0.1:8000/video-analysis',
            {
              video_url: data.fileUrl,
            },
          );

        const analysis =
          videoResponse.data;

        await this.prisma.videoAnalysis.create({
          data: {
            persons:
              analysis.persons,

            vehicles:
              analysis.vehicles,

            plates:
              analysis.plates,

            summary:
              analysis.summary,

            evidenceId:
              evidence.id,
          },
        });

        console.log(
          'VIDEO ANALYSIS SAVED',
        );

      } catch (error: any) {
        console.log(
          'VIDEO AI Processing Failed',
        );

        console.log(error.message);
      }
    }

    return this.findOne(
      evidence.id,
    );
  }

  async findAll() {
    return this.prisma.evidence.findMany({
      include: {
        case: true,
        videoAnalysis: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.evidence.findUnique({
      where: {
        id,
      },
      include: {
        case: true,
        videoAnalysis: true,
      },
    });
  }

  async findByCase(
    caseId: string,
  ) {
    return this.prisma.evidence.findMany({
      where: {
        caseId,
      },
      include: {
        videoAnalysis: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.evidence.delete({
      where: {
        id,
      },
    });
  }
}