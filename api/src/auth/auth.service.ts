import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signUp(signUpDto) {
      return signUpDto;
    } 
}
