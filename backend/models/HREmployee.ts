import mongoose, { Schema, Document } from "mongoose";
import { hashPassword } from "../utils/passwordUtils";
import { Employee } from "./Employee"; 
import { IHREmployee } from "../interfaces/IHREmployee";

const HREmployeeSchema: Schema = new Schema<IHREmployee>({
  password: {
    type: String,
    required: true,
  },
});

HREmployeeSchema.pre<IHREmployee>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await hashPassword(this.password);
  }
  next();
});


export const HREmployee = Employee.discriminator<IHREmployee>("HREmployee", HREmployeeSchema);
