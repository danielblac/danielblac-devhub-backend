import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
export declare class MailerService {
    private readonly configService;
    constructor(configService: ConfigService);
    mailTransport(): nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
    sendEmail(subject: string, text: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
