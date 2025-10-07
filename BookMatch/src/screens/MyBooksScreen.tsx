import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, BookOpen, Image } from 'lucide-react';
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

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #6B46C1;
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.3);
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
-  grid-template-columns: 1fr 1fr;
-  gap: 1rem;
+  grid-template-columns: 1fr 1fr;
+  gap: 1rem;
  align-items: end;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
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

const MyBooksScreen: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ title: '', author: '', cover: '' });

  if (!user) return null;

  const books = user.booksOwned || [];
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  }, [books, search]);

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    if (editing) {
      // Edit existing book
      const updatedBooks = books.map(b => 
        b.id === editing 
          ? { ...b, title: form.title, author: form.author || 'Autor desconocido', coverImage: form.cover || undefined }
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
        isAvailable: true,
        coverImage: form.cover || undefined,
      };
      await updateProfile({ booksOwned: [...books, newBook] });
    }
    
    setForm({ title: '', author: '', cover: '' });
    setAdding(false);
  };

  const removeBook = async (id: string) => {
    await updateProfile({ booksOwned: books.filter(b => b.id !== id) });
  };

  const startEdit = (book: any) => {
    setForm({ title: book.title, author: book.author, cover: book.coverImage || '' });
    setEditing(book.id);
    setAdding(true);
  };

  const cancelEdit = () => {
    setForm({ title: '', author: '', cover: '' });
    setAdding(false);
    setEditing(null);
  };

  return (
    <Container>
      <Header>
        <Title>Mis libros</Title>
        <AddButton onClick={() => setAdding(v => !v)}>
          <Plus size={16} /> {adding ? 'Cancelar' : 'Agregar'}
        </AddButton>
      </Header>

      <Toolbar>
        <SearchInput placeholder="Buscar en mis libros" value={search} onChange={(e) => setSearch(e.target.value)} />
      </Toolbar>

      {adding && (
        <Form onSubmit={addBook}>
          <Input placeholder="Título del libro" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <Input placeholder="URL de portada (opcional)" value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} />
          <SubmitBtn type="submit">
            <Image size={16} /> 
            {editing ? 'Actualizar libro' : 'Agregar libro'}
          </SubmitBtn>
        </Form>
      )}

      <Grid>
        {filtered.map(b => (
          <Card key={b.id}>
            <Cover style={{ backgroundImage: b.coverImage ? `url(${b.coverImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {!b.coverImage && <BookOpen />}
            </Cover>
            <BookTitle>{b.title}</BookTitle>
            <BookAuthor>{b.author}</BookAuthor>
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
    </Container>
  );
};

export default MyBooksScreen;


