import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Book, Users, MapPin, Heart } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 50%, ${theme.colors.primaryLight} 100%);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.06) 0%, transparent 50%);
    animation: float 25s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -30%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite reverse;
    pointer-events: none;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-20px, -40px) rotate(120deg); }
    66% { transform: translate(40px, -30px) rotate(240deg); }
  }
`;

const Content = styled.div`
  max-width: 420px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: slideInUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  position: relative;
  animation: logoFloat 4s ease-in-out infinite;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), transparent, rgba(255, 255, 255, 0.1));
    animation: rotate 8s linear infinite;
    z-index: -1;
  }

  @keyframes logoFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-10px) scale(1.05); }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LogoIcon = styled(Book)`
  width: 60px;
  height: 60px;
  color: white;
`;

const AppName = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 20px rgba(255, 255, 255, 0.3);
  letter-spacing: -0.03em;
  animation: titleGlow 3s ease-in-out infinite alternate;

  @keyframes titleGlow {
    from { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)); }
    to { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); }
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 0;
  font-weight: 300;
  letter-spacing: 0.5px;
  animation: fadeInDelay 1.5s ease-out 0.5s both;

  @keyframes fadeInDelay {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 0.9; transform: translateY(0); }
  }
`;

const FeaturesContainer = styled.div`
  margin: 2.5rem 0;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: fadeInStagger 0.8s ease-out both;
  
  &:nth-child(1) { animation-delay: 0.2s; }
  &:nth-child(2) { animation-delay: 0.4s; }
  &:nth-child(3) { animation-delay: 0.6s; }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    width: 28px;
    height: 28px;
    margin-right: 1.5rem;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  @keyframes fadeInStagger {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

const FeatureText = styled.span`
  font-size: 1.1rem;
  text-align: left;
  font-weight: 400;
  line-height: 1.3;
`;

const ButtonContainer = styled.div`
  margin: 2rem 0 1.5rem;
`;

const PrimaryButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 1));
  color: ${theme.colors.primary};
  padding: 1.25rem;
  border-radius: 30px;
  border: none;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1),
              0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
                0 10px 25px rgba(0, 0, 0, 0.1);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1.25rem;
  border-radius: 30px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }
`;

const TermsText = styled.p`
  font-size: 0.8rem;
  opacity: 0.7;
  line-height: 1.4;
  margin-top: 1rem;
`;

const LinkText = styled.span`
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="fade-in">
      <Content>
        <LogoContainer>
          <Logo>
            <LogoIcon />
          </Logo>
          <AppName>BookMatch</AppName>
          <Tagline>Conecta a través de los libros</Tagline>
        </LogoContainer>

        <FeaturesContainer>
          <Feature>
            <Heart />
            <FeatureText>Intercambia libros con otros lectores</FeatureText>
          </Feature>
          <Feature>
            <MapPin />
            <FeatureText>Encuentra lectores cercanos a ti</FeatureText>
          </Feature>
          <Feature>
            <Users />
            <FeatureText>Conecta con una comunidad literaria</FeatureText>
          </Feature>
        </FeaturesContainer>

        <ButtonContainer>
          <PrimaryButton onClick={() => navigate('/register')}>
            Crear Cuenta
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/login')}>
            Iniciar Sesión
          </SecondaryButton>
        </ButtonContainer>

        <TermsText>
          Al continuar, aceptas nuestros{' '}
          <LinkText>Términos de Servicio</LinkText>
          {' '}y{' '}
          <LinkText>Política de Privacidad</LinkText>
        </TermsText>
      </Content>
    </Container>
  );
};

export default WelcomeScreen;