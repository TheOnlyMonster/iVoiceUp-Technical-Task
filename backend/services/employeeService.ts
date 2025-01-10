import { Employee } from '../models/Employee';
import { IEmployee } from '../interfaces/IEmployee';
import { HREmployee } from '../models/HREmployee';
import { EmployeeNotFoundError } from '../errors/EmployeeNotFounfError';
import { UnauthorizedEditError } from '../errors/UnauthorizedEditError';

export class EmployeeService {

  static async addEmployee(employeeData: { fname: string; lname: string; email: string; salary: number }): Promise<IEmployee> {
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

    const employee = await Employee.findById(id);
    
    if (!employee) {
      throw new EmployeeNotFoundError();
    }
    return employee;
  }
}