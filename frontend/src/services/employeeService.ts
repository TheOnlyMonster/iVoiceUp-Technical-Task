import axios from "axios";
import { API_URL } from "../config";
import { getCookie } from "cookies-next";

export const getAllEmployees = async (page: number) => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

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
