import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme.ts';

const Track = styled.button<{ $on: boolean }>`
  width: 48px;
  height: 28px;
  background: ${p => p.$on ? theme.colors.primary : '#e5e7eb'};
  border-radius: 9999px;
  padding: 2px;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s ease;
`;

const Thumb = styled.span<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  background: white;
  transform: translateX(${p => p.$on ? '20px' : '0'});
  transition: transform 0.2s ease;
  box-shadow: ${theme.shadows.sm};
`;

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <Track $on={checked} onClick={() => onChange(!checked)} aria-pressed={checked}>
      <Thumb $on={checked} />
    </Track>
  );
};

export default Switch;






