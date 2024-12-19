import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
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
