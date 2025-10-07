import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Edit, Settings, LogOut, Book, Users, Star, MapPin, Camera, User, Crown } from 'lucide-react';
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
    rgba(15, 23, 42, 0.98) 0%,
    rgba(30, 41, 59, 0.95) 50%,
    rgba(51, 65, 85, 0.97) 100%
  );
  backdrop-filter: blur(20px);
  padding: 2rem 1.5rem 3rem;
  color: white;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 24px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Efecto de cristal esmerilado */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
  
  /* Partículas flotantes sutiles */
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    right: 15%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }
`;

const TopBar = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 20;
`;

const IconBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 100%
  );
  border: 4px solid rgba(255, 255, 255, 0.8);
  margin: 0 auto 1.5rem;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.6);
  }
  
  /* Mejorar visualización de imágenes de perfil */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  /* Icono por defecto más elegante */
  svg {
    color: #64748b;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
  }
`;

const UserName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.025em;
  text-align: center;
  font-family: 'Merriweather', serif;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.5rem;
  font-weight: 400;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
  opacity: 0.8;
`;

const BadgesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Badge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.$color}20;
  color: ${props => props.$color};
  border: 1px solid ${props => props.$color}40;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  backdrop-filter: blur(8px);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: ${props => props.$active ? theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : theme.colors.textSecondary};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$active ? theme.colors.primary : theme.colors.background};
  }
`;

const StatsCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
`;

const ChartRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MiniCard = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
`;

const Bar = styled.div<{ value: number; color: string }>`
  height: 8px;
  background: ${theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => Math.max(0, Math.min(100, props.value))}%;
    background: ${props => props.color};
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const GenrePill = styled.span`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: 999px;
  padding: 0.35rem 0.6rem;
  font-size: 0.8rem;
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const BadgeCard = styled.div`
  background: white;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const MenuCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tab, setTab] = React.useState<'resumen' | 'actividad' | 'resenas'>('resumen');

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
        <TopBar>
          <IconBtn onClick={() => navigate('/settings')}>
            <Settings size={18} />
          </IconBtn>
        </TopBar>
        
        <Avatar style={{ 
          backgroundImage: user.avatar ? `url(${user.avatar})` : undefined, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: user.avatar ? 'transparent' : undefined
        }}>
          {!user.avatar && <User size={48} />}
        </Avatar>
        
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        
        <BadgesRow>
          {user.isPremium && (
            <Badge $color={'#fbbf24'}>
              <Crown size={14} /> Premium
            </Badge>
          )}
          {user.location && (
            <Badge $color={'#3b82f6'}>
              <MapPin size={14} /> {user.location.address || 'Mi ciudad'}
            </Badge>
          )}
          <Badge $color={'#10b981'}>
            <Star size={14} /> {user.ratingAverage || 4.8}
          </Badge>
        </BadgesRow>
        
        <ActionButtons>
          <ActionButton onClick={() => navigate('/profile/edit')}>
            <Edit size={16} />
            Editar
          </ActionButton>
          <ActionButton onClick={() => navigate('/my-books')}>
            <Book size={16} />
            Mis libros
          </ActionButton>
        </ActionButtons>
      </Header>

      <Content>
        <Tabs>
          <TabBtn $active={tab === 'resumen'} onClick={() => setTab('resumen')}>Resumen</TabBtn>
          <TabBtn $active={tab === 'actividad'} onClick={() => setTab('actividad')}>Actividad</TabBtn>
          <TabBtn $active={tab === 'resenas'} onClick={() => setTab('resenas')}>Reseñas</TabBtn>
        </Tabs>

        {tab === 'resumen' && (
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
              <StatNumber>{user.ratingAverage ?? 4.8}</StatNumber>
              <StatLabel>Rating</StatLabel>
            </StatItem>
          </StatsGrid>
          
          <ChartRow>
            <MiniCard>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Progreso de lectura</h4>
              <Bar value={Math.min(100, Math.round((user.booksOwned.filter(b => (b.progress ?? 0) === 100).length / Math.max(1, user.booksOwned.length)) * 100))} color={'linear-gradient(90deg,#10B981,#22D3EE)'} />
              <p style={{ margin: '0.75rem 0 0 0', color: theme.colors.textSecondary, fontSize: '0.9rem' }}>
                📚 Completados: {user.booksOwned.filter(b => (b.progress ?? 0) === 100).length} de {user.booksOwned.length} libros
              </p>
            </MiniCard>
          </ChartRow>
          
          <ChartRow>
            <MiniCard>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Géneros favoritos</h4>
              <GenreGrid>
                {(user.favoriteGenres || ['Ficción', 'Romance', 'Misterio', 'Ciencia', 'Historia', 'Biografía']).slice(0,6).map((g) => (
                  <GenrePill key={g}>{g}</GenrePill>
                ))}
              </GenreGrid>
            </MiniCard>
            <MiniCard>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Logros recientes</h4>
              <BadgesGrid>
                <BadgeCard>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.textSecondary, fontWeight: '500' }}>Primer intercambio</div>
                </BadgeCard>
                <BadgeCard>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</div>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.textSecondary, fontWeight: '500' }}>10 libros leídos</div>
                </BadgeCard>
                <BadgeCard>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.textSecondary, fontWeight: '500' }}>Rating 4.5+</div>
                </BadgeCard>
              </BadgesGrid>
            </MiniCard>
          </ChartRow>
        </StatsCard>
        )}

        {tab === 'actividad' && (
          <MenuCard>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Actividad reciente</h3>
              <p style={{ margin: 0, color: theme.colors.textSecondary }}>Aquí verás tus últimos intercambios y avances.</p>
            </div>
          </MenuCard>
        )}

        {tab === 'resenas' && (
          <MenuCard>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Reseñas y valoraciones</h3>
              <p style={{ margin: 0, color: theme.colors.textSecondary }}>Aquí verás las reseñas de otros usuarios.</p>
            </div>
          </MenuCard>
        )}
      </Content>
    </Container>
  );
};

export default ProfileScreen;