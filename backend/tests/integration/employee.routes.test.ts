import request from 'supertest';
import { app } from '../../server';
import mongoose from 'mongoose';
import { connectToDB } from '../../config/dbConnection';
import { HREmployee } from '../../models/HREmployee';
import { Employee } from '../../models/Employee';
import { TokenService } from '../../services/tokenService';

describe('Employee Routes Test', () => {
  let token: string;

  beforeAll(async () => {
    await connectToDB();

    const password = 'password123';
    const hrEmployeeData = {
      fname: 'Alice',
      lname: 'HR',
      email: 'alice.hr@example.com',
      salary: 60000,
      password: password,
    };

    const hrEmployee = new HREmployee(hrEmployeeData);
    await hrEmployee.save();
    token = TokenService.generateAccessToken(hrEmployee._id.toString());
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should add an employee successfully', async () => {
    const employeeData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      salary: 50000,
    };
    const response = await request(app)
      .post('/employee/add')
      .set('Authorization', `Bearer ${token}`)
      .send(employeeData);
    expect(response.status).toBe(200);
    expect(response.body.employee).toBeDefined();
    expect(response.body.employee.email).toBe(employeeData.email);
  });

  it('should return 400 if required fields are missing when adding an employee', async () => {
    const response = await request(app)
      .post('/employee/add')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('First name is required.');
  });

  it('should edit an employee successfully', async () => {

    const updatedData = {
      fname: 'Jane',
      lname: 'Doe',
      email: 'jane.doe@example.com',
      salary: 60000,
    };

    const employee = await Employee.findOne({ email: 'john.doe@example.com' });

    const response = await request(app)
      .put('/employee/edit')
      .set('Authorization', `Bearer ${token}`)
      .query({ id: employee._id.toString() })
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.updatedEmployee.fname).toBe(updatedData.fname);
  });

  it('should return 400 if no fields are provided for editing an employee', async () => {
    const employee = await Employee.findOne({ email: 'jane.doe@example.com' });

    const response = await request(app)
      .put('/employee/edit')
      .set('Authorization', `Bearer ${token}`)
      .query({ id: employee._id.toString() })
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('At least one field (fname, lname, email, salary) must be provided.');
  });

  it('should get an employee by ID successfully', async () => {
    const employee = new Employee({
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      salary: 50000,
    });
    await employee.save();

    const response = await request(app)
      .get('/employee/get')
      .set('Authorization', `Bearer ${token}`)
      .query({ id: employee._id.toString() });

    expect(response.status).toBe(200);
    expect(response.body.employee.email).toBe(employee.email);
  });

  it('should return 404 if employee is not found', async () => {
    const response = await request(app)
      .get('/employee/get')
      .set('Authorization', `Bearer ${token}`)
      .query({ id: new mongoose.Types.ObjectId().toString() });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Employee not found.');
  });

  it('should view employees successfully', async () => {
    const employee1 = new Employee({
      fname: 'Bob',
      lname: 'Brown',
      email: 'bob.brown@example.com',
      salary: 55000,
    });
    const employee2 = new Employee({
      fname: 'Alice',
      lname: 'Smith',
      email: 'alice.smith@example.com',
      salary: 70000,
    });
    await employee1.save();
    await employee2.save();

    const response = await request(app)
      .get('/employee/view')
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1 });

    expect(response.status).toBe(200);
    expect(response.body.employees.length).toBe(4);
  });
});