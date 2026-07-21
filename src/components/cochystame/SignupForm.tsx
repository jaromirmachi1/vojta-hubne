import type { FormEvent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { subscribeToNewsletter } from '../../utils/subscribeToNewsletter'
import { ArrowIcon } from './ArrowIcon'

const Form = styled.form<{ $compact?: boolean }>`
  display: flex;
  gap: 0.85rem;
  align-items: center;

  ${({ $compact }) =>
    $compact
      ? `
    flex-direction: column;
    align-items: stretch;
    gap: 0.9rem;
  `
      : ''}
`

const Field = styled.input<{ $variant?: 'dark' | 'gold' }>`
  flex: 1;
  min-width: 0;
  padding: 0.95rem 1.05rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: rgba(0, 0, 0, 0.35);
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border};
  }
  ${({ $variant, theme }) =>
    $variant === 'gold'
      ? `
    border: 1px solid rgba(0,0,0,.2);
    background: rgba(255,255,255,.55);
    color: ${theme.colors.black};

    &::placeholder {
      color: rgba(0,0,0,.45);
    }
  `
      : ''}
`

const Submit = styled.button<{
  $compact?: boolean
  $variant?: 'dark' | 'gold'
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  flex: ${({ $compact }) => ($compact ? 'none' : '0 0 auto')};
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ $variant, theme }) =>
    $variant === 'gold'
      ? `
    background: ${theme.colors.black};
    border-color: ${theme.colors.black};
    color: ${theme.colors.goldMuted};
  `
      : ''}
`

const Status = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};

  ${({ $error, theme }) =>
    $error
      ? `
    color: ${theme.colors.goldMuted};
  `
      : ''}
`

export function SignupForm({
  compact = false,
  cta = 'Chci vědět jako první',
  variant = 'dark',
}: {
  compact?: boolean
  cta?: string
  variant?: 'dark' | 'gold'
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === 'loading') return
    const value = email.trim()
    if (!value) return

    setStatus('loading')
    try {
      await subscribeToNewsletter(value)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Form $compact={compact} onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={compact ? 'cochystame-email-compact' : 'cochystame-email'}>
        Váš e-mail
      </label>
      <Field
        id={compact ? 'cochystame-email-compact' : 'cochystame-email'}
        type="email"
        required
        placeholder="Váš e-mail"
        value={email}
        $variant={variant}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status !== 'idle') setStatus('idle')
        }}
      />
      <Submit
        type="submit"
        $compact={compact}
        $variant={variant}
        aria-label={cta}
      >
        {status === 'loading' ? 'Odesílám…' : cta}
        <ArrowIcon />
      </Submit>

      {status === 'success' ? (
        <Status role="status">Děkujeme. Ozveme se s potvrzenými novinkami.</Status>
      ) : null}

      {status === 'error' ? (
        <Status $error role="alert">
          Nepodařilo se e-mail přihlásit. Zkuste to prosím znovu.
        </Status>
      ) : null}
    </Form>
  )
}

