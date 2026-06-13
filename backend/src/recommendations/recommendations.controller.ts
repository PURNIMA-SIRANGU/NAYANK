import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get(':caseId')
  generate(
    @Param('caseId') caseId: string,
  ) {
    return this.recommendationsService.generate(
      caseId,
    );
  }
}