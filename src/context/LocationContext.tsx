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
      
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        return null;
      }

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            
            setCurrentLocation(location);
            toast.success('Ubicación obtenida correctamente');
            resolve(location);
          },
          (error) => {
            console.error('Error getting location:', error);
            let errorMessage = 'No se pudo obtener tu ubicación actual';
            
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Permisos de ubicación denegados';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Información de ubicación no disponible';
                break;
              case error.TIMEOUT:
                errorMessage = 'Tiempo de espera agotado al obtener ubicación';
                break;
            }
            
            toast.error(errorMessage);
            
            // Usar ubicación por defecto (Madrid, España) para desarrollo
            const defaultLocation: Location = {
              latitude: 40.4168,
              longitude: -3.7038,
              address: 'Madrid, España'
            };
            
            setCurrentLocation(defaultLocation);
            resolve(defaultLocation);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
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
    // Obtener ubicación inicial al cargar la app
    getCurrentLocation();
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

