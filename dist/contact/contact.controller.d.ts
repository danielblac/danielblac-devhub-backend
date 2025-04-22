import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(dto: CreateContactDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/contact.schema").Contact> & import("../schemas/contact.schema").Contact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/contact.schema").Contact> & import("../schemas/contact.schema").Contact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
