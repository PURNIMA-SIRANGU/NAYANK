import { Controller, Get, Param } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
  constructor(
    private readonly timelineService: TimelineService,
  ) {}

  @Get(':caseId')
  getTimeline(
    @Param('caseId') caseId: string,
  ) {
    return this.timelineService.getTimeline(
      caseId,
    );
  }
}