import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Heart, Map, MessageCircle, User, Book } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.surfaceGlass};
  backdrop-filter: blur(20px);
  border-top: 1px solid ${theme.colors.borderLight};
  padding: ${theme.spacing.sm} 0 calc(${theme.spacing.sm} + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: ${theme.shadows.lg};
  z-index: ${theme.zIndex.fixed};
  
  /* Efecto de borde superior con gradiente */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      ${theme.colors.primary} 50%, 
      transparent 100%
    );
  }

  @media (min-width: 768px) {
    max-width: 480px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${theme.borderRadius['2xl']} ${theme.borderRadius['2xl']} 0 0;
    border-left: 1px solid ${theme.colors.borderLight};
    border-right: 1px solid ${theme.colors.borderLight};
  }
`;

const NavItem = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$active ? theme.colors.primary : theme.colors.textSecondary};
  transition: ${theme.transitions.spring};
  font-size: 0.75rem;
  font-weight: ${theme.fonts.medium.fontWeight};
  gap: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.lg};
  position: relative;
  min-width: 60px;
  
  /* Indicador activo con gradiente */
  ${props => props.$active && `
    background: linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}10);
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 3px;
      background: ${theme.colors.primaryGradient};
      border-radius: ${theme.borderRadius.pill};
    }
  `}

  &:hover:not(:disabled) {
    color: ${theme.colors.primary};
    transform: translateY(-2px) scale(1.05);
    background: linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.secondary}05);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  svg {
    width: 24px;
    height: 24px;
    stroke-width: ${props => props.$active ? '2.5' : '2'};
    transition: ${theme.transitions.spring};
    filter: ${props => props.$active ? `drop-shadow(0 2px 4px ${theme.colors.primary}40)` : 'none'};
  }

  span {
    font-size: 0.65rem;
    margin-top: ${theme.spacing.xs};
    font-weight: ${props => props.$active ? theme.fonts.semibold.fontWeight : theme.fonts.medium.fontWeight};
    letter-spacing: ${theme.fonts.medium.letterSpacing};
    text-transform: uppercase;
  }

  /* Animación de ripple al hacer click */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(circle, ${theme.colors.primary}30 0%, transparent 70%);
    transform: scale(0);
    opacity: 0;
    transition: ${theme.transitions.fast};
  }

  &:active::after {
    transform: scale(1);
    opacity: 1;
    transition: ${theme.transitions.fast};
  }
`;

const ContentWrapper = styled.div`
  padding-bottom: calc(90px + env(safe-area-inset-bottom)); /* Space for bottom navigation */
  min-height: 100vh;
  position: relative;
`;

interface MainNavigationProps {
  children: React.ReactNode;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { 
      path: '/swipe', 
      icon: Heart, 
      label: 'Descubrir',
      description: 'Encuentra libros'
    },
    { 
      path: '/map', 
      icon: Map, 
      label: 'Mapa',
      description: 'Explora cerca'
    },
    { 
      path: '/chats', 
      icon: MessageCircle, 
      label: 'Chats',
      description: 'Conversaciones'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Perfil',
      description: 'Tu cuenta'
    },
  ];

  const handleNavigate = (path: string) => {
    // Pequeña vibración en dispositivos móviles para feedback háptico
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    navigate(path);
  };

  return (
    <NavContainer>
      <MainContent>
        <ContentWrapper className="fade-in">
          {children}
        </ContentWrapper>
      </MainContent>
      
      <BottomNav>
        {navItems.map((item, index) => (
          <NavItem
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => handleNavigate(item.path)}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
            title={item.description}
          >
            <item.icon />
            <span>{item.label}</span>
          </NavItem>
        ))}
      </BottomNav>
    </NavContainer>
  );
};

export default MainNavigation;

