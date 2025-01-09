import mongoose, { Schema, Document } from "mongoose";
import { RolesEnum } from "../constants/RolesEnum";
import { hashPassword } from "../utils/passwordUtils";

interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const EmployeeSchema: Schema = new Schema({
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
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: Object.values(RolesEnum),
    default: RolesEnum.NORMAL,
  },
});

EmployeeSchema.pre<IEmployee>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
