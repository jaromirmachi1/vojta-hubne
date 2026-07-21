import type { ReactNode } from 'react'
import styled from 'styled-components'
import { eyebrowText } from '../../styles/eyebrow'

const Wrap = styled.div`
  margin-bottom: 1.15rem;
`

const Eyebrow = styled.span`
  display: inline-flex;
  margin-bottom: 0.55rem;
  ${eyebrowText}
`

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.4rem, 2.2vw, 2.1rem);
  letter-spacing: 0.02em;
  font-weight: 400;
  text-transform: uppercase;
`

export function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow?: string
  children: ReactNode
}) {
  return (
    <Wrap>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Title>{children}</Title>
    </Wrap>
  )
}

