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
