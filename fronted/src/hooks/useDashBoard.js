import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, getUsername } from '../utils/jwt';
import { logout } from '../services/auth';

/**
 * Hook para manejar la autenticación y rol del usuario
 */
export const useAuth = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        setUserRole(isAdmin() ? 'ADMIN' : 'USER');
        setUsername(getUsername());
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return {
        userRole,
        username,
        isUserAdmin: userRole === 'ADMIN',
        isLoading: !userRole,
        handleLogout
    };
};

/**
 * Hook para manejar las coordenadas del domicilio
 */
export const useCoordinates = () => {
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        const coords = localStorage.getItem("coordenadasDomicilio")?.split(',') || [0, 0];
        const [lat, lng] = coords.map(coord => parseFloat(coord));
        setCoordinates({ lat, lng });
    }, []);

    return coordinates;
};

/**
 * Hook para manejar el refresco de componentes
 */
export const useRefresh = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return { refreshKey, refresh };
};

/**
 * Hook principal del Dashboard que combina toda la lógica
 */
export const useDashboard = () => {
    const auth = useAuth();
    const coordinates = useCoordinates();
    const { refreshKey, refresh } = useRefresh();

    return {
        ...auth,
        ...coordinates,
        refreshKey,
        handleUserCreated: refresh
    };
};