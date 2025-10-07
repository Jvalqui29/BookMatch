import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
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
  /* estilos para los iconos SVG personalizados */
  .custom-div-icon {
    background: transparent;
  }

  .custom-div-icon svg {
    width: 36px;
    height: 36px;
    display: block;
  }
  .custom-div-icon.user svg { filter: drop-shadow(0 2px 2px rgba(0,0,0,0.15)); }
  .custom-div-icon.book svg { transform: translateY(2px); }
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

// Mock data for nearby users (Chile / Santiago coordinates)
const mockUsers = [
  {
    id: '1',
    name: 'María González',
    location: { lat: -33.4489, lng: -70.6693 }, // Santiago centro
    distance: '2.5 km',
    books: [
      { title: 'Cien años de soledad', author: 'G. García Márquez' },
      { title: 'La sombra del viento', author: 'C. Ruiz Zafón' }
    ]
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    location: { lat: -33.4378, lng: -70.6505 }, // cerca Plaza de Armas
    distance: '1.2 km',
    books: [
      { title: 'El nombre del viento', author: 'P. Rothfuss' },
      { title: 'Sapiens', author: 'Y. N. Harari' }
    ]
  },
  {
    id: '3',
    name: 'Ana López',
    location: { lat: -33.4372, lng: -70.6640 }, // Providencia / Bellas Artes area
    distance: '800 m',
    books: [
      { title: 'Beloved', author: 'T. Morrison' },
      { title: '1984', author: 'G. Orwell' }
    ]
  }
];

const MapScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentLocation, loading } = useLocation();
  // Por defecto centramos en Santiago, Chile
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([-33.4489, -70.6693]);

  useEffect(() => {
    if (currentLocation) {
      setMapCenter([currentLocation.latitude, currentLocation.longitude]);
    }
  }, [currentLocation]);

  // Iconos SVG embebidos (sin depender de un CDN)
  const userSvg = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3" fill="#3182CE" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#3182CE" />
    </svg>
  `;

  const bookSvg = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a1 1 0 0 1-1.5.87L12 16l-6.5 2.87A1 1 0 0 1 4 18V6z" fill="#6B46C1"/>
      <path d="M6 6v10l5-2 5 2V6H6z" fill="#FFFFFF" opacity="0.15"/>
    </svg>
  `;

  const userIcon = L.divIcon({ html: userSvg, className: 'custom-div-icon user', iconSize: [36, 36], iconAnchor: [18, 36] });
  const bookIcon = L.divIcon({ html: bookSvg, className: 'custom-div-icon book', iconSize: [36, 36], iconAnchor: [18, 36] });

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
            <Marker position={[currentLocation.latitude, currentLocation.longitude]} icon={userIcon}>
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
                  <div style={{marginTop: 8, display: 'flex', justifyContent: 'flex-end'}}>
                    <button onClick={() => navigate(`/chat/new?userId=${user.id}`)} style={{background: '#6B46C1', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 8, cursor: 'pointer'}}>Enviar mensaje</button>
                  </div>
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