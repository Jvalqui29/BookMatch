import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Edit, Settings, LogOut, Book, Users, Star, MapPin, Camera } from 'lucide-react';
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
  background: ${theme.colors.primaryGradient};
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg} ${theme.spacing['4xl']};
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  /* Efectos decorativos */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const CoverPhoto = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing.xl};
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

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  backdrop-filter: blur(20px);
  border: 4px solid rgba(255, 255, 255, 0.3);
  font-size: 2.5rem;
  position: relative;
  transition: ${theme.transitions.normal};
  
  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const UserName = styled.h1`
  font-size: 1.75rem;
  font-weight: ${theme.fonts.bold.fontWeight};
  letter-spacing: ${theme.fonts.bold.letterSpacing};
  margin-bottom: ${theme.spacing.sm};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserEmail = styled.p`
  opacity: 0.9;
  font-size: 1.1rem;
  font-weight: ${theme.fonts.medium.fontWeight};
  margin-bottom: ${theme.spacing.xl};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
  margin-top: -${theme.spacing['2xl']};
  position: relative;
  z-index: 5;
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
        <Avatar style={{ backgroundImage: user.avatar ? `url(${user.avatar})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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