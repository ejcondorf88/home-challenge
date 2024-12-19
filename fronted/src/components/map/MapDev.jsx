import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Importa Leaflet

export const MapDev = ({ lat, lng }) => {
  // Usamos useRef para referenciar el contenedor del mapa
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Referencia para la instancia del mapa

  useEffect(() => {
    // Si ya existe una instancia del mapa, la destruimos antes de crear una nueva
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Inicializar el mapa en el contenedor referenciado
    const map = L.map(mapRef.current).setView([lat, lng], 13);

    // Agregar capa de tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregar un marcador en las coordenadas proporcionadas
    L.marker([lat, lng]).addTo(map).bindPopup('Aquí está tu lugar').openPopup();

    // Guardamos la instancia del mapa
    mapInstance.current = map;

    // Cleanup: destruir el mapa cuando el componente se desmonte
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [lat, lng]); // Se vuelve a inicializar el mapa si las coordenadas cambian

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />; // Estilos del mapa
};
