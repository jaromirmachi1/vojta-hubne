import styled from 'styled-components'
import { ContactForm } from '../components/ContactForm'
import { PageContainer } from '../components/PageContainer'
import { usePageMeta } from '../hooks/usePageMeta'
import { companyInfo } from '../data/company'
import { ShopLayout } from '../layouts/ShopLayout'
import { contactPageMeta } from '../seo/contactPageMeta'
import { eyebrowText } from '../styles/eyebrow'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
`

const Inner = styled(PageContainer)`
  display: grid;
  gap: clamp(1.5rem, 4vw, 2rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: stretch;
  }
`

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(145deg, rgba(238, 220, 130, 0.18), rgba(238, 220, 130, 0.04) 55%),
    ${({ theme }) => theme.colors.surfaceRaised};
`

const FormPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Text = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
`

const DetailList = styled.dl`
  display: grid;
  gap: 0.85rem;
  margin: 0;
`

const DetailRow = styled.div`
  display: grid;
  gap: 0.2rem;
`

const DetailLabel = styled.dt`
  margin: 0;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const DetailValue = styled.dd`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

export function ContactPage() {
  usePageMeta(contactPageMeta)

  return (
    <ShopLayout>
      <Section>
        <Inner>
          <InfoPanel>
            <Eyebrow>Provozovatel</Eyebrow>
            <Title>Kontaktní informace</Title>
            <DetailList>
              <DetailRow>
                <DetailLabel>E-mail</DetailLabel>
                <DetailValue>
                  <ContactLink href={`mailto:${companyInfo.email}`}>
                    {companyInfo.email}
                  </ContactLink>
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Provozovatel</DetailLabel>
                <DetailValue>{companyInfo.name}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>IČO</DetailLabel>
                <DetailValue>{companyInfo.ico}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>DIČ</DetailLabel>
                <DetailValue>{companyInfo.dic}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>DPH</DetailLabel>
                <DetailValue>{companyInfo.vatStatus}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>ID datové schránky</DetailLabel>
                <DetailValue>{companyInfo.dataBoxId}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Adresa</DetailLabel>
                <DetailValue>{companyInfo.addressLine}</DetailValue>
              </DetailRow>
            </DetailList>
            <Text>
              Objednávky a reklamace vyřizujeme přes e-shop. Obecné dotazy nám
              napište přes formulář vpravo.
            </Text>
          </InfoPanel>

          <FormPanel>
            <Eyebrow>Napište nám</Eyebrow>
            <Title>Kontakt</Title>
            <ContactForm />
          </FormPanel>
        </Inner>
      </Section>
    </ShopLayout>
  )
}
