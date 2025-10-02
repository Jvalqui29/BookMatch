import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, X, Star, MapPin, User } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
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
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  width: 100%;
  max-width: 350px;
  overflow: hidden;
  cursor: grab;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &:active {
    cursor: grabbing;
  }
`;

const BookImage = styled.div`
  height: 300px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
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
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
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
  background: ${props => props.$variant === 'like' ? theme.colors.success : theme.colors.error};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.md};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: scale(0.95);
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