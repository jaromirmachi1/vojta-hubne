import { useId } from 'react'
import styled from 'styled-components'
import {
  getPrivacyPolicyPageUrl,
  getShopifyContactFormUrl,
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

export function KlubNewsletterForm() {
  const nameId = useId()
  const emailId = useId()

  return (
    <Form
      action={getShopifyContactFormUrl()}
      method="post"
      acceptCharset="UTF-8"
    >
      <input type="hidden" name="form_type" value="contact" />
      <input type="hidden" name="utf8" value="✓" />
      <input
        type="hidden"
        name="contact[title]"
        value="Vojta Hubne klub — přihlášení k odběru"
      />
      <input type="hidden" name="contact[tags]" value="vojtahubne-klub" />
      <input
        type="hidden"
        name="contact[body]"
        value="Chci být mezi prvními a dostat přístup do Vojta Hubne klubu po spuštění."
      />

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

      <SubmitButton type="submit">Chci být mezi prvními</SubmitButton>
      <Hint>
        Po spuštění klubu vám napíšeme s pozvánkou. Odesláním souhlasíte se
        zpracováním údajů dle{' '}
        <a href={getPrivacyPolicyPageUrl()}>
          zásad ochrany osobních údajů
        </a>
        .
      </Hint>
    </Form>
  )
}
