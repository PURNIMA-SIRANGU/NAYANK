import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UpdateOfficerProfileDto } from './dto/update-officer-profile.dto';

@Injectable()
export class OfficerProfileService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get Officer Profile
   */
  async getProfile(userId: string) {
    const profile = await this.prisma.officerProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException('Officer profile not found');
    }

    return profile;
  }

  /**
   * Create / Update Officer Profile
   */
  async updateProfile(
    userId: string,
    dto: UpdateOfficerProfileDto,
  ) {
    return this.prisma.officerProfile.upsert({
      where: {
        userId,
      },

      update: {
        ...dto,

        dob: dto.dob
          ? new Date(dto.dob)
          : undefined,
      },

      create: {
        userId,

        ...dto,

        dob: dto.dob
          ? new Date(dto.dob)
          : undefined,
      },
    });
  }
}