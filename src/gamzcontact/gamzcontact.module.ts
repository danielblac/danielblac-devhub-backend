import { Module } from '@nestjs/common';
import { GamzcontactService } from './gamzcontact.service';
import { GamzcontactController } from './gamzcontact.controller';
import { GamzmailerModule } from '../gamzmailer/gamzmailer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GamzContactSchema } from '../schemas/gamzcontact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GamzContact', schema: GamzContactSchema },
    ]),
    GamzmailerModule,
  ],
  controllers: [GamzcontactController],
  providers: [GamzcontactService],
})
export class GamzcontactModule {}
