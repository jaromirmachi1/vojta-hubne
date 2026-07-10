import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { eyebrowText } from '../styles/eyebrow'
import heroBannerImage from '../assets/vhbanner+.webp'
import { LaunchBackground } from '../components/backgrounds/LaunchBackground'
import { HashLink } from '../components/HashLink'
import { PageContainer } from '../components/PageContainer'
import { getShopifyCatalogUrl } from '../utils/shopify'

const RESTART_PROMO_CODE = '30STARTSVOJTOU'

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
    grid-template-columns: 1.1fr 0.9fr;
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
  max-width: 28rem;
  justify-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-self: end;
    max-width: none;
  }
`

const PortraitFrame = styled.div`
  position: relative;
  aspect-ratio: 1573 / 1713;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.black};
`

const PortraitImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
`

const CopyCodeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.85rem;
  padding: 0.85rem 1.25rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

export function HomeHeroSection() {
  const catalogUrl = getShopifyCatalogUrl()
  const [codeCopied, setCodeCopied] = useState(false)

  const copyPromoCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(RESTART_PROMO_CODE)
      setCodeCopied(true)
    } catch {
      setCodeCopied(false)
    }
  }, [])

  useEffect(() => {
    if (!codeCopied) return

    const timer = window.setTimeout(() => setCodeCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [codeCopied])

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
              src={heroBannerImage}
              alt="Balíček (re)START je zpět v prodeji — sleva 30 % s kódem 30STARTSVOJTOU"
              width={1573}
              height={1713}
              fetchPriority="high"
              decoding="async"
            />
          </PortraitFrame>
          <CopyCodeButton
            type="button"
            onClick={copyPromoCode}
            aria-label={`Zkopírovat slevový kód ${RESTART_PROMO_CODE}`}
          >
            {codeCopied ? 'Kód zkopírován' : 'Zkopírovat kód 30STARTSVOJTOU'}
          </CopyCodeButton>
        </Portrait>
      </Inner>
    </Section>
  )
}
