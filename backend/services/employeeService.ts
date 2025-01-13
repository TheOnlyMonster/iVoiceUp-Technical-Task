import { Employee } from '../models/Employee';
import { IEmployee } from '../interfaces/IEmployee';
import { HREmployee } from '../models/HREmployee';
import mongoose from 'mongoose';
import { CustomError } from '../errors/CustomError';

const limit = 10;

export class EmployeeService {

  static async addEmployee(employeeData: { fname: string; lname: string; email: string; salary: number }): Promise<IEmployee> {

    const isEmailTaken = await Employee.exists({ email: employeeData.email });
    if (isEmailTaken) {
      throw new CustomError('Email already in use.', 400);
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
      throw new CustomError('Cannot edit HR employee.', 400);
    }

    const isEmailTaken = await Employee.exists({ email: employeeData.email, _id: { $ne: id } });

    if (isEmailTaken) {
      throw new CustomError('Email already in use.', 400);
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
      throw new CustomError('Invalid employee ID.', 400);
    }
  
    const employee = await Employee.findById(id);
  
    if (!employee) {
      throw new CustomError('Employee not found.', 404);
    }
  
    return employee;
  }


  static async viewEmployees(page = 1): Promise<IEmployee[]> {
    const employees = await Employee.find({ __t: { $ne: 'HREmployee' } })
      .skip((page - 1) * limit)
      .limit(limit);
    return employees;
  }

  static async getEmployeesCount(): Promise<number> {
    return await Employee.countDocuments({ __t: { $ne: 'HREmployee' } });
  }
}