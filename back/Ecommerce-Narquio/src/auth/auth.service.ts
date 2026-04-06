import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuthStatus() {
    return {
      status: 'active',
      message: 'Auth service is running',
      timestamp: new Date().toISOString(),
    };
  }
}
