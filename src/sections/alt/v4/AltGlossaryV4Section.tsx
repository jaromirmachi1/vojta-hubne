import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4Glossary,
  altV4GlossaryCopy,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { V4Eyebrow, V4Inner, V4Section, V4Title } from './shared'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

const Card = styled.div`
  padding: 1rem;
  border-radius: 1.125rem;
  background: ${altV4.paper2};
  border: 1px solid ${altV4.line};
`

const Term = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.3rem;
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Text = styled.p`
  margin: 0.4rem 0 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${altV4.ink2};
`

export function AltGlossaryV4Section() {
  return (
    <V4Section
      id={ALT_V4_SECTION_IDS.glossary}
      aria-labelledby="alt-v4-glossary-title"
    >
      <V4Inner>
        <V4Eyebrow>{altV4GlossaryCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-glossary-title">
          {altV4GlossaryCopy.titleLine1}
          <br />
          {altV4GlossaryCopy.titleLine2}
        </V4Title>
        <Stack>
          {altV4Glossary.map((item) => (
            <Card key={item.term}>
              <Term>{item.term}</Term>
              <Text>{item.text}</Text>
            </Card>
          ))}
        </Stack>
      </V4Inner>
    </V4Section>
  )
}
