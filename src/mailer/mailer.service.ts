import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  async sendEmail(subject: string, text: string) {
    const transport = this.mailTransport();

    const mailOptions = {
      from: this.configService.get<string>('MAIL_USER'),
      to: this.configService.get<string>('MAIL_TO'),
      subject,
      text,
    };

    try {
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log('Error', error);
    }
  }
}
