import request from 'supertest';
import { app } from '../../server';
import mongoose from 'mongoose';
import { connectToDB } from '../../config/dbConnection';
import { HREmployee } from '../../models/HREmployee';
import { Employee } from '../../models/Employee';
import { TokenService } from '../../services/tokenService';

describe('Attendance Routes Test', () => {
  let token: string;
  let employeeId: string;

  beforeAll(async () => {
    await connectToDB();

    const password = 'password123';
    const hrEmployeeData = {
      fname: 'Alice',
      lname: 'HR',
      email: 'Ali.hr@example.com',
      salary: 60000,
      password: password,
    };

    const hrEmployee = new HREmployee(hrEmployeeData);
    await hrEmployee.save();
    token = TokenService.generateAccessToken(hrEmployee._id.toString());

    const employeeData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      salary: 50000,
    };

    const employee = new Employee(employeeData);
    await employee.save();
    employeeId = employee._id.toString();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should add attendance successfully', async () => {
    const attendanceData = {
      employeeId: employeeId,
      date: new Date().toISOString(),
      status: 'Present',
    };

    const response = await request(app)
      .post('/attendance/add')
      .set('Authorization', `Bearer ${token}`)
      .send(attendanceData);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.attendance).toBeDefined();
    expect(response.body.attendance.status).toBe(attendanceData.status);
  });

  it('should return 400 if required fields are missing when adding attendance', async () => {
    const response = await request(app)
      .post('/attendance/add')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Employee ID is required.');
  });

  it('should return 400 if attendance already exists for the given date', async () => {
    const attendanceData = {
      employeeId: employeeId,
      date: new Date().toISOString(),
      status: 'Present',
    };

    await request(app)
      .post('/attendance/add')
      .set('Authorization', `Bearer ${token}`)
      .send(attendanceData);

    const response = await request(app)
      .post('/attendance/add')
      .set('Authorization', `Bearer ${token}`)
      .send(attendanceData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Attendance already exists.');
  });

  it('should get attendance by employee ID successfully', async () => {
    const response = await request(app)
      .get(`/attendance/get`)
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, employeeId: employeeId });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.attendance).toBeDefined();
    expect(response.body.attendance.length).toBeGreaterThan(0);
  });

  it('should return 404 if no attendance records are found for the employee', async () => {
    const newEmployee = new Employee({
      fname: 'Jane',
      lname: 'Doe',
      email: 'jane.doe@example.com',
      salary: 60000,
    });
    await newEmployee.save();

    const response = await request(app)
      .get(`/attendance/get`)
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, employeeId: newEmployee._id.toString() });

    expect(response.status).toBe(200);
    expect(response.body.attendance.length).toBe(0);
  });
});