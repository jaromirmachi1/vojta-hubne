import styled from 'styled-components'
import portraitImage from '../../assets/vojtahubneprofilovka.png'
import { AltContactForm } from '../../components/AltContactForm'
import {
  altContactCopy,
  altContactExpectations,
} from '../../data/altContact'
import { ALT_SECTION_IDS } from '../../data/altHomepage'
import { Reveal } from './motion'
import { AltInner, AltSection } from './shared'
import { WhenToWriteSection } from './WhenToWriteSection'

const Grid = styled.div`
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.35rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 1.75rem);
  min-height: 100%;
  padding: clamp(1.35rem, 3vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`

const FormPanel = styled(Panel)`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: clamp(1.5rem, 3vw, 2.25rem);
  }
`

const ExpectPanel = styled(Panel)`
  position: relative;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-bottom: clamp(8rem, 16vw, 11rem);
  }
`

const PanelTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.65rem, 3.5vw, 2.25rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Benefits = styled.ul`
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.35rem);
  margin: 0;
  padding: 0;
  list-style: none;
`

const Benefit = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem;
  align-items: start;
`

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`

const BenefitCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const BenefitTitle = styled.h3`
  margin: 0;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.white};
`

const BenefitText = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Portrait = styled.img`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
    position: absolute;
    right: -0.5rem;
    bottom: 0;
    width: min(46%, 14rem);
    height: auto;
    object-fit: contain;
    pointer-events: none;
  }
`

function ExpectationIcon({ id }: { id: string }) {
  switch (id) {
    case 'response':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'tailored':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2" strokeLinecap="round" />
        </svg>
      )
    case 'honest':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path
            d="M12 20.5c-3.5-2.2-6-4.8-6-8.2C6 9.02 8.69 6.5 12 6.5s6 2.52 6 5.8c0 3.4-2.5 6-6 8.2Z"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return null
  }
}

export function ContactSection() {
  return (
    <AltSection id={ALT_SECTION_IDS.contact}>
      <AltInner>
        <Grid>
          <Reveal>
            <FormPanel>
              <PanelTitle>{altContactCopy.formTitle}</PanelTitle>
              <AltContactForm />
            </FormPanel>
          </Reveal>

          <Reveal delay={0.08}>
            <ExpectPanel>
              <PanelTitle>{altContactCopy.expectationsTitle}</PanelTitle>
              <Benefits>
                {altContactExpectations.map((item) => (
                  <Benefit key={item.id}>
                    <IconWrap>
                      <ExpectationIcon id={item.id} />
                    </IconWrap>
                    <BenefitCopy>
                      <BenefitTitle>{item.title}</BenefitTitle>
                      <BenefitText>{item.description}</BenefitText>
                    </BenefitCopy>
                  </Benefit>
                ))}
              </Benefits>
              <Portrait
                src={portraitImage}
                alt="Vojta Hubne"
                loading="lazy"
              />
            </ExpectPanel>
          </Reveal>
        </Grid>

        <WhenToWriteSection />
      </AltInner>
    </AltSection>
  )
}
