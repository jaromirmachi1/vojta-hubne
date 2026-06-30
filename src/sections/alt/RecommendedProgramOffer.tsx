import styled from 'styled-components'
import bundleImage from '../../assets/ogimage.png'
import {
  ALT_SECTION_IDS,
  getProgramProductUrl,
  programOffer,
} from '../../data/altHomepage'
import { Reveal } from './motion'
import { Eyebrow, PrimaryButton, ScrollLink, altMobileImage, altMobileImageFrame } from './shared'

const Wrap = styled.div`
  margin-top: clamp(2.5rem, 6vw, 4rem);
`

const OfferCard = styled.div`
  display: grid;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(145deg, rgba(238, 220, 130, 0.12), transparent 55%),
    ${({ theme }) => theme.colors.surfaceRaised};
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: center;
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const OfferName = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 7vw, 4.25rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Benefits = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.65rem;
`

const Benefit = styled.li`
  position: relative;
  padding-left: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gold};
  }
`

const Price = styled.p`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const ImageWrap = styled.figure`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${altMobileImageFrame}
`

const ProductImage = styled.img`
  width: min(100%, 22rem);
  height: auto;
  object-fit: contain;
  ${altMobileImage}
`

const SecondaryScroll = styled.div`
  margin-top: 1.25rem;
  text-align: center;
`

export function RecommendedProgramOffer() {
  const programUrl = getProgramProductUrl()

  return (
    <Wrap>
      <Reveal>
        <Eyebrow>nejoblíbenější volba</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <OfferCard>
          <Copy>
            <OfferName>{programOffer.name}</OfferName>
            <Benefits>
              {programOffer.benefits.map((benefit) => (
                <Benefit key={benefit}>{benefit}</Benefit>
              ))}
            </Benefits>
            <Price>{programOffer.price}</Price>
            <PrimaryButton href={programUrl}>Chci tento program</PrimaryButton>
          </Copy>
          <ImageWrap>
            <ProductImage
              src={bundleImage}
              alt="Kompletní systém — Lean Shake, GLP-1 Support a Aquamin Mg"
              loading="lazy"
            />
          </ImageWrap>
        </OfferCard>
      </Reveal>
      <SecondaryScroll>
        <ScrollLink
          type="button"
          onClick={() =>
            document
              .getElementById(ALT_SECTION_IDS.products)
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        >
          Nebo si vyber podle potřeby →
        </ScrollLink>
      </SecondaryScroll>
    </Wrap>
  )
}
