import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { NotFoundException } from '@nestjs/common';

// ---------- Stubs ----------
const mockProduct = {
  id: 'prod-uuid-1',
  name: 'Laptop',
  description: 'A powerful laptop',
  price: 999.99,
  stock: 10,
  imgUrl: 'https://example.com/laptop.jpg',
};

const mockProductsRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

// ---------- Suite ----------
describe('ProductsService – Unit Tests', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Products),
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  // ── Test 1: getAllProducts ─────────────────────────────────────────────────
  describe('getAllProducts()', () => {
    it('should return a paginated list of products', async () => {
      mockProductsRepository.find.mockResolvedValue([mockProduct]);

      const result = await productsService.getAllProducts(1, 5);

      expect(mockProductsRepository.find).toHaveBeenCalledWith({
        skip: 0,
        take: 5,
      });
      expect(result).toEqual([mockProduct]);
    });

    it('should calculate skip correctly for page 2', async () => {
      mockProductsRepository.find.mockResolvedValue([]);

      await productsService.getAllProducts(2, 5);

      expect(mockProductsRepository.find).toHaveBeenCalledWith({
        skip: 5,
        take: 5,
      });
    });
  });

  // ── Test 2: getProductById ────────────────────────────────────────────────
  describe('getProductById()', () => {
    it('should return the product when found', async () => {
      mockProductsRepository.findOne.mockResolvedValue(mockProduct);

      const result = await productsService.getProductById('prod-uuid-1');

      expect(result).toEqual(mockProduct);
      expect(mockProductsRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'prod-uuid-1' },
      });
    });

    // ── Test 3: getProductById – not found ────────────────────────────────────
    it('should throw NotFoundException when product does not exist', async () => {
      mockProductsRepository.findOne.mockResolvedValue(null);

      await expect(
        productsService.getProductById('non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── Test 4: updateProduct ─────────────────────────────────────────────────
  describe('updateProduct()', () => {
    it('should update and return the product', async () => {
      const updatedData = { price: 899.99 };
      const updatedProduct = { ...mockProduct, ...updatedData };

      mockProductsRepository.findOne.mockResolvedValue(mockProduct);
      mockProductsRepository.save.mockResolvedValue(updatedProduct);

      const result = await productsService.updateProduct(
        'prod-uuid-1',
        updatedData as any,
      );

      expect(result).toHaveProperty('price', 899.99);
      expect(mockProductsRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when updating non-existent product', async () => {
      mockProductsRepository.findOne.mockResolvedValue(null);

      await expect(
        productsService.updateProduct('bad-id', {} as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── Test 5: addProducts (seeder) ──────────────────────────────────────────
  describe('addProducts()', () => {
    it('should seed products and return them', async () => {
      mockProductsRepository.find.mockResolvedValue([]);
      mockProductsRepository.save.mockResolvedValue([mockProduct]);

      const result = await productsService.addProducts();

      expect(mockProductsRepository.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });
});
