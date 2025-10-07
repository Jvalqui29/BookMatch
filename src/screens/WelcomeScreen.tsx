import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Book, Users, MapPin } from 'lucide-react';
import { theme } from '../styles/theme.ts';
import BookshelfBackground from '../components/BookshelfBackground.tsx';

// Iconos personalizados SVG para un toque más editorial
const BookExchangeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20l-4-3-4 3V2"/>
    <path d="M20 17h1.5a2.5 2.5 0 0 1 0 5H6.5"/>
    <path d="M6.5 17H4a2.5 2.5 0 0 0 0 5h14"/>
  </svg>
);

const MapBookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3"/>
    <path d="m8.5 8.5-.828-.828a4.472 4.472 0 0 1 0-6.328l.828.828"/>
    <path d="m15.5 8.5.828-.828a4.472 4.472 0 0 0 0-6.328l-.828.828"/>
    <path d="M12 2v6"/>
    <rect x="8" y="14" width="8" height="7" rx="1"/>
    <path d="M9 16h6"/>
    <path d="M9 18h6"/>
  </svg>
);

const CommunityBookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    <rect x="7" y="13" width="10" height="7" rx="1"/>
    <path d="M9 15h6"/>
    <path d="M9 17h4"/>
  </svg>
);

const Container = styled.div`
  min-height: 100vh;
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
  z-index: 2;
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

/* Book-like container */
const BookWrapper = styled.div`
  perspective: 1200px;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const BookObject = styled.div`
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-5deg) rotateX(2deg);
  transition: transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: bookOpen 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s both;

  &:hover {
    transform: rotateY(-2deg) rotateX(0deg) translateY(-2px);
  }

  @keyframes bookOpen {
    0% {
      transform: rotateY(-25deg) rotateX(5deg) scale(0.9);
      opacity: 0.8;
    }
    50% {
      transform: rotateY(-15deg) rotateX(3deg) scale(0.95);
    }
    100% {
      transform: rotateY(-5deg) rotateX(2deg) scale(1);
      opacity: 1;
    }
  }
`;

const BookCover = styled.div`
  position: relative;
  background: 
    /* Textura de papel sutil */
    radial-gradient(circle at 25% 25%, transparent 2px, rgba(255,255,255,0.02) 2px),
    radial-gradient(circle at 75% 75%, transparent 1px, rgba(255,255,255,0.015) 1px),
    /* Gradiente principal */
    linear-gradient(135deg, #3b2f2f 0%, #251a1a 100%);
  background-size: 8px 8px, 6px 6px, 100% 100%;
  border-radius: 14px 10px 10px 14px;
  padding: 2.25rem 2rem 2rem 2.5rem;
  box-shadow: 
    0 24px 60px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.06),
    inset -2px 0 0 rgba(0,0,0,0.35);
  transform: translateZ(24px);
  border: 1px solid rgba(255,255,255,0.06);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 148px,
        rgba(255,255,255,0.008) 149px,
        rgba(255,255,255,0.008) 150px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 19px,
        rgba(255,255,255,0.01) 20px,
        rgba(255,255,255,0.01) 21px
      );
    border-radius: 14px 10px 10px 14px;
    pointer-events: none;
  }
`;

const BookSpine = styled.div`
  position: absolute;
  top: 10px;
  left: -14px;
  bottom: 10px;
  width: 20px;
  background: linear-gradient(180deg, #2e2323 0%, #1f1717 100%);
  border-radius: 8px 0 0 8px;
  box-shadow: inset -3px 0 0 rgba(0,0,0,0.4), 0 6px 14px rgba(0,0,0,0.4);
`;

const PageStack = styled.div`
  position: absolute;
  inset: 8px -10px 8px auto;
  width: 14px;
  background: repeating-linear-gradient(
    90deg,
    #f2ede6 0px,
    #f2ede6 2px,
    #e7e0d6 2px,
    #e7e0d6 3px
  );
  border-radius: 0 8px 8px 0;
  box-shadow: 2px 0 0 rgba(0,0,0,0.15);
  transform: translateZ(12px);
`;

const Bookmark = styled.div`
  position: absolute;
  top: -6px;
  right: 28px;
  width: 16px;
  height: 38px;
  background: linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%);
  box-shadow: 0 6px 12px rgba(0,0,0,0.25);
  transform: translateZ(28px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: bookmarkFloat 3s ease-in-out infinite;
  z-index: 10;

  &:hover {
    transform: translateZ(32px) translateY(-2px) scale(1.1);
    box-shadow: 0 8px 16px rgba(0,0,0,0.35);
  }

  @keyframes bookmarkFloat {
    0%, 100% { transform: translateZ(28px) translateY(0px); }
    50% { transform: translateZ(28px) translateY(-3px); }
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
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
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 14px rgba(255, 255, 255, 0.25);
  letter-spacing: -0.02em;
`;

const Tagline = styled.p`
  font-size: 1.05rem;
  opacity: 0.95;
  margin-bottom: 0;
  font-weight: 400;
  letter-spacing: 0.4px;
  font-family: 'Merriweather', 'Lora', 'Georgia', serif;
  font-style: italic;
  line-height: 1.4;
`;

const FeaturesContainer = styled.div`
  margin: 1.75rem 0 2rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: fadeInStagger 0.8s ease-out both;
  
  &:nth-child(1) { animation-delay: 0.2s; }
  &:nth-child(2) { animation-delay: 0.4s; }
  &:nth-child(3) { animation-delay: 0.6s; }

  &:hover {
    background: rgba(255, 255, 255, 0.14);
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
  line-height: 1.4;
  font-family: 'Merriweather', 'Lora', 'Georgia', serif;
  letter-spacing: 0.2px;
`;

const ButtonContainer = styled.div`
  margin: 1.75rem 0 1.25rem;
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
  opacity: 0.8;
  line-height: 1.4;
  margin-top: 0.75rem;
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
      <BookshelfBackground />
      <BookWrapper>
        <BookObject>
          <BookSpine />
          <PageStack />
          <Bookmark />
          <BookCover>
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
                  <BookExchangeIcon />
                  <FeatureText>Intercambia libros con otros lectores</FeatureText>
                </Feature>
                <Feature>
                  <MapBookIcon />
                  <FeatureText>Encuentra lectores cercanos a ti</FeatureText>
                </Feature>
                <Feature>
                  <CommunityBookIcon />
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
          </BookCover>
        </BookObject>
      </BookWrapper>
    </Container>
  );
};

export default WelcomeScreen;