import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Heart, Map, MessageCircle, User, Book } from 'lucide-react';

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (min-width: 768px) {
    max-width: 480px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px 20px 0 0;
  }
`;

const NavItem = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$active ? '#6B46C1' : '#64748b'};
  transition: all 0.2s ease;
  font-size: 0.75rem;
  font-weight: 500;
  gap: 0.25rem;

  &:hover {
    color: #6B46C1;
    transform: translateY(-1px);
  }

  svg {
    width: 24px;
    height: 24px;
    stroke-width: ${props => props.$active ? '2.5' : '2'};
  }

  span {
    font-size: 0.6rem;
    margin-top: 0.1rem;
  }
`;

const ContentWrapper = styled.div`
  padding-bottom: 80px; /* Space for bottom navigation */
`;

interface MainNavigationProps {
  children: React.ReactNode;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/swipe', icon: Heart, label: 'Descubrir' },
    { path: '/map', icon: Map, label: 'Mapa' },
    { path: '/chats', icon: MessageCircle, label: 'Chats' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <NavContainer>
      <MainContent>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
      
      <BottomNav>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
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

