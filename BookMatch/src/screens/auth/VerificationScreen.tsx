import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CheckCircle } from 'lucide-react';
import { theme } from '../../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: 3rem 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.xl};
  text-align: center;
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const ContinueButton = styled.button`
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

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
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