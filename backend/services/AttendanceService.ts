import { Attendance } from '../models/Attendance';
import { IAttendance } from '../interfaces/IAttendance';
import { CustomError } from '../errors/CustomError';
import { Employee } from '../models/Employee';
import { HREmployee } from '../models/HREmployee';
export class AttendanceService {
  static async addAttendance(employeeId: string, date: Date, status: 'Present' | 'Absent'): Promise<IAttendance> {

    if (status !== 'Present' && status !== 'Absent') {
      throw new CustomError('Invalid status.', 400);
    }

    if (date > new Date()) {
      throw new CustomError('Date cannot be in the future.', 400);
    }
    
    const employee = await Employee.findById(employeeId);
  
    if (!employee) {
      throw new CustomError('Employee not found.', 404);
    }

    const existingAttendance = await Attendance.findOne({ employeeId, date });

    if (existingAttendance) {
      throw new CustomError('Attendance already exists.', 400);
    }

    const attendance = new Attendance({ employeeId, date, status });
    await attendance.save();
    return attendance;
  }

  static async getAttendanceByEmployeeId(employeeId: string, page: number): Promise<IAttendance[]> {
    const pageSize = 5;
    const skip = (page - 1) * pageSize;
    const attendance = await Attendance.find({ employeeId }).skip(skip).limit(pageSize);
    return attendance;
  }
}