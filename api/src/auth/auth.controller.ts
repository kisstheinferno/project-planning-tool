import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { AuthGuard } from './auth.guard';

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
    @Transform((params) => sanitizeHtml(params.value))
    password: string;
}

export class LogInDto {
    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value))
    username: string;

    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value))
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('log-in')
    logIn(@Body() logInDto: LogInDto) {
        return this.authService.logIn(LogInDto);
    }

    @UseGuards(AuthGuard)
    @Get('user-details')
    getUser(@Request() req) {
        if (req.user) {
            return req.user;
        } else {
            return 'no user'
        }
    }
}
