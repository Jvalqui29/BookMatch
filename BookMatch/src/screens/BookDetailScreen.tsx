import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Heart, MessageCircle, User, MapPin, Star } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const Header = styled.div`
  background: white;
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.sm};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.primary}20;
  }
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 1.3rem;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 1.5rem 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const BookCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  margin-bottom: 1.5rem;
`;

const BookImage = styled.div`
  height: 300px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryLight} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 5rem;
`;

const BookInfo = styled.div`
  padding: 1.5rem;
`;

const BookTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const BookAuthor = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const BookDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const BookTag = styled.span`
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
`;

const Description = styled.p`
  color: ${theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const OwnerCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: ${theme.shadows.sm};
`;

const OwnerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const OwnerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const OwnerInfo = styled.div`
  flex: 1;
`;

const OwnerName = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

const OwnerMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: ${theme.colors.textSecondary};
`;

const OwnerMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${theme.colors.warning};
  font-weight: 500;
`;

const OwnerBio = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 1rem 2rem;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${props => props.$variant === 'primary' ? `
    background: ${theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  ` : `
    background: white;
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primary}10;
      transform: translateY(-2px);
    }
  `}
`;

// Mock data
const mockBook = {
  id: '1',
  title: 'Cien años de soledad',
  author: 'Gabriel García Márquez',
  genre: 'Realismo mágico',
  condition: 'Excelente',
  coverImage: '📖',
  description: 'Una obra maestra que narra la historia de la familia Buendía a lo largo de cien años en el pueblo ficticio de Macondo. Una lectura imprescindible de la literatura latinoamericana.',
  owner: {
    id: '1',
    name: 'María González',
    location: '2.5 km',
    avatar: 'MG',
    rating: 4.8,
    exchangeCount: 12,
    bio: 'Apasionada lectora de literatura latinoamericana y clásicos universales. Me encanta descubrir nuevas historias.'
  }
};

const BookDetailScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate(`/chat/${mockBook.owner.id}`);
  };

  const handleLike = () => {
    console.log('Book liked:', mockBook.title);
    // Aquí se implementaría la lógica de like
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Detalles del Libro</Title>
      </Header>

      <Content>
        <BookCard>
          <BookImage>
            {mockBook.coverImage}
          </BookImage>
          <BookInfo>
            <BookTitle>{mockBook.title}</BookTitle>
            <BookAuthor>por {mockBook.author}</BookAuthor>
            
            <BookDetails>
              <BookTag>{mockBook.genre}</BookTag>
              <BookTag>{mockBook.condition}</BookTag>
            </BookDetails>

            <Description>
              {mockBook.description}
            </Description>
          </BookInfo>
        </BookCard>

        <OwnerCard>
          <OwnerHeader>
            <OwnerAvatar>
              <User size={24} />
            </OwnerAvatar>
            <OwnerInfo>
              <OwnerName>{mockBook.owner.name}</OwnerName>
              <OwnerMeta>
                <OwnerMetaItem>
                  <MapPin size={12} />
                  {mockBook.owner.location}
                </OwnerMetaItem>
                <Rating>
                  <Star size={12} fill="currentColor" />
                  {mockBook.owner.rating}
                </Rating>
                <OwnerMetaItem>
                  {mockBook.owner.exchangeCount} intercambios
                </OwnerMetaItem>
              </OwnerMeta>
            </OwnerInfo>
          </OwnerHeader>
          <OwnerBio>{mockBook.owner.bio}</OwnerBio>
        </OwnerCard>
      </Content>

      <ActionButtons>
        <ActionButton $variant="secondary" onClick={handleLike}>
          <Heart size={20} />
          Me gusta
        </ActionButton>
        <ActionButton $variant="primary" onClick={handleContact}>
          <MessageCircle size={20} />
          Contactar
        </ActionButton>
      </ActionButtons>
    </Container>
  );
};

export default BookDetailScreen;