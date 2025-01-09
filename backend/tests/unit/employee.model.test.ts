import mongoose from 'mongoose';
import { Employee } from '../../models/Employee';
import { RolesEnum } from '../../constants/RolesEnum';
import { connectToDB } from '../../config/dbConnection';

describe('Employee Model Test', () => {
  
  beforeAll(connectToDB);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create an employee successfully', async () => {
    const employeeData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: RolesEnum.NORMAL,
    };

    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();

    expect(savedEmployee._id).toBeDefined();
    expect(savedEmployee.name).toBe(employeeData.name);
    expect(savedEmployee.email).toBe(employeeData.email);
    expect(savedEmployee.role).toBe(employeeData.role);
  });

  it('should fail to create an employee with invalid email', async () => {
    const employeeData = {
      name: 'Jane Doe',
      email: 'invalid-email',
      password: 'password123',
      role: RolesEnum.NORMAL,
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

  it('should hash the password before saving', async () => {
    const employeeData = {
      name: 'Alice Doe',
      email: 'alice.doe@example.com',
      password: 'password123',
      role: RolesEnum.NORMAL,
    };

    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();

    expect(savedEmployee.password).not.toBe(employeeData.password);
  });
});