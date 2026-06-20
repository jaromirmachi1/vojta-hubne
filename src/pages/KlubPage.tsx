import styled from 'styled-components'
import { KlubNewsletterForm } from '../components/KlubNewsletterForm'
import { PageContainer } from '../components/PageContainer'
import { klubPerks } from '../data/klub'
import { usePageMeta } from '../hooks/usePageMeta'
import { AltShopLayout } from '../layouts/AltShopLayout'
import { klubPageMeta } from '../seo/klubPageMeta'
import { eyebrowText } from '../styles/eyebrow'

const Section = styled.section`
  padding-block: clamp(3rem, 8vw, 5rem);
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: clamp(1.5rem, 4vw, 2rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: stretch;
  }
`

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(145deg, rgba(238, 220, 130, 0.14), rgba(238, 220, 130, 0.03) 55%),
    ${({ theme }) => theme.colors.surfaceRaised};
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  line-height: 0.95;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Lead = styled.p`
  margin: 0;
  font-size: clamp(1rem, 2.2vw, 1.125rem);
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Perks = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1.5rem;
  }
`

const Perk = styled.li`
  position: relative;
  padding-left: 1.35rem;
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gold};
  }
`

const FormPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const FormTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 4vw, 2rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`

const FormLead = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function KlubPage() {
  usePageMeta(klubPageMeta)

  return (
    <AltShopLayout>
      <Section>
        <Inner>
          <Intro>
            <Eyebrow>Členství připravujeme</Eyebrow>
            <Title>Vojta Hubne klub</Title>
            <Lead>
              Pracujeme na uzavřené komunitě pro lidi, kteří s námi hubnou
              dlouhodobě — ne na rychlý efekt, ale na reálnou změnu. Klub
              spustíme brzy. Zanechte e-mail a dáme vám vědět jako prvním.
            </Lead>
            <Perks>
              {klubPerks.map((perk) => (
                <Perk key={perk}>{perk}</Perk>
              ))}
            </Perks>
          </Intro>

          <FormPanel>
            <FormTitle>Předběžný přístup</FormTitle>
            <FormLead>
              Přihlaste se k odběru. Až bude klub ready, pošleme vám pozvánku
              s přístupem dřív než ostatním.
            </FormLead>
            <KlubNewsletterForm />
          </FormPanel>
        </Inner>
      </Section>
    </AltShopLayout>
  )
}
