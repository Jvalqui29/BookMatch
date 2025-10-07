import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationContextType {
  currentLocation: Location | null;
  loading: boolean;
  requestLocationPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<Location | null>;
  updateLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      toast.error('La geolocalización no está soportada por este navegador');
      return false;
    }
    return true;
  };

  const getCurrentLocation = async (): Promise<Location | null> => {
    try {
      setLoading(true);
      
      if (!navigator.geolocation) {
        // Si no hay soporte, usar ubicación por defecto
        const defaultLocation: Location = {
          latitude: -33.4489,
          longitude: -70.6693,
          address: 'Santiago, Chile'
        };
        setCurrentLocation(defaultLocation);
        setLoading(false);
        return defaultLocation;
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            
            setCurrentLocation(location);
            toast.success('Ubicación obtenida correctamente');
            setLoading(false);
            resolve(location);
          },
          (error) => {
            console.error('Error getting location:', error);
            let errorMessage = 'Usando ubicación por defecto';
            
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Permisos denegados - Usando ubicación por defecto';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Ubicación no disponible - Usando ubicación por defecto';
                break;
              case error.TIMEOUT:
                errorMessage = 'Tiempo agotado - Usando ubicación por defecto';
                break;
            }
            
            toast.error(errorMessage);
            
            // Usar ubicación por defecto
            const defaultLocation: Location = {
              latitude: -33.4489,
              longitude: -70.6693,
              address: 'Santiago, Chile'
            };
            
            setCurrentLocation(defaultLocation);
            setLoading(false);
            resolve(defaultLocation);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutos
          }
        );
      });
    } catch (error) {
      console.error('Location error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = (location: Location) => {
    setCurrentLocation(location);
  };

  useEffect(() => {
    // NO pedir ubicación automáticamente para evitar problemas
    // Establecer ubicación por defecto inmediatamente
    const defaultLocation: Location = {
      latitude: -33.4489,
      longitude: -70.6693,
      address: 'Santiago, Chile'
    };
    setCurrentLocation(defaultLocation);
    setLoading(false);
  }, []);

  const value: LocationContextType = {
    currentLocation,
    loading,
    requestLocationPermission,
    getCurrentLocation,
    updateLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

