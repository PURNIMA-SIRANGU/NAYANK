import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { RiskScoreService } from './risk-score.service';

@Controller('risk-score')
export class RiskScoreController {
  constructor(
    private readonly riskScoreService: RiskScoreService,
  ) {}

  @Get(':caseId')
  calculate(
    @Param('caseId')
    caseId: string,
  ) {
    return this.riskScoreService.calculate(
      caseId,
    );
  }
}