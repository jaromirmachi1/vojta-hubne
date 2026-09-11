import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { companyInfo } from '../data/company'
import { BrandLogo } from './BrandLogo'
import { HashLink } from './HashLink'
import { PageContainer } from './PageContainer'
import { getCookiesPolicyPageUrl, getPrivacyPolicyPageUrl, getShopifyPolicyUrl } from '../utils/shopify'
import { subscribeToNewsletter } from '../utils/subscribeToNewsletter'
import { markNewsletterPopupSubscribed } from '../utils/newsletterPopup'
import { FooterPaymentIcons } from './FooterPaymentIcons'

const Footer = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface};
`

const Shell = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-block: 2.75rem 1.5rem;
`

const Top = styled.div`
  display: grid;
  gap: 2rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 2.2fr);
    gap: 2.5rem 3rem;
  }
`

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: flex-start;
    text-align: left;
    padding-right: 2rem;
    border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`

const LogoLink = styled(Link)`
  display: inline-flex;
  line-height: 0;
  text-decoration: none;

  img {
    height: 2.5rem;
    width: auto;
  }
`

const Tagline = styled.p`
  margin: 0;
  max-width: 18rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.55;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`

const SocialRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition:
    color 0.2s ease-out,
    border-color 0.2s ease-out,
    transform 0.15s ease-out;

  svg {
    width: 0.95rem;
    height: 0.95rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.goldMuted};
  }

  &:active {
    transform: scale(0.97);
  }
`

const AccordionRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    align-items: start;
  }
`

const Accordion = styled.details`
  min-width: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    border-bottom: none;
    border-left: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    padding-inline: 1.25rem;

    &:first-child {
      border-left: none;
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  &[open] > summary::after {
    content: '−';
  }
`

const AccordionSummary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0;
  padding-block: 1rem;
  list-style: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '+';
    flex-shrink: 0;
    font-size: 1.15rem;
    font-weight: 400;
    line-height: 1;
    color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-block: 0.15rem 1rem;
  }
`

const AccordionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 0 0 1.15rem;
`

const Text = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const CompanyName = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`

const FooterNavLink = styled(Link)`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const FooterExternalLink = styled.a`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const FooterHashLink = styled(HashLink)`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const ContactCta = styled(FooterNavLink)`
  color: ${({ theme }) => theme.colors.gold};
  text-decoration: underline;
  text-underline-offset: 0.2em;

  &:hover {
    color: ${({ theme }) => theme.colors.goldMuted};
  }
`

const NewsletterText = styled(Text)`
  max-width: 22rem;
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
  height: 2.75rem;
  border: 1px solid ${({ theme }) => theme.colors.goldMuted};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  font-size: 0.875rem;
  padding: 0.55rem 0.8rem;
  transition: border-color 0.2s ease-out;

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
  flex-shrink: 0;
  height: 2.75rem;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    opacity 0.2s ease-out,
    transform 0.15s ease-out;

  &:hover:not(:disabled) {
    opacity: 0.95;
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

const ConsentLine = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ConsentLink = styled(FooterExternalLink)`
  display: inline;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.goldMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const NewsletterStatus = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${({ theme, $error }) =>
    $error ? '#ffb4b4' : theme.colors.goldMuted};
`

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const Copyright = styled.p`
  margin: 0;
  line-height: 1.45;
`

const BottomEmail = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease-out;

  svg {
    width: 0.95rem;
    height: 0.95rem;
    flex-shrink: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const BackToTop = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  padding: 0;
  font: inherit;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m5 8 7 5 7-5" />
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
      await subscribeToNewsletter(email, {
        offer: 'discount',
        source: 'footer',
      })

      setNewsletterEmail('')
      setNewsletterStatus('success')
      markNewsletterPopupSubscribed()
    } catch {
      setNewsletterStatus('error')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Footer id={id}>
      <Shell>
        <Top>
          <Brand>
            <LogoLink to="/" aria-label="Vojta Hubne — domů">
              <BrandLogo variant="nav" />
            </LogoLink>
            <Tagline>
              Nejen zhubnout. Zvládnout i to, co přijde potom.
            </Tagline>
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
          </Brand>

          <AccordionRow>
            <Accordion>
              <AccordionSummary>Firma a kontakty</AccordionSummary>
              <AccordionBody>
                <CompanyName>{companyInfo.name}</CompanyName>
                <Text>{companyInfo.addressLine}</Text>
                <Text>IČO: {companyInfo.ico}</Text>
                <Text>DIČ: {companyInfo.dic}</Text>
                <Text>{companyInfo.vatStatus}</Text>
                <Text>ID datové schránky: {companyInfo.dataBoxId}</Text>
                <ContactCta to="/kontakt">Kontaktujte nás →</ContactCta>
              </AccordionBody>
            </Accordion>

            <Accordion>
              <AccordionSummary>Informace k nákupu</AccordionSummary>
              <AccordionBody>
                <FooterExternalLink href={getShopifyPolicyUrl('shipping-policy')}>
                  Doprava a platba
                </FooterExternalLink>
                <FooterHashLink sectionId="faq">Nejčastější dotazy</FooterHashLink>
                <FooterExternalLink href={getShopifyPolicyUrl('terms-of-service')}>
                  Obchodní podmínky
                </FooterExternalLink>
                <FooterExternalLink href={getShopifyPolicyUrl('refund-policy')}>
                  Reklamace
                </FooterExternalLink>
                <FooterExternalLink href={getPrivacyPolicyPageUrl()}>
                  Zásady ochrany osobních údajů
                </FooterExternalLink>
                <FooterExternalLink href={getCookiesPolicyPageUrl()}>
                  Zásady používání cookies
                </FooterExternalLink>
              </AccordionBody>
            </Accordion>

            <Accordion>
              <AccordionSummary>Novinky od Vojty</AccordionSummary>
              <AccordionBody>
                <NewsletterText>
                  Tipy, novinky, nové produkty a zákulisí. Bez každodenního spamu.
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
                    placeholder="Váš e-mail"
                    aria-label="Váš e-mail"
                    value={newsletterEmail}
                    onChange={(event) => {
                      setNewsletterEmail(event.target.value)
                      if (newsletterStatus !== 'idle') setNewsletterStatus('idle')
                    }}
                    required
                  />
                  <NewsletterButton
                    type="submit"
                    aria-label="Chci novinky"
                    disabled={newsletterStatus === 'loading'}
                  >
                    Chci novinky
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
                <ConsentLine>
                  Odesláním souhlasíte se{' '}
                  <ConsentLink href={getPrivacyPolicyPageUrl()}>
                    zpracováním osobních údajů
                  </ConsentLink>
                  .
                </ConsentLine>
              </AccordionBody>
            </Accordion>
          </AccordionRow>
        </Top>

        <Bottom>
          <Copyright>
            © {new Date().getFullYear()} Vojta Hubne · {companyInfo.name}
          </Copyright>
          <BottomEmail href={`mailto:${companyInfo.email}`}>
            <MailIcon />
            {companyInfo.email}
          </BottomEmail>
          <FooterPaymentIcons />
          <BackToTop type="button" onClick={scrollToTop}>
            Nahoru ↑
          </BackToTop>
        </Bottom>
      </Shell>
    </Footer>
  )
}
