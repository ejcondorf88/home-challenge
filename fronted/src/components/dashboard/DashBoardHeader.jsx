import { Avatar } from 'primereact/avatar';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';

export const DashboardHeader = ({ username, isUserAdmin, onLogout }) => (
    <div className="dashboard-header-card">
        <div className="dashboard-user-info">
            <Avatar 
                label={username?.charAt(0).toUpperCase()} 
                size="xlarge" 
                shape="circle"
                className="dashboard-avatar"
                style={{ 
                    backgroundColor: isUserAdmin ? '#6366f1' : '#10b981',
                    color: '#ffffff'
                }}
            />
            <div className="dashboard-user-details">
                <h2 className="dashboard-user-name">{username}</h2>
                <Chip 
                    label={isUserAdmin ? 'Administrador' : 'Usuario'} 
                    icon={isUserAdmin ? 'pi pi-shield' : 'pi pi-user'}
                    className={isUserAdmin ? 'chip-admin' : 'chip-user'}
                />
            </div>
        </div>
        <Button
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            severity="danger"
            outlined
            onClick={onLogout}
            className="logout-button-modern"
        />
    </div>
);
