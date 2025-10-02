import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CheckCircle } from 'lucide-react';
import { theme } from '../../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 50%, ${theme.colors.primaryLight} 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-30px, -30px) rotate(120deg); }
    66% { transform: translate(30px, -20px) rotate(240deg); }
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: 3.5rem 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  z-index: 1;
  animation: slideIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const IconContainer = styled.div`
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, ${theme.colors.success}, #10b981);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 15px 35px rgba(34, 197, 94, 0.3);
  animation: iconFloat 3s ease-in-out infinite;

  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-5px) scale(1.05); }
  }
`;

const Title = styled.h1`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const Message = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const ContinueButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark}, ${theme.colors.primaryLight});
  background-size: 200% 200%;
  color: white;
  padding: 1.25rem;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background-position: 100% 0;
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(139, 92, 246, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const VerificationScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/swipe');
  };

  return (
    <Container>
      <Card className="fade-in">
        <IconContainer>
          <CheckCircle size={40} color="white" />
        </IconContainer>
        
        <Title>¡Cuenta creada exitosamente!</Title>
        
        <Message>
          Tu cuenta ha sido creada correctamente. Ya puedes comenzar a descubrir 
          libros y conectar con otros lectores en tu área.
        </Message>
        
        <ContinueButton onClick={handleContinue}>
          Comenzar a explorar
        </ContinueButton>
      </Card>
    </Container>
  );
};

export default VerificationScreen;