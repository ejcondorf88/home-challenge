import axios from "axios";
import { API_ADMIN_URL } from "../config/api";

// Crear instancia de axios con interceptor para agregar el token
const createAuthenticatedAxios = () => {
  const instance = axios.create();
  
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return instance;
};

const authenticatedAxios = createAuthenticatedAxios();

export const getAllUsers = async () => {
  try {
    const response = await authenticatedAxios.get(`${API_ADMIN_URL}/users`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch users";
    throw new Error(errorMessage);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await authenticatedAxios.post(`${API_ADMIN_URL}/users`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to create user";
    throw new Error(errorMessage);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await authenticatedAxios.put(`${API_ADMIN_URL}/users/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to update user";
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (id) => {
  try {
    await authenticatedAxios.delete(`${API_ADMIN_URL}/users/${id}`);
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete user";
    throw new Error(errorMessage);
  }
};
