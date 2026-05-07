import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { OrderDetails } from './orderDetails.entity';
import { Users } from '../users/users.entity';
import { Products } from '../products/products.entity';
import { NotFoundException } from '@nestjs/common';

// ---------- Stubs ----------
const mockOrder = {
  id: 'order-uuid-1',
  date: new Date('2024-01-15'),
  user: { id: 'user-uuid-1', name: 'Alice' },
  orderDetails: {
    id: 'detail-uuid-1',
    price: 999.99,
    products: [{ id: 'prod-uuid-1', name: 'Laptop', price: 999.99, stock: 9 }],
  },
};

const mockUser = { id: 'user-uuid-1', name: 'Alice', orders: [] };
const mockProduct = { id: 'prod-uuid-1', name: 'Laptop', price: 999.99, stock: 10 };

const mockOrdersRepo = { findOne: jest.fn(), create: jest.fn(), save: jest.fn() };
const mockOrderDetailsRepo = { create: jest.fn(), save: jest.fn() };
const mockUsersRepo = { findOne: jest.fn(), save: jest.fn() };
const mockProductsRepo = { findOne: jest.fn(), save: jest.fn() };

// ---------- Suite ----------
describe('OrdersService – Unit Tests', () => {
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Orders), useValue: mockOrdersRepo },
        { provide: getRepositoryToken(OrderDetails), useValue: mockOrderDetailsRepo },
        { provide: getRepositoryToken(Users), useValue: mockUsersRepo },
        { provide: getRepositoryToken(Products), useValue: mockProductsRepo },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  // ── Test 1: getOrderById – found ──────────────────────────────────────────
  describe('getorderById()', () => {
    it('should return an order with its details', async () => {
      mockOrdersRepo.findOne.mockResolvedValue(mockOrder);

      const result = await ordersService.getorderById('order-uuid-1');

      expect(result).toEqual(mockOrder);
      expect(mockOrdersRepo.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'order-uuid-1' } }),
      );
    });

    // ── Test 2: getOrderById – not found ──────────────────────────────────────
    it('should throw NotFoundException when order does not exist', async () => {
      mockOrdersRepo.findOne.mockResolvedValue(null);

      await expect(ordersService.getorderById('bad-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── Test 3: addOrder – happy path ─────────────────────────────────────────
  describe('addOrder()', () => {
    it('should create an order, reduce stock, and return the saved order', async () => {
      mockUsersRepo.findOne.mockResolvedValue({ ...mockUser });
      mockProductsRepo.findOne.mockResolvedValue({ ...mockProduct });
      mockProductsRepo.save.mockResolvedValue({ ...mockProduct, stock: 9 });

      const savedOrderDetails = { id: 'detail-uuid-1', price: 999.99 };
      const savedOrder = { id: 'order-uuid-new', user: mockUser, orderDetails: savedOrderDetails };

      mockOrderDetailsRepo.create.mockReturnValue(savedOrderDetails);
      mockOrderDetailsRepo.save.mockResolvedValue(savedOrderDetails);
      mockOrdersRepo.create.mockReturnValue(savedOrder);
      mockOrdersRepo.save.mockResolvedValue(savedOrder);

      const dto = {
        userId: 'user-uuid-1',
        products: [{ id: 'prod-uuid-1' }],
      };

      const result = await ordersService.addOrder(dto as any);

      expect(result).toBeDefined();
      expect(mockProductsRepo.save).toHaveBeenCalled(); // stock reduced
    });

    // ── Test 4: addOrder – user not found ─────────────────────────────────────
    it('should throw NotFoundException when user does not exist', async () => {
      mockUsersRepo.findOne.mockResolvedValue(null);

      await expect(
        ordersService.addOrder({ userId: 'bad-user', products: [] } as any),
      ).rejects.toThrow(NotFoundException);
    });

    // ── Test 5: addOrder – out of stock ───────────────────────────────────────
    it('should skip products with zero stock and still create the order', async () => {
      mockUsersRepo.findOne.mockResolvedValue({ ...mockUser });
      mockProductsRepo.findOne.mockResolvedValue({ ...mockProduct, stock: 0 });

      const savedOrderDetails = { id: 'detail-uuid-2', price: 0 };
      const savedOrder = { id: 'order-uuid-new2', user: mockUser, orderDetails: savedOrderDetails };

      mockOrderDetailsRepo.create.mockReturnValue(savedOrderDetails);
      mockOrderDetailsRepo.save.mockResolvedValue(savedOrderDetails);
      mockOrdersRepo.create.mockReturnValue(savedOrder);
      mockOrdersRepo.save.mockResolvedValue(savedOrder);

      const dto = { userId: 'user-uuid-1', products: [{ id: 'prod-uuid-1' }] };
      const result = await ordersService.addOrder(dto as any);

      // Product with no stock must NOT be saved/decremented
      expect(mockProductsRepo.save).not.toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });
});
