import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, X, Star, MapPin, User, Search, ChevronDown } from 'lucide-react';
import { theme } from '../styles/theme.ts';
import { useThemeMode } from '../context/ThemeContext.tsx';

const Container = styled.div<{ $isDark: boolean }>`
  min-height: 100vh;
  background: ${props => props.$isDark ? theme.colors.dark.backgroundGradient : theme.colors.light.backgroundGradient};
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

const Header = styled.div<{ $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  padding: 1rem 1.25rem;
  background: ${props => props.$isDark ? 'linear-gradient(180deg, rgba(12,10,45,0.6), rgba(15,23,42,0.45))' : 'linear-gradient(180deg, rgba(247,243,255,0.9), rgba(248,250,252,0.86))'};
  backdrop-filter: blur(8px);
    border-radius: 16px;
    border: 1px solid ${props => props.$isDark ? 'rgba(130,87,229,0.18)' : 'rgba(124,58,237,0.12)'};
    box-shadow: 0 12px 42px ${props => props.$isDark ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.04)'};
  position: relative;
  z-index: 10;
`;

// SearchBar: más delgada, icono dentro, sombra sutil
const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

const GenreButton = styled.button<{ $isDark: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: ${props => props.$isDark ? 'linear-gradient(90deg, rgba(124,58,237,0.12), rgba(99,102,241,0.06))' : 'linear-gradient(90deg, rgba(245,243,255,1), rgba(255,255,255,1))'};
  border: 1px solid ${props => props.$isDark ? 'rgba(124,58,237,0.14)' : 'rgba(226,232,240,0.6)'};
  box-shadow: 0 8px 24px ${props => props.$isDark ? 'rgba(99,102,241,0.08)' : 'rgba(16,24,40,0.06)'};
  cursor: pointer;
  font-weight: 600;
`;

const GenreMenu = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${props => props.$isDark ? '#0b1220' : 'white'};
  color: ${props => props.$isDark ? '#e6eef8' : 'inherit'};
  border-radius: 10px;
  box-shadow: 0 12px 40px rgba(2,6,23,0.12);
  border: 1px solid ${props => props.$isDark ? 'rgba(255,255,255,0.03)' : 'rgba(17,24,39,0.06)'};
  overflow: hidden;
  z-index: 60;
`;

const SearchInput = styled.input<{ $isDark: boolean }>`
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 3rem;
  border-radius: 999px;
  border: 1px solid ${props => props.$isDark ? 'rgba(255,255,255,0.06)' : 'rgba(17,24,39,0.06)'};
  background: ${props => props.$isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)'};
  color: ${props => props.$isDark ? theme.colors.dark.inputText : theme.colors.light.inputText};
  font-size: 0.95rem;
  box-shadow: 0 6px 18px rgba(16,24,40,0.06);
  transition: all 0.18s ease;

  &::placeholder { color: ${theme.colors.placeholder}; }

  &:focus { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(99,102,241,0.12); outline: none; }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.primary};
  opacity: 0.9;
  pointer-events: none;
`;

/* Genre pills removed by user request */

const SearchHint = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.colors.textSecondary};
  
  h3 {
    color: ${theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;



const SwipeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BookCard = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,252,0.98));
  border-radius: 18px;
  box-shadow: 0 12px 40px rgba(2,6,23,0.10);
  border: 1px solid rgba(17,24,39,0.04);
  width: 100%;
  max-width: 720px;
  overflow: hidden;
  transition: transform 220ms cubic-bezier(.2,.9,.3,1), box-shadow 220ms ease;
  position: relative;

  &:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 50px rgba(13,17,44,0.14); }
`;

const BookImage = styled.div`
  height: 360px;
  background: linear-gradient(135deg, #7C3AED, #667EEA);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  position: relative;
  overflow: hidden;

  /* Textura sutil diagonal */
  &::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.03) 75%, transparent 75%, transparent); background-size: 24px 24px; opacity: 0.7; }
`;

const BookInfo = styled.div`
  padding: 1.5rem 1.5rem 2rem 1.5rem;
`;

const BookTitle = styled.h2`
  color: #0f172a;
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
`;

const BookAuthor = styled.p`
  color: #475569;
  font-size: 0.98rem;
  margin-bottom: 0.9rem;
  font-weight: 600;
`;

const BookDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
`;

const BookTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  background: rgba(124,58,237,0.08);
  color: #6D28D9;
  font-weight: 600;
  font-size: 0.82rem;
  border: 1px solid rgba(124,58,237,0.12);
`;

const BookTagDropdownBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.98);
  border: 1px solid rgba(17,24,39,0.04);
  cursor: pointer;
`;

const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(17,24,39,0.04);
`;

const OwnerAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg,#7C3AED,#667EEA);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
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
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding: 0 1rem 1.25rem 1rem;
`;

const ActionButton = styled.button<{ $variant: 'reject' | 'like' | 'super' }>`
  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
  box-shadow: 0 12px 30px rgba(2,6,23,0.08);
  position: relative;

  background: ${props => props.$variant === 'like' ? 'linear-gradient(135deg,#10B981,#22C55E)' : props.$variant === 'super' ? 'linear-gradient(135deg,#7C3AED,#667EEA)' : 'linear-gradient(135deg,#FF6B6B,#FF4D4D)'};

  &:hover { transform: translateY(-6px) scale(1.05); box-shadow: 0 18px 44px rgba(2,6,23,0.12); }

  svg { width: 22px; height: 22px; }
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
  const { theme: currentTheme } = useThemeMode();
  const isDark = currentTheme === 'dark';
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [books] = useState(mockBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [showGenreMenu, setShowGenreMenu] = useState(false);

  const currentBook = books[currentBookIndex];

  const handleLike = () => {
    console.log('Liked book:', currentBook.title);
    setShowTagMenu(false);
    setCurrentBookIndex(prev => prev + 1);
  };

  const handleReject = () => {
    console.log('Rejected book:', currentBook.title);
    setShowTagMenu(false);
    setCurrentBookIndex(prev => prev + 1);
  };

  return (
    <Container $isDark={isDark}>
      <Header $isDark={isDark}>
        <HeaderTop>
          <SearchContainer style={{ flex: 1 }}>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput 
              $isDark={isDark}
              placeholder="Buscar libros, autores, géneros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          <div style={{ position: 'relative' }}>
            <GenreButton $isDark={isDark} onClick={() => setShowGenreMenu(s => !s)}>
              {selectedGenre}
              <ChevronDown size={14} />
            </GenreButton>
            {showGenreMenu && (
              <GenreMenu $isDark={isDark}>
                {['Todos','Ficción','Fantasía','Historia','Ciencia','Romance'].map(g => (
                  <div key={g} onClick={() => { setSelectedGenre(g); setShowGenreMenu(false); }} style={{ padding: '0.6rem 1rem', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 120ms ease' }} onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(240,240,246,1)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    {g}
                  </div>
                ))}
              </GenreMenu>
            )}
          </div>
        </HeaderTop>
      </Header>

      {searchQuery ? (
        <SearchHint>
          <h3>🔍 Buscando: "{searchQuery}"</h3>
          <p>Estamos buscando libros que coincidan con tu búsqueda. 
          ¡Pronto tendrás resultados personalizados!</p>
        </SearchHint>
      ) : (
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
                <div style={{ position: 'relative' }}>
                  <BookTagDropdownBtn onClick={() => setShowTagMenu(s => !s)}>
                    <span>{currentBook.condition}</span>
                    <ChevronDown size={14} />
                  </BookTagDropdownBtn>
                  {showTagMenu && (
                    <div style={{ position: 'absolute', right: 0, top: '110%', background: 'white', border: '1px solid rgba(17,24,39,0.06)', borderRadius: 8, boxShadow: '0 10px 30px rgba(2,6,23,0.08)', padding: '0.5rem', zIndex: 40 }}>
                      <div style={{ padding: '0.35rem 0.6rem', cursor: 'pointer' }}>Excelente</div>
                      <div style={{ padding: '0.35rem 0.6rem', cursor: 'pointer' }}>Bueno</div>
                      <div style={{ padding: '0.35rem 0.6rem', cursor: 'pointer' }}>Como nuevo</div>
                    </div>
                  )}
                </div>
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
      )}

      {!searchQuery && currentBook && (
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