import { Module } from '@nestjs/common';
import { GamzmailerService } from './gamzmailer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GamzmailerService],
  exports: [GamzmailerService],
})
export class GamzmailerModule {}
