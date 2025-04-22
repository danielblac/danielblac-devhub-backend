import { Injectable } from '@nestjs/common';
import { CreateGamzContactDto } from './dto/create-gamzcontact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GamzContact } from '../schemas/gamzcontact.schema';
import { GamzmailerService } from '../gamzmailer/gamzmailer.service';
import { Model } from 'mongoose';

@Injectable()
export class GamzcontactService {
  constructor(
    @InjectModel(GamzContact.name) private contactModel: Model<GamzContact>,
    private mailerService: GamzmailerService,
  ) {}

  async create(dto: CreateGamzContactDto) {
    // Create and save the contact
    const newContact = new this.contactModel(dto);
    await newContact.save();

    // Prepare email content
    const emailText = this.formatContactEmail(dto);
    const emailSubject = 'New Contact Form Submission';

    // Send notification email
    await this.mailerService.sendEmail(emailSubject, emailText);

    return newContact;
  }

  async findAll() {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  private formatContactEmail(contact: CreateGamzContactDto): string {
    return `
        New Contact Form Submission:
        ----------------------------
        Name: ${contact.name}
        Email: ${contact.email}
        Phone: ${contact.phone || 'N/A'}
        Message: ${contact.message}
        ----------------------------
        Received at: ${new Date().toLocaleString()}
      `;
  }
}
