import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../styles/theme.ts';

const Wrapper = styled.button`
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: ${theme.zIndex.modal};
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  cursor: pointer;

  svg {
    color: ${theme.colors.textInverse};
    width: 20px;
    height: 20px;
  }

  &:hover { transform: translateY(-2px); }
`;

const BackArrow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // If there's a history to go back to, use it; otherwise go to welcome
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/welcome');
    }
  };

  // Don't show on welcome, login, register or verification
  const hideOn = ['/welcome', '/login', '/register', '/verification'];
  if (hideOn.includes(location.pathname)) return null;

  return (
    <Wrapper aria-label="Volver" title="Volver" onClick={handleBack}>
      <ArrowLeft />
    </Wrapper>
  );
};

export default BackArrow;
