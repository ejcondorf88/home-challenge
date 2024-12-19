import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { User, Lock } from 'lucide-react'; // Cambiar el ícono a User para username
import { InputField } from '../forms/InputField';
import { useLoginForm } from '../../hooks/useLoginForm';

export const LoginForm = () => {
    const { 
        formData, 
        errors, 
        isLoading, 
        handleChange, 
        handleSubmit 
    } = useLoginForm();

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Please sign in to continue</p>
                </div>

                {errors.server && (
                    <Message 
                        severity="error" 
                        text={errors.server}
                        className="login-message"
                    />
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <InputField
                        id="userName"
                        label="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        error={errors.userName} // Cambiar errors.email a errors.username
                        icon={<User size={20} />} // Ícono de usuario
                        type="text"
                        placeholder="Enter your username"
                    />

                    <InputField
                        id="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        icon={<Lock size={20} />}
                        type="password"
                        placeholder="Enter your password"
                    />

                    <div className="login-options">
                        <a href="/forgot-password" className="forgot-password">
                            Forgot Password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        label="Sign In"
                        icon="pi pi-sign-in"
                        loading={isLoading}
                        className="login-button"
                    />

                    <p className="signup-link">
                        Don't have an account?{' '}
                        <a href="/register">Create one now</a>
                    </p>
                </form>
            </Card>
        </div>
    );
};
