import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/auth.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    async findUserByUsername(username: string) {
        return await this.usersRepository.findOneBy({username});
    } 

    async findUserByEmail(email: string) {
        return await this.usersRepository.findOneBy({email});
    } 

    async createUser(user: SignUpDto) {
        return await this.usersRepository.save({...user});
    }
}
