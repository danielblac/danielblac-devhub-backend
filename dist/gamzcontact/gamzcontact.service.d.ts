import { CreateGamzContactDto } from './dto/create-gamzcontact.dto';
import { GamzContact } from '../schemas/gamzcontact.schema';
import { GamzmailerService } from '../gamzmailer/gamzmailer.service';
import { Model } from 'mongoose';
export declare class GamzcontactService {
    private contactModel;
    private mailerService;
    constructor(contactModel: Model<GamzContact>, mailerService: GamzmailerService);
    create(dto: CreateGamzContactDto): Promise<import("mongoose").Document<unknown, {}, GamzContact> & GamzContact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, GamzContact> & GamzContact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    private formatContactEmail;
}
