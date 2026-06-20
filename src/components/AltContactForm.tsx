import { useId, type FormEvent } from 'react'
import styled from 'styled-components'
import {
  altContactCopy,
  altContactPhaseOptions,
  altContactTopicOptions,
} from '../data/altContact'
import { getShopifyContactFormUrl } from '../utils/shopify'

const Form = styled.form`
  display: grid;
  gap: 0.85rem;
`

const Row = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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

const fieldStyles = `
  width: 100%;
  min-height: 3rem;
  padding: 0.85rem 1rem;
  font-family: inherit;
  font-size: 0.92rem;
  color: inherit;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid;
  border-radius: inherit;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  &:focus {
    outline: none;
  }
`

const Input = styled.input`
  ${fieldStyles}
  border-color: ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};

  &:focus {
    border-color: ${({ theme }) => theme.colors.border};
  }
`

const Select = styled.select`
  ${fieldStyles}
  border-color: ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};
  appearance: none;
  padding-right: 2.25rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23b8a96a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.border};
  }
`

const Textarea = styled.textarea`
  ${fieldStyles}
  min-height: 7.5rem;
  line-height: 1.6;
  resize: vertical;
  border-color: ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};

  &:focus {
    border-color: ${({ theme }) => theme.colors.border};
  }
`

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 0.25rem;
  padding: 1rem 1.75rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
  }
`

const Privacy = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    flex-shrink: 0;
    width: 0.85rem;
    height: 0.85rem;
    margin-top: 0.15rem;
    color: ${({ theme }) => theme.colors.goldMuted};
  }
`

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" strokeLinecap="round" />
    </svg>
  )
}

export function AltContactForm() {
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const phaseId = useId()
  const topicId = useId()
  const messageId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    const phase = (form.elements.namedItem('inquiry_phase') as HTMLSelectElement)
      ?.value
    const topic = (form.elements.namedItem('inquiry_topic') as HTMLSelectElement)
      ?.value
    const body = form.elements.namedItem('contact[body]') as HTMLTextAreaElement
    const message = body.value.trim()

    body.value = [
      phase ? `Fáze: ${phase}` : null,
      topic ? `Téma: ${topic}` : null,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n')
  }

  return (
    <Form
      action={getShopifyContactFormUrl()}
      method="post"
      acceptCharset="UTF-8"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form_type" value="contact" />
      <input type="hidden" name="utf8" value="✓" />
      <input
        type="hidden"
        name="contact[title]"
        value="Dotaz — Vojta Hubne (alt homepage)"
      />
      <input type="hidden" name="contact[tags]" value="vojtahubne-alt-dotaz" />

      <Row>
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
          <Label htmlFor={emailId}>E-mail</Label>
          <Input
            id={emailId}
            name="contact[email]"
            type="email"
            autoComplete="email"
            required
            placeholder="vas@email.cz"
          />
        </Field>
      </Row>

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
        <Label htmlFor={phaseId}>{altContactCopy.phaseLabel}</Label>
        <Select id={phaseId} name="inquiry_phase" defaultValue="">
          <option value="" disabled>
            {altContactCopy.phasePlaceholder}
          </option>
          {altContactPhaseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label htmlFor={topicId}>{altContactCopy.topicLabel}</Label>
        <Select id={topicId} name="inquiry_topic" defaultValue="">
          <option value="" disabled>
            {altContactCopy.topicPlaceholder}
          </option>
          {altContactTopicOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label htmlFor={messageId}>Zpráva</Label>
        <Textarea
          id={messageId}
          name="contact[body]"
          required
          placeholder="Napište, s čím vám můžu pomoct."
        />
      </Field>

      <SubmitButton type="submit">{altContactCopy.submit}</SubmitButton>

      <Privacy>
        <LockIcon />
        <span>{altContactCopy.privacy}</span>
      </Privacy>
    </Form>
  )
}
