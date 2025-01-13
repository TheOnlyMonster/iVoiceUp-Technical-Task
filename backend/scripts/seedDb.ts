import mongoose from 'mongoose';
import { connectToDB } from '../config/dbConnection';
import { HREmployee } from '../models/HREmployee';
import { Employee } from '../models/Employee';
import { Attendance } from '../models/Attendance';

const seedDB = async () => {
  await connectToDB();

  // Clear existing data
  await HREmployee.deleteMany({});
  await Employee.deleteMany({});
  await Attendance.deleteMany({});

  // Create HR Employee
  const hrEmployee = 
    {
      fname: 'Alice',
      lname: 'HR',
      email: 'alice.hr@example.com',
      salary: 60_000,
      password: 'password123',
    };

  const createdHREmployee = new HREmployee(hrEmployee);
  await createdHREmployee.save();

  // Create Employees
  const employee = 
    {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      salary: 50_000,
    };

  const createdEmployee = new Employee(employee);
  await createdEmployee.save();

  // Database seeded successfully
  console.log('Database seeded successfully');
  mongoose.connection.close();
};

seedDB().catch((error) => {
  console.error('Error seeding database:', error);
  mongoose.connection.close();
});