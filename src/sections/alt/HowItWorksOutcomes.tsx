import styled, { createGlobalStyle } from 'styled-components'
import vojtaPortrait from '../../assets/vojtahubneprofilovka.png'
import { howItWorksOutcomes } from '../../data/altHomepage'
import { Reveal } from './motion'

const OutcomesScriptFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
`

const Panel = styled.div`
  margin-top: clamp(2.5rem, 6vw, 4rem);
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #f5f0e4;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
`

const Grid = styled.div`
  display: grid;
  gap: clamp(1.75rem, 4vw, 2.5rem);
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.75fr) minmax(0, 0.95fr);
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.1rem, 2.5vw, 1.5rem);
`

const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(1.65rem, 3.5vw, 2.35rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #111111;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: clamp(0.75rem, 1.8vw, 1rem);
`

const ListItem = styled.li`
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-size: clamp(0.88rem, 1.6vw, 0.98rem);
  line-height: 1.55;
  color: #2a2a2a;
`

const Check = styled.span`
  flex-shrink: 0;
  margin-top: 0.15rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  color: #c9a84c;
`

const Lead = styled.strong`
  font-weight: 700;
  color: #111111;
`

const PortraitWrap = styled.figure`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0;
  min-height: clamp(14rem, 32vw, 20rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-self: end;
    margin-bottom: -1.5rem;
  }
`

const PortraitImage = styled.img`
  display: block;
  width: min(100%, 16rem);
  height: auto;
  max-height: clamp(16rem, 38vw, 22rem);
  object-fit: contain;
  object-position: bottom center;
  filter: contrast(1.02) saturate(0.95);
`

const QuoteBlock = styled.blockquote`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  border: 0;
`

const Quote = styled.p`
  margin: 0;
  font-family: 'Italianno', 'Brush Script MT', cursive;
  font-size: clamp(1.65rem, 3.2vw, 2.15rem);
  font-weight: 400;
  line-height: 1.35;
  color: #a8893f;
`

const QuoteRule = styled.div`
  width: min(100%, 12rem);
  height: 2px;
  background: linear-gradient(
    90deg,
    #c9a84c 0%,
    rgba(201, 168, 76, 0.35) 100%
  );
  border-radius: 999px;
`

const Signature = styled.footer`
  font-family: 'Italianno', 'Brush Script MT', cursive;
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1;
  color: #111111;
`

export function HowItWorksOutcomes() {
  return (
    <Panel>
      <OutcomesScriptFont />
      <Grid>
        <Reveal>
          <Copy>
            <Title>{howItWorksOutcomes.title}</Title>
            <List>
              {howItWorksOutcomes.items.map((item) => (
                <ListItem key={item.id}>
                  <Check aria-hidden>✓</Check>
                  <span>
                    <Lead>{item.lead}</Lead>
                    {item.rest}
                  </span>
                </ListItem>
              ))}
            </List>
          </Copy>
        </Reveal>

        <Reveal delay={0.08}>
          <PortraitWrap aria-hidden>
            <PortraitImage
              src={vojtaPortrait}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </PortraitWrap>
        </Reveal>

        <Reveal delay={0.12}>
          <QuoteBlock>
            <Quote>„{howItWorksOutcomes.quote}"</Quote>
            <QuoteRule aria-hidden />
            <Signature>{howItWorksOutcomes.signature}</Signature>
          </QuoteBlock>
        </Reveal>
      </Grid>
    </Panel>
  )
}
