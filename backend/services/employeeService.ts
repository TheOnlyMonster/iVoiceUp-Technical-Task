import { Employee } from '../models/Employee';
import { IEmployee } from '../interfaces/IEmployee';
import { HREmployee } from '../models/HREmployee';
import { EmployeeNotFoundError } from '../errors/EmployeeNotFounfError';
import { UnauthorizedEditError } from '../errors/UnauthorizedEditError';
import mongoose from 'mongoose';
import { InvalidObjectIdError } from '../errors/InvalidObjectIdError';

export class EmployeeService {

  static async addEmployee(employeeData: { fname: string; lname: string; email: string; salary: number }): Promise<IEmployee> {

    const isEmailTaken = await Employee.exists({ email: employeeData.email });
    if (isEmailTaken) {
      throw new Error('Email is already taken.');
    }

    const employee = new Employee(employeeData);
    await employee.save();
    return employee;
  }

  static async editEmployee(
    id: string,
    employeeData: Partial<{ fname: string; lname: string; email: string; salary: number }>
  ): Promise<IEmployee> {
    const existingEmp = await this.getEmployeeById(id);
  
    if (existingEmp instanceof HREmployee) {
      throw new UnauthorizedEditError();
    }
  
    Object.keys(employeeData).forEach((key) => {
      if (employeeData[key] !== undefined) {
        existingEmp[key] = employeeData[key];
      }
    });
  
    await existingEmp.save();
    return existingEmp;
  }

  static async getEmployeeById(id: string): Promise<IEmployee> {

    if (!mongoose.isValidObjectId(id)) {
      throw new InvalidObjectIdError();
    }
  
    const employee = await Employee.findById(id);
  
    if (!employee) {
      throw new EmployeeNotFoundError();
    }
  
    return employee;
  }

  static async viewEmployee(id: string): Promise<IEmployee> {
    const employee = await this.getEmployeeById(id);
    return employee;
  }

  static async viewEmployees(page = 1, limit = 10): Promise<IEmployee[]> {
    const employees = await Employee.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return employees;
  }
}