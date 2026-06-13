import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { ReportsService } from './reports.service';
import { generatePdf } from './pdf/report.generator';

@Controller('cases')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get(':id/report/pdf')
  async downloadPdf(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const report =
      await this.reportsService.generate(id);

    const pdf =
      await generatePdf(report);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename=report.pdf',
    });

    return res.send(pdf);
  }

  @Get(':id/report')
  async generateReport(
    @Param('id') id: string,
  ) {
    return this.reportsService.generate(id);
  }
}