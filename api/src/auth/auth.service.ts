import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async hashPassword(password: string) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async createAccessToken(user) {
        const payLoad = { sub: user.userId, username: user.username };
        return await this.jwtService.signAsync(payLoad)
    }

    async signUp(signUpDto) {
      const usernameExists = (
        await this.usersService.findUserByUsername(signUpDto.username)).length > 0;
      const emailExists = (
        await this.usersService.findUserByEmail(signUpDto.email)).length > 0;
    
      if (usernameExists) {
        throw new BadRequestException('Username already exists');
      }
      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await this.hashPassword(signUpDto.password);
      signUpDto.password = hashedPassword;

      const user = await this.usersService.createUser(signUpDto);
      
      return await this.createAccessToken(user);
    } 
}
