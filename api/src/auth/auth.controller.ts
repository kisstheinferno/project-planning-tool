import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class SignUpDto {
    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value))
    name: string;

    @IsEmail()
    @Transform((params) => sanitizeHtml(params.value))
    email: string;

    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value))
    username: string;

    @IsNotEmpty()
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
