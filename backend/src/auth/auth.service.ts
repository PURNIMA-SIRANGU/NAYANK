import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async sendOtp(
    email: string,
  ) {
    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      throw new BadRequestException(
        'User already exists with this email',
      );
    }

    const otp = Math.floor(
      100000 +
        Math.random() * 900000,
    ).toString();

    await this.prisma.emailOtp.deleteMany({
      where: {
        email,
      },
    });

    await this.prisma.emailOtp.create({
      data: {
        email,
        otp,

        verified: false,

        isUsed: false,

        attempts: 0,

        expiresAt: new Date(
          Date.now() +
            5 * 60 * 1000,
        ),
      },
    });

    await this.mailService.sendOtp(
      email,
      otp,
    );

    return {
      success: true,
      message:
        'OTP sent successfully',
    };
  }

  async verifyOtp(
    email: string,
    otp: string,
  ) {
    const record =
      await this.prisma.emailOtp.findFirst({
        where: {
          email,
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

    if (!record) {
      throw new BadRequestException(
        'OTP not found',
      );
    }

    if (record.isUsed) {
      throw new BadRequestException(
        'OTP already used',
      );
    }

    if (
      new Date() >
      record.expiresAt
    ) {
      throw new BadRequestException(
        'OTP expired',
      );
    }

    if (record.attempts >= 5) {
      throw new BadRequestException(
        'Too many invalid attempts',
      );
    }

    if (record.otp !== otp) {
      await this.prisma.emailOtp.update({
        where: {
          id: record.id,
        },

        data: {
          attempts:
            record.attempts + 1,
        },
      });

      throw new BadRequestException(
        'Invalid OTP',
      );
    }

    await this.prisma.emailOtp.update({
      where: {
        id: record.id,
      },

      data: {
        verified: true,
      },
    });

    return {
      success: true,
      verified: true,
      message:
        'OTP verified successfully',
    };
  }
    async register(data: any) {
    const verifiedOtp =
      await this.prisma.emailOtp.findFirst({
        where: {
          email: data.email,

          verified: true,

          isUsed: false,
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

    if (!verifiedOtp) {
      throw new BadRequestException(
        'Please verify your email OTP first',
      );
    }

    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (existingUser) {
      throw new BadRequestException(
        'User already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10,
      );

    const user =
      await this.prisma.user.create({
        data: {
          name: data.name,

          email: data.email,

          password:
            hashedPassword,

          role: 'CITIZEN',

          citizenProfile: {
            create: {
              mobile:
                data.mobile,

              addressLine1:
                data.addressLine1,

              addressLine2:
                data.addressLine2,

              village:
                data.village,

              ward:
                data.ward,

              city:
                data.city,

              district:
                data.district,

              state:
                data.state,

              pincode:
                data.pincode,

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

    await this.prisma.emailOtp.update({
      where: {
        id: verifiedOtp.id,
      },

      data: {
        isUsed: true,
      },
    });

    const {
      password,
      ...safeUser
    } = user;

    return {
      success: true,

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

    const token =
      this.jwtService.sign({
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

  async changePassword(
    data: any,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: data.userId,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'User not found',
      );
    }

    const validPassword =
      await bcrypt.compare(
        data.currentPassword,
        user.password,
      );

    if (!validPassword) {
      throw new UnauthorizedException(
        'Current password is incorrect',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.newPassword,
        10,
      );

    await this.prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password:
          hashedPassword,
      },
    });

    return {
      success: true,

      message:
        'Password changed successfully',
    };
  }
}