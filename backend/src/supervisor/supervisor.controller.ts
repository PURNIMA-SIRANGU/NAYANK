import { Controller, Get } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';

@Controller('supervisor')
export class SupervisorController {
  constructor(
    private readonly supervisorService: SupervisorService,
  ) {}

  @Get('dashboard')
  dashboard() {
    return this.supervisorService.dashboard();
  }
}