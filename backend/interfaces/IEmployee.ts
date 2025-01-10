import { Document } from "mongoose";

export interface IEmployee extends Document {
  fname: string;
  lname: string;
  email: string;
  salary: number;
}