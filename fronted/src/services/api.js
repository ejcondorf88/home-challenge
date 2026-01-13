import axios from "axios";
import { API_AUTH_URL } from "../config/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // Manejo del error
    const errorMessage = error.response?.data?.message || "Registration failed";
    throw new Error(errorMessage);
  }
};
