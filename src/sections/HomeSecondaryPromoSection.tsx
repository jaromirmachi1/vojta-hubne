import styled from 'styled-components'
import restartHeroPromoImage from '../assets/159ede93-2c6a-47a5-ab52-1fac5d5e1c3c.jpg'
import { LaunchBackground } from '../components/backgrounds/LaunchBackground'
import { PageContainer } from '../components/PageContainer'
import { PromoCodeCopyButton } from '../components/PromoCodeCopyButton'
import { PROMO_BAR_CODE, PROMO_BAR_TEXT } from '../data/promoBar'
import { eyebrowText } from '../styles/eyebrow'

const Section = styled.section`
  position: relative;
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: ${({ theme }) => theme.layout.heroMinHeight};
  min-height: ${({ theme }) => theme.layout.heroMinHeightDvh};
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`

const Inner = styled(PageContainer)`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100%;
  display: grid;
  gap: 2rem;
  padding-block: clamp(2rem, 5vh, 3rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    align-items: center;
    gap: 4rem;
    padding-block: clamp(2.5rem, 6vh, 4rem);
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.75rem, 8vw, 4.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Lead = styled.p`
  margin: 0;
  max-width: 32rem;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 0.5rem;
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.white};
`

const StatLabel = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  ${eyebrowText}
`

const CodeHint = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};

  strong {
    font-weight: 600;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Portrait = styled.figure`
  position: relative;
  margin: 0;
  width: 100%;
  min-width: 0;
  justify-self: stretch;
`

const PortraitFrame = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #e8dccb;
  line-height: 0;
`

const PortraitImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

export function HomeSecondaryPromoSection() {
  return (
    <Section aria-labelledby="home-restart-promo-title">
      <LaunchBackground />
      <Inner>
        <Content>
          <Eyebrow>Akce · sleva 30 %</Eyebrow>
          <Title id="home-restart-promo-title">Balíček (re)START</Title>
          <Lead>{PROMO_BAR_TEXT}</Lead>
          <Stats>
            <Stat>
              <StatValue>30 %</StatValue>
              <StatLabel>Sleva</StatLabel>
            </Stat>
            <Stat>
              <StatValue>31. 8.</StatValue>
              <StatLabel>Platí do</StatLabel>
            </Stat>
          </Stats>
          <CodeHint>
            Slevový kód: <strong>{PROMO_BAR_CODE}</strong>
          </CodeHint>
        </Content>
        <Portrait>
          <PortraitFrame>
            <PortraitImage
              src={restartHeroPromoImage}
              alt="Balíček (re)START — GLP-1 Support, Lean Shake a D3+K2+Vápník se slevou 30 %. Kód 30STARTSVOJTOU."
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
            />
          </PortraitFrame>
          <PromoCodeCopyButton />
        </Portrait>
      </Inner>
    </Section>
  )
}
