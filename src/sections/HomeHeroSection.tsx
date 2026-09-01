import { useState } from 'react'
import styled from 'styled-components'
import { HashLink } from '../components/HashLink'
import { LaunchBackground } from '../components/backgrounds/LaunchBackground'
import { PageContainer } from '../components/PageContainer'
import { PromoCodeCopyButton } from '../components/PromoCodeCopyButton'
import { homeHeroPromos } from '../data/homeHeroPromos'
import { ALT_SECTION_IDS } from '../data/altHomepage'
import { eyebrowText } from '../styles/eyebrow'
import { getShopifyCatalogUrl } from '../utils/shopify'

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  border-bottom: 0;
  padding-block: clamp(1.5rem, 5vw, 2.25rem) 0.35rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: ${({ theme }) => theme.layout.heroMinHeight};
    min-height: ${({ theme }) => theme.layout.heroMinHeightDvh};
    padding-block: 0;
    overflow: visible;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
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
  max-width: 32rem;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  line-height: 1.7;
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
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.55rem;
`

const PrimaryHashLink = styled(HashLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 3.25rem;
  padding: 0 1.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 1px solid ${({ theme }) => theme.colors.goldMuted};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
  }
`

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 3.25rem;
  padding: 0 1.75rem;
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

const PromoPanel = styled.div`
  display: none;
  position: relative;
  width: 100%;
  min-width: 0;
  justify-self: stretch;
  overflow: visible;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`

const PromoStage = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
`

const PromoViewport = styled.div`
  overflow: hidden;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #e8dccb;
`

const PromoTrack = styled.div<{ $index: number }>`
  display: flex;
  width: 100%;
  transform: translateX(calc(-1 * ${({ $index }) => $index} * 100%));
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const PromoSlide = styled.article`
  flex: 0 0 100%;
  min-width: 0;
  line-height: 0;
`

const PromoFrame = styled.div`
  width: 100%;
  overflow: hidden;
  aspect-ratio: 3 / 2;
`

const PromoImageLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const PromoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const PromoCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.95rem 1.25rem;
  border: 0;
  font: inherit;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
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

const NavButton = styled.button<{ $side: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === 'prev' ? 'left: 0;' : 'right: 0;')}
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  padding: 0;
  border: 0;
  border-radius: 0.65rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  transform: translate(
    ${({ $side }) => ($side === 'prev' ? '-50%' : '50%')},
    -50%
  );
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.goldMuted};
    transform: translate(
        ${({ $side }) => ($side === 'prev' ? '-50%' : '50%')},
        -50%
      )
      scale(1.04);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    box-shadow: none;
  }

  svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2.25;
  }
`

export function HomeHeroSection() {
  const catalogUrl = getShopifyCatalogUrl()
  const [index, setIndex] = useState(0)
  const maxIndex = Math.max(0, homeHeroPromos.length - 1)

  const goPrev = () => setIndex((current) => Math.max(0, current - 1))
  const goNext = () => setIndex((current) => Math.min(maxIndex, current + 1))

  return (
    <Section>
      <LaunchBackground />
      <Inner>
        <Content>
          <Eyebrow>Žádné tajné směsi. Složení, dávky a důvod, proč produkt vznikl.</Eyebrow>
          <Title>Transformace, která má váhu</Title>
          <Lead>
            Vojta Hubne vznikl z reálné cesty ze 160 na 99 kg. Tvoříme doplňky
            stravy, funkční výživu a péči o pokožku pro lidi, kteří chtějí vědět,
            co přesně používají a proč.
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
            <PrimaryHashLink sectionId={ALT_SECTION_IDS.regimeQuiz}>
              Vybrat podle toho, co řeším
            </PrimaryHashLink>
            <SecondaryLink href={catalogUrl}>Prohlednout produkty</SecondaryLink>
          </Actions>
        </Content>

        <PromoPanel aria-label="Aktuální kampaně">
          <PromoStage>
            <PromoViewport>
              <PromoTrack $index={index}>
                {homeHeroPromos.map((promo, promoIndex) => {
                  const image = (
                    <PromoImage
                      src={promo.image}
                      alt={promo.alt}
                      width={promo.width}
                      height={promo.height}
                      fetchPriority={promoIndex === 0 ? 'high' : undefined}
                      loading={promoIndex === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  )

                  return (
                    <PromoSlide key={promo.id}>
                      <PromoFrame>
                        {promo.ctaMode === 'image-link' ? (
                          <PromoImageLink href={promo.href} aria-label={promo.alt}>
                            {image}
                          </PromoImageLink>
                        ) : (
                          image
                        )}
                      </PromoFrame>
                    </PromoSlide>
                  )
                })}
              </PromoTrack>
            </PromoViewport>

            {maxIndex > 0 ? (
              <>
                <NavButton
                  type="button"
                  $side="prev"
                  onClick={goPrev}
                  disabled={index === 0}
                  aria-label="Předchozí banner"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </NavButton>
                <NavButton
                  type="button"
                  $side="next"
                  onClick={goNext}
                  disabled={index >= maxIndex}
                  aria-label="Další banner"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </NavButton>
              </>
            ) : null}
          </PromoStage>

          {homeHeroPromos[index]?.ctaMode === 'copy-code' ? (
            <PromoCodeCopyButton />
          ) : homeHeroPromos[index]?.ctaMode === 'link' ? (
            <PromoCta href={homeHeroPromos[index]?.href ?? '#'}>
              {homeHeroPromos[index]?.ctaLabel}
            </PromoCta>
          ) : null}
        </PromoPanel>
      </Inner>
    </Section>
  )
}
