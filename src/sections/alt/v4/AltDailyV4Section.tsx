import styled from 'styled-components'
import { ALT_V4_SECTION_IDS, altV4Daily, altV4DailyCopy } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { V4Eyebrow, V4Inner, V4Section, V4Title } from './shared'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Card = styled.div`
  display: flex;
  gap: 0.9rem;
  padding: 1rem;
  border-radius: 1.125rem;
  background: ${altV4.paper};
  border: 1px solid ${altV4.line};
`

const Time = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 999px;
  background: ${altV4.black};
  color: ${altV4.gold};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.95rem;
  letter-spacing: 0.04em;
`

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Text = styled.p`
  margin: 0.3rem 0 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${altV4.ink2};
`

const Foot = styled.p`
  margin: 0.9rem 0 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${altV4.ink2};
`

export function AltDailyV4Section() {
  return (
    <V4Section
      $tone="paper2"
      id={ALT_V4_SECTION_IDS.daily}
      aria-labelledby="alt-v4-daily-title"
    >
      <V4Inner>
        <V4Eyebrow>{altV4DailyCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-daily-title">{altV4DailyCopy.title}</V4Title>
        <Stack>
          {altV4Daily.map((item) => (
            <Card key={item.time}>
              <Time>{item.time}</Time>
              <div>
                <Title>{item.title}</Title>
                <Text>{item.text}</Text>
              </div>
            </Card>
          ))}
        </Stack>
        <Foot>{altV4DailyCopy.footnote}</Foot>
      </V4Inner>
    </V4Section>
  )
}
