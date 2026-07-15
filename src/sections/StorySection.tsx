import styled from 'styled-components'
import transformationImage from '../assets/vojtazhubl.png'
import { PageContainer } from '../components/PageContainer'
import { eyebrowText } from '../styles/eyebrow'

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
  letter-spacing: 0.22em;
  ${eyebrowText}
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

const CommunityLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  align-self: flex-start;
  margin-top: 0.75rem;
  padding: 0.85rem 1.1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition:
    background 0.2s ease,
    color 0.2s ease,
    gap 0.2s ease;

  &::after {
    content: '→';
    display: inline-block;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(238, 220, 130, 0.06);

    &::after {
      transform: translateX(3px);
    }
  }
`

const VisualColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`

const TransformationFigure = styled.figure`
  margin: 0;
  width: 100%;
`

const TransformationFrame = styled.div`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.black};
`

const TransformationImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center center;
`

const Quote = styled.blockquote`
  margin: 0;
  padding: 2rem;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.xl};
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
    letter-spacing: 0.16em;
    ${eyebrowText}
  }
`

export function StorySection() {
  return (
    <Section id="pribeh">
      <Inner>
        <Content>
          <Eyebrow>Příběh značky</Eyebrow>
          <Title>Od 160 kg k novému životu</Title>
          <Text>
            Vojta si prošel celoživotním bojem s obezitou. Po letech neúspěšných
            pokusů, zdravotních komplikacích a váze 160 kg se v roce 2024 rozhodl
            převzít kontrolu nad svým zdravím. Díky kombinaci změny životního
            stylu, disciplíny a moderní léčby dokázal zhubnout 61
            kilogramů a zásadně zlepšit kvalitu svého života.
          </Text>
          <Text>
            Dnes otevřeně sdílí své zkušenosti, boří mýty o obezitě a pomáhá
            lidem pochopit, že obezita není selhání charakteru, ale komplexní
            onemocnění. Je zakladatelem komunity Cesta z obezity, kde podporuje
            tisíce lidí na jejich vlastní cestě ke zdravějšímu životu.
          </Text>
          <CommunityLink
            href="https://www.cestazobezity.cz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cesta z obezity
          </CommunityLink>
        </Content>
        <VisualColumn>
          <TransformationFigure>
            <TransformationFrame>
              <TransformationImage
                src={transformationImage}
                alt="Vojta Hubne — transformace před a po: cesta z 160 kg na 99 kg"
                width={1942}
                height={1924}
                loading="lazy"
                decoding="async"
              />
            </TransformationFrame>
          </TransformationFigure>
          <Quote>
            <p>
              „Nechci prodávat zázrak za týden. Chci dát lidem nástroje, které mi
              samotnému pomohly vydržet a dotáhnout to.“
            </p>
            <footer>— Vojta Hubne</footer>
          </Quote>
        </VisualColumn>
      </Inner>
    </Section>
  )
}
