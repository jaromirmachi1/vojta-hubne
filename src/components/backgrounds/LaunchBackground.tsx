import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { Particles } from './Particles'

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
    width: 100%;
    height: 100%;
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
