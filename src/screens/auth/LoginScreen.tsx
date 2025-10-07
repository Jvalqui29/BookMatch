import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { theme } from '../../styles/theme.ts';
import BookshelfBackground from '../../components/BookshelfBackground.tsx';

const Container = styled.div<{ isDarkMode?: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  /* Patrón de fondo animado */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 90%, rgba(255,255,255,0.06) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
    pointer-events: none;
  }
  
  /* Elementos decorativos flotantes */
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    right: 10%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    animation: bounce 4s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius['3xl']};
  padding: ${theme.spacing['4xl']} ${theme.spacing['3xl']};
  width: 100%;
  max-width: 420px;
  box-shadow: ${theme.shadows['2xl']};
  position: relative;
  overflow: hidden;
  animation: slideUp 0.6s ease-out;
  
  /* Brillo sutil en el borde */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
  }
  
  @keyframes slideUp {
    0% { 
      opacity: 0;
      transform: translateY(50px) scale(0.9);
    }
    100% { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
  position: relative;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.xl};
  background: ${theme.colors.primaryGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: ${theme.shadows.glow};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: ${theme.spacing['3xl']};
  left: ${theme.spacing['3xl']};
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: ${theme.transitions.spring};
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px) scale(1.1);
    box-shadow: ${theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0) scale(1.05);
  }
  
  svg {
    transition: ${theme.transitions.normal};
  }
  
  &:hover svg {
    transform: translateX(-2px);
  }
`;

const Title = styled.h1`
  background: ${theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.25rem;
  font-weight: ${theme.fonts.display.fontWeight};
  letter-spacing: ${theme.fonts.display.letterSpacing};
  margin-bottom: ${theme.spacing.sm};
  animation: fadeIn 0.8s ease-out 0.2s both;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  font-weight: ${theme.fonts.medium.fontWeight};
  animation: fadeIn 0.8s ease-out 0.4s both;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  animation: fadeIn 0.8s ease-out both;
  
  &:nth-child(1) { animation-delay: 0.6s; }
  &:nth-child(2) { animation-delay: 0.8s; }
  &:nth-child(3) { animation-delay: 1s; }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.primary};
  z-index: 2;
  transition: ${theme.transitions.normal};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl} 3.5rem;
  border: 2px solid ${props => props.$hasError ? theme.colors.error : 'rgba(255,255,255,0.3)'};
  border-radius: ${theme.borderRadius.xl};
  font-size: 1rem;
  font-weight: ${theme.fonts.medium.fontWeight};
  transition: ${theme.transitions.spring};
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  color: ${theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: ${theme.shadows.colored};
    transform: translateY(-2px);
  }
  
  &:hover:not(:focus) {
    border-color: rgba(255,255,255,0.5);
    background: rgba(255, 255, 255, 0.9);
  }

  &::placeholder {
    color: ${theme.colors.placeholder};
    font-weight: ${theme.fonts.regular.fontWeight};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.normal};
  z-index: 2;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-50%) scale(1.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const LoginButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  background: ${theme.colors.primaryGradient};
  color: white;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.xl};
  font-size: 1.1rem;
  font-weight: ${theme.fonts.semibold.fontWeight};
  letter-spacing: ${theme.fonts.semibold.letterSpacing};
  cursor: pointer;
  transition: ${theme.transitions.spring};
  opacity: ${props => props.$loading ? 0.7 : 1};
  position: relative;
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  
  /* Efecto de brillo animado */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: ${theme.transitions.normal};
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.glow};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }
`;

const Links = styled.div`
  text-align: center;
  margin-top: ${theme.spacing['2xl']};
  animation: fadeIn 0.8s ease-out 1.2s both;
  
  p {
    color: ${theme.colors.textSecondary};
    font-weight: ${theme.fonts.medium.fontWeight};
  }
`;

const StyledLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.fonts.semibold.fontWeight};
  position: relative;
  transition: ${theme.transitions.normal};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.primaryGradient};
    transition: ${theme.transitions.normal};
  }
  
  &:hover {
    color: ${theme.colors.primaryDark};
    
    &::after {
      width: 100%;
    }
  }
`;

interface LoginFormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberEmail, setRememberEmail] = useState<boolean>(() => {
    return localStorage.getItem('rememberEmail') === '1';
  });
  const [savedEmail, setSavedEmail] = useState<string>(() => {
    return localStorage.getItem('savedEmail') || '';
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({ defaultValues: { email: savedEmail } });

  // Acceso rápido si ya está autenticado en almacenamiento local
  // (la redirección real ocurre en rutas protegidas, esto es un CTA visible)
  const quickEmail = savedEmail;

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        if (rememberEmail) {
          localStorage.setItem('rememberEmail', '1');
          localStorage.setItem('savedEmail', data.email);
        } else {
          localStorage.removeItem('rememberEmail');
          localStorage.removeItem('savedEmail');
        }
        navigate('/swipe');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BookshelfBackground />
      <BackButton onClick={() => navigate('/welcome')}>
        <ArrowLeft size={24} />
      </BackButton>
      
      <LoginCard className="fade-in">
        <Header>
          <Logo>📚</Logo>
          <Title>¡Bienvenido de vuelta!</Title>
          <Subtitle>Inicia sesión para continuar</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: theme.colors.textSecondary }}>
              <input
                type="checkbox"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
              Recordar correo
            </label>
            {quickEmail && (
              <button
                type="button"
                onClick={() => setValue('email', quickEmail)}
                style={{ background: 'transparent', color: theme.colors.primary, border: 0, cursor: 'pointer', fontWeight: 600 }}
              >
                Usar {quickEmail}
              </button>
            )}
          </div>

          <LoginButton type="submit" disabled={isLoading} $loading={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </LoginButton>
        </Form>

        <Links>
          <p>
            ¿No tienes cuenta?{' '}
            <StyledLink to="/register">Regístrate aquí</StyledLink>
          </p>
        </Links>
      </LoginCard>
    </Container>
  );
};

export default LoginScreen;