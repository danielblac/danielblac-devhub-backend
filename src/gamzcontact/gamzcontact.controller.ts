import { Controller, Get, Post, Body } from '@nestjs/common';
import { GamzcontactService } from './gamzcontact.service';
import { CreateGamzContactDto } from './dto/create-gamzcontact.dto';

@Controller('gamzcontact')
export class GamzcontactController {
  constructor(private readonly gamzcontactService: GamzcontactService) {}

  @Post()
  async create(@Body() dto: CreateGamzContactDto) {
    return this.gamzcontactService.create(dto);
  }

  @Get()
  async findAll() {
    return this.gamzcontactService.findAll();
  }
}
