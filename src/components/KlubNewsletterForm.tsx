import { useId, useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { getPrivacyPolicyPageUrl } from '../utils/shopify'
import { subscribeToNewsletter } from '../utils/subscribeToNewsletter'

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
  transition:
    opacity 0.2s ease,
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1);

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
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

export function KlubNewsletterForm() {
  const nameId = useId()
  const emailId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      await subscribeToNewsletter(trimmedEmail, {
        source: 'klub',
        name: name.trim() || undefined,
      })
      setName('')
      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Form onSubmit={onSubmit} noValidate>
      <Field>
        <Label htmlFor={nameId}>Jméno</Label>
        <Input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Vaše jméno"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
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
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
        />
      </Field>

      <SubmitButton type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Odesílám…' : 'Chci být mezi prvními'}
      </SubmitButton>

      {status === 'success' ? (
        <Status role="status">
          Děkujeme. Až bude klub ready, ozveme se s pozvánkou.
        </Status>
      ) : null}
      {status === 'error' ? (
        <Status $error role="alert">
          Nepodařilo se přihlásit. Zkontrolujte e-mail a zkuste to znovu.
        </Status>
      ) : null}

      <Hint>
        Po spuštění klubu vám napíšeme s pozvánkou. Odesláním souhlasíte se
        zpracováním údajů dle{' '}
        <a href={getPrivacyPolicyPageUrl()}>zásad ochrany osobních údajů</a>.
      </Hint>
    </Form>
  )
}
