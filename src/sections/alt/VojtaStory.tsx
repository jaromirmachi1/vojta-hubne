import styled from 'styled-components'
import heroPortrait from '../../assets/SzzEgtimTNU2uqEm_2g6w.JPG.webp'
import { ALT_SECTION_IDS } from '../../data/altHomepage'
import { Reveal } from './motion'
import { AltInner, AltSection, SectionTitle } from './shared'

const Grid = styled.div`
  display: grid;
  gap: clamp(2rem, 5vw, 3rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
    align-items: center;
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const Paragraph = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
`

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.25rem, 4vw, 2.5rem);
  margin-block: 0.5rem;
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 2.75rem);
  line-height: 1;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.gold};
`

const StatLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Portrait = styled.figure`
  margin: 0;
`

const PortraitFrame = styled.div`
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
`

const PortraitImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export function VojtaStory() {
  return (
    <AltSection id={ALT_SECTION_IDS.story}>
      <AltInner>
        <Reveal>
          <SectionTitle>Proč tomu věřím</SectionTitle>
        </Reveal>
        <Grid>
          <Copy>
            <Reveal>
              <Paragraph>
                Ve 160 kilogramech jsem zkusil všechno. Diety, prášky, programy.
                Buď fungovaly měsíc, nebo vůbec. Nikde jsem nenašel systém, který
                by byl postavený na reálném životě člověka, který prostě potřebuje
                zhubnout — bez výmluv a bez sponzorů. Tak jsem si ho vytvořil.
              </Paragraph>
            </Reveal>
            <Reveal delay={0.08}>
              <Stats>
                <Stat>
                  <StatValue>61 kg</StatValue>
                  <StatLabel>pryč</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>3 roky</StatValue>
                  <StatLabel>konzistence</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>0 zkratek</StatValue>
                  <StatLabel>slibů</StatLabel>
                </Stat>
              </Stats>
            </Reveal>
            <Reveal delay={0.12}>
              <Paragraph>
                Neprodávám zázrak. Prodávám to, co mi samotnému chybělo — jasný
                plán, kvalitní složení a produkty, které dávají smysl v běžném dni.
                Když něco nefungovalo, vyhodil jsem to. Co zůstalo, je to, co
                dnes nabízím pod značkou Vojta Hubne.
              </Paragraph>
            </Reveal>
            <Reveal delay={0.16}>
              <Paragraph>
                Pokud hledáš rychlou dietu na týden, tohle není pro tebe. Pokud
                chceš systém, který můžeš žít — a který vznikl z reálné cesty —
                jsi na správném místě.
              </Paragraph>
            </Reveal>
          </Copy>
          <Reveal delay={0.1}>
            <Portrait>
              <PortraitFrame>
                <PortraitImage
                  src={heroPortrait}
                  alt="Vojta Hubne — transformace z 160 kg na 99 kg"
                  loading="lazy"
                />
              </PortraitFrame>
            </Portrait>
          </Reveal>
        </Grid>
      </AltInner>
    </AltSection>
  )
}
