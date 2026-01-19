import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Mail, MapPin, User, CreditCard } from 'lucide-react';
import { InputField, SelectField } from '../components';
import { useRegisterForm } from '../hooks';
import './RegisterPage.css';

const roleOptions = [
  { label: 'Administrator', value: 'ADMIN' },
  { label: 'User', value: 'USER' },
];

export const RegisterPage = () => {
  const {
    formData,
    errors,
    isLoading,
    showDialog,
    dialogMessage,
    handleChange,
    handleRoleChange,
    handleSubmit,
    handleDialogClose,
  } = useRegisterForm();

  return (
    <div className="register-page">
      <Card className="register-card">
        <h2 className="register-title">Create Account</h2>
        
        {errors.server && (
          <Message 
            severity="error" 
            text={errors.server}
            className="register-message"
          />
        )}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
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
            className="register-button"
          />

          <p className="login-link">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </Card>

      <Dialog
        visible={showDialog}
        style={{ width: '450px' }}
        header="Registration Status"
        modal
        onHide={handleDialogClose}
      >
        <p>{dialogMessage}</p>
        <Button 
          label="Close" 
          icon="pi pi-times" 
          onClick={handleDialogClose} 
        />
      </Dialog>
    </div>
  );
};

