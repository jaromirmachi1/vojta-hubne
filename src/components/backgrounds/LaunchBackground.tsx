import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Particles } from './Particles'

/*
 * Keep this absolute inside the hero only.
 * Fixed + dark vignette on mobile was pinning a dim overlay to the viewport
 * while later sections (e.g. Story) scrolled underneath — bright strip at the
 * bottom when 100svh < visual viewport (iOS chrome).
 */
const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
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
`

/** CSS-only ambience when WebGL particles cannot start. */
const StaticFallback = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 55% 45% at 50% 42%,
      rgba(238, 220, 130, 0.14) 0%,
      transparent 70%
    ),
    radial-gradient(
      circle at 18% 72%,
      rgba(201, 181, 106, 0.1) 0%,
      transparent 28%
    ),
    radial-gradient(
      circle at 82% 28%,
      rgba(238, 220, 130, 0.08) 0%,
      transparent 24%
    ),
    radial-gradient(
      circle at 70% 78%,
      rgba(138, 125, 82, 0.12) 0%,
      transparent 22%
    );
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
      <StaticFallback aria-hidden="true" />
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
