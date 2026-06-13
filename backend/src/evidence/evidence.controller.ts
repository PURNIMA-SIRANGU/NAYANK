import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { EvidenceService } from './evidence.service';

@Controller('evidence')
export class EvidenceController {
  constructor(
    private readonly evidenceService: EvidenceService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return this.evidenceService.create(body);
  }

  @Get()
  async findAll() {
    return this.evidenceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.evidenceService.findOne(id);
  }

  @Get('case/:caseId')
  async findByCase(
    @Param('caseId') caseId: string,
  ) {
    return this.evidenceService.findByCase(caseId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.evidenceService.delete(id);
  }
}