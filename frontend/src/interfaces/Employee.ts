import IAttendance from './Attendance';

export default interface Employee {
  id: string;
  fname: string;
  lname: string;
  email: string;
  salary: number;
  attendance: IAttendance[];
}