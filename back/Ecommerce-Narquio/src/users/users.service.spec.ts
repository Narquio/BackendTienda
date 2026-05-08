import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { NotFoundException } from '@nestjs/common';


const mockUser = {
  id: 'user-uuid-1',
  name: 'Bob',
  email: 'bob@example.com',
  password: 'hashed-pw',
  phone: 5551234,
  address: '10 Downing St',
  city: 'London',
  country: 'UK',
  isAdmin: false,
};

const mockUsersRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};


describe('UsersService – Unit Tests', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  

  
  describe('getUserById()', () => {
    it('should return user without sensitive fields', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const result = await usersService.getUserById('user-uuid-1');

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password');
    });
  });

  
  describe('updateUser()', () => {
    it('should save and return updated user id', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      mockUsersRepository.save.mockResolvedValue({
        ...mockUser,
        city: 'Manchester',
      });

      const result = await usersService.updateUser('user-uuid-1', {
        city: 'Manchester',
      } as any);

      expect(result).toBeDefined();
      expect(mockUsersRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when user not found for update', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(
        usersService.updateUser('bad-id', {} as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  
});
