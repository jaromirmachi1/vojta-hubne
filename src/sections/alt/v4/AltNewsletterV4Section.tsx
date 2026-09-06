import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4Newsletter,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { subscribeToNewsletter } from '../../../utils/subscribeToNewsletter'
import {
  V4Inner,
  V4PillGoldButton,
  V4Section,
} from './shared'

const Card = styled.div`
  padding: 1.25rem 1.1rem;
  border-radius: 1.25rem;
  background: ${altV4.black};
  color: #fff;
  margin-bottom: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 2rem 2.25rem;
  }
`

const Title = styled.div`
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  line-height: 1.05;
  text-transform: uppercase;
`

const Lead = styled.p`
  margin: 0 0 0.9rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

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
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }
`

const Status = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ $error }) => ($error ? '#ffb4b4' : 'rgba(255,255,255,0.8)')};
`

const Contact = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3.4rem;
  margin-bottom: 0.9rem;
  border: 1px solid ${altV4.line};
  border-radius: 999px;
  background: ${altV4.paper2};
  color: ${altV4.ink};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: fit-content;
    min-width: 18rem;
    padding-inline: 1.75rem;
  }
`

const Legal = styled.div`
  font-size: 0.75rem;
  line-height: 1.6;
  color: ${altV4.ink2};
  white-space: pre-line;
`

export function AltNewsletterV4Section() {
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
    <V4Section id={ALT_V4_SECTION_IDS.newsletter}>
      <V4Inner>
        <Card>
          <Title>{altV4Newsletter.title}</Title>
          <Lead>{altV4Newsletter.lead}</Lead>
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
              aria-label="E-mail pro novinky"
            />
            <V4PillGoldButton type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Odesílám…' : altV4Newsletter.cta}
            </V4PillGoldButton>
          </Form>
          {status === 'success' ? (
            <Status>Děkujeme, e-mail je přihlášen k odběru.</Status>
          ) : null}
          {status === 'error' ? (
            <Status $error>Zkontrolujte e-mail a zkuste to znovu.</Status>
          ) : null}
        </Card>
        <Contact to={altV4Newsletter.contactHref}>
          {altV4Newsletter.contactLabel}
        </Contact>
        <Legal>{altV4Newsletter.legal}</Legal>
      </V4Inner>
    </V4Section>
  )
}
