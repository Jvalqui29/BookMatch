import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { User, Book, MapPin } from 'lucide-react';
import { useLocation } from '../context/LocationContext.tsx';
import { theme } from '../styles/theme.ts';
import 'leaflet/dist/leaflet.css';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: white;
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const MapWrapper = styled.div`
  flex: 1;
  position: relative;
  
  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
  color: ${theme.colors.textSecondary};
`;

const PopupContent = styled.div`
  padding: 0.5rem;
  min-width: 200px;
`;

const UserName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${theme.colors.text};
  font-size: 1rem;
`;

const UserInfo = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${theme.colors.textSecondary};
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const BooksList = styled.div`
  margin-top: 0.5rem;
`;

const BookItem = styled.div`
  background: ${theme.colors.background};
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
`;

// Mock data for nearby users
const mockUsers = [
  {
    id: '1',
    name: 'María González',
    location: { lat: 40.4168, lng: -3.7038 }, // Madrid centro
    distance: '2.5 km',
    books: [
      { title: 'Cien años de soledad', author: 'G. García Márquez' },
      { title: 'La sombra del viento', author: 'C. Ruiz Zafón' }
    ]
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    location: { lat: 40.4200, lng: -3.7100 },
    distance: '1.2 km',
    books: [
      { title: 'El nombre del viento', author: 'P. Rothfuss' },
      { title: 'Sapiens', author: 'Y. N. Harari' }
    ]
  },
  {
    id: '3',
    name: 'Ana López',
    location: { lat: 40.4150, lng: -3.7000 },
    distance: '800 m',
    books: [
      { title: 'Beloved', author: 'T. Morrison' },
      { title: '1984', author: 'G. Orwell' }
    ]
  }
];

const MapScreen: React.FC = () => {
  const { currentLocation, loading } = useLocation();
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([-33.4489, -70.6693]); // Santiago por defecto

  const bookIcon = new Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4d6.png',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -24]
  });

  useEffect(() => {
    if (currentLocation) {
      setMapCenter([currentLocation.latitude, currentLocation.longitude]);
    }
  }, [currentLocation]);

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Mapa</Title>
        </Header>
        <LoadingContainer>
          <div>Cargando ubicación...</div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Lectores Cercanos</Title>
        <LocationInfo>
          <MapPin size={16} />
          <span>{currentLocation?.address || 'Santiago, Chile'}</span>
        </LocationInfo>
      </Header>

      <MapWrapper>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Marcador del usuario actual */}
          {currentLocation && (
            <Marker position={[currentLocation.latitude, currentLocation.longitude]} icon={bookIcon}>
              <Popup>
                <PopupContent>
                  <UserName>Tu ubicación</UserName>
                  <UserInfo>
                    <MapPin size={12} />
                    {currentLocation.address || 'Ubicación actual'}
                  </UserInfo>
                </PopupContent>
              </Popup>
            </Marker>
          )}

          {/* Marcadores de otros usuarios */}
          {mockUsers.map((user) => (
            <Marker key={user.id} position={[user.location.lat, user.location.lng]} icon={bookIcon}>
              <Popup>
                <PopupContent>
                  <UserName>{user.name}</UserName>
                  <UserInfo>
                    <User size={12} />
                    {user.distance} de distancia
                  </UserInfo>
                  <UserInfo>
                    <Book size={12} />
                    {user.books.length} libros disponibles
                  </UserInfo>
                  <BooksList>
                    {user.books.map((book, index) => (
                      <BookItem key={index}>
                        <strong>{book.title}</strong> - {book.author}
                      </BookItem>
                    ))}
                  </BooksList>
                </PopupContent>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapWrapper>
    </Container>
  );
};

export default MapScreen;