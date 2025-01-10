import mongoose, { Schema, Document } from "mongoose";
import { IEmployee } from "../interfaces/IEmployee";

const EmployeeSchema: Schema = new Schema<IEmployee>({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
    validate: {
      validator: function (salary: number) {
        return salary > 0;
      },
      message: (props: { value: number }) =>
        `${props.value} is not a valid salary!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address!`,
    },
  },
});

export const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
