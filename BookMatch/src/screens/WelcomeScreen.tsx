import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Book, Users, MapPin, Heart } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
`;

const Content = styled.div`
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  backdrop-filter: blur(10px);
`;

const LogoIcon = styled(Book)`
  width: 60px;
  height: 60px;
  color: white;
`;

const AppName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
`;

const FeaturesContainer = styled.div`
  margin: 2.5rem 0;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
    flex-shrink: 0;
  }
`;

const FeatureText = styled.span`
  font-size: 1rem;
  text-align: left;
`;

const ButtonContainer = styled.div`
  margin: 2rem 0 1.5rem;
`;

const PrimaryButton = styled.button`
  width: 100%;
  background: white;
  color: ${theme.colors.primary};
  padding: 1rem;
  border-radius: 25px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  background: transparent;
  color: white;
  padding: 1rem;
  border-radius: 25px;
  border: 2px solid white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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