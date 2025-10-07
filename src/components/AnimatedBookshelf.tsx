import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
}

interface AnimatedBookshelfProps {
  books: Book[];
  maxBooksPerShelf?: number;
}

const slideIn = keyframes`
  0% {
    transform: translateY(20px) rotateX(-15deg) scale(0.9);
    opacity: 0;
  }
  50% {
    transform: translateY(-5px) rotateX(5deg) scale(1.02);
  }
  100% {
    transform: translateY(0) rotateX(0deg) scale(1);
    opacity: 1;
  }
`;

const bookSway = keyframes`
  0%, 100% { transform: translateY(0px) rotateZ(0deg); }
  25% { transform: translateY(-1px) rotateZ(0.5deg); }
  75% { transform: translateY(1px) rotateZ(-0.3deg); }
`;

const shelfCreak = keyframes`
  0%, 100% { 
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
    transform: translateY(0px);
  }
  50% { 
    box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
    transform: translateY(1px);
  }
`;

const dustParticle = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  50% { 
    opacity: 0.6;
    transform: translateY(-20px) translateX(10px) rotate(180deg);
  }
  100% { 
    opacity: 0;
    transform: translateY(-40px) translateX(-5px) rotate(360deg);
  }
`;

const BookshelfContainer = styled.div`
  margin: 2rem 0;
  padding: 3rem 2rem;
  /* Fondo general del contenedor ligeramente más claro para que los estantes destaquen */
  background: linear-gradient(180deg, 
      rgba(28, 28, 46, 0.98) 0%,
      rgba(22, 20, 40, 0.95) 30%,
      rgba(32, 26, 50, 0.97) 70%,
      rgba(22, 20, 40, 0.95) 100%
    );
  border-radius: 15px;
  border: 3px solid rgba(139, 69, 19, 0.3);
  position: relative;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 20px rgba(101, 67, 33, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.08) 0%, transparent 40%);
    border-radius: 20px;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(139, 69, 19, 0.3) 20%, 
      rgba(139, 69, 19, 0.1) 50%, 
      rgba(139, 69, 19, 0.3) 80%, 
      transparent 100%);
    border-radius: 2px;
  }
`;

const ShelfTitle = styled.h3`
  font-family: 'Merriweather', 'Georgia', serif;
  font-size: 1.6rem;
  color: #f4f1e8;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 400;
  font-style: italic;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
  position: relative;
  
  &::before, &::after {
    content: '📚';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    opacity: 0.7;
  }
  
  &::before {
    left: -3rem;
  }
  
  &::after {
    right: -3rem;
  }
`;

const Shelf = styled.div`
  position: relative;
  margin-bottom: 3rem;
  padding: 0 1.5rem;
  perspective: 1000px;
`;

const ShelfBoard = styled.div`
  width: 100%;
  height: 12px;
  /* Estante de madera más claro y menos contrastado */
  background: 
    repeating-linear-gradient(90deg,
      #A9745B 0px,
      #C08966 2px,
      #8F5B3A 4px,
      #A9745B 6px
    ),
    linear-gradient(135deg, #B07A52 0%, #C08966 30%, #9B6B44 70%, #B07A52 100%);
  border-radius: 6px;
  box-shadow: 
    0 4px 12px rgba(139, 69, 19, 0.25),
    inset 0 2px 0 rgba(255, 255, 255, 0.1),
    inset 0 -2px 0 rgba(0, 0, 0, 0.3),
    inset 2px 0 0 rgba(0, 0, 0, 0.2),
    inset -2px 0 0 rgba(0, 0, 0, 0.2);
  animation: ${shelfCreak} 8s ease-in-out infinite;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(135deg, #654321 0%, #8B4513 50%, #A0522D 100%);
    border-radius: 4px 4px 0 0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 5%;
    right: 5%;
    height: 3px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    filter: blur(2px);
  }
`;

const BooksRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0; /* Sin espacios entre libros */
  margin-bottom: 20px;
  min-height: 220px; /* Más alto para libros más grandes */
  padding: 0 10px;
  position: relative;
  justify-content: flex-start;
  
  /* Estante de madera realista */
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 12px;
    /* Pequeño listón de madera menos saturado */
    background: linear-gradient(180deg, 
        rgba(145, 102, 76, 0.95) 0%,
        rgba(184, 116, 86, 0.95) 20%,
        rgba(199, 137, 99, 0.85) 60%,
        rgba(145, 102, 76, 0.8) 100%
      );
    border-radius: 0 0 6px 6px;
    box-shadow: 
      0 3px 8px rgba(0, 0, 0, 0.35),
      inset 0 2px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  }
  
  /* Sombra proyectada por los libros */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
    height: 4px;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(0, 0, 0, 0.3) 5%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.3) 95%,
      transparent 100%
    );
    border-radius: 2px;
    filter: blur(1px);
  }
`;

/* Capa para ocultar etiquetas verticales a la izquierda (defensiva) */
const LeftGuard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 110px; /* cubrir completamente la columna izquierda */
  height: 100%;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(22,20,40,0.995) 0%, rgba(22,20,40,0.95) 30%, transparent 100%);
  z-index: 1000; /* asegurarse de que esté por encima de los estantes */
`;

/* Overlay de hover para mostrar info del libro */
const HoverOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(10,10,20,0.95), rgba(20,16,40,0.85));
  color: #E6EEF8;
  padding: 8px 10px;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.6);
  min-width: 160px;
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: 20;
`;

const BookSpine = styled.div<{ 
  width: string; 
  height: string; 
  color: string;
  delay: string;
  title: string;
  author: string;
  wear: number;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => props.color};
  border-radius: 0;
  box-shadow: 
    0 2px 8px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.${props => Math.floor(props.wear * 8 + 5)}),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${slideIn} 1s ease-out ${props => props.delay} both,
             ${bookSway} ${props => 15 + (props.wear * 5)}s ease-in-out infinite;
  transform-style: preserve-3d;
  
  /* Línea sutil de separación solo en el borde derecho */
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, 
      rgba(0,0,0,0.3) 0%, 
      rgba(0,0,0,0.1) 50%, 
      rgba(0,0,0,0.3) 100%);
    opacity: 0.4;
  }
  
  /* Título dorado/plateado en el lomo */
  &::after {
    content: '${props => props.title}';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) rotate(-90deg);
    transform-origin: center;
    font-size: ${props => parseInt(props.width) > 25 ? '10px' : parseInt(props.width) > 20 ? '9px' : '8px'};
    font-weight: 600;
    color: ${props => props.wear > 0.6 ? 'rgba(255,215,0,0.9)' : 'rgba(255,255,255,0.95)'};
    text-shadow: 
      1px 1px 2px rgba(0,0,0,0.9),
      0 0 4px rgba(0,0,0,0.7),
      ${props => props.wear > 0.6 ? '0 0 6px rgba(255,215,0,0.3)' : '0 0 3px rgba(255,255,255,0.2)'};
    font-family: 'Merriweather', serif;
    white-space: nowrap;
    letter-spacing: 0.4px;
    max-width: calc(${props => props.height} - 40px);
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.1;
    text-transform: ${props => props.wear > 0.7 ? 'uppercase' : 'none'};
  }
  
  &:hover {
    transform: translateY(-8px) translateZ(10px) rotateY(8deg) scale(1.04);
    box-shadow: 
      0 15px 35px rgba(0,0,0,0.7),
      inset 0 2px 0 rgba(255,255,255,0.25),
      0 0 15px rgba(255,255,255,0.1);
    z-index: 10;
    border-radius: 2px 4px 4px 2px;
  }

  &:hover + .hover-overlay, &:hover ~ .hover-overlay {
    opacity: 1;
    transform: translateX(-50%) translateY(-6px);
    pointer-events: auto;
  }
  
  /* Detalles de desgaste para libros antiguos */
  ${props => props.wear > 0.7 && `
    &::before {
      background: linear-gradient(180deg, 
        rgba(139, 69, 19, 0.4) 0%, 
        rgba(0,0,0,0.5) 30%, 
        rgba(160, 82, 45, 0.3) 50%,
        rgba(0,0,0,0.6) 70%,
        rgba(101, 67, 33, 0.5) 100%);
      box-shadow: 
        inset 1px 0 0 rgba(255,255,255,0.05),
        1px 0 3px rgba(0,0,0,0.4);
    }
  `}
  
  /* Acabado metálico para títulos en relieve */
  ${props => props.wear > 0.5 && `
    &::after {
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255,215,0,0.1) 20%, 
        rgba(255,215,0,0.2) 50%, 
        rgba(255,215,0,0.1) 80%, 
        transparent 100%);
      -webkit-background-clip: text;
      background-clip: text;
    }
  `}
`;

const BookDetail = styled.div<{ 
  top: string; 
  left: string; 
  size: string;
  color: string;
}>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: 2px;
  background: ${props => props.color};
  border-radius: 1px;
  opacity: 0.7;
`;

const AuthorLabel = styled.div<{ 
  bottom: string; 
  left: string; 
  width: string;
  author: string;
}>`
  position: absolute;
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  width: ${props => props.width};
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
  transform-origin: center;
  
  &::after {
    content: '${props => props.author.length > 15 ? props.author.substring(0, 15) + '...' : props.author}';
    font-size: 7px;
    font-weight: 400;
    color: rgba(255,255,255,0.8);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    font-family: 'Merriweather', serif;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }
`;

const EmptySlot = styled.div<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 2px dashed rgba(139, 69, 19, 0.3);
  border-radius: 3px 6px 6px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(139, 69, 19, 0.5);
  font-size: 20px;
  transition: all 0.3s ease;
  background: 
    repeating-linear-gradient(90deg,
      transparent 0px,
      transparent 2px,
      rgba(139, 69, 19, 0.05) 2px,
      rgba(139, 69, 19, 0.05) 4px
    );
  position: relative;
  
  &::before {
    content: '📖';
    position: absolute;
    font-size: 16px;
    opacity: 0.4;
  }
  
  &:hover {
    border-color: rgba(139, 69, 19, 0.6);
    background: rgba(139, 69, 19, 0.1);
    color: rgba(139, 69, 19, 0.8);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
  }
`;

const LibraryAmbiance = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 3px;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    box-shadow: 
      15px 10px 0 rgba(255, 255, 255, 0.2),
      30px 25px 0 rgba(255, 255, 255, 0.1),
      45px 5px 0 rgba(255, 255, 255, 0.15),
      60px 35px 0 rgba(255, 255, 255, 0.1);
    animation: ${dustParticle} 12s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 60%;
    right: 15%;
    width: 2px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    box-shadow: 
      -20px -15px 0 rgba(255, 255, 255, 0.1),
      -35px 10px 0 rgba(255, 255, 255, 0.15),
      -50px -5px 0 rgba(255, 255, 255, 0.1);
    animation: ${dustParticle} 15s ease-in-out infinite reverse;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`;

const Stat = styled.div`
  text-align: center;
  color: #ffffff;
  
  .number {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: #A78BFA;
  }
  
  .label {
    font-size: 0.85rem;
    opacity: 0.8;
    font-family: 'Merriweather', serif;
  }
`;

const generateBookColor = (category: string, index: number) => {
  // Colores inspirados en libros reales de biblioteca clásica
  const classicBookColors = [
    // Cueros marrones y rojizos
    'linear-gradient(135deg, #8B4513 0%, #654321 50%, #4A2C17 100%)',
    'linear-gradient(135deg, #A0522D 0%, #8B4513 50%, #654321 100%)',
    'linear-gradient(135deg, #CD853F 0%, #A0522D 50%, #8B4513 100%)',
    
    // Azules profundos y navy
    'linear-gradient(135deg, #191970 0%, #0F0F2D 50%, #000080 100%)',
    'linear-gradient(135deg, #4682B4 0%, #2F4F4F 50%, #1C3A3A 100%)',
    'linear-gradient(135deg, #483D8B 0%, #2E2759 50%, #1A1A3A 100%)',
    
    // Verdes clásicos
    'linear-gradient(135deg, #228B22 0%, #006400 50%, #004500 100%)',
    'linear-gradient(135deg, #556B2F 0%, #35441E 50%, #2A3318 100%)',
    'linear-gradient(135deg, #2E8B57 0%, #1F5F3F 50%, #15402A 100%)',
    
    // Rojos y borgoña
    'linear-gradient(135deg, #8B0000 0%, #5D0000 50%, #400000 100%)',
    'linear-gradient(135deg, #DC143C 0%, #8B0000 50%, #600000 100%)',
    'linear-gradient(135deg, #B22222 0%, #8B0000 50%, #5D0000 100%)',
    
    // Dorados y ocres
    'linear-gradient(135deg, #DAA520 0%, #B8860B 50%, #8B6914 100%)',
    'linear-gradient(135deg, #CD853F 0%, #A0522D 50%, #8B4513 100%)',
    'linear-gradient(135deg, #F4A460 0%, #DEB887 50%, #CD853F 100%)',
    
    // Grises y negros elegantes
    'linear-gradient(135deg, #2F2F2F 0%, #1A1A1A 50%, #0D0D0D 100%)',
    'linear-gradient(135deg, #696969 0%, #454545 50%, #2D2D2D 100%)',
    'linear-gradient(135deg, #708090 0%, #4F5A65 50%, #36434F 100%)',
    
    // Púrpuras y violetas
    'linear-gradient(135deg, #4B0082 0%, #2E0047 50%, #1A0029 100%)',
    'linear-gradient(135deg, #8B008B 0%, #5D005D 50%, #3D003D 100%)',
    
    // Marrones chocolates
    'linear-gradient(135deg, #654321 0%, #4A2C17 50%, #2E1A0E 100%)',
    'linear-gradient(135deg, #8B7355 0%, #5D4D37 50%, #3C3322 100%)',
    
    // Azul-verdes
    'linear-gradient(135deg, #2F4F4F 0%, #1C2E2E 50%, #0F1818 100%)',
    'linear-gradient(135deg, #5F9EA0 0%, #4682B4 50%, #2F4F4F 100%)',
  ];
  
  // Colores especiales por categoría para mayor realismo
  const categorySpecific = {
    fiction: [
      'linear-gradient(135deg, #8B4513 0%, #654321 50%, #4A2C17 100%)', // Marrón cuero
      'linear-gradient(135deg, #191970 0%, #0F0F2D 50%, #000080 100%)', // Azul marino
      'linear-gradient(135deg, #8B0000 0%, #5D0000 50%, #400000 100%)', // Rojo profundo
    ],
    'non-fiction': [
      'linear-gradient(135deg, #2F4F4F 0%, #1C2E2E 50%, #0F1818 100%)', // Verde oscuro
      'linear-gradient(135deg, #4682B4 0%, #2F4F4F 50%, #1C3A3A 100%)', // Azul acero
      'linear-gradient(135deg, #654321 0%, #4A2C17 50%, #2E1A0E 100%)', // Marrón tierra
    ],
    science: [
      'linear-gradient(135deg, #4682B4 0%, #2F4F4F 50%, #1C3A3A 100%)', // Azul científico
      'linear-gradient(135deg, #708090 0%, #4F5A65 50%, #36434F 100%)', // Gris metálico
      'linear-gradient(135deg, #2F4F4F 0%, #1C2E2E 50%, #0F1818 100%)', // Verde tecnológico
    ],
    default: classicBookColors
  };
  
  const colors = categorySpecific[category as keyof typeof categorySpecific] || classicBookColors;
  return colors[index % colors.length];
};

const generateBookDimensions = (title: string, index: number) => {
  const baseWidth = 30;  // ligeramente más delgado
  const baseHeight = 150; // ligeramente más bajo
  
  // Variación más realista basada en el título y tipo de libro
  const titleLength = title.length;
  const widthVariation = (titleLength % 6) * 4 + (index % 3) * 3;
  const heightVariation = (index % 5) * 15 + (titleLength % 4) * 10;
  
  return {
    width: `${Math.max(28, baseWidth + widthVariation)}px`,
    height: `${Math.max(160, baseHeight + heightVariation)}px`
  };
};

const generateBookWear = (index: number) => {
  // Simula el desgaste aleatorio de los libros
  const seed = (index * 7 + 13) % 100;
  return seed / 100;
};

const AnimatedBookshelf: React.FC<AnimatedBookshelfProps> = ({ 
  books, 
  maxBooksPerShelf = 15  // Más libros por estante para mayor realismo
}) => {
  const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    setVisibleBooks([]);
    books.forEach((book, index) => {
      setTimeout(() => {
        setVisibleBooks(prev => [...prev, book]);
      }, index * 200);
    });
  }, [books]);

  const shelves = [];
  for (let i = 0; i < Math.ceil(books.length / maxBooksPerShelf); i++) {
    const shelfBooks = books.slice(i * maxBooksPerShelf, (i + 1) * maxBooksPerShelf);
    const visibleShelfBooks = visibleBooks.slice(i * maxBooksPerShelf, (i + 1) * maxBooksPerShelf);
    shelves.push({ books: shelfBooks, visibleBooks: visibleShelfBooks });
  }

  // Asegurar al menos un estante
  if (shelves.length === 0) {
    shelves.push({ books: [], visibleBooks: [] });
  }

  return (
    <BookshelfContainer>
      <LeftGuard />
      <LibraryAmbiance />
      <ShelfTitle>Mi Biblioteca Personal</ShelfTitle>
      
      {shelves.map((shelf, shelfIndex) => (
        <Shelf key={shelfIndex}>
          <BooksRow>
            {shelf.visibleBooks.map((book, bookIndex) => {
              const dimensions = generateBookDimensions(book.title, bookIndex);
              const color = generateBookColor(book.category, bookIndex);
              const wear = generateBookWear(shelfIndex * maxBooksPerShelf + bookIndex);
              const delay = `${(shelfIndex * maxBooksPerShelf + bookIndex) * 0.3}s`;
              
              return (
                <div key={book.id} style={{position: 'relative'}}>
                <BookSpine
                  key={book.id}
                  width={dimensions.width}
                  height={dimensions.height}
                  color={color}
                  delay={delay}
                  wear={wear}
                  title={book.title.length > 15 ? book.title.substring(0, 15) + '...' : book.title}
                  author={book.author}
                >
                  <AuthorLabel
                    bottom="10px"
                    left="50%"
                    width={`calc(${dimensions.height} - 40px)`}
                    author={book.author}
                  />
                  {wear > 0.6 && (
                    <BookDetail
                      top="20%"
                      left="2px"
                      size="8px"
                      color="rgba(139, 69, 19, 0.3)"
                    />
                  )}
                  {wear > 0.8 && (
                    <BookDetail
                      top="60%"
                      left="1px"
                      size="12px"
                      color="rgba(101, 67, 33, 0.4)"
                    />
                  )}
                </BookSpine>
                <HoverOverlay className="hover-overlay"> 
                  <div style={{fontWeight: 700, marginBottom: 4}}>{book.title}</div>
                  <div style={{opacity: 0.85, fontSize: 12}}>{book.author} • {book.category}</div>
                  <div style={{marginTop: 6, opacity: 0.8, fontSize: 12}}>Sin reseña disponible</div>
                </HoverOverlay>
                </div>
              );
            })}
            
            {/* Libros decorativos para llenar el estante */}
            {Array.from({ length: maxBooksPerShelf - shelf.visibleBooks.length }).map((_, index) => {
              const globalIndex = shelfIndex * maxBooksPerShelf + shelf.visibleBooks.length + index;
              const dimensions = generateBookDimensions(`Libro Clásico ${globalIndex}`, globalIndex);
              const color = generateBookColor('fiction', globalIndex);
              const wear = generateBookWear(globalIndex);
              const delay = `${globalIndex * 0.15}s`;
              
              const decorativeTitle = [
                'El Quijote', 'Don Juan', 'La Ilíada', 'Hamlet', 'Fausto', 'Divina Comedia',
                'Paradise Lost', 'King Lear', 'The Odyssey', 'Aeneid', 'Canterbury Tales',
                'Beowulf', 'El Cid', 'Romeo y Julieta', 'Macbeth', 'Othello', 'Les Misérables',
                'Notre Dame', 'Guerra y Paz', 'Anna Karenina', 'Crime y Castigo', 'Los Hermanos K.',
                'El Idiota', 'Madame Bovary', 'Tristán', 'Isolda', 'Parsifal', 'Lohengrin'
              ][globalIndex % 28];
              
              return (
                <BookSpine
                  key={`decorative-${shelfIndex}-${index}`}
                  width={dimensions.width}
                  height={dimensions.height}
                  color={color}
                  title={decorativeTitle}
                  author="Clásico"
                  wear={wear}
                  delay={delay}
                  style={{ opacity: 0.85 }} // Ligeramente más tenue para distinguir
                />
              );
            })}
          </BooksRow>
          <ShelfBoard />
        </Shelf>
      ))}
      
      <StatsContainer>
        <Stat>
          <div className="number">{books.length}</div>
          <div className="label">Libros Coleccionados</div>
        </Stat>
        <Stat>
          <div className="number">{shelves.length}</div>
          <div className="label">Estantes Ocupados</div>
        </Stat>
        <Stat>
          <div className="number">{new Set(books.map(b => b.category)).size}</div>
          <div className="label">Géneros Diversos</div>
        </Stat>
      </StatsContainer>
    </BookshelfContainer>
  );
};

export default AnimatedBookshelf;