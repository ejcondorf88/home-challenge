import { useRef } from 'react';
import { useLeafletMap } from '../../hooks/useLeafletMap';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
});

export const MapDev = ({ lat = 0, lng = 0, className }) => {
    const mapRef = useRef(null);

    // Usar hook personalizado con todas las opciones
    useLeafletMap(mapRef, lat, lng, {
        mapOptions: {
            zoom: 13,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            dragging: true,
        },
        animationOptions: {
            duration: 1.5,
            easeLinearity: 0.5
        },
        eventHandlers: {
            // Opcional: agregar manejadores de eventos
            // click: (e) => console.log('Mapa clickeado:', e.latlng),
            // zoom: () => console.log('Zoom cambiado')
        }
    });

    return (
        <div 
            ref={mapRef} 
            className={className}
            style={{ 
                width: '100%', 
                height: '100%',
                minHeight: '500px',
                borderRadius: '8px',
                overflow: 'hidden'
            }}
        />
    );
};