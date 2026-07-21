import styled from 'styled-components'
import { PageContainer } from '../../components/PageContainer'
import { ArrowIcon } from '../../components/cochystame/ArrowIcon'

const Section = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  scroll-margin-top: calc(
    ${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.layout.promoBarHeight} +
      0.5rem
  );
`

const Inner = styled(PageContainer)`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
`

const Number = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) 0.75fr;
    align-items: end;
    gap: 3rem;
  }
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 5.4vw, 4.8rem);
  line-height: 0.92;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`

const TitleEm = styled.em`
  font-style: normal;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.gold};
`

const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.05rem;
  line-height: 1.8;
`

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0.25rem 0;
  margin-top: 1.15rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};

  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover svg {
    transform: translateX(4px);
  }

  svg {
    color: ${({ theme }) => theme.colors.goldMuted};
    transition: transform 0.2s ease, color 0.2s ease;
  }
`

export function CoChystameLabManifestoSection({
  onOpenLab,
}: {
  onOpenLab: () => void
}) {
  return (
    <Section id="lab">
      <Inner>
        <Number>02 / VOJTA LAB</Number>
        <Layout>
          <div>
            <Title>
              NEJLEPŠÍ PRODUKTY
              <br />
              <TitleEm>NEVZNIKAJÍ V TICHU.</TitleEm>
            </Title>
          </div>
          <div>
            <Copy>
              Proto do vývoje zapojujeme lidi, kteří naše produkty skutečně
              používají. Nápad, hlasování, malý test a až potom rozhodnutí.
            </Copy>
            <ActionButton type="button" onClick={onOpenLab}>
              Jak funguje VOJTA LAB <ArrowIcon />
            </ActionButton>
          </div>
        </Layout>
      </Inner>
    </Section>
  )
}

