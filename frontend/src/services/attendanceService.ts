import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { API_URL } from "../config";
import Attendance from "@/interfaces/Attendance";

export const getAttendanceByEmployeeId = async (id: string, page: number, token: string | null) => {
  try {
    const response = await axios.get(`${API_URL}/attendance/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, employeeId: id },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch attendance by employee ID.");
    }

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
        description: "Failed to fetch attendance.",
        type: "error",
      });
    }

    throw error;
  }
};

export const createAttendance = async (attendanceData: Attendance, token: string | null) => {
  try {
    const response = await axios.post(`${API_URL}/attendance/add`, attendanceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to create attendance.");
    }

    toaster.create({
      title: "Success",
      description: "Attendance created successfully.",
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
        description: "Failed to create attendance.",
        type: "error",
      });
    }

    throw error;
  }
};