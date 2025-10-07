import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, BookOpen, Image, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 70, 193, 0.4);
  }
`;

const Toolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const OnlineButton = styled.button`
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  backdrop-filter: blur(10px);
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #6B46C1;
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const Cover = styled.div`
  height: 140px;
  background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #A78BFA 100%);
  border-radius: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%);
    border-radius: 12px;
  }
`;

/* --- Vista Biblioteca 3D --- */
const ShelfArea = styled.div`
  position: relative;
  perspective: 1200px;
  background: radial-gradient(1000px 400px at 50% 0%, rgba(255,255,255,0.05), transparent 70%);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.25rem 1rem 1rem;
  margin-bottom: 1.25rem;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
`;

const Shelf = styled.div`
  position: relative;
  height: 110px;
  transform-style: preserve-3d;
  transform: rotateX(8deg) translateZ(0);
  margin-bottom: 16px;
`;

const ShelfBoard = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 16px;
  background: linear-gradient(0deg, #2b1f1a, #3a2b24);
  border-radius: 4px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.6);
  transform: translateZ(30px);
`;

const BookSpine3D = styled.div<{ color: string, height: number, width: number, title: string }>`
  position: absolute;
  bottom: 16px;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  background: ${p => p.color};
  border-radius: 3px 6px 6px 3px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.45), inset -2px 0 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
  transform: translateZ(36px) rotateY(-6deg);
  transition: transform 300ms ease, box-shadow 300ms ease;
  cursor: default;

  &:hover {
    transform: translateZ(44px) rotateY(-2deg) translateY(-2px);
    box-shadow: 0 10px 22px rgba(0,0,0,0.6), inset -2px 0 0 rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  &::after {
    content: attr(data-title);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    color: rgba(255,255,255,0.85);
    font-size: 10px;
    letter-spacing: 0.4px;
    font-family: 'Georgia', serif;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    white-space: nowrap;
  }
`;

const ShelfLabel = styled.div`
  position: absolute;
  left: 8px;
  bottom: 18px;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
`;

const ViewToggle = styled.div`
  display: inline-flex;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  overflow: hidden;
`;

const ToggleBtn = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 0.9rem;
  color: ${p => p.$active ? '#0f172a' : 'rgba(255,255,255,0.85)'};
  background: ${p => p.$active ? 'linear-gradient(135deg, #F8FAFC, #E5E7EB)' : 'transparent'};
  border-right: 1px solid rgba(255,255,255,0.08);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: 200ms ease;

  &:last-child { border-right: 0; }
`;

const ProgressRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressBar = styled.div<{ value: number }>`
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${p => Math.max(0, Math.min(100, p.value))}%;
    background: linear-gradient(90deg, #10B981, #22D3EE);
  }
`;

const ProgressInput = styled.input`
  width: 100%;
`;

const BookTitle = styled.div`
  font-weight: 600;
  color: #ffffff;
  font-size: 0.9rem;
  line-height: 1.3;
`;

const BookAuthor = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

const BookStatus = styled.div<{ $status: string }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 0.5rem;
  
  ${props => props.$status === 'reading' && `
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: white;
  `}
  
  ${props => props.$status === 'available' && `
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
  `}
  
  ${props => props.$status === 'not-available' && `
    background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
    color: white;
  `}
`;

const ExchangeIndicator = styled.div<{ $forExchange: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.$forExchange 
    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
    : 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditBtn = styled.button`
  background: rgba(107, 70, 193, 0.3);
  border: 1px solid rgba(107, 70, 193, 0.5);
  color: #A78BFA;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(107, 70, 193, 0.5);
    transform: translateY(-1px);
  }
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    transform: translateY(-1px);
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: end;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormRow = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  
  option {
    background: #1a1a2e;
    color: #ffffff;
  }
  
  &:focus {
    outline: none;
    border-color: #6B46C1;
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.3);
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 0.9rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #6B46C1;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #6B46C1;
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.3);
  }
`;

const SubmitBtn = styled.button`
  justify-self: end;
  background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(107, 70, 193, 0.4);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.6);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    color: white;
    margin: 0;
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const OnlineBookCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
`;

const OnlineBookCover = styled.div`
  width: 60px;
  height: 80px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const OnlineBookInfo = styled.div`
  flex: 1;
  
  h3 {
    color: white;
    margin: 0 0 0.5rem;
    font-size: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
`;

const AddOnlineButton = styled.button`
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }
`;

const MyBooksScreen: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ 
    title: '', 
    author: '', 
    cover: '', 
    status: 'available', // 'reading', 'available', 'not-available'
    forExchange: true 
  });
  const [showOnlineSearch, setShowOnlineSearch] = useState(false);
  const [onlineBooks, setOnlineBooks] = useState<any[]>([]);

  if (!user) {
    return (
      <Container>
        <Header>
          <Title>Cargando biblioteca...</Title>
        </Header>
      </Container>
    );
  }

  const books = user.booksOwned || [];
  const [view3D, setView3D] = useState(true);
  
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  }, [books, search]);

  const searchOnlineBooks = async (query: string) => {
    // Simulación de API de libros online
    const mockOnlineBooks = [
      { id: 'online1', title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Realismo mágico', coverImage: 'https://images-na.ssl-images-amazon.com/images/I/81PIyuNJ7AL.jpg' },
      { id: 'online2', title: '1984', author: 'George Orwell', genre: 'Distopía', coverImage: 'https://images-na.ssl-images-amazon.com/images/I/61ZewDE3beL.jpg' },
      { id: 'online3', title: 'El Quijote', author: 'Miguel de Cervantes', genre: 'Clásico', coverImage: 'https://images-na.ssl-images-amazon.com/images/I/81PIyuNJ7AL.jpg' },
      { id: 'online4', title: 'Harry Potter y la Piedra Filosofal', author: 'J.K. Rowling', genre: 'Fantasía', coverImage: 'https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg' },
      { id: 'online5', title: 'Orgullo y Prejuicio', author: 'Jane Austen', genre: 'Romance', coverImage: 'https://images-na.ssl-images-amazon.com/images/I/71Q1tPupKjL.jpg' },
    ];
    
    return mockOnlineBooks.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleOnlineSearch = async () => {
    setShowOnlineSearch(true);
    const results = await searchOnlineBooks('');
    setOnlineBooks(results);
  };

  const addOnlineBook = async (book: any) => {
    const newBook = {
      id: Date.now().toString(),
      title: book.title,
      author: book.author,
      genre: book.genre,
      condition: 'good' as const,
      isAvailable: true,
      status: 'available' as const,
      forExchange: true,
      coverImage: book.coverImage,
    };
    await updateProfile({ booksOwned: [...books, newBook] });
    setShowOnlineSearch(false);
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    if (editing) {
      // Edit existing book
      const updatedBooks = books.map(b => 
        b.id === editing 
          ? { 
              ...b, 
              title: form.title, 
              author: form.author || 'Autor desconocido', 
              coverImage: form.cover || undefined,
              status: form.status as 'reading' | 'available' | 'not-available',
              forExchange: form.forExchange
            }
          : b
      );
      await updateProfile({ booksOwned: updatedBooks });
      setEditing(null);
    } else {
      // Add new book
      const newBook = {
        id: Date.now().toString(),
        title: form.title,
        author: form.author || 'Autor desconocido',
        genre: 'General',
        condition: 'good' as const,
        isAvailable: form.status === 'available',
        status: form.status as 'reading' | 'available' | 'not-available',
        forExchange: form.forExchange,
        coverImage: form.cover || undefined,
      };
      await updateProfile({ booksOwned: [...books, newBook] });
    }
    
    setForm({ title: '', author: '', cover: '', status: 'available', forExchange: true });
    setAdding(false);
  };

  const removeBook = async (id: string) => {
    await updateProfile({ booksOwned: books.filter(b => b.id !== id) });
  };

  const startEdit = (book: any) => {
    setForm({ 
      title: book.title, 
      author: book.author, 
      cover: book.coverImage || '',
      status: book.status || 'available',
      forExchange: book.forExchange !== undefined ? book.forExchange : true
    });
    setEditing(book.id);
    setAdding(true);
  };

  const cancelEdit = () => {
    setForm({ title: '', author: '', cover: '', status: 'available', forExchange: true });
    setAdding(false);
    setEditing(null);
  };

  return (
    <Container>
      <Header>
        <Title>Mi Biblioteca</Title>
        <ViewToggle>
          <ToggleBtn $active={view3D} onClick={() => setView3D(true)}>3D</ToggleBtn>
          <ToggleBtn $active={!view3D} onClick={() => setView3D(false)}>Cuadrícula</ToggleBtn>
        </ViewToggle>
        <AddButton onClick={() => setAdding(v => !v)}>
          <Plus size={16} /> {adding ? 'Cancelar' : 'Agregar'}
        </AddButton>
      </Header>

      <Toolbar>
        <SearchInput placeholder="Buscar en mis libros" value={search} onChange={(e) => setSearch(e.target.value)} />
        <OnlineButton onClick={handleOnlineSearch}>
          <Globe size={16} /> Online
        </OnlineButton>
      </Toolbar>

      {adding && (
        <Form onSubmit={addBook}>
          <Input 
            placeholder="Título del libro" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
          />
          <Input 
            placeholder="Autor" 
            value={form.author} 
            onChange={(e) => setForm({ ...form, author: e.target.value })} 
          />
          <Input 
            placeholder="URL de portada (opcional)" 
            value={form.cover} 
            onChange={(e) => setForm({ ...form, cover: e.target.value })} 
          />
          <Select 
            value={form.status} 
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="available">Disponible</option>
            <option value="reading">Leyendo actualmente</option>
            <option value="not-available">No disponible</option>
          </Select>
          <FormRow>
            <CheckboxContainer>
              <Checkbox 
                type="checkbox" 
                checked={form.forExchange} 
                onChange={(e) => setForm({ ...form, forExchange: e.target.checked })} 
              />
              Disponible para intercambio
            </CheckboxContainer>
            <SubmitBtn type="submit">
              <Image size={16} /> 
              {editing ? 'Actualizar libro' : 'Agregar libro'}
            </SubmitBtn>
          </FormRow>
        </Form>
      )}

      {books.length === 0 ? (
        <EmptyState>
          <h3>📚 Tu biblioteca está vacía</h3>
          <p>Comienza agregando tus libros favoritos usando el botón "Agregar" arriba. 
          ¡Construye tu biblioteca personal y conecta con otros lectores!</p>
        </EmptyState>
      ) : (
        <>
          {view3D && (
            <ShelfArea>
              {[0,1,2].map(row => (
                <Shelf key={row}>
                  <ShelfBoard />
                  {filtered.slice(row * 8, row * 8 + 8).map((b, i) => {
                    const left = 14 + i * 42;
                    const height = 64 + (i % 4) * 6;
                    const width = 18 + (i % 3) * 2;
                    const color = b.coverImage ? 'linear-gradient(135deg, #475569, #1f2937)' : `linear-gradient(135deg, #6B46C1, #8B5CF6)`;
                    return (
                      <BookSpine3D
                        key={b.id}
                        style={{ left: `${left}px` }}
                        height={height}
                        width={width}
                        color={color}
                        title={b.title}
                        data-title={b.title}
                      />
                    );
                  })}
                  <ShelfLabel>Estante {row + 1}</ShelfLabel>
                </Shelf>
              ))}
            </ShelfArea>
          )}

          {!view3D && (
            <Grid>
              {filtered.map(b => (
                <Card key={b.id}>
                  <Cover style={{ backgroundImage: b.coverImage ? `url(${b.coverImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {!b.coverImage && <BookOpen />}
                    <ExchangeIndicator $forExchange={b.forExchange !== false}>
                      {b.forExchange !== false ? '↔' : '×'}
                    </ExchangeIndicator>
                  </Cover>
                  <BookStatus $status={b.status || 'available'}>
                    {b.status === 'reading' && '📖 Leyendo'}
                    {b.status === 'available' && '✅ Disponible'}
                    {b.status === 'not-available' && '❌ No disponible'}
                    {!b.status && '✅ Disponible'}
                  </BookStatus>
                  <BookTitle>{b.title}</BookTitle>
                  <BookAuthor>{b.author}</BookAuthor>

                  <ProgressRow>
                    <ProgressBar value={b.progress ?? 0} />
                    <ProgressInput
                      type="range"
                      min={0}
                      max={100}
                      value={b.progress ?? 0}
                      onChange={async (e) => {
                        const value = parseInt(e.target.value, 10);
                        const updated = books.map(x => x.id === b.id ? { ...x, progress: value, status: value > 0 && value < 100 ? 'reading' : (value === 100 ? 'not-available' : (x.status || 'available')) } : x);
                        await updateProfile({ booksOwned: updated });
                      }}
                    />
                  </ProgressRow>

                  <CardActions>
                    <EditBtn onClick={() => startEdit(b)}>
                      Editar
                    </EditBtn>
                    <RemoveBtn onClick={() => removeBook(b.id)}>
                      <Trash2 size={16} />
                    </RemoveBtn>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          )}
        </>
      )}
      
      <Modal show={showOnlineSearch}>
        <ModalContent>
          <ModalHeader>
            <h2>Buscar libros online</h2>
            <CloseButton onClick={() => setShowOnlineSearch(false)}>×</CloseButton>
          </ModalHeader>
          
          {onlineBooks.map(book => (
            <OnlineBookCard key={book.id}>
              <OnlineBookCover style={{ backgroundImage: book.coverImage ? `url(${book.coverImage})` : undefined }}>
                {!book.coverImage && <BookOpen size={20} />}
              </OnlineBookCover>
              <OnlineBookInfo>
                <h3>{book.title}</h3>
                <p>por {book.author}</p>
                <p>{book.genre}</p>
              </OnlineBookInfo>
              <AddOnlineButton onClick={() => addOnlineBook(book)}>
                Agregar
              </AddOnlineButton>
            </OnlineBookCard>
          ))}
          
          {onlineBooks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              <p>No se encontraron libros online</p>
            </div>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MyBooksScreen;


