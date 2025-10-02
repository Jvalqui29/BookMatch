import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Edit, Settings, LogOut, Book, Users, Star, MapPin, Camera, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.backgroundGradient};
  position: relative;
  
  /* Patrón de fondo decorativo */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 10%, ${theme.colors.primary}06 0%, transparent 50%),
      radial-gradient(circle at 80% 90%, ${theme.colors.secondary}04 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, 
    #4facfe 0%, 
    #00f2fe 25%, 
    #667eea 50%, 
    #764ba2 75%, 
    #43cea2 100%
  );
  padding: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.xl};
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 ${theme.borderRadius['2xl']} ${theme.borderRadius['2xl']};
  
  /* Efectos decorativos más sutiles */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%, 
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
  }
`;

const CoverPhoto = styled.div`
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing.lg};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const CoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${theme.transitions.normal};
  cursor: pointer;
  border-radius: inherit;
  
  &:hover {
    opacity: 1;
  }
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.md};
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  
  svg {
    color: ${theme.colors.primary};
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(240, 248, 255, 0.9) 50%, 
    rgba(255, 255, 255, 0.85) 100%
  );
  border: 3px solid rgba(255, 255, 255, 0.6);
  margin: -40px auto ${theme.spacing.md};
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  overflow: hidden;
  
  /* Mejorar visualización de imágenes de perfil */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 ${theme.spacing.xs};
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: -0.02em;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const EditButton = styled.button`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  font-size: 0.95rem;
  font-weight: ${theme.fonts.medium.fontWeight};
  cursor: pointer;
  transition: ${theme.transitions.spring};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0 auto;
  box-shadow: ${theme.shadows.md};

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: ${theme.shadows.lg};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Content = styled.div`
  padding: 0 ${theme.spacing.lg};
  margin-top: -${theme.spacing.lg};
  position: relative;
  z-index: 5;
  flex: 1;
  background: linear-gradient(180deg, transparent 0%, ${theme.colors.background} 20%);
`;

const StatsCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: ${theme.shadows.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
`;

const MenuCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  margin-bottom: 1.5rem;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  background: white;
  text-align: left;
  border-bottom: 1px solid ${theme.colors.border};
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.colors.background};
  }
`;

const MenuIcon = styled.div<{ $color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.$color || theme.colors.primary}20;
  color: ${props => props.$color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const MenuContent = styled.div`
  flex: 1;
`;

const MenuTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.text};
  margin: 0 0 0.25rem 0;
`;

const MenuSubtitle = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
  margin: 0;
`;

const LogoutButton = styled(MenuItem)`
  color: ${theme.colors.error};
  
  &:hover {
    background: ${theme.colors.error}10;
  }
`;

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Header>
        <CoverPhoto style={{ backgroundImage: user.coverImage ? `url(${user.coverImage})` : undefined }}>
          <CoverOverlay onClick={() => navigate('/profile/edit')}>
            <Edit size={24} />
          </CoverOverlay>
        </CoverPhoto>
        <Avatar style={{ 
          backgroundImage: user.avatar ? `url(${user.avatar})` : undefined, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: user.avatar ? 'transparent' : undefined
        }}>
          {!user.avatar && '👤'}
        </Avatar>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        <EditButton onClick={() => navigate('/profile/edit')}>
          <Edit size={16} />
          Editar perfil
        </EditButton>
      </Header>

      <Content>
        <StatsCard>
          <StatsGrid>
            <StatItem>
              <StatIcon>
                <Book size={20} />
              </StatIcon>
              <StatNumber>{user.booksOwned.length}</StatNumber>
              <StatLabel>Libros</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Users size={20} />
              </StatIcon>
              <StatNumber>12</StatNumber>
              <StatLabel>Intercambios</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Star size={20} />
              </StatIcon>
              <StatNumber>4.8</StatNumber>
              <StatLabel>Rating</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsCard>

        <MenuCard>
          <MenuItem onClick={() => navigate('/profile/edit')}>
            <MenuIcon>
              <Edit size={20} />
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Editar perfil</MenuTitle>
              <MenuSubtitle>Actualiza tu información personal</MenuSubtitle>
            </MenuContent>
          </MenuItem>

          <MenuItem onClick={() => navigate('/profile/books')}>
            <MenuIcon>
              <Book size={20} />
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Mis libros</MenuTitle>
              <MenuSubtitle>Gestiona tu biblioteca personal</MenuSubtitle>
            </MenuContent>
          </MenuItem>

          <MenuItem onClick={() => navigate('/subscription')}>
            <MenuIcon $color={theme.colors.secondary}>
              <Star size={20} />
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Premium</MenuTitle>
              <MenuSubtitle>Accede a funciones exclusivas</MenuSubtitle>
            </MenuContent>
          </MenuItem>

          <MenuItem onClick={() => navigate('/settings')}>
            <MenuIcon $color={theme.colors.info}>
              <Settings size={20} />
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Configuración</MenuTitle>
              <MenuSubtitle>Privacidad y notificaciones</MenuSubtitle>
            </MenuContent>
          </MenuItem>
        </MenuCard>

        <MenuCard>
          <LogoutButton onClick={handleLogout}>
            <MenuIcon $color={theme.colors.error}>
              <LogOut size={20} />
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Cerrar sesión</MenuTitle>
              <MenuSubtitle>Salir de tu cuenta</MenuSubtitle>
            </MenuContent>
          </LogoutButton>
        </MenuCard>
      </Content>
    </Container>
  );
};

export default ProfileScreen;