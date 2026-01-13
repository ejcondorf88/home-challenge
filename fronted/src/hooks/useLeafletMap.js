import { useEffect, useRef } from 'react';
import L from 'leaflet';

/**
 * Hook para inicializar el mapa de Leaflet
 * @param {Object} containerRef - Referencia al contenedor del mapa
 * @param {number} lat - Latitud inicial
 * @param {number} lng - Longitud inicial
 * @param {Object} options - Opciones del mapa
 * @returns {Object} Referencias al mapa y marcador
 */
export const useMapInitialization = (containerRef, lat, lng, options = {}) => {
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    const defaultOptions = {
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        ...options
    };

    useEffect(() => {
        if (!containerRef.current || mapInstanceRef.current) return;

        try {
            // Crear la instancia del mapa
            const map = L.map(containerRef.current, {
                center: [lat, lng],
                ...defaultOptions
            });

            // Agregar capa de tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
                minZoom: 3
            }).addTo(map);

            // Crear el marcador inicial
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(createPopupContent(lat, lng));

            // Guardar referencias
            mapInstanceRef.current = map;
            markerRef.current = marker;

        } catch (error) {
            console.error('Error al inicializar el mapa:', error);
        }

        // Cleanup
        return () => {
            if (markerRef.current) {
                markerRef.current.remove();
                markerRef.current = null;
            }
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Solo se ejecuta al montar

    return { mapInstanceRef, markerRef };
};

/**
 * Hook para actualizar las coordenadas del mapa
 * @param {Object} mapInstanceRef - Referencia al mapa
 * @param {Object} markerRef - Referencia al marcador
 * @param {number} lat - Nueva latitud
 * @param {number} lng - Nueva longitud
 * @param {Object} animationOptions - Opciones de animación
 */
export const useMapCoordinatesUpdate = (
    mapInstanceRef, 
    markerRef, 
    lat, 
    lng,
    animationOptions = {}
) => {
    const defaultAnimationOptions = {
        duration: 1.5,
        easeLinearity: 0.5,
        ...animationOptions
    };

    useEffect(() => {
        if (!mapInstanceRef.current || !markerRef.current) return;

        // Validar coordenadas
        if (!isValidCoordinates(lat, lng)) {
            console.warn('Coordenadas inválidas:', { lat, lng });
            return;
        }

        const newLatLng = L.latLng(lat, lng);

        // Actualizar posición del marcador
        markerRef.current.setLatLng(newLatLng);
        
        // Actualizar popup
        markerRef.current.setPopupContent(createPopupContent(lat, lng));

        // Animar transición
        mapInstanceRef.current.flyTo(
            newLatLng, 
            mapInstanceRef.current.getZoom(), 
            defaultAnimationOptions
        );

    }, [lat, lng]);
};

/**
 * Hook para manejar eventos del mapa
 * @param {Object} mapInstanceRef - Referencia al mapa
 * @param {Object} eventHandlers - Objeto con manejadores de eventos
 */
export const useMapEvents = (mapInstanceRef, eventHandlers = {}) => {
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        const map = mapInstanceRef.current;
        const handlers = [];

        // Registrar eventos
        Object.entries(eventHandlers).forEach(([event, handler]) => {
            map.on(event, handler);
            handlers.push({ event, handler });
        });

        // Cleanup: remover eventos
        return () => {
            handlers.forEach(({ event, handler }) => {
                map.off(event, handler);
            });
        };
    }, [mapInstanceRef, eventHandlers]);
};

/**
 * Hook principal que combina todos los hooks de Leaflet
 * @param {Object} containerRef - Referencia al contenedor
 * @param {number} lat - Latitud
 * @param {number} lng - Longitud
 * @param {Object} options - Opciones adicionales
 * @returns {Object} Referencias y funciones auxiliares
 */
export const useLeafletMap = (
    containerRef, 
    lat, 
    lng, 
    options = {}
) => {
    const { 
        mapOptions = {}, 
        animationOptions = {},
        eventHandlers = {}
    } = options;

    // Inicializar mapa
    const { mapInstanceRef, markerRef } = useMapInitialization(
        containerRef, 
        lat, 
        lng, 
        mapOptions
    );

    // Actualizar coordenadas
    useMapCoordinatesUpdate(
        mapInstanceRef, 
        markerRef, 
        lat, 
        lng, 
        animationOptions
    );

    // Manejar eventos
    useMapEvents(mapInstanceRef, eventHandlers);

    return {
        map: mapInstanceRef.current,
        marker: markerRef.current,
        mapInstanceRef,
        markerRef
    };
};

// ============ Funciones auxiliares ============

/**
 * Valida si las coordenadas son válidas
 */
const isValidCoordinates = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && 
           lat >= -90 && lat <= 90 && 
           lng >= -180 && lng <= 180;
};

/**
 * Crea el contenido HTML del popup
 */
const createPopupContent = (lat, lng) => {
    return `
        <div style="text-align: center;">
            <b>📍 Ubicación</b><br/>
            <small>Lat: ${lat.toFixed(6)}</small><br/>
            <small>Lng: ${lng.toFixed(6)}</small>
        </div>
    `;
};