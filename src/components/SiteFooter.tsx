import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { companyInfo } from '../data/company'
import { eyebrowText } from '../styles/eyebrow'
import { HashLink } from './HashLink'
import { PageContainer } from './PageContainer'
import { getShopifyPolicyUrl } from '../utils/shopify'
import { subscribeToNewsletter } from '../utils/subscribeToNewsletter'
import { FooterPaymentIcons } from './FooterPaymentIcons'

const Footer = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface};
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: 2.5rem;
  padding-block: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`

const ColumnTitle = styled.h2`
  margin: 0 0 0.25rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  ${eyebrowText}
`

const CompanyName = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`

const Text = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const FooterNavLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const FooterExternalLink = styled.a`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const FooterHashLink = styled(HashLink)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const NewsletterColumn = styled(Column)`
  gap: 1rem;
`

const NewsletterText = styled(Text)`
  max-width: 32rem;
`

const NewsletterForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`

const NewsletterInput = styled.input`
  width: 100%;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.goldMuted};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  font-size: 0.875rem;
  padding: 0.55rem 0.8rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`

const NewsletterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  color: ${({ theme }) => theme.colors.goldMuted};
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

const ConsentText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ConsentLink = styled(FooterExternalLink)`
  font-size: 0.75rem;
`

const NewsletterStatus = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${({ theme, $error }) =>
    $error ? '#ffb4b4' : theme.colors.goldMuted};
`

const Bottom = styled(PageContainer)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding-block: 1.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
`

const BottomRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.55rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
  }
`

const SocialRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
`

const Locale = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.text};
`

const Copyright = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8.5h2.5l-.35 2.5H14v7.5h-3v-7.5H9V8.5h2V6.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.75.07 1.95.1v2.25h-1.35c-1 0-1.2.5-1.2 1.2V8.5Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

type SiteFooterProps = {
  id?: string
}

export function SiteFooter({ id }: SiteFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = newsletterEmail.trim()

    if (!email) {
      setNewsletterStatus('error')
      return
    }

    setNewsletterStatus('loading')

    try {
      await subscribeToNewsletter(email, { source: 'footer' })

      setNewsletterEmail('')
      setNewsletterStatus('success')
    } catch {
      setNewsletterStatus('error')
    }
  }

  return (
    <Footer id={id}>
      <Inner>
        <Column>
          <ColumnTitle>Kontaktní informace</ColumnTitle>
          <CompanyName>{companyInfo.name}</CompanyName>
          <Text>{companyInfo.addressLine}</Text>
          <Text>IČO: {companyInfo.ico}</Text>
          <Text>DIČ: {companyInfo.dic}</Text>
          <Text>{companyInfo.vatStatus}</Text>
          <Text>ID datové schránky: {companyInfo.dataBoxId}</Text>
          <FooterExternalLink href={`mailto:${companyInfo.email}`}>
            {companyInfo.email}
          </FooterExternalLink>
        </Column>

        <Column>
          <ColumnTitle>Důležité informace</ColumnTitle>
          <FooterNavLink to="/kontakt">Kontakt</FooterNavLink>
          <FooterHashLink sectionId="faq">Nejčastější dotazy</FooterHashLink>
          <FooterExternalLink href={getShopifyPolicyUrl('shipping-policy')}>
            Doprava a platba
          </FooterExternalLink>
          <FooterExternalLink href={getShopifyPolicyUrl('terms-of-service')}>
            Obchodní podmínky
          </FooterExternalLink>
          <FooterExternalLink href={getShopifyPolicyUrl('privacy-policy')}>
            Ochrana osobních údajů
          </FooterExternalLink>
          <FooterHashLink sectionId="produkty">Produkty</FooterHashLink>
        </Column>

        <NewsletterColumn>
          <ColumnTitle>Přihlaste se k odběru našeho newsletteru</ColumnTitle>
          <NewsletterText>
            Nejnovější zprávy a upozornění zasílané do vaší schránky.
          </NewsletterText>
          <NewsletterForm
            action="/api/newsletter"
            method="post"
            onSubmit={handleNewsletterSubmit}
          >
            <NewsletterInput
              type="email"
              name="email"
              autoComplete="email"
              placeholder="E-mail"
              aria-label="E-mail pro odběr newsletteru"
              value={newsletterEmail}
              onChange={(event) => {
                setNewsletterEmail(event.target.value)
                if (newsletterStatus !== 'idle') setNewsletterStatus('idle')
              }}
              required
            />
            <NewsletterButton
              type="submit"
              aria-label="Odeslat e-mail"
              disabled={newsletterStatus === 'loading'}
            >
              →
            </NewsletterButton>
          </NewsletterForm>
          {newsletterStatus === 'success' ? (
            <NewsletterStatus>Děkujeme, e-mail je přihlášen k odběru.</NewsletterStatus>
          ) : null}
          {newsletterStatus === 'error' ? (
            <NewsletterStatus $error>
              Nepodařilo se e-mail přihlásit. Zkuste to prosím znovu.
            </NewsletterStatus>
          ) : null}
          <ConsentText>Odesláním souhlasíte se </ConsentText>
          <ConsentLink href={getShopifyPolicyUrl('privacy-policy')}>
            zpracováním osobních údajů.
          </ConsentLink>
        </NewsletterColumn>
      </Inner>
      <Bottom>
        <BottomLeft>
          <Locale>🇨🇿 Česko (CZK Kč)</Locale>
          <Copyright>
            © {new Date().getFullYear()} Vojta Hubne · {companyInfo.name}
          </Copyright>
        </BottomLeft>
        <BottomRight>
          <SocialRow>
            <SocialLink
              href="https://www.facebook.com/share/g/183Ks7Zm9S/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/vojtahubne/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </SocialLink>
          </SocialRow>
          <FooterPaymentIcons />
        </BottomRight>
      </Bottom>
    </Footer>
  )
}
