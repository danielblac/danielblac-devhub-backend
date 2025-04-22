import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailerService } from '../mailer/mailer.service';
import { Contact } from '../schemas/contact.schema';
export declare class ContactService {
    private contactModel;
    private mailerService;
    constructor(contactModel: Model<Contact>, mailerService: MailerService);
    create(dto: CreateContactDto): Promise<import("mongoose").Document<unknown, {}, Contact> & Contact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Contact> & Contact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    private formatContactEmail;
}
