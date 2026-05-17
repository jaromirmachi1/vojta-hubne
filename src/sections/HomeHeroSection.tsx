import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LaunchBackground } from '../components/backgrounds/LaunchBackground'
import { PageContainer } from '../components/PageContainer'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 2rem;
  padding-block: clamp(3rem, 8vw, 5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 4rem;
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
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Title = styled.h1`
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
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(238, 220, 130, 0.06);
  }
`

const Visual = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`

const VisualCard = styled.div`
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(8px);

  &:first-child {
    grid-column: 1 / -1;
  }
`

const VisualTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const VisualText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function HomeHeroSection() {
  return (
    <Section>
      <LaunchBackground />
      <Inner>
        <Content>
          <Eyebrow>Prémiová řada GLP-1</Eyebrow>
          <Title>Transformace, která má váhu</Title>
          <Lead>
            Vojta Hubne — značka postavená na reálné cestě z 150 kg na 85 kg.
            Doplňky stravy a regenerační péče pro ty, kteří chtějí výsledky, ne
            prázdné sliby.
          </Lead>
          <Stats>
            <Stat>
              <StatValue>150→85</StatValue>
              <StatLabel>Kilogramů pryč</StatLabel>
            </Stat>
            <Stat>
              <StatValue>4</StatValue>
              <StatLabel>Flagship produkty</StatLabel>
            </Stat>
          </Stats>
          <Actions>
            <PrimaryLink to="/homepage#produkty">Nejprodávanější</PrimaryLink>
            <SecondaryLink to="/">Spouštíme brzy</SecondaryLink>
          </Actions>
        </Content>
        <Visual aria-hidden>
          <VisualCard>
            <VisualTitle>GLP-1 Support</VisualTitle>
            <VisualText>Energie · Spalování · Kontrola chuti</VisualText>
          </VisualCard>
          <VisualCard>
            <VisualTitle>Lean Shake</VisualTitle>
            <VisualText>Sytost · Kontrola · Výsledky</VisualText>
          </VisualCard>
          <VisualCard>
            <VisualTitle>Regenerace</VisualTitle>
            <VisualText>Krémy GHK-Cu & Emulfeel®</VisualText>
          </VisualCard>
        </Visual>
      </Inner>
    </Section>
  )
}
