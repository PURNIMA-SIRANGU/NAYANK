import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter =
    nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user:
          process.env.EMAIL_USER,

        pass:
          process.env.EMAIL_PASSWORD,
      },
    });

  async sendOtp(
    email: string,
    otp: string,
  ) {
    await this.transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        'NAYANK Email Verification OTP',

      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>NAYANK</h2>

          <p>
            Your verification OTP is:
          </p>

          <h1>${otp}</h1>

          <p>
            OTP expires in 5 minutes.
          </p>
        </div>
      `,
    });
  }
}