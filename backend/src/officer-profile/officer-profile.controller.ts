import {
  Body,
  Controller,
  Get,
  Headers,
  Put,
  BadRequestException,
} from '@nestjs/common';

import { OfficerProfileService } from './officer-profile.service';
import { UpdateOfficerProfileDto } from './dto/update-officer-profile.dto';

@Controller('officer/profile')
export class OfficerProfileController {
  constructor(
    private readonly officerProfileService: OfficerProfileService,
  ) {}

  @Get()
  async getProfile(
    @Headers('userid') userId: string,
  ) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    return this.officerProfileService.getProfile(userId);
  }

  @Put()
  async updateProfile(
    @Headers('userid') userId: string,
    @Body() dto: UpdateOfficerProfileDto,
  ) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    return this.officerProfileService.updateProfile(
      userId,
      dto,
    );
  }
}