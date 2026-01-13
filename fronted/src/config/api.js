// Configuración de la API URL usando variables de entorno
// En desarrollo: usar VITE_API_URL o por defecto localhost
// En producción (Docker): se puede pasar como variable de entorno o usar config.json

let apiBaseUrl = null;
let configLoaded = false;

// Cargar configuración de forma síncrona para uso inmediato
// En desarrollo, usar directamente
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }
  return import.meta.env.DEV 
    ? 'http://localhost:8080/api/v1' 
    : '/api/v1';
};

// Para uso inmediato (síncrono) - se actualizará después de cargar config.json
export let API_BASE_URL = getApiUrl();
export let API_AUTH_URL = `${API_BASE_URL}/auth`;
export let API_ADMIN_URL = `${API_BASE_URL}/admin`;

// Función para cargar configuración desde config.json (runtime)
export const loadApiConfig = async () => {
  if (configLoaded) return;
  
  // Primero intentar desde variable de entorno (tiempo de build)
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    apiBaseUrl = envUrl;
    API_BASE_URL = apiBaseUrl;
    API_AUTH_URL = `${API_BASE_URL}/auth`;
    API_ADMIN_URL = `${API_BASE_URL}/admin`;
    configLoaded = true;
    return;
  }

  // En producción, intentar cargar desde config.json (runtime)
  if (import.meta.env.PROD) {
    try {
      const response = await fetch('/config.json');
      if (response.ok) {
        const config = await response.json();
        if (config.apiUrl) {
          apiBaseUrl = config.apiUrl;
          API_BASE_URL = apiBaseUrl;
          API_AUTH_URL = `${API_BASE_URL}/auth`;
          API_ADMIN_URL = `${API_BASE_URL}/admin`;
          configLoaded = true;
          console.log('API URL cargada desde config.json:', API_BASE_URL);
          return;
        }
      }
    } catch (error) {
      console.warn('No se pudo cargar config.json, usando fallback:', error);
    }
  }

  // Fallback
  apiBaseUrl = import.meta.env.DEV 
    ? 'http://localhost:8080/api/v1' 
    : '/api/v1';
  API_BASE_URL = apiBaseUrl;
  API_AUTH_URL = `${API_BASE_URL}/auth`;
  API_ADMIN_URL = `${API_BASE_URL}/admin`;
  configLoaded = true;
};
