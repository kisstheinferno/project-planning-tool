import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './name.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}

  async addName(firstName: string, lastName: string) {
    await this.namesRepository.save({ 
      first_name: firstName, 
      last_name: lastName });
    return await this.getNames();
  }

  async getNames() {
    return await this.namesRepository.find();
  }
}
