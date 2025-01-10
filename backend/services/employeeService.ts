import { Employee } from '../models/Employee';
import { IEmployee } from '../interfaces/IEmployee';

export class EmployeeService {

  static async addEmployee(employeeData: { fname: string; lname: string; email: string; salary: number }): Promise<IEmployee> {
    const employee = new Employee(employeeData);
    await employee.save();
    return employee;
  }

  static async getEmployeeById(id: string): Promise<IEmployee> {
    const employee = await Employee.findById(id);
    if (!employee) {
      throw new Error('Employee not found.');
    }
    return employee;
  }
}