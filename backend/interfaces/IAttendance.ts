import mongoose from "mongoose";

export interface IAttendance extends Document {
  
  employeeId: mongoose.Types.ObjectId;

  date: Date;

  status: "Present" | "Absent";
}
