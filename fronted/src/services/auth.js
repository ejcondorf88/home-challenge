import axios from "axios";
import { API_AUTH_URL } from "../config/api";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, { username, password }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

    // Store auth token if provided
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data.message || "Login failed");
    } else {
      // Network error or other issues
      throw new Error("Network error or unexpected issue");
    }
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("coordenadasDomicilio");
  // Limpiar cualquier otro dato del localStorage si es necesario
};
