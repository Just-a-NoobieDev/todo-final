import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup(): import("./auth.type").SignUpResponse | PromiseLike<import("./auth.type").SignUpResponse> {
    throw new Error('Method not implemented.');
  }
}
