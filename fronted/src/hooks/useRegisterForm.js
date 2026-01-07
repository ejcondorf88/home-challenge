import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../utils/validate';
import { registerUser } from '../services/api';

const initialFormData = {
  email: '',
  coordenadasDomicilio: '',
  name: '',
  lastName: '',
  identification: '',
  rol: 'ADMIN',
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleRoleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rol: e.value,
    }));
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      localStorage.setItem('coordenadasDomicilio', formData.coordenadasDomicilio);
      const message = `Necesitas guardar el username: ${response.username} y la contraseña: ${response.password} para poder iniciar sesión e ingresar. ¡Guárdalos bien!`;
      setDialogMessage(message);
      setShowDialog(true);
    } catch (error) {
      setDialogMessage(error.message || 'An error occurred');
      setShowDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    showDialog,
    dialogMessage,
    handleChange,
    handleRoleChange,
    handleSubmit,
    handleDialogClose,
  };
};

