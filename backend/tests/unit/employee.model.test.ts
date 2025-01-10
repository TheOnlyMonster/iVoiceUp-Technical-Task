import mongoose from 'mongoose';
import { Employee } from '../../models/Employee';
import { HREmployee } from '../../models/HREmployee'; 
import { connectToDB } from '../../config/dbConnection';

describe('Employee Model Test', () => {

  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a normal employee successfully without password', async () => {
    const employeeData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
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

  it('should create an HR employee successfully with password', async () => {
    const employeeData = {
      fname: 'Alice',
      lname: 'HR',
      email: 'alice.hr@example.com',
      salary: 60000,
      password: 'password123', 
    };
  
    const hrEmployee = new HREmployee(employeeData);
    const savedEmployee = await hrEmployee.save();
  
    expect(savedEmployee._id).toBeDefined();
    expect(savedEmployee.fname).toBe(employeeData.fname);
    expect(savedEmployee.lname).toBe(employeeData.lname);
    expect(savedEmployee.email).toBe(employeeData.email);
    expect(savedEmployee.salary).toBe(employeeData.salary);
    
    expect(savedEmployee.password).toBeDefined();
    expect(savedEmployee.password).not.toBe(employeeData.password); 
  });

  it('should fail to create an employee with invalid email', async () => {
    const employeeData = {
      fname: 'Jane',
      lname: 'Doe',
      email: 'invalid-email',
      salary: 55000,
      password: 'password123',
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
    expect(err.errors.email.message).toBe('invalid-email is not a valid email address!');
  });

  it('should hash the password before saving for HR employee', async () => {
    const employeeData = {
      fname: 'Bob',
      lname: 'HR',
      email: 'bob.hr@example.com',
      salary: 70000,
      password: 'password123',
    };

    const hrEmployee = new HREmployee(employeeData);
    const savedEmployee = await hrEmployee.save();

    expect(savedEmployee.password).not.toBe(employeeData.password); // The password should be hashed
  });
});
