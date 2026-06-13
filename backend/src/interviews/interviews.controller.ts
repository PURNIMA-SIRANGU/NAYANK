import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { InterviewsService } from './interviews.service';

@Controller('interviews')
export class InterviewsController {
  constructor(
    private readonly interviewsService: InterviewsService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return this.interviewsService.create(body);
  }

  @Get()
  async findAll() {
    return this.interviewsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    return this.interviewsService.findOne(id);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    return this.interviewsService.delete(id);
  }
}