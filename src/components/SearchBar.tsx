import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { theme } from '../styles/theme.ts';

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 0.9rem 1rem 0.9rem 3rem;
  border-radius: 9999px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  background: linear-gradient(180deg, #fff, #f8f8ff);
  &::placeholder { color: ${theme.colors.textSecondary}; }
`;

const Icon = styled.div`
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSecondary};
`;

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar...', value, onChange }) => {
  return (
    <Wrapper>
      <Icon>
        <Search size={18} />
      </Icon>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Wrapper>
  );
};

export default SearchBar;


