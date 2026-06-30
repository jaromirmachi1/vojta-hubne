import styled from 'styled-components'
import portraitImage from '../../assets/vojtahubneprofilovka.png'
import {
  regimeGuideCtaCopy,
  regimeGuideCtaTraits,
  regimeGuideWhyCopy,
  regimeGuideWhyItems,
} from '../../data/altRegimeGuide'
import { ALT_SECTION_IDS } from '../../data/altHomepage'
import { scrollToSection } from '../../utils/scrollToSection'
import { Reveal } from './motion'
import { AltInner, AltSection, PrimaryButton, altMobileImage, altMobileImageFrame } from './shared'

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.35rem);
`

const GuideCard = styled.div`
  min-width: 0;
  padding: clamp(1.35rem, 3vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    radial-gradient(
      ellipse 80% 50% at 85% 100%,
      rgba(238, 220, 130, 0.08),
      transparent 60%
    ),
    radial-gradient(
      ellipse 60% 40% at 10% 0%,
      rgba(238, 220, 130, 0.05),
      transparent 55%
    ),
    ${({ theme }) => theme.colors.surfaceRaised};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.24);
`

const CtaCard = styled(GuideCard)`
  padding-block: clamp(1.25rem, 2.6vw, 1.75rem);
`

const WhyHeader = styled.h2`
  margin: 0 0 clamp(1.15rem, 3vw, 1.5rem);
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.55rem, 3.5vw, 2.15rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const WhyWhite = styled.span`
  color: ${({ theme }) => theme.colors.white};
`

const WhyGold = styled.span`
  color: ${({ theme }) => theme.colors.gold};
`

const WhyGrid = styled.div`
  display: grid;
  gap: 0.85rem;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const WhyCell = styled.div`
  height: 100%;
  display: flex;
`

const WhyItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  min-height: 8.5rem;
  padding: clamp(1rem, 2vw, 1.15rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(0, 0, 0, 0.22);
`

const WhyIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 1.45rem;
    height: 1.45rem;
  }
`

const WhyTitle = styled.h3`
  margin: 0;
  min-height: 2.7em;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.white};
`

const WhyText = styled.p`
  margin: 0;
  margin-top: auto;
  font-size: 0.78rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.5rem);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(13rem, auto) minmax(6.5rem, 0.32fr);
    gap: clamp(1rem, 2vw, 1.5rem);
  }
`

const CtaCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
  max-width: 28rem;
`

const CtaLead = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`

const CtaHeadline = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const CtaSubtitle = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  text-align: center;
`

const CtaButton = styled(PrimaryButton)`
  width: 100%;
  max-width: 18rem;
  padding: 0.85rem 1.35rem;
  font-size: 0.65rem;
  white-space: normal;
  text-align: center;
  line-height: 1.45;
`

const Traits = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Trait = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};

  svg {
    width: 0.95rem;
    height: 0.95rem;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Visual = styled.figure`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0;
  min-height: clamp(8rem, 18vw, 10rem);
  ${altMobileImageFrame}

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: flex-end;
  }
`

const VisualGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 65% at 55% 50%,
    rgba(238, 220, 130, 0.2) 0%,
    rgba(238, 220, 130, 0.06) 45%,
    transparent 72%
  );
  pointer-events: none;
`

const Portrait = styled.img`
  position: relative;
  z-index: 1;
  display: block;
  width: min(100%, 8.5rem);
  height: auto;
  object-fit: contain;
  object-position: bottom center;
  ${altMobileImage}

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: min(100%, 9.5rem);
  }
`

function WhyIconSvg({ id }: { id: string }) {
  switch (id) {
    case 'situation':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2" strokeLinecap="round" />
        </svg>
      )
    case 'efficiency':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 9h6M9 13h6M9 17h4" strokeLinecap="round" />
        </svg>
      )
    case 'mistakes':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 3 4 7v6c0 5 3.5 8 8 8s8-3 8-8V7l-8-4Z" strokeLinejoin="round" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'support':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5M13 19c0-2 1.5-3.5 3-3.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

function TraitIcon({ id }: { id: string }) {
  switch (id) {
    case 'fast':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" strokeLinecap="round" />
        </svg>
      )
    case 'simple':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'free':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}

export function RegimeGuideSection() {
  return (
    <AltSection>
      <AltInner>
        <Reveal>
          <Shell>
            <GuideCard>
              <WhyHeader>
                <WhyWhite>{regimeGuideWhyCopy.title} </WhyWhite>
                <WhyGold>{regimeGuideWhyCopy.titleAccent}</WhyGold>
              </WhyHeader>
              <WhyGrid>
                {regimeGuideWhyItems.map((item, index) => (
                  <Reveal key={item.id} delay={index * 0.05}>
                    <WhyCell>
                      <WhyItem>
                      <WhyIcon>
                        <WhyIconSvg id={item.id} />
                      </WhyIcon>
                      <WhyTitle>{item.title}</WhyTitle>
                      <WhyText>{item.description}</WhyText>
                    </WhyItem>
                    </WhyCell>
                  </Reveal>
                ))}
              </WhyGrid>
            </GuideCard>

            <CtaCard>
              <CtaGrid>
                <Reveal>
                  <CtaCopy>
                    <CtaLead>{regimeGuideCtaCopy.lead}</CtaLead>
                    <CtaHeadline>{regimeGuideCtaCopy.headline}</CtaHeadline>
                    <CtaSubtitle>{regimeGuideCtaCopy.subtitle}</CtaSubtitle>
                  </CtaCopy>
                </Reveal>

                <Reveal delay={0.08}>
                  <CtaAction>
                    <CtaButton
                      as="button"
                      type="button"
                      onClick={() => scrollToSection(ALT_SECTION_IDS.regimeQuiz)}
                    >
                      {regimeGuideCtaCopy.button}
                    </CtaButton>
                    <Traits>
                      {regimeGuideCtaTraits.map((trait) => (
                        <Trait key={trait.id}>
                          <TraitIcon id={trait.id} />
                          {trait.label}
                        </Trait>
                      ))}
                    </Traits>
                  </CtaAction>
                </Reveal>

                <Reveal delay={0.12}>
                  <Visual>
                    <VisualGlow aria-hidden />
                    <Portrait
                      src={portraitImage}
                      alt="Vojta Hubne"
                      loading="lazy"
                    />
                  </Visual>
                </Reveal>
              </CtaGrid>
            </CtaCard>
          </Shell>
        </Reveal>
      </AltInner>
    </AltSection>
  )
}
