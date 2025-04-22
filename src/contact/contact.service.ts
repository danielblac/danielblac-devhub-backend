import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailerService } from '../mailer/mailer.service';
import { Contact } from '../schemas/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
    private mailerService: MailerService,
  ) {}

  async create(dto: CreateContactDto) {
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

  private formatContactEmail(contact: CreateContactDto): string {
    return `
      New Contact Form Submission:
      ----------------------------
      Name: ${contact.first_name} ${contact.last_name}
      Email: ${contact.email}
      Phone: ${contact.phone || 'N/A'}
      Subject: ${contact.subject}
      Message: ${contact.message}
      ----------------------------
      Received at: ${new Date().toLocaleString()}
    `;
  }
}
