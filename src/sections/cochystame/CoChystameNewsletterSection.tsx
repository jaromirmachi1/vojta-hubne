import styled from 'styled-components'
import { PageContainer } from '../../components/PageContainer'
import { SignupForm } from '../../components/cochystame/SignupForm'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`

const Inner = styled(PageContainer)`
  padding-block: clamp(3.75rem, 7vw, 5.6rem);
  display: grid;
  gap: 2.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 4rem;
  }
`

const SectionNumber = styled.span`
  display: inline-flex;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(11, 11, 9, 0.75);
`

const Title = styled.h2`
  margin: 1rem 0 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 5.2vw, 4.3rem);
  line-height: 0.92;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const TitleEm = styled.em`
  font-style: normal;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.black};
`

const Text = styled.p`
  margin: 0.95rem 0 0;
  line-height: 1.8;
  color: rgba(11, 11, 9, 0.72);
  font-size: 1.05rem;
  max-width: 60ch;
`

const Right = styled.div`
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.6rem 1.4rem;
`

const RightTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.92);
`

export function CoChystameNewsletterSection() {
  return (
    <Section>
      <Inner>
        <div>
          <SectionNumber>Buďte u toho</SectionNumber>
          <Title>
            ŽÁDNÉ PRÁZDNÉ SLIBY.
            <br />
            <TitleEm>JEN POTVRZENÉ NOVINKY.</TitleEm>
          </Title>
          <Text>
            Produkty nevznikají za zavřenými dveřmi. Pravidelně sdílíme průběh
            vývoje, testování i nové nápady — a vaše zpětná vazba nám pomáhá
            vytvořit produkty, které budou mít skutečný přínos.
          </Text>
        </div>

        <Right>
          <RightTitle>Chci vědět jako první</RightTitle>
          <SignupForm variant="gold" />
        </Right>
      </Inner>
    </Section>
  )
}

