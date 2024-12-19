import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Mail, MapPin, User, CreditCard } from 'lucide-react';
import { InputField } from '../forms/InputField';
import { SelectField } from '../forms/SelectField';
import { validateForm } from '../../utils/validate';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog'; // Importar el Dialog
import './register.css';

const roleOptions = [
  { label: 'Administrator', value: 'ADMIN' },
  { label: 'User', value: 'USER' },
];

const initialFormData = {
  email: '',
  coordenadasDomicilio: '',
  name: '',
  lastName: '',
  identification: '',
  rol: 'ADMIN',
};

export const RegisterForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // Estado para mostrar el Dialog
  const [dialogMessage, setDialogMessage] = useState(''); // Mensaje para el dialog
  const navigate = useNavigate();

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
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      localStorage.setItem('coordenadasDomicilio', formData.coordenadasDomicilio);
      const dialogMessage = `Necesitas guardar el username: ${response.username} y la contraseña: ${response.password} para poder iniciar sesión e ingresar. guardalos bien!`;

      setDialogMessage(dialogMessage); 
      setShowDialog(true); // Mostrar el dialog
      // Si necesitas redirigir después del registro exitoso:
      // navigate('/login');
    } catch (error) {
      setDialogMessage(error.message || 'An error occurred'); // Mensaje de error
      setShowDialog(true); // Mostrar el dialog
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='form'>
      <Card style={{ width: '100%', maxWidth: '32rem' }}>
        <h2>
          Create Account
        </h2>
        {errors.server && (
          <Message 
            severity="error" 
            text={errors.server}
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className='grid'>
            <InputField
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={<User size={20} />}
              placeholder="Juan"
            />

            <InputField
              id="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              icon={<User size={20} />}
              placeholder="Pérez"
            />
          </div>

          <InputField
            id="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail size={20} />}
            type="email"
            placeholder="usuario1@example.com"
          />

          <InputField
            id="identification"
            label="Identification"
            value={formData.identification}
            onChange={handleChange}
            error={errors.identification}
            icon={<CreditCard size={20} />}
            placeholder="12345678901"
          />

          <InputField
            id="coordenadasDomicilio"
            label="Location Coordinates"
            value={formData.coordenadasDomicilio}
            onChange={handleChange}
            error={errors.coordenadasDomicilio}
            icon={<MapPin size={20} />}
            placeholder="123.11456, 789.012"
          />

          <SelectField
            id="rol"
            label="Role"
            value={formData.rol}
            onChange={handleRoleChange}
            options={roleOptions}
            error={errors.rol}
          />

          <Button
            type="submit"
            label="Create Account"
            icon="pi pi-user-plus"
            loading={isLoading}
            style={{ width: '100%' }}
          />

          <p style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#4b5563'
          }}>
            Already have an account?{' '}
            <a 
              href="/login"
              style={{ 
                fontWeight: '500',
                color: '#4f46e5',
                textDecoration: 'none'
              }}
            >
              Sign in
            </a>
          </p>
        </form>
      </Card>

      {/* Dialog de respuesta */}
      <Dialog
        visible={showDialog}
        style={{ width: '450px' }}
        header="Registration Status"
        modal
        onHide={() => setShowDialog(false)}
      >
        <p>{dialogMessage}</p>
        <Button label="Close" icon="pi pi-times" onClick={() => handleDialogClose()} />
      </Dialog>
    </div>
  );
};
