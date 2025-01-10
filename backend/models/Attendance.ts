import mongoose, { Schema } from "mongoose";
import { IAttendance } from "../interfaces/IAttendance";

const AttendanceSchema: Schema = new Schema<IAttendance>({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"], default: "Absent",
    required: true,
  },
}, { 
  _id: false 
});

AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model<IAttendance>("Attendance", AttendanceSchema);