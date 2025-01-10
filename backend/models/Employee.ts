import mongoose, { Schema, Document } from "mongoose";
import { IEmployee } from "../interfaces/IEmployee";

const EmployeeSchema: Schema = new Schema<IEmployee>({
  name: {
    type: String,
    required: true,
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
