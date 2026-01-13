import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDashboard } from '../hooks/useDashBoard';
import './DashboardPage.css';
import { DashboardHeader } from '../components/dashboard/DashBoardHeader';
import { AdminTabs } from '../components/dashboard/AdminTabs';
import { UserDashboard } from '../components/dashboard/UserDashboard';

export const DashboardPage = () => {
    const {
        username,
        isUserAdmin,
        isLoading,
        handleLogout,
        lat,
        lng,
        refreshKey,
        handleUserCreated
    } = useDashboard();

    if (isLoading) {
        return (
            <div className="dashboard-page loading-container">
                <ProgressSpinner 
                    style={{ width: '50px', height: '50px' }}
                    strokeWidth="4"
                    animationDuration=".5s"
                />
                <p className="loading-text">Cargando dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-page-modern">
            <div className="dashboard-wrapper">
                <Card className="dashboard-card-modern">
                    <DashboardHeader 
                        username={username} 
                        isUserAdmin={isUserAdmin} 
                        onLogout={handleLogout} 
                    />
                    <Divider />
                    <div className="dashboard-content">
                        {isUserAdmin ? (
                            <AdminTabs 
                                refreshKey={refreshKey} 
                                onUserCreated={handleUserCreated} 
                                lat={lat} 
                                lng={lng} 
                            />
                        ) : (
                            <UserDashboard lat={lat} lng={lng} />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};
