import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
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
  flex: 1;
`;

const SaveButton = styled.button<{ $loading?: boolean }>`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.$loading ? 0.7 : 1};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  padding: 1.5rem 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  border: 4px solid white;
  box-shadow: ${theme.shadows.md};
`;

const Cover = styled.div`
  width: 100%;
  height: 120px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.border};
  margin-bottom: 1rem;
  background-size: cover;
  background-position: center;
`;

const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: white;
  border: 2px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: scale(1.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.text};
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.placeholder};
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.placeholder};
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.85rem;
`;

const GenresSection = styled.div`
  margin-top: 1rem;
`;

const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const GenreChip = styled.button<{ $selected: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 2px solid ${props => props.$selected ? theme.colors.primary : theme.colors.border};
  background: ${props => props.$selected ? theme.colors.primary : 'white'};
  color: ${props => props.$selected ? 'white' : theme.colors.text};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary};
    ${props => !props.$selected && `background: ${theme.colors.primary}10;`}
  }
`;

const genres = [
  'Ficción', 'No ficción', 'Misterio', 'Romance', 'Ciencia ficción',
  'Fantasía', 'Historia', 'Biografía', 'Autoayuda', 'Ensayo',
  'Poesía', 'Teatro', 'Cómic', 'Juvenil', 'Infantil'
];

const ProfileEditScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    favoriteGenres: user?.favoriteGenres || [],
    avatar: user?.avatar || '',
    coverImage: user?.coverImage || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAvatarPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await handleFileToBase64(file);
    setFormData(prev => ({ ...prev, avatar: dataUrl }));
  };

  const handleCoverPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await handleFileToBase64(file);
    setFormData(prev => ({ ...prev, coverImage: dataUrl }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await updateProfile(formData);
      navigate('/profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/profile')}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Editar Perfil</Title>
        <SaveButton
          type="submit"
          form="profile-form"
          disabled={isLoading}
          $loading={isLoading}
        >
          <Save size={16} />
          {isLoading ? 'Guardando...' : 'Guardar'}
        </SaveButton>
      </Header>

      <Content>
        <AvatarSection>
          {formData.coverImage && <Cover style={{ backgroundImage: `url(${formData.coverImage})` }} />}
          <AvatarContainer>
            <Avatar style={{ backgroundImage: formData.avatar ? `url(${formData.avatar})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {!formData.avatar && '👤'}
            </Avatar>
            <CameraButton onClick={() => avatarInputRef.current?.click()}>
              <Camera size={16} />
            </CameraButton>
          </AvatarContainer>
          <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarPick} />
          <div>
            <button type="button" style={{ border: 'none', background: 'transparent', color: theme.colors.primary, cursor: 'pointer' }} onClick={() => coverInputRef.current?.click()}>
              Cambiar foto de portada
            </button>
            <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverPick} />
          </div>
        </AvatarSection>

        <Form id="profile-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre completo</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Tu nombre completo"
              $hasError={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Correo electrónico</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="tu@email.com"
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Biografía</Label>
            <TextArea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Cuéntanos sobre ti y tus gustos literarios..."
              $hasError={!!errors.bio}
            />
            {errors.bio && <ErrorMessage>{errors.bio}</ErrorMessage>}
          </FormGroup>

          <GenresSection>
            <Label>Géneros favoritos</Label>
            <GenreGrid>
              {genres.map((genre) => (
                <GenreChip
                  key={genre}
                  type="button"
                  $selected={formData.favoriteGenres.includes(genre)}
                  onClick={() => handleGenreToggle(genre)}
                >
                  {genre}
                </GenreChip>
              ))}
            </GenreGrid>
          </GenresSection>
        </Form>
      </Content>
    </Container>
  );
};

export default ProfileEditScreen;