import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
`;

const shimmer = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const galaxyRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const nebulaPulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const floatPages = keyframes`
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100px) rotate(15deg); opacity: 0; }
`;

const paperTexture = keyframes`
  0%, 100% { opacity: 0.02; }
  50% { opacity: 0.05; }
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: 
    /* Textura de papel muy sutil */
    radial-gradient(circle at 25% 25%, transparent 2px, rgba(255,255,255,0.01) 2px),
    radial-gradient(circle at 75% 75%, transparent 1px, rgba(255,255,255,0.02) 1px),
    /* Nebulosas cósmicas */
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
    /* Gradiente principal del universo */
    linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #764ba2 75%, #667eea 100%);
  background-size: 
    3px 3px,
    2px 2px,
    400% 400%,
    400% 400%,
    400% 400%,
    400% 400%;
  animation: ${gradientShift} 20s ease infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 98px,
        rgba(255,255,255,0.01) 99px,
        rgba(255,255,255,0.01) 100px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(255,255,255,0.01) 99px,
        rgba(255,255,255,0.01) 100px
      );
    animation: ${paperTexture} 8s ease-in-out infinite;
    pointer-events: none;
  }
`;

const Star = styled.div<{
  top: string;
  left: string;
  delay: string;
  size: string;
}>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.8) 30%, transparent 70%);
  border-radius: 50%;
  animation: ${twinkle} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  box-shadow: 
    0 0 6px rgba(255,255,255,0.6),
    0 0 12px rgba(255,255,255,0.4),
    0 0 18px rgba(255,255,255,0.2);
`;

const Galaxy = styled.div<{
  top: string;
  left: string;
  delay: string;
  size: string;
}>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: 
    radial-gradient(ellipse 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle, rgba(120, 119, 198, 0.3) 0%, rgba(255, 119, 198, 0.2) 50%, transparent 70%);
  border-radius: 50%;
  animation: ${galaxyRotate} 60s linear infinite;
  animation-delay: ${props => props.delay};
  opacity: 0.6;
  transform-origin: center;
`;

const Nebula = styled.div<{
  top: string;
  left: string;
  delay: string;
  size: string;
}>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: 
    radial-gradient(ellipse 80% 60%, rgba(120, 119, 198, 0.2) 0%, rgba(255, 119, 198, 0.1) 40%, transparent 70%),
    radial-gradient(ellipse 60% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
  border-radius: 60% 40% 80% 20%;
  animation: ${nebulaPulse} 8s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  filter: blur(1px);
  opacity: 0.7;
`;

const CosmicParticle = styled.div<{
  top: string;
  left: string;
  delay: string;
  size: string;
}>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  font-size: ${props => props.size};
  animation: ${shimmer} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  opacity: 0.8;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 
    0 0 10px rgba(255,255,255,0.5),
    0 0 20px rgba(120, 119, 198, 0.3);
`;

const FloatingPage = styled.div<{
  left: string;
  delay: string;
  duration: string;
}>`
  position: absolute;
  left: ${props => props.left};
  width: 20px;
  height: 28px;
  background: 
    linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: 2px;
  animation: ${floatPages} ${props => props.duration} linear infinite;
  animation-delay: ${props => props.delay};
  opacity: 0;
  box-shadow: 
    0 2px 8px rgba(0,0,0,0.1),
    inset 1px 1px 0 rgba(255,255,255,0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 2px;
    right: 2px;
    height: 1px;
    background: rgba(255,255,255,0.08);
    box-shadow: 
      0 3px 0 rgba(255,255,255,0.06),
      0 6px 0 rgba(255,255,255,0.04),
      0 9px 0 rgba(255,255,255,0.04),
      0 12px 0 rgba(255,255,255,0.04);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    right: 1px;
    width: 0;
    height: 0;
    border-left: 3px solid rgba(255,255,255,0.1);
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }
`;

const BookshelfBackground: React.FC = () => {
  // Estrellas pequeñas y grandes
  const stars = [
    { top: '5%', left: '10%', delay: '0s', size: '2px' },
    { top: '15%', left: '85%', delay: '1s', size: '3px' },
    { top: '8%', left: '45%', delay: '2s', size: '1px' },
    { top: '25%', left: '20%', delay: '0.5s', size: '2px' },
    { top: '12%', left: '75%', delay: '1.5s', size: '4px' },
    { top: '30%', left: '5%', delay: '2.5s', size: '2px' },
    { top: '18%', left: '60%', delay: '0.8s', size: '3px' },
    { top: '35%', left: '90%', delay: '1.8s', size: '2px' },
    { top: '40%', left: '35%', delay: '3s', size: '1px' },
    { top: '45%', left: '70%', delay: '0.3s', size: '3px' },
    { top: '55%', left: '15%', delay: '2.2s', size: '2px' },
    { top: '50%', left: '80%', delay: '1.2s', size: '4px' },
    { top: '65%', left: '25%', delay: '2.8s', size: '2px' },
    { top: '70%', left: '55%', delay: '0.7s', size: '3px' },
    { top: '75%', left: '8%', delay: '1.7s', size: '1px' },
    { top: '80%', left: '85%', delay: '2.3s', size: '2px' },
    { top: '85%', left: '40%', delay: '0.9s', size: '3px' },
    { top: '90%', left: '65%', delay: '1.9s', size: '2px' },
  ];

  // Galaxias espirales
  const galaxies = [
    { top: '20%', left: '30%', delay: '0s', size: '60px' },
    { top: '60%', left: '75%', delay: '10s', size: '45px' },
    { top: '75%', left: '20%', delay: '20s', size: '50px' },
  ];

  // Nebulosas
  const nebulas = [
    { top: '10%', left: '70%', delay: '0s', size: '100px' },
    { top: '45%', left: '10%', delay: '3s', size: '80px' },
    { top: '70%', left: '60%', delay: '6s', size: '90px' },
  ];

  // Partículas cósmicas (constelaciones)
  const cosmicParticles = [
    { icon: '✦', top: '22%', left: '50%', delay: '0s', size: '16px' },
    { icon: '✧', top: '38%', left: '40%', delay: '2s', size: '14px' },
    { icon: '⋆', top: '58%', left: '85%', delay: '4s', size: '18px' },
    { icon: '✦', top: '28%', left: '88%', delay: '1s', size: '15px' },
    { icon: '⋄', top: '82%', left: '30%', delay: '3s', size: '17px' },
    { icon: '✧', top: '48%', left: '95%', delay: '1.5s', size: '13px' },
    { icon: '⋆', top: '68%', left: '45%', delay: '2.8s', size: '16px' },
    { icon: '✦', top: '88%', left: '75%', delay: '0.8s', size: '14px' },
  ];

  // Páginas flotantes (efecto muy sutil)
  const floatingPages = [
    { left: '10%', delay: '0s', duration: '25s' },
    { left: '20%', delay: '8s', duration: '30s' },
    { left: '35%', delay: '15s', duration: '28s' },
    { left: '50%', delay: '5s', duration: '32s' },
    { left: '65%', delay: '12s', duration: '26s' },
    { left: '80%', delay: '20s', duration: '29s' },
    { left: '90%', delay: '3s', duration: '27s' },
    { left: '25%', delay: '18s', duration: '31s' },
  ];

  return (
    <BackgroundContainer>
      {/* Estrellas brillantes */}
      {stars.map((star, index) => (
        <Star
          key={`star-${index}`}
          top={star.top}
          left={star.left}
          delay={star.delay}
          size={star.size}
        />
      ))}
      
      {/* Galaxias en rotación */}
      {galaxies.map((galaxy, index) => (
        <Galaxy
          key={`galaxy-${index}`}
          top={galaxy.top}
          left={galaxy.left}
          delay={galaxy.delay}
          size={galaxy.size}
        />
      ))}
      
      {/* Nebulosas pulsantes */}
      {nebulas.map((nebula, index) => (
        <Nebula
          key={`nebula-${index}`}
          top={nebula.top}
          left={nebula.left}
          delay={nebula.delay}
          size={nebula.size}
        />
      ))}
      
      {/* Constelaciones */}
      {cosmicParticles.map((particle, index) => (
        <CosmicParticle
          key={`cosmic-${index}`}
          top={particle.top}
          left={particle.left}
          delay={particle.delay}
          size={particle.size}
        >
          {particle.icon}
        </CosmicParticle>
      ))}
      
      {/* Páginas flotantes sutiles */}
      {floatingPages.map((page, index) => (
        <FloatingPage
          key={`page-${index}`}
          left={page.left}
          delay={page.delay}
          duration={page.duration}
        />
      ))}
    </BackgroundContainer>
  );
};

export default BookshelfBackground;