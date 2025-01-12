import axios from "axios";
import { API_URL } from "../config";

export const getAllEmployees = async (page: number, token: string | null) => {



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
