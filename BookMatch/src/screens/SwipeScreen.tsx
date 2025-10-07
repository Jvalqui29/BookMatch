import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, X, Star, MapPin, User } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.backgroundGradient};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 80%, ${theme.colors.primary}08 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${theme.colors.secondary}06 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  background: ${theme.colors.surfaceGlass};
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.borderLight};
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  background: ${theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.75rem;
  font-weight: ${theme.fonts.bold.fontWeight};
  letter-spacing: ${theme.fonts.bold.letterSpacing};
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const SwipeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
`;

const BookCard = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.borderLight};
  width: 100%;
  max-width: 380px;
  overflow: hidden;
  cursor: grab;
  transition: ${theme.transitions.spring};
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${theme.shadows['2xl']};
    border-color: ${theme.colors.primary}40;
  }

  &:active {
    cursor: grabbing;
    transform: translateY(-4px) scale(1.01);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: ${theme.colors.primaryGradient};
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: ${theme.transitions.normal};
  }
  
  &:hover::before {
    opacity: 0.2;
  }
`;

const BookImage = styled.div`
  height: 320px;
  background: ${theme.colors.primaryGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, transparent 35%, rgba(255,255,255,0.05) 50%, transparent 65%);
    background-size: 20px 20px;
  }
`;

const BookInfo = styled.div`
  padding: 1.5rem;
`;

const BookTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const BookAuthor = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const BookDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const BookTag = styled.span`
  background: linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}10);
  color: ${theme.colors.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.pill};
  font-size: 0.85rem;
  font-weight: ${theme.fonts.medium.fontWeight};
  border: 1px solid ${theme.colors.primary}25;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${theme.colors.border};
`;

const OwnerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const OwnerDetails = styled.div`
  flex: 1;
`;

const OwnerName = styled.p`
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0;
`;

const OwnerLocation = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.8rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 0 1rem;
`;

const ActionButton = styled.button<{ $variant: 'reject' | 'like' }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$variant === 'like' 
    ? `linear-gradient(135deg, ${theme.colors.success} 0%, #51CF66 100%)`
    : `linear-gradient(135deg, ${theme.colors.error} 0%, #FF6B6B 100%)`
  };
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${theme.transitions.spring};
  box-shadow: ${theme.shadows.lg};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1) ${props => props.$variant === 'like' ? 'rotate(5deg)' : 'rotate(-5deg)'};
    box-shadow: ${theme.shadows.xl};
  }

  &:active {
    transform: scale(0.95);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    transform: scale(0);
    opacity: 0;
    transition: ${theme.transitions.fast};
  }
  
  &:active::before {
    transform: scale(1);
    opacity: 1;
  }
  
  svg {
    width: 24px;
    height: 24px;
    z-index: 1;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${theme.colors.textSecondary};
  padding: 2rem;
`;

// Mock data
const mockBooks = [
  {
    id: '1',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    genre: 'Realismo mágico',
    condition: 'Excelente',
    coverImage: '📖',
    owner: {
      name: 'María González',
      location: '2.5 km',
      avatar: 'MG'
    }
  },
  {
    id: '2',
    title: 'El nombre del viento',
    author: 'Patrick Rothfuss',
    genre: 'Fantasía',
    condition: 'Bueno',
    coverImage: '📚',
    owner: {
      name: 'Carlos Ruiz',
      location: '1.2 km',
      avatar: 'CR'
    }
  },
  {
    id: '3',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Historia',
    condition: 'Como nuevo',
    coverImage: '📗',
    owner: {
      name: 'Ana López',
      location: '800 m',
      avatar: 'AL'
    }
  }
];

const SwipeScreen: React.FC = () => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [books] = useState(mockBooks);

  const currentBook = books[currentBookIndex];

  const handleLike = () => {
    console.log('Liked book:', currentBook.title);
    setCurrentBookIndex(prev => prev + 1);
  };

  const handleReject = () => {
    console.log('Rejected book:', currentBook.title);
    setCurrentBookIndex(prev => prev + 1);
  };

  return (
    <Container>
      <Header>
        <Title>Descubrir</Title>
        <UserInfo>
          <MapPin size={16} />
          <span>Madrid, España</span>
        </UserInfo>
      </Header>

      <SwipeContainer>
        {currentBook ? (
          <BookCard className="fade-in">
            <BookImage>
              {currentBook.coverImage}
            </BookImage>
            <BookInfo>
              <BookTitle>{currentBook.title}</BookTitle>
              <BookAuthor>por {currentBook.author}</BookAuthor>
              
              <BookDetails>
                <BookTag>{currentBook.genre}</BookTag>
                <BookTag>{currentBook.condition}</BookTag>
              </BookDetails>

              <OwnerInfo>
                <OwnerAvatar>
                  <User size={20} />
                </OwnerAvatar>
                <OwnerDetails>
                  <OwnerName>{currentBook.owner.name}</OwnerName>
                  <OwnerLocation>
                    <MapPin size={12} />
                    {currentBook.owner.location}
                  </OwnerLocation>
                </OwnerDetails>
              </OwnerInfo>
            </BookInfo>
          </BookCard>
        ) : (
          <EmptyState>
            <Star size={48} />
            <h3>¡No hay más libros por ahora!</h3>
            <p>Vuelve más tarde para descubrir nuevos libros</p>
          </EmptyState>
        )}
      </SwipeContainer>

      {currentBook && (
        <ActionButtons>
          <ActionButton $variant="reject" onClick={handleReject}>
            <X size={24} />
          </ActionButton>
          <ActionButton $variant="like" onClick={handleLike}>
            <Heart size={24} />
          </ActionButton>
        </ActionButtons>
      )}
    </Container>
  );
};

export default SwipeScreen;