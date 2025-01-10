import { Request, Response, NextFunction } from 'express';
import { AttendanceService } from '../services/AttendanceService';

export const addAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { employeeId, date, status } = req.body;

    const attendance = await AttendanceService.addAttendance(employeeId, new Date(date), status);

    res.status(200).json({ message: 'Attendance added successfully.', attendance });
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByEmployeeId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const { page = 1 } = req.query;

    const attendance = await AttendanceService.getAttendanceByEmployeeId(employeeId, Number(page));

    res.status(200).json({ attendance });
  } catch (error) {
    next(error);
  }
};