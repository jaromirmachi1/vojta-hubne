import styled from 'styled-components'
import tisicataHeroPromoImage from '../assets/tisicata-hero-promo.png'
import { LaunchBackground } from '../components/backgrounds/LaunchBackground'
import { HashLink } from '../components/HashLink'
import { PageContainer } from '../components/PageContainer'
import { eyebrowText } from '../styles/eyebrow'
import { getShopifyCatalogUrl, getShopifyProductUrl } from '../utils/shopify'

const TISICATA_PRODUCT_URL =
  `${getShopifyProductUrl('lean-shake-slany-karamel-aquamin-mg')}?variant=60361804480846`

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: ${({ theme }) => theme.layout.heroMinHeight};
  min-height: ${({ theme }) => theme.layout.heroMinHeightDvh};
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
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
  letter-spacing: 0.16em;
  ${eyebrowText}
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const PrimaryLink = styled(HashLink)`
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
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const SecondaryLink = styled.a`
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
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(238, 220, 130, 0.06);
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

const BundleCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.85rem;
  padding: 1rem 1.75rem;
  border: 0;
  font: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

export function HomeHeroSection() {
  const catalogUrl = getShopifyCatalogUrl()

  return (
    <Section>
      <LaunchBackground />
      <Inner>
        <Content>
          <Eyebrow>Prémiová řada GLP-1</Eyebrow>
          <Title>Transformace, která má váhu</Title>
          <Lead>
            Vojta Hubne — značka postavená na reálné cestě z 160 kg na 99 kg.
            Doplňky stravy a regenerační péče pro ty, kteří chtějí výsledky, ne
            prázdné sliby.
          </Lead>
          <Stats>
            <Stat>
              <StatValue>160→99</StatValue>
              <StatLabel>Kilogramů pryč</StatLabel>
            </Stat>
            <Stat>
              <StatValue>4</StatValue>
              <StatLabel>Flagship produkty</StatLabel>
            </Stat>
          </Stats>
          <Actions>
            <PrimaryLink sectionId="produkty">Nejprodávanější</PrimaryLink>
            <SecondaryLink href={catalogUrl}>Nakupovat v e-shopu</SecondaryLink>
          </Actions>
        </Content>
        <Portrait>
          <PortraitFrame>
            <PortraitImage
              src={tisicataHeroPromoImage}
              alt="Tisící objednávka — děkovný set Slaný karamel + Aquamin Mg, jen 50 ks za 949 Kč."
              width={1024}
              height={768}
              fetchPriority="high"
              decoding="async"
            />
          </PortraitFrame>
          <BundleCta href={TISICATA_PRODUCT_URL}>Nakoupit balíček</BundleCta>
        </Portrait>
      </Inner>
    </Section>
  )
}
