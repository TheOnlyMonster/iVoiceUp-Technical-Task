import mongoose from 'mongoose';
import { Employee } from '../../models/Employee';
import { HREmployee } from '../../models/HREmployee';
import { connectToDB } from '../../config/dbConnection';
describe('Employee Model Test', () => {
  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create and save an employee successfully', async () => {
    const employeeData = {
      fname: 'Reda',
      lname: 'Doe',
      email: 'Reda.doe@example.com',
      salary: 50000,
    };

    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();

    expect(savedEmployee._id).toBeDefined();
    expect(savedEmployee.fname).toBe(employeeData.fname);
    expect(savedEmployee.lname).toBe(employeeData.lname);
    expect(savedEmployee.email).toBe(employeeData.email);
    expect(savedEmployee.salary).toBe(employeeData.salary);
  });

  it('should not create an employee with invalid email', async () => {
    const employeeData = {
      fname: 'John',
      lname: 'Doe',
      email: 'invalid-email',
      salary: 50000,
    };

    const employee = new Employee(employeeData);
    let err;
    try {
      await employee.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });

  it('should not create an employee with negative salary', async () => {
    const employeeData = {
      fname: 'Saleem',
      lname: 'Bakr',
      email: 'Slemm@example.com',
      salary: -50000,
    };

    const employee = new Employee(employeeData);
    let err;
    try {
      await employee.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.salary).toBeDefined();
  });

  it('should create and save an HR employee successfully', async () => {
    const password = 'password123';

    const hrEmployeeData = {
      fname: 'Ahmed',
      lname: 'Ali',
      email: 'Ahmed.hr@example.com',
      salary: 60000,
      password: password,
    };

    const hrEmployee = new HREmployee(hrEmployeeData);
    const savedHREmployee = await hrEmployee.save();

    expect(savedHREmployee._id).toBeDefined();
    expect(savedHREmployee.fname).toBe(hrEmployeeData.fname);
    expect(savedHREmployee.lname).toBe(hrEmployeeData.lname);
    expect(savedHREmployee.email).toBe(hrEmployeeData.email);
    expect(savedHREmployee.salary).toBe(hrEmployeeData.salary);
  });
});