import { useState } from "react";
import { loginUser } from "../services/auth";
import { validateForm, validateLoginForm } from "../utils/validate";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(formData.userName, formData.password);
      console.log(response);
      // Handle successful login (e.g., store token, redirect)
      //window.location.href = "/dashboard";
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server: error.message || "Login failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
