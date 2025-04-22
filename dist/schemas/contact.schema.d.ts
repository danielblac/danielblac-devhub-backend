import { Document } from 'mongoose';
export declare class Contact extends Document {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}
export declare const ContactSchema: import("mongoose").Schema<Contact, import("mongoose").Model<Contact, any, any, any, Document<unknown, any, Contact> & Contact & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contact, Document<unknown, {}, import("mongoose").FlatRecord<Contact>> & import("mongoose").FlatRecord<Contact> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
