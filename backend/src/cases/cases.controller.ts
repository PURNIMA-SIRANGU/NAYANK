import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(
    private readonly casesService: CasesService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return this.casesService.create(body);
  }

  @Get()
  async findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.casesService.updateStatus(
      id,
      body.status,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.casesService.delete(id);
  }
}