import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, MessageCircle, Book, Users, Star, MapPin } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #4facfe 0%, 
    #00f2fe 25%, 
    #667eea 50%, 
    #764ba2 75%, 
    #43cea2 100%
  );
  position: relative;
  
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
  padding: ${theme.spacing.lg};
  color: white;
  text-align: center;
  position: relative;
  padding-top: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: ${theme.spacing.sm};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(240, 248, 255, 0.9) 50%, 
    rgba(255, 255, 255, 0.85) 100%
  );
  border: 4px solid rgba(255, 255, 255, 0.6);
  margin: 0 auto ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const UserName = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 ${theme.spacing.xs};
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: -0.02em;
`;

const UserLocation = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  padding: 0 ${theme.spacing.lg};
  margin-top: -${theme.spacing.lg};
  position: relative;
  z-index: 5;
  flex: 1;
`;

const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${theme.borderRadius.xl};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
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

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
    color: white;
    box-shadow: 0 4px 15px ${theme.colors.primary}40;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${theme.colors.primary}50;
    }
  ` : `
    background: rgba(255, 255, 255, 0.8);
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary}30;
    
    &:hover {
      background: rgba(255, 255, 255, 0.95);
      border-color: ${theme.colors.primary};
      transform: translateY(-2px);
    }
  `}
`;

const BooksSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${theme.borderRadius.xl};
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const BookCard = styled.div`
  text-align: center;
`;

const BookCover = styled.div`
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-size: cover;
  background-position: center;
`;

const BookTitle = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.text};
  margin: 0;
  font-weight: 500;
  line-height: 1.3;
`;

// Mock data for the user
const mockUserData = {
  user1: {
    id: 'user1',
    name: 'María González',
    location: 'Santiago, Chile',
    avatar: null,
    stats: {
      books: 15,
      exchanges: 8,
      rating: 4.9
    },
    books: [
      { id: '1', title: 'Cien años de soledad', coverImage: null },
      { id: '2', title: 'El amor en los tiempos del cólera', coverImage: null },
      { id: '3', title: 'Rayuela', coverImage: null },
      { id: '4', title: 'Pedro Páramo', coverImage: null },
    ]
  },
  user2: {
    id: 'user2',
    name: 'Carlos Ruiz',
    location: 'Valparaíso, Chile',
    avatar: null,
    stats: {
      books: 23,
      exchanges: 12,
      rating: 4.7
    },
    books: [
      { id: '1', title: 'El nombre del viento', coverImage: null },
      { id: '2', title: 'El temor de un hombre sabio', coverImage: null },
      { id: '3', title: 'Dune', coverImage: null },
    ]
  },
  user3: {
    id: 'user3',
    name: 'Ana López',
    location: 'Concepción, Chile',
    avatar: null,
    stats: {
      books: 19,
      exchanges: 15,
      rating: 4.8
    },
    books: [
      { id: '1', title: 'Sapiens', coverImage: null },
      { id: '2', title: 'Homo Deus', coverImage: null },
      { id: '3', title: '21 lecciones para el siglo XXI', coverImage: null },
    ]
  }
};

const UserProfileScreen: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const user = userId ? mockUserData[userId as keyof typeof mockUserData] : null;

  if (!user) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </BackButton>
          <UserName>Usuario no encontrado</UserName>
        </Header>
      </Container>
    );
  }

  const handleMessage = () => {
    navigate(`/chat/${userId}`);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </BackButton>
        <Avatar>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            user.name.split(' ').map(n => n[0]).join('')
          )}
        </Avatar>
        <UserName>{user.name}</UserName>
        <UserLocation>
          <MapPin size={16} />
          {user.location}
        </UserLocation>
      </Header>

      <Content>
        <StatsCard>
          <StatsGrid>
            <StatItem>
              <StatIcon>
                <Book size={20} />
              </StatIcon>
              <StatNumber>{user.stats.books}</StatNumber>
              <StatLabel>Libros</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Users size={20} />
              </StatIcon>
              <StatNumber>{user.stats.exchanges}</StatNumber>
              <StatLabel>Intercambios</StatLabel>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Star size={20} />
              </StatIcon>
              <StatNumber>{user.stats.rating}</StatNumber>
              <StatLabel>Rating</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsCard>

        <ActionButtons>
          <ActionButton $primary onClick={handleMessage}>
            <MessageCircle size={20} />
            Enviar mensaje
          </ActionButton>
          <ActionButton>
            <Book size={20} />
            Ver libros
          </ActionButton>
        </ActionButtons>

        <BooksSection>
          <SectionTitle>
            <Book size={20} />
            Libros disponibles ({user.books.length})
          </SectionTitle>
          <BooksGrid>
            {user.books.map(book => (
              <BookCard key={book.id}>
                <BookCover style={{ backgroundImage: book.coverImage ? `url(${book.coverImage})` : undefined }}>
                  {!book.coverImage && <Book size={24} />}
                </BookCover>
                <BookTitle>{book.title}</BookTitle>
              </BookCard>
            ))}
          </BooksGrid>
        </BooksSection>
      </Content>
    </Container>
  );
};

export default UserProfileScreen;