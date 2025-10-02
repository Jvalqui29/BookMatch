import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { theme } from '../../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.xl};
  max-height: 90vh;
  overflow-y: auto;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSecondary};
  z-index: 1;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.placeholder};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const RegisterButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  background: ${theme.colors.primary};
  color: white;
  padding: 1rem;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.$loading ? 0.7 : 1};
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const success = await registerUser({
        name: data.name,
        email: data.email,
        phone: '', // Se completará en verificación
        password: data.password,
        favoriteGenres: [], // Se completará después
      });
      
      if (success) {
        navigate('/verification');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate('/welcome')}>
        <ArrowLeft size={24} />
      </BackButton>
      
      <RegisterCard className="fade-in">
        <Header>
          <Title>Crear Cuenta</Title>
          <Subtitle>Únete a la comunidad de BookMatch</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              placeholder="Nombre completo"
              $hasError={!!errors.name}
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres',
                },
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              placeholder="Correo electrónico"
              $hasError={!!errors.email}
              {...register('email', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              $hasError={!!errors.password}
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar contraseña"
              $hasError={!!errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Confirma tu contraseña',
                validate: value =>
                  value === password || 'Las contraseñas no coinciden',
              })}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </InputGroup>

          <RegisterButton type="submit" disabled={isLoading} $loading={isLoading}>
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </RegisterButton>
        </Form>

        <Links>
          <p>
            ¿Ya tienes cuenta?{' '}
            <StyledLink to="/login">Inicia sesión aquí</StyledLink>
          </p>
        </Links>
      </RegisterCard>
    </Container>
  );
};

export default RegisterScreen;