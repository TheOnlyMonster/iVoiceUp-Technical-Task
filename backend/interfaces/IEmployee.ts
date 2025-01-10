import { Document } from "mongoose";
import { IAttendance } from "./IAttendance";

export interface IEmployee extends Document {
  fname: string;
  lname: string;
  email: string;
  salary: number;
  attendance: IAttendance[];
}