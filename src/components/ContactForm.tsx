import { useId } from 'react'
import styled from 'styled-components'
import {
  getShopifyContactFormUrl,
  getShopifyPolicyUrl,
} from '../utils/shopify'

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

  &:hover {
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

export function ContactForm() {
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const messageId = useId()

  return (
    <Form
      action={getShopifyContactFormUrl()}
      method="post"
      acceptCharset="UTF-8"
    >
      <input type="hidden" name="form_type" value="contact" />
      <input type="hidden" name="utf8" value="✓" />

      <Field>
        <Label htmlFor={nameId}>Jméno</Label>
        <Input
          id={nameId}
          name="contact[name]"
          type="text"
          autoComplete="name"
          placeholder="Vaše jméno"
        />
      </Field>

      <Field>
        <Label htmlFor={emailId}>E-mail *</Label>
        <Input
          id={emailId}
          name="contact[email]"
          type="email"
          autoComplete="email"
          required
          placeholder="vas@email.cz"
        />
      </Field>

      <Field>
        <Label htmlFor={phoneId}>Telefon</Label>
        <Input
          id={phoneId}
          name="contact[phone]"
          type="tel"
          autoComplete="tel"
          placeholder="+420 …"
        />
      </Field>

      <Field>
        <Label htmlFor={messageId}>Vaše zpráva *</Label>
        <Textarea
          id={messageId}
          name="contact[body]"
          required
          placeholder="Napište nám, s čím vám můžeme pomoci."
        />
      </Field>

      <SubmitButton type="submit">Odeslat formulář</SubmitButton>
      <Hint>
        Odesláním souhlasíte se zpracováním údajů dle{' '}
        <a href={getShopifyPolicyUrl('privacy-policy')}>
          zásad ochrany osobních údajů
        </a>
        .
      </Hint>
    </Form>
  )
}
