import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { OfficerProfileController } from './officer-profile.controller';
import { OfficerProfileService } from './officer-profile.service';

@Module({
  imports: [PrismaModule],
  controllers: [OfficerProfileController],
  providers: [OfficerProfileService],
})
export class OfficerProfileModule {}