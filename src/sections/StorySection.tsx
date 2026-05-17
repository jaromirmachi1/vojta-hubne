import styled from 'styled-components'
import { PageContainer } from '../components/PageContainer'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
`

const Quote = styled.blockquote`
  margin: 0;
  padding: 2rem;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.surfaceRaised};

  p {
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.7;
    font-style: italic;
    color: ${({ theme }) => theme.colors.white};
  }

  footer {
    margin-top: 1rem;
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.goldMuted};
  }
`

export function StorySection() {
  return (
    <Section id="pribeh">
      <Inner>
        <Content>
          <Eyebrow>Příběh značky</Eyebrow>
          <Title>Od 150 kg k novému životu</Title>
          <Text>
            Vojta Hubne není další fitness značka z reklamy. Je to projekt člověka,
            který prošel extrémní transformací — od 150 kilogramů k 85. Ví, co
            znamená boj s váhou, chutí k jídlu i regenerací po tréninku.
          </Text>
          <Text>
            Proto vznikla řada produktů, které pokrývají celý cyklus: kontrolu
            chuti a metabolismus, kvalitní bílkoviny ve shaku i péči o pokožku po
            namáhaném těle. Stejná estetika, stejná kvalita — od kapslí po krém.
          </Text>
        </Content>
        <Quote>
          <p>
            „Nechci prodávat zázrak za týden. Chci dát lidem nástroje, které mi
            samotnému pomohly vydržet a dotáhnout to.“
          </p>
          <footer>— Vojta Hubne</footer>
        </Quote>
      </Inner>
    </Section>
  )
}
