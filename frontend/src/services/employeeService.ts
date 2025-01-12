import axios from "axios";
import { API_URL } from "../config";
import Employee from "@/interfaces/Employee";
import { toaster } from "@/components/ui/toaster";

export const getAllEmployees = async (page: number, token: string | null) => {
  try {
    const response = await axios.get(`${API_URL}/employee/view`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch all employees.");
    }

    toaster.create({
      title: "Success",
      description: "Employees fetched successfully.",
      type: "success",
    });

    return response.data;
  } catch (error) {
    toaster.create({
      title: "Error",
      description: "Failed to fetch employees.",
      type: "error",
    });

    throw error;
  }
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

export const updateEmployee = async (
  employeeData: Employee,
  token: string | null
) => {
  try {
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

    toaster.create({
      title: "Success",
      description: "Employee updated successfully.",
      type: "success",
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toaster.create({
        title: "Error",
        description: error.response?.data.message,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Error",
        description: "Failed to update employee.",
        type: "error",
      });
    }

    throw error;
  }
};

export const createEmployee = async (
  employeeData: Employee,
  token: string | null
) => {
  try {
    const response = await axios.post(`${API_URL}/employee/add`, employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to create employee.");
    }

    toaster.create({
      title: "Success",
      description: "Employee created successfully.",
      type: "success",
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toaster.create({
        title: "Error",
        description: error.response?.data.message,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Error",
        description: "Failed to create employee.",
        type: "error",
      });
    }

    throw error;
  }
};
