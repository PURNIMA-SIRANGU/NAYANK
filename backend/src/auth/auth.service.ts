import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,

        // PUBLIC REGISTRATION = CITIZEN ONLY
        role: 'CITIZEN',

        citizenProfile: {
          create: {
            mobile: data.mobile,

            addressLine1:
              data.addressLine1,

            addressLine2:
              data.addressLine2,

            village: data.village,

            ward: data.ward,

            city: data.city,

            district: data.district,

            state: data.state,

            pincode: data.pincode,

            governmentIdType:
              data.governmentIdType,

            governmentIdNumber:
              data.governmentIdNumber,
          },
        },
      },

      include: {
        citizenProfile: true,
      },
    });

    const { password, ...safeUser } = user;

    return {
      message:
        'User registered successfully',

      user: safeUser,
    };
  }

  async login(data: any) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },

        include: {
          citizenProfile: true,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const validPassword =
      await bcrypt.compare(
        data.password,
        user.password,
      );

    if (!validPassword) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      access_token: token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,

        citizenProfile:
          user.citizenProfile,
      },
    };
  }
}