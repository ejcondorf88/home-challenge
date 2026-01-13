// Utilidad para decodificar JWT y obtener información del usuario
export const decodeJWT = (token) => {
  try {
    if (!token) return null;
    
    // JWT tiene 3 partes separadas por puntos: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decodificar el payload (segunda parte)
    const payload = parts[1];
    
    // Base64 URL decode
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  if (!decoded) return null;
  
  // El rol puede estar como "ROLE_ADMIN" o "ADMIN" dependiendo del backend
  const role = decoded.role || decoded.roles?.[0];
  if (!role) return null;
  
  // Normalizar el rol (remover prefijo ROLE_ si existe)
  return role.replace('ROLE_', '');
};

export const isAdmin = () => {
  const role = getUserRole();
  return role === 'ADMIN';
};

export const getUsername = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  return decoded?.sub || decoded?.username || null;
};
