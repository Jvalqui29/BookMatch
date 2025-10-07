export const theme = {
  colors: {
    // Paleta principal moderna - Azul/Púrpura gradient
    primary: '#667EEA', // Azul suave y profesional
    primaryDark: '#5A67D8',
    primaryLight: '#7C3AED',
    primaryGradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    
    // Colores secundarios complementarios
    secondary: '#F093FB', // Rosa moderno
    secondaryDark: '#F368E0',
    accent: '#4ECDC4', // Turquesa para destacar
    accentDark: '#26D0CE',
    
    // Backgrounds con degradados sutiles
    background: '#FAFBFE',
    backgroundGradient: 'linear-gradient(135deg, #FAFBFE 0%, #F7FAFC 100%)',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceGlass: 'rgba(255, 255, 255, 0.95)',
    
    // Sistema de textos mejorado
    text: '#2D3748',
    textSecondary: '#4A5568',
    textTertiary: '#718096',
    textInverse: '#FFFFFF',
    
    // Estados y feedback
    error: '#F56565',
    errorLight: '#FED7D7',
    success: '#48BB78',
    successLight: '#C6F6D5',
    warning: '#ED8936',
    warningLight: '#FEEBC8',
    info: '#4299E1',
    infoLight: '#BEE3F8',
    
    // Elementos de UI
    disabled: '#A0AEC0',
    placeholder: '#A0AEC0',
    backdrop: 'rgba(45, 55, 72, 0.6)',
    overlay: 'rgba(0, 0, 0, 0.1)',
    
    // Cards y contenedores
    card: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
    cardBorder: 'rgba(226, 232, 240, 0.8)',
    
    // Bordes y separadores
    border: '#E2E8F0',
    borderLight: '#F7FAFC',
    borderFocus: '#667EEA',
    
    // Sombras modernas
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowLarge: 'rgba(0, 0, 0, 0.12)',
    shadowColored: 'rgba(102, 126, 234, 0.25)',
  },
  fonts: {
    // Sistema tipográfico más elegante
    regular: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      fontWeight: '400' as const,
      letterSpacing: '-0.01em',
    },
    medium: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      fontWeight: '500' as const,
      letterSpacing: '-0.015em',
    },
    semibold: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      fontWeight: '600' as const,
      letterSpacing: '-0.02em',
    },
    bold: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      fontWeight: '700' as const,
      letterSpacing: '-0.025em',
    },
    light: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      fontWeight: '300' as const,
      letterSpacing: '0em',
    },
    display: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      fontWeight: '800' as const,
      letterSpacing: '-0.03em',
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    '3xl': '3rem',   // 48px
    '4xl': '4rem',   // 64px
    '5xl': '6rem',   // 96px
  },
  borderRadius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '50%',
    pill: '999px',
  },
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    colored: '0 10px 15px -3px rgba(102, 126, 234, 0.4), 0 4px 6px -2px rgba(102, 126, 234, 0.05)',
    glow: '0 0 20px rgba(102, 126, 234, 0.3)',
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070,
  },
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
    spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  animations: {
    fadeIn: 'fadeIn 0.3s ease-out forwards',
    slideUp: 'slideUp 0.3s ease-out forwards',
    bounce: 'bounce 0.6s ease-in-out',
    pulse: 'pulse 2s infinite',
  },
};

export const colors = theme.colors;

