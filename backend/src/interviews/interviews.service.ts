import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import axios from 'axios';

@Injectable()
export class InterviewsService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(data: any) {
    console.log('INTERVIEW REQUEST BODY');
    console.log(data);

    const transcriptResponse = await axios.post(
      'http://127.0.0.1:8000/transcribe',
      {
        audio_url: data.audioUrl,
      },
    );

    const transcript =
      transcriptResponse.data.transcript;

    const languageResponse = await axios.post(
      'http://127.0.0.1:8000/detect-language',
      {
        text: transcript,
      },
    );

    const language =
      languageResponse.data.language;

    const summaryResponse = await axios.post(
      'http://127.0.0.1:8000/summarize',
      {
        text: transcript,
      },
    );

    const summary =
      summaryResponse.data.summary;

    const behaviorResponse = await axios.post(
      'http://127.0.0.1:8000/behavior-analysis',
      {
        text: transcript,
      },
    );

    const behavior =
      behaviorResponse.data;

    const interview =
      await this.prisma.interview.create({
        data: {
          transcript,
          summary,
          language,
          caseId: data.caseId,
        },
      });

    await this.auditService.log(
      'INTERVIEW_CREATED',
      data.userId,
      data.caseId,
      'Interview recorded and analyzed',
    );

    await this.prisma.behavioralAnalysis.create({
      data: {
        pauseDuration:
          behavior.pause_duration,

        speechRate:
          behavior.speech_rate,

        eyeDirection:
          behavior.eye_direction,

        headDirection:
          behavior.head_direction,

        interviewId:
          interview.id,
      },
    });

    return this.findOne(interview.id);
  }

  async findAll() {
    return this.prisma.interview.findMany({
      include: {
        behavior: true,
        case: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.interview.findUnique({
      where: { id },
      include: {
        behavior: true,
        case: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.interview.delete({
      where: { id },
    });
  }
}