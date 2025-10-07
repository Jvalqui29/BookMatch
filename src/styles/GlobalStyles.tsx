import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Font loaded via <link> in public/index.html to avoid CSSOM @import issues with createGlobalStyle */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: radial-gradient(circle at 10% 10%, rgba(102,78,255,0.06), transparent 10%), linear-gradient(180deg, #0b1226 0%, #12122a 30%, #211a3a 100%);
    color: #E6EEF8;
    line-height: 1.6;
    letter-spacing: -0.01em;
    overflow-x: hidden;
  }

  /* Dark theme mejorado */
  body[data-theme='dark'] {
    background: linear-gradient(180deg, #070617 0%, #12092a 40%, #20103a 100%);
    color: #F8FAFF;
  }

  body[data-theme='dark'] a { 
    color: #A78BFA; 
    &:hover { color: #C4B5FD; }
  }

  body[data-theme='dark'] input,
  body[data-theme='dark'] textarea,
  body[data-theme='dark'] select {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(52, 73, 94, 0.5);
    color: #F1F5F9;
    backdrop-filter: blur(10px);
  }
  
  body[data-theme='dark'] input::placeholder,
  body[data-theme='dark'] textarea::placeholder { 
    color: #64748B; 
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* Tipografía mejorada */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
    color: inherit;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Header más pequeño por defecto para una UI más minimalista */
  header, .app-header {
    padding: 0.6rem 1rem;
    height: 56px;
    display: flex;
    align-items: center;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 600;
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  h5 {
    font-size: 1.125rem;
    font-weight: 500;
  }

  h6 {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: #4A5568;
  }

  /* Enlaces mejorados */
  a {
    color: #667EEA;
    text-decoration: none;
    transition: all 0.25s ease;
    position: relative;

    &:hover {
      color: #5A67D8;
      transform: translateY(-1px);
    }

    &:focus {
      outline: 2px solid #667EEA;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  /* Botones mejorados */
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: 8px;
    font-weight: 500;
    letter-spacing: -0.01em;
    position: relative;
    overflow: hidden;

    &:focus {
      outline: 2px solid #667EEA;
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      transform: none !important;
    }

    &:not(:disabled):hover {
      transform: translateY(-2px);
    }

    &:not(:disabled):active {
      transform: translateY(0);
    }
  }

  /* Campos de entrada mejorados */

  /* Campos de entrada mejorados */
  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    padding: 0.875rem 1rem;
    transition: all 0.25s ease;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    font-weight: 400;
    letter-spacing: -0.01em;

    &:focus {
      outline: none;
      border-color: #667EEA;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
    }

    &::placeholder {
      color: #A0AEC0;
      font-weight: 400;
    }

    &:hover:not(:focus) {
      border-color: #CBD5E0;
    }
  }

  /* Scrollbar moderno */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(226, 232, 240, 0.3);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667EEA, #764BA2);
    border-radius: 3px;
    transition: all 0.2s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5A67D8, #553C9A);
  }

  /* Animaciones mejoradas */
  @keyframes fadeIn {
    0% { 
      opacity: 0; 
      transform: translateY(20px) scale(0.95);
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slideUp {
    0% { 
      opacity: 0; 
      transform: translateY(30px);
    }
    100% { 
      opacity: 1; 
      transform: translateY(0);
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -8px, 0);
    }
    70% {
      transform: translate3d(0, -4px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Clases de utilidad para animaciones */
  .fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }

  .slide-up {
    animation: slideUp 0.3s ease-out forwards;
  }

  .bounce {
    animation: bounce 0.6s ease-in-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Efectos glassmorphism */
  .glass {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .glass-dark {
    background: rgba(15, 23, 42, 0.25);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Responsive Design mejorado */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }

    body {
      line-height: 1.5;
    }

    h1 {
      font-size: clamp(1.75rem, 6vw, 2.5rem);
    }

    h2 {
      font-size: clamp(1.5rem, 5vw, 2rem);
    }

    h3 {
      font-size: clamp(1.25rem, 4vw, 1.5rem);
    }

    input, textarea, select {
      font-size: 16px; /* Evita zoom en iOS */
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 14px;
    }
    
    input, textarea, select {
      padding: 0.75rem;
    }
  }

  /* Estados de carga mejorados */
  .loading-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
  }

  /* Accesibilidad mejorada */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Print Styles mejorados */
  @media print {
    * {
      color: black !important;
      background: white !important;
      box-shadow: none !important;
    }
    
    a {
      text-decoration: underline !important;
    }
  }

  /* Focus visible para mejor accesibilidad */
  :focus-visible {
    outline: 2px solid #667EEA;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

