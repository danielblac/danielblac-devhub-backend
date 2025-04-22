import { Document } from 'mongoose';
export declare class GamzContact extends Document {
    name: string;
    email: string;
    phone?: string;
    message: string;
}
export declare const GamzContactSchema: import("mongoose").Schema<GamzContact, import("mongoose").Model<GamzContact, any, any, any, Document<unknown, any, GamzContact> & GamzContact & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GamzContact, Document<unknown, {}, import("mongoose").FlatRecord<GamzContact>> & import("mongoose").FlatRecord<GamzContact> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
