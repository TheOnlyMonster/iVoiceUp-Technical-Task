import request from 'supertest';
import { app } from '../../server';
import mongoose from 'mongoose';
import { connectToDB } from '../../config/dbConnection';
import { HREmployee } from '../../models/HREmployee';
import { Employee } from '../../models/Employee';

describe('Auth Routes Test', () => {
  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should sign in successfully with valid credentials', async () => {
    await mongoose.connection.db.dropDatabase();
    const password = 'password123';

    const hrEmployeeData = {
      fname: 'Alice',
      lname: 'HR',
      email: 'a.hr@example.com',
      salary: 60000,
      password: password,
    };

    const hrEmployee = new HREmployee(hrEmployeeData);
    await hrEmployee.save();

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: hrEmployeeData.email,
        password: password,
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 400 if email is missing', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is required');
  });

  it('should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'a.hr@example.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password is required');
  });

  it('should return 401 if email is invalid', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'invalid.email@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password.');
  });

  it('should return 401 if password is invalid', async () => {
    const password = 'password123';

    const hrEmployeeData = {
      fname: 'Ahmed',
      lname: 'Adel',
      email: 'ahmed.hr@example.com',
      salary: 60000,
      password: password,
    };

    const hrEmployee = new HREmployee(hrEmployeeData);
    await hrEmployee.save();

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: hrEmployeeData.email,
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password.');
  });

  it('should not sign in if user is not an HR employee', async () => {
    const password = 'password123';

    const employeeData = {
      fname: 'John',
      lname: 'Doe',
      email: 'johnDoe@example.com',
      salary: 50000,
    };

    const employee = new Employee(employeeData);

    await employee.save();

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: employeeData.email,
        password: password,
      });
    
    expect(response.status).toBe(401);


  });
});