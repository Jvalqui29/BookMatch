import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme.ts';
import Switch from '../components/Switch.tsx';
import { useThemeMode } from '../context/ThemeContext.tsx';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, ${theme.colors.background} 0%, #f1f5f9 100%);
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  color: ${theme.colors.text};
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(107, 70, 193, 0.1);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.border};
  transition: background-color 0.2s ease;
  
  &:last-child { 
    border-bottom: none; 
  }
  
  &:hover {
    background: ${theme.colors.background};
  }
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const LabelText = styled.span`
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: 1rem;
`;

const LabelSubtext = styled.span`
  color: ${theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useThemeMode();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    showDistanceKm: true,
    darkMode: theme === 'dark'
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Container>
      <Title>Configuración</Title>
      
      <Section>
        <Item>
          <Label>
            <LabelText>Notificaciones push</LabelText>
            <LabelSubtext>Recibe alertas sobre nuevos mensajes</LabelSubtext>
          </Label>
          <Row>
            <Switch 
              checked={settings.pushNotifications} 
              onChange={(checked) => handleSettingChange('pushNotifications', checked)} 
            />
          </Row>
        </Item>
        
        <Item>
          <Label>
            <LabelText>Mostrar distancia en km</LabelText>
            <LabelSubtext>Distancia a otros usuarios en kilómetros</LabelSubtext>
          </Label>
          <Row>
            <Switch 
              checked={settings.showDistanceKm} 
              onChange={(checked) => handleSettingChange('showDistanceKm', checked)} 
            />
          </Row>
        </Item>
        
        <Item>
          <Label>
            <LabelText>Tema oscuro</LabelText>
            <LabelSubtext>Cambiar a modo oscuro</LabelSubtext>
          </Label>
          <Row>
            <Switch 
              checked={theme === 'dark'} 
              onChange={() => {
                toggleTheme();
                handleSettingChange('darkMode', theme === 'light');
              }} 
            />
          </Row>
        </Item>
      </Section>
    </Container>
  );
};

export default SettingsScreen;


