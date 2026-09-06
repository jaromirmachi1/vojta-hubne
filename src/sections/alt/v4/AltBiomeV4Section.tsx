import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import biomeImage from '../../../assets/biome4.png'
import { ALT_V4_SECTION_IDS, altV4Biome } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { subscribeToNewsletter } from '../../../utils/subscribeToNewsletter'
import {
  V4Inner,
  V4Lead,
  V4PillBlackButton,
  V4PillOutline,
  V4Section,
  V4Title,
} from './shared'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  border: 1px solid ${altV4.line};
  background: ${altV4.paper2};
  color: ${altV4.goldInk};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

const Dot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: ${altV4.goldInk};
  animation: ${pulse} 2s ease-in-out infinite;
`

const Claim = styled.div`
  margin: 0 0 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${altV4.goldInk};
`

const Split = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }
`

const Copy = styled.div``

const Img = styled.img`
  display: block;
  width: 100%;
  max-width: 16rem;
  margin: 0 auto 1.1rem;
  border-radius: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 22rem;
    margin: 0;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 0.65rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    align-items: stretch;

    button {
      width: auto;
      flex: none;
    }
  }
`

const Input = styled.input`
  width: 100%;
  min-height: 3.4rem;
  padding: 0 1.1rem;
  border-radius: 999px;
  border: 1px solid ${altV4.line};
  background: ${altV4.paper2};
  color: ${altV4.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
`

const Status = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ $error }) => ($error ? altV4.live : altV4.ink2)};
`

const Foot = styled.div`
  margin-top: 0.65rem;
  font-size: 0.8rem;
  color: ${altV4.ink2};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: left;
  }
`

export function AltBiomeV4Section() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const value = email.trim()
    if (!value) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      await subscribeToNewsletter(value, { source: 'footer' })
      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <V4Section id={ALT_V4_SECTION_IDS.biome} aria-labelledby="alt-v4-biome-title">
      <V4Inner>
        <Split>
          <Img
            src={biomeImage}
            alt="BIOME 4 — probiotika, 30 tobolek"
            width={400}
            height={400}
          />
          <Copy>
            <Badge>
              <Dot aria-hidden />
              {altV4Biome.badge}
            </Badge>
            <V4Title $size="lg" id="alt-v4-biome-title">
              {altV4Biome.title}
            </V4Title>
            <Claim>{altV4Biome.claim}</Claim>
            <V4Lead>{altV4Biome.lead}</V4Lead>
            <Form onSubmit={onSubmit}>
              <Input
                type="email"
                name="email"
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status !== 'idle') setStatus('idle')
                }}
                aria-label="E-mail pro notifikaci BIOME 4"
              />
              <V4PillBlackButton type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Odesílám…' : altV4Biome.notifyLabel}
              </V4PillBlackButton>
            </Form>
            {status === 'success' ? (
              <Status>Děkujeme — dáme vědět, až bude BIOME 4 v prodeji.</Status>
            ) : null}
            {status === 'error' ? (
              <Status $error>Zkontrolujte e-mail a zkuste to znovu.</Status>
            ) : null}
            <V4PillOutline as={Link} to={altV4Biome.detailHref}>
              {altV4Biome.detailLabel}
            </V4PillOutline>
            <Foot>{altV4Biome.footnote}</Foot>
          </Copy>
        </Split>
      </V4Inner>
    </V4Section>
  )
}
