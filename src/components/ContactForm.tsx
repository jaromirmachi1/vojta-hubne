import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import styled from 'styled-components'
import { getPrivacyPolicyPageUrl } from '../utils/shopify'

const Form = styled.form`
  display: grid;
  gap: 1rem;
`

const Field = styled.div`
  display: grid;
  gap: 0.4rem;
`

const Label = styled.label`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Input = styled.input`
  width: 100%;
  min-height: 3rem;
  padding: 0.85rem 1rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 9rem;
  padding: 0.85rem 1rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};
  resize: vertical;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border};
  }
`

const SubmitButton = styled.button`
  justify-self: start;
  margin-top: 0.35rem;
  padding: 1rem 1.75rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`

const Hint = styled.p`
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.goldMuted};
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const Status = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${({ theme, $error }) =>
    $error ? '#ffb4b4' : theme.colors.goldMuted};
`

const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`

export function ContactForm() {
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const messageId = useId()
  const websiteId = useId()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          website,
        }),
      })

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        message?: string
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? 'Contact form failed')
      }

      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setWebsite('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Honeypot
        id={websiteId}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        aria-hidden="true"
      />

      <Field>
        <Label htmlFor={nameId}>Jméno</Label>
        <Input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Vaše jméno"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
        />
      </Field>

      <Field>
        <Label htmlFor={emailId}>E-mail *</Label>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="vas@email.cz"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
        />
      </Field>

      <Field>
        <Label htmlFor={phoneId}>Telefon</Label>
        <Input
          id={phoneId}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+420 …"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
        />
      </Field>

      <Field>
        <Label htmlFor={messageId}>Vaše zpráva *</Label>
        <Textarea
          id={messageId}
          name="message"
          required
          placeholder="Napište nám, s čím vám můžeme pomoci."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
        />
      </Field>

      <SubmitButton type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Odesílám…' : 'Odeslat formulář'}
      </SubmitButton>

      {status === 'success' ? (
        <Status role="status">
          Děkujeme, zpráva byla odeslána. Ozveme se co nejdříve.
        </Status>
      ) : null}

      {status === 'error' ? (
        <Status $error role="alert">
          Nepodařilo se odeslat zprávu. Zkuste to prosím znovu, nebo napište na
          info@vojtahubne.cz.
        </Status>
      ) : null}

      <Hint>
        Odesláním souhlasíte se zpracováním údajů dle{' '}
        <a href={getPrivacyPolicyPageUrl()}>
          zásad ochrany osobních údajů
        </a>
        .
      </Hint>
    </Form>
  )
}
