import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Particles } from './Particles'

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  /* Mobile: pin to viewport so WebGL canvas fills the full screen */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    height: 100svh;
    min-height: -webkit-fill-available;
  }
`

const ParticlesHost = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  & > div {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  canvas {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    height: 100svh;
    min-height: -webkit-fill-available;
  }
`

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 55%,
    rgba(0, 0, 0, 0.85) 100%
  );
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    height: 100svh;
    min-height: -webkit-fill-available;
    /* Lighter vignette on mobile so particles stay visible edge-to-edge */
    background: radial-gradient(
      ellipse 90% 80% at 50% 50%,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 60%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }
`

const brandParticleColors = [
  theme.colors.gold,
  theme.colors.goldMuted,
  '#8a7d52',
]

export function LaunchBackground() {
  return (
    <BackgroundLayer>
      <ParticlesHost>
        <Particles
          particleColors={brandParticleColors}
          particleCount={160}
          speed={0.05}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.3}
          particleBaseSize={85}
        />
      </ParticlesHost>
      <Vignette />
    </BackgroundLayer>
  )
}
