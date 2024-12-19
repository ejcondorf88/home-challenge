import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Importa Leaflet

export const MapDev = ({ lat, lng }) => {
  // Usamos useRef para referenciar el contenedor del mapa
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Inicializar el mapa en el contenedor referenciado
      const map = L.map(mapRef.current).setView([lat, lng], 13);

      // Agregar capa de tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Agregar un marcador en las coordenadas proporcionadas
      L.marker([lat, lng]).addTo(map).bindPopup('Aquí está tu lugar').openPopup();
    }

    // Cleanup: destruir el mapa cuando el componente se desmonte
    return () => {
      if (mapRef.current) {
        mapRef.current._leaflet_id = null;
      }
    };
  }, [lat, lng]); // Se vuelve a inicializar el mapa si las coordenadas cambian

  return (
    <div 
      ref={mapRef} 
      style={{
        height: '500px', 
        width: '700px', 
        borderRadius: '10px', // Bordes redondeados
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra suave
        transition: 'all 0.3s ease-in-out', // Transición suave al redimensionar
        overflow: 'hidden', // Evita que el contenido se desborde
      }} 
    />
  );
  };
