import { GamzcontactService } from './gamzcontact.service';
import { CreateGamzContactDto } from './dto/create-gamzcontact.dto';
export declare class GamzcontactController {
    private readonly gamzcontactService;
    constructor(gamzcontactService: GamzcontactService);
    create(dto: CreateGamzContactDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/gamzcontact.schema").GamzContact> & import("../schemas/gamzcontact.schema").GamzContact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/gamzcontact.schema").GamzContact> & import("../schemas/gamzcontact.schema").GamzContact & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
