import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employeeService';

export const addEmployee = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try {
    const {fname, lname, email, salary} = req.body;

    const employee = await EmployeeService.addEmployee({fname, lname, email, salary});

    res.status(200).json({ message: 'Employee added successfully.', employee });
  } catch (error) {
    next(error);
  }
};

export const editEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.query;
    const { fname, lname, email, salary } = req.body;
    const updateData: Partial<{ fname: string; lname: string; email: string; salary: number }> = {};

    if (fname !== undefined) updateData.fname = fname;
    if (lname !== undefined) updateData.lname = lname;
    if (email !== undefined) updateData.email = email;
    if (salary !== undefined) updateData.salary = salary;

    const updatedEmployee = await EmployeeService.editEmployee(id.toString(), updateData);

    res.status(200).json({ message: 'Employee updated successfully.', updatedEmployee });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.query;

    const employee = await EmployeeService.getEmployeeById(id.toString());

    res.status(200).json({ employee });

  } catch (error) {
    next(error);
  }
};


export const viewEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1 } = req.query;

    const employees = await EmployeeService.viewEmployees(Number(page));

    res.status(200).json({ employees });

  } catch (error) {
    next(error);
  }
};
