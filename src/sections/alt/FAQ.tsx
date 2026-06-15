import { useState } from 'react'
import styled from 'styled-components'
import { ALT_SECTION_IDS, faqItems } from '../../data/altHomepage'
import { Reveal } from './motion'
import { AltInner, AltSection, SectionTitle } from './shared'

const List = styled.div`
  display: grid;
  gap: 0.65rem;
`

const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  overflow: hidden;
`

const QuestionButton = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 0;
  cursor: pointer;

  &::after {
    content: '${({ $open }) => ($open ? '−' : '+')}';
    flex-shrink: 0;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Answer = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  padding: 0 1.25rem 1.15rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Disclaimer = styled.p`
  margin: 1.5rem 0 0;
  font-size: 0.78rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.85;
`

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null)

  return (
    <AltSection id={ALT_SECTION_IDS.faq}>
      <AltInner>
        <Reveal>
          <SectionTitle>Časté otázky</SectionTitle>
        </Reveal>
        <List>
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <Item>
                  <QuestionButton
                    type="button"
                    $open={isOpen}
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenId((current) =>
                        current === item.id ? null : item.id,
                      )
                    }
                  >
                    {item.question}
                  </QuestionButton>
                  <Answer $open={isOpen}>{item.answer}</Answer>
                </Item>
              </Reveal>
            )
          })}
        </List>
        <Disclaimer>
          Produkty nejsou léky ani náhrada léků na předpis. Před použitím se
          poraďte s lékařem.
        </Disclaimer>
      </AltInner>
    </AltSection>
  )
}
