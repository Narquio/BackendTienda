import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Products } from '../products/products.entity';
import { Orders } from '../orders/orders.entity';
import * as bcrypt from 'bcrypt';

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function getAuthToken(
  app: INestApplication,
  email: string,
  password: string,
): Promise<string> {
  const res = await request(app.getHttpServer())
    .post('/auth/signIn')
    .send({ email, password });
  return res.body.token as string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Suite
// ─────────────────────────────────────────────────────────────────────────────

describe('Integration Tests – E2E', () => {
  let app: INestApplication;

  // Shared state across tests
  let regularToken: string;
  let adminToken: string;
  let createdUserId: string;
  let productId: string;
  let orderId: string;

  // ── Seed data ─────────────────────────────────────────────────────────────

  const regularUser = {
    name: 'Integration User',
    email: 'integration@test.com',
    password: 'Test1234!',
    phone: 1234567890,
    address: '123 Test Ave',
    city: 'Testville',
    country: 'TS',
  };

  const adminUser = {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'Admin1234!',
    phone: 9876543210,
    address: '1 Admin Blvd',
    city: 'AdminCity',
    country: 'US',
    isAdmin: true,
  };

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Mirror production pipe setup
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await app.init();

    // ── Seed admin directly in DB ──────────────────────────────────────────
    const usersRepo = moduleFixture.get(getRepositoryToken(Users));
    const hashedAdminPw = await bcrypt.hash(adminUser.password, 10);

    const admin = usersRepo.create({
      ...adminUser,
      password: hashedAdminPw,
    });
    await usersRepo.save(admin);

    // ── Seed a product via the seeder endpoint ─────────────────────────────
    await request(app.getHttpServer()).get('/products/seeder');

    // Get first product id for order tests
    const productsRes = await request(app.getHttpServer())
      .get('/products')
      .query({ page: '1', limit: '1' });

    if (productsRes.body.length > 0) {
      productId = productsRes.body[0].id;
    }
  });

  afterAll(async () => {
    await app.close();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  //  1. AUTH ROUTES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('POST /auth/signUp', () => {
    it('should register a new user and return 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signUp')
        .send(regularUser)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      createdUserId = res.body.id;
    });

    it('should return 409 when email already registered', async () => {
      await request(app.getHttpServer())
        .post('/auth/signUp')
        .send(regularUser)
        .expect(409);
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/auth/signUp')
        .send({ email: 'incomplete@test.com' })
        .expect(400);
    });
  });

  describe('POST /auth/signIn', () => {
    it('should return a JWT token with valid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signIn')
        .send({ email: regularUser.email, password: regularUser.password })
        .expect(201);

      expect(res.body).toHaveProperty('token');
      regularToken = res.body.token;
    });

    it('should return 401 with invalid password', async () => {
      await request(app.getHttpServer())
        .post('/auth/signIn')
        .send({ email: regularUser.email, password: 'WrongPass!' })
        .expect(401);
    });

    it('should obtain admin token', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signIn')
        .send({ email: adminUser.email, password: adminUser.password })
        .expect(201);

      adminToken = res.body.token;
      expect(adminToken).toBeDefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  //  2. PRODUCTS ROUTES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('GET /products', () => {
    it('should return a list of products (default pagination)', async () => {
      const res = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should respect page and limit query params', async () => {
      const res = await request(app.getHttpServer())
        .get('/products')
        .query({ page: '1', limit: '2' })
        .expect(200);

      expect(res.body.length).toBeLessThanOrEqual(2);
    });
  });

  describe('GET /products/:id', () => {
    it('should return a product by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200);

      expect(res.body).toHaveProperty('id', productId);
    });

    it('should return 404 for non-existent product id', async () => {
      await request(app.getHttpServer())
        .get('/products/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });

  describe('PUT /products/:id', () => {
    it('should update a product when admin token is provided', async () => {
      const res = await request(app.getHttpServer())
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 499.99 })
        .expect(200);

      expect(res.body).toHaveProperty('price', 499.99);
    });

    it('should return 403 when a non-admin tries to update', async () => {
      await request(app.getHttpServer())
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${regularToken}`)
        .send({ price: 1 })
        .expect(403);
    });

    it('should return 401 when no token is provided', async () => {
      await request(app.getHttpServer())
        .put(`/products/${productId}`)
        .send({ price: 1 })
        .expect(401);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  //  3. USERS ROUTES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('GET /users', () => {
    it('should return user list when admin token provided', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      // Passwords must never be exposed
      res.body.forEach((u: any) => expect(u).not.toHaveProperty('password'));
    });

    it('should return 403 when regular user tries to list all users', async () => {
      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${regularToken}`)
        .expect(403);
    });

    it('should return 401 without token', async () => {
      await request(app.getHttpServer()).get('/users').expect(401);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a specific user (admin)', async () => {
      const res = await request(app.getHttpServer())
        .get(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('id', createdUserId);
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 400 for invalid UUID format', async () => {
      await request(app.getHttpServer())
        .get('/users/not-a-valid-uuid')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update user data when authenticated', async () => {
      const res = await request(app.getHttpServer())
        .put(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${regularToken}`)
        .send({ city: 'Updated City' })
        .expect(200);

      expect(res.body).toBeDefined();
    });

    it('should return 401 without auth token', async () => {
      await request(app.getHttpServer())
        .put(`/users/${createdUserId}`)
        .send({ city: 'No Auth' })
        .expect(401);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should return 401 without token', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${createdUserId}`)
        .expect(401);
    });

    it('should delete a user when authenticated', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${createdUserId}`)
        .set('Authorization', `Bearer ${regularToken}`)
        .expect(200);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  //  4. ORDERS ROUTES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('POST /orders', () => {
    it('should create a new order when authenticated', async () => {
      // Re-register to get a fresh user (the previous one was deleted)
      const signUpRes = await request(app.getHttpServer())
        .post('/auth/signUp')
        .send({ ...regularUser, email: 'order-user@test.com' });

      const signInRes = await request(app.getHttpServer())
        .post('/auth/signIn')
        .send({ email: 'order-user@test.com', password: regularUser.password });

      const token = signInRes.body.token;
      const userId = signUpRes.body.id;

      const res = await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, products: [{ id: productId }] })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      orderId = res.body.id;
    });

    it('should return 401 without auth token', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .send({ userId: 'any', products: [] })
        .expect(401);
    });

    it('should return 404 when user does not exist', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', `Bearer ${regularToken}`)
        .send({
          userId: '00000000-0000-0000-0000-000000000000',
          products: [{ id: productId }],
        })
        .expect(404);
    });
  });

  describe('GET /orders/:id', () => {
    it('should return the order with its details', async () => {
      const res = await request(app.getHttpServer())
        .get(`/orders/${orderId}`)
        .expect(200);

      expect(res.body).toHaveProperty('id', orderId);
      expect(res.body).toHaveProperty('orderDetails');
    });

    it('should return 404 for non-existent order', async () => {
      await request(app.getHttpServer())
        .get('/orders/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });
});
