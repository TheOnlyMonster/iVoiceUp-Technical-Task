import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../server'; 
import { connectToDB } from '../../config/dbConnection';
import { Employee } from '../../models/Employee';
import { HREmployee } from '../../models/HREmployee';
import { hashPassword } from '../../utils/passwordUtils';

describe('Auth Routes Test', () => {
  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Employee.deleteMany({});
  });

  it('should sign in successfully with valid HR credentials', async () => {
    const password = 'password123';

    const hrEmployee = new HREmployee({
      fname: 'Alice',
      lname: 'HR',
      email: 'alice.hr@example.com',
      salary: 60000,
      password: password,
    });

    await hrEmployee.save();

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'alice.hr@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Sign-in successful.');
    expect(response.body.token).toBeDefined();
  });

  it('should fail to sign in with invalid email', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'invalid.email@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password.');
  });

  it('should fail to sign in with invalid password', async () => {
    const password = 'password123';
    const hashedPassword = await hashPassword(password);

    const hrEmployee = new HREmployee({
      fname: 'Bob',
      lname: 'HR',
      email: 'bob.hr@example.com',
      salary: 70000,
      password: hashedPassword,
    });

    await hrEmployee.save();

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'bob.hr@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password.');
  });

  it('should fail to sign in if not an HR employee', async () => {
    const password = 'password123';
    const hashedPassword = await hashPassword(password);

    const employee = new Employee({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      salary: 50000,
      password: hashedPassword,
    });

    await employee.save();

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'john.doe@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Not authorized.');
  });

  it('should return 400 if email or password is missing', async () => {
    let response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'missing.password@example.com',
      });

    expect(response.status).toBe(400);

    response = await request(app)
      .post('/auth/signin')
      .send({
        password: 'missingemail',
      });

    expect(response.status).toBe(400);
  });
});