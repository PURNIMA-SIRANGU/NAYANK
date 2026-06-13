import {
  Controller,
  Get,
  Patch,
  Param,
} from '@nestjs/common';

import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
  ) {}

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Patch(':id/read')
  markRead(
    @Param('id') id: string,
  ) {
    return this.alertsService.markRead(id);
  }
}