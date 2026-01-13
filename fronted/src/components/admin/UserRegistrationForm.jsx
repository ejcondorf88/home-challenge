import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Mail, MapPin, User, CreditCard } from 'lucide-react';
import { InputField } from '../forms/InputField';
import { SelectField } from '../forms/SelectField';
import { createUser } from '../../services/admin';
import { validateForm } from '../../utils/validate';

const roleOptions = [
  { label: 'Administrator', value: 'ADMIN' },
  { label: 'User', value: 'USER' },
];

export const UserRegistrationForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    email: '',
    coordenadasDomicilio: '',
    name: '',
    lastName: '',
    identification: '',
    rol: 'USER',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rol: e.value,
    }));
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    if (onUserCreated) {
      onUserCreated();
    }
    // Reset form
    setFormData({
      email: '',
      coordenadasDomicilio: '',
      name: '',
      lastName: '',
      identification: '',
      rol: 'USER',
    });
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
      const response = await createUser(formData);
      const message = `Usuario creado exitosamente. Username: ${response.username}, Password: ${response.password || 'Generada automáticamente'}`;
      setDialogMessage(message);
      setShowDialog(true);
    } catch (error) {
      setDialogMessage(error.message || 'Error al crear el usuario');
      setShowDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="user-registration-card">
        <h3 className="registration-form-title">Registrar Nuevo Usuario</h3>
        
        {errors.server && (
          <Message 
            severity="error" 
            text={errors.server}
            className="registration-message"
          />
        )}
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <InputField
              id="name"
              label="Nombre"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={<User size={20} />}
              placeholder="Juan"
            />

            <InputField
              id="lastName"
              label="Apellido"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              icon={<User size={20} />}
              placeholder="Pérez"
            />
          </div>

          <InputField
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail size={20} />}
            type="email"
            placeholder="usuario@example.com"
          />

          <InputField
            id="identification"
            label="Identificación"
            value={formData.identification}
            onChange={handleChange}
            error={errors.identification}
            icon={<CreditCard size={20} />}
            placeholder="12345678901"
          />

          <InputField
            id="coordenadasDomicilio"
            label="Coordenadas de Domicilio"
            value={formData.coordenadasDomicilio}
            onChange={handleChange}
            error={errors.coordenadasDomicilio}
            icon={<MapPin size={20} />}
            placeholder="123.11456, 789.012"
          />

          <SelectField
            id="rol"
            label="Rol"
            value={formData.rol}
            onChange={handleRoleChange}
            options={roleOptions}
            error={errors.rol}
          />

          <Button
            type="submit"
            label="Crear Usuario"
            icon="pi pi-user-plus"
            loading={isLoading}
            className="registration-button"
          />
        </form>
      </Card>

      <Dialog
        visible={showDialog}
        style={{ width: '450px' }}
        header="Estado del Registro"
        modal
        onHide={handleDialogClose}
      >
        <p>{dialogMessage}</p>
        <Button 
          label="Cerrar" 
          icon="pi pi-times" 
          onClick={handleDialogClose} 
        />
      </Dialog>
    </>
  );
};
