import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Products } from './products.entity';


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
  }); })
