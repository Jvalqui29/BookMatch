import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../styles/theme.ts';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${theme.colors.primary};
        color: white;
        border: 2px solid ${theme.colors.primary};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primaryDark};
          border-color: ${theme.colors.primaryDark};
          box-shadow: ${theme.shadows.colored};
        }
      `;
    case 'secondary':
      return css`
        background: ${theme.colors.secondary};
        color: white;
        border: 2px solid ${theme.colors.secondary};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.secondaryDark};
          border-color: ${theme.colors.secondaryDark};
          box-shadow: ${theme.shadows.md};
        }
      `;
    case 'outline':
      return css`
        background: transparent;
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primary};
          color: white;
          box-shadow: ${theme.shadows.colored};
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${theme.colors.primary};
        border: 2px solid transparent;
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primary}15;
          border-color: ${theme.colors.primary}25;
        }
      `;
    case 'gradient':
      return css`
        background: ${theme.colors.primaryGradient};
        color: white;
        border: 2px solid transparent;
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: ${theme.colors.primaryGradient};
          border-radius: inherit;
          z-index: -1;
        }
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.glow};
        }
      `;
    default:
      return css`
        background: ${theme.colors.surface};
        color: ${theme.colors.text};
        border: 2px solid ${theme.colors.border};
        
        &:hover:not(:disabled) {
          border-color: ${theme.colors.primary};
        }
      `;
  }
};

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: 0.875rem;
        min-height: 36px;
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
        font-size: 1.125rem;
        min-height: 52px;
      `;
    case 'xl':
      return css`
        padding: ${theme.spacing.xl} ${theme.spacing['3xl']};
        font-size: 1.25rem;
        min-height: 60px;
      `;
    default: // md
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.xl};
        font-size: 1rem;
        min-height: 44px;
      `;
  }
};

const StyledButton = styled.button<Omit<ButtonProps, 'children'>>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fonts.medium.fontWeight};
  letter-spacing: ${theme.fonts.medium.letterSpacing};
  cursor: pointer;
  transition: ${theme.transitions.spring};
  position: relative;
  outline: none;
  text-decoration: none;
  font-family: inherit;
  user-select: none;
  
  /* Size styles */
  ${props => getSizeStyles(props.size || 'md')}
  
  /* Variant styles */
  ${props => getVariantStyles(props.variant || 'primary')}
  
  /* Full width */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Focus styles */
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  
  /* Disabled styles */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  /* Loading styles */
  ${props => props.loading && css`
    cursor: wait;
    opacity: 0.7;
  `}
  
  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  
  /* Ripple effect */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    transform: scale(0);
    opacity: 0;
    transition: ${theme.transitions.fast};
    pointer-events: none;
  }
  
  &:active::after {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      // Pequeña vibración en dispositivos móviles
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      onClick();
    }
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      loading={loading}
      onClick={handleClick}
      type={type}
      className={className}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </StyledButton>
  );
};

export default Button;