import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';




const mockJwtService = {
  signAsync: jest.fn(),
};

// ---------- Suite ----------
describe('AuthService – Unit Tests', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

 

  //  signUp 
  describe('signUp()', () => {
    it('should hash the password and create a new user', async () => {
      const dto = {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'Secret123!',
        phone: 1234567890,
        address: '123 Main St',
        city: 'Springfield',
        country: 'US',
      };

      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.addUser.mockResolvedValue({ id: 'uuid-1', ...dto });

      const result = await authService.signUp(dto as any);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(mockUsersService.addUser).toHaveBeenCalled();

      
      const callArg = mockUsersService.addUser.mock.calls[0][0];
      expect(callArg.password).not.toBe(dto.password);
      expect(callArg.password.startsWith('$2')).toBe(true);

      expect(result).toHaveProperty('id');
    
});          
  });             
});     