import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Edit, Settings, LogOut, Book, Users, Star, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const Header = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  padding: 2rem 1rem 4rem;
  color: white;
  text-align: center;
  position: relative;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  font-size: 2rem;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  opacity: 0.9;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const EditButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  padding: 0 1rem;
  margin-top: -2rem;
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
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.$color || theme.colors.primary}20;
  color: ${props => props.$color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
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
        <Avatar>
          👤
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

          <MenuItem>
            <MenuIcon>
              <Book size={20} />
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Mis libros</MenuTitle>
              <MenuSubtitle>Gestiona tu biblioteca personal</MenuSubtitle>
            </MenuContent>
          </MenuItem>

          <MenuItem>
            <MenuIcon $color={theme.colors.secondary}>
              <Star size={20} />
            </MenuIcon>
            <MenuContent>
              <MenuTitle>Premium</MenuTitle>
              <MenuSubtitle>Accede a funciones exclusivas</MenuSubtitle>
            </MenuContent>
          </MenuItem>

          <MenuItem>
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