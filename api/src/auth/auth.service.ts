import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        await this.usersService.findUserByUsername(signUpDto.username))?.username;
      const emailExists = (
        await this.usersService.findUserByEmail(signUpDto.email))?.email;
    
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

    async verifyPassword(enteredPassword: string, existingPassword: string) {
      return await bcrypt.compare(enteredPassword, existingPassword);
    }

    async logIn(logInDto) {
      const user = await this.usersService.findUserByUsername(logInDto.username);

      if (!user) {
        throw new UnauthorizedException("Username Does Not Exist!");
      }

      const passwordMatch = await this.verifyPassword(logInDto.password, user.password);
        if (!passwordMatch) {
          throw new UnauthorizedException("Incorrect Password!");
        } 

      return await this.createAccessToken(user);       
    }

    async getProfileData(username: string) {
      console.log("USERNAME: ", username);
      const user = await this.usersService.findUserByUsername(username);
      return { 
        name: user.name, 
        email: user.email, 
        username: user.username };
    }
};
