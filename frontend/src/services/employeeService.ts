import axios from "axios";
import { API_URL } from "../config";
import Employee from "@/interfaces/Employee";

export const getAllEmployees = async (page: number, token: string | null) => {

  console.log(token);
  const response = await axios.get(`${API_URL}/employee/view`, {
    params: { page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch all employees.");
  }

  return response.data;
};

export const getEmployeeById = async (id: string, token: string | null) => {

  const response = await axios.get(`${API_URL}/employee/get`, {
    params: { id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (response.status !== 200) {
    throw new Error("Failed to fetch employee by ID.");
  }

  return response.data.employee;
};

export const updateEmployee = async (employeeData: Employee, token: string | null) => {
  
  console.log(employeeData.id);
  const response = await axios.put(
    `${API_URL}/employee/edit?id=${employeeData.id}`,  
    employeeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to update employee.");
  }

  return response.data;
};

