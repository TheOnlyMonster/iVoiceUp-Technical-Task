export default interface Attendance {
  employeeId: string;
  date: Date;
  status: "Present" | "Absent";
}