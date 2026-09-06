import { useState } from 'react'
import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4Faq,
  altV4FaqCopy,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  V4Eyebrow,
  V4Inner,
  V4Section,
  V4Stack,
  V4Title,
} from './shared'

const Item = styled.div`
  border-radius: 1rem;
  background: ${altV4.paper};
  border: 1px solid ${altV4.line};
  overflow: hidden;
`

const Question = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 3.75rem;
  padding: 0.9rem 1rem;
  border: 0;
  background: transparent;
  color: ${altV4.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
`

const Icon = styled.span`
  flex: none;
  font-size: 1.25rem;
  line-height: 1;
  color: ${altV4.goldInk};
`

const Answer = styled.div`
  padding: 0 1rem 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${altV4.ink2};
`

export function AltFaqV4Section() {
  const [openId, setOpenId] = useState<string | null>(altV4Faq[0]?.id ?? null)

  return (
    <V4Section
      $tone="paper2"
      id={ALT_V4_SECTION_IDS.faq}
      aria-labelledby="alt-v4-faq-title"
    >
      <V4Inner>
        <V4Eyebrow>{altV4FaqCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-faq-title">{altV4FaqCopy.title}</V4Title>
        <V4Stack>
          {altV4Faq.map((item) => {
            const open = openId === item.id
            return (
              <Item key={item.id}>
                <Question
                  type="button"
                  aria-expanded={open}
                  onClick={() =>
                    setOpenId((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                >
                  <span style={{ flex: 1 }}>{item.question}</span>
                  <Icon aria-hidden>{open ? '−' : '+'}</Icon>
                </Question>
                {open ? <Answer>{item.answer}</Answer> : null}
              </Item>
            )
          })}
        </V4Stack>
      </V4Inner>
    </V4Section>
  )
}
