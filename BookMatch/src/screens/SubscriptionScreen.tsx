import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Crown, Check } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
`;

const Content = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const SubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
      </BackButton>
      
      <Content>
        <Crown size={60} />
        <Title>BookMatch Premium</Title>
        <Subtitle>Funciones exclusivas para lectores de Chile y el mundo</Subtitle>
        
        <PlanCard>
          <h3>Plan Premium - $3.990 CLP/mes</h3>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li>✓ Biblioteca ilimitada</li>
            <li>✓ Búsqueda avanzada por autor/ciudad</li>
            <li>✓ Sin anuncios</li>
            <li>✓ Soporte prioritario</li>
            <li>✓ Resaltado Premium en el mapa</li>
          </ul>
          <button 
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: theme.colors.primary, 
              color: 'white', 
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Suscribirse
          </button>
        </PlanCard>
      </Content>
    </Container>
  );
};

export default SubscriptionScreen;