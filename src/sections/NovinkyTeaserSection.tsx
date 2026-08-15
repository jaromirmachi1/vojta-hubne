import styled, { keyframes } from 'styled-components'
import { PageContainer } from '../components/PageContainer'
import { ArrowIcon } from '../components/cochystame/ArrowIcon'
import { novinkyTeaserPosts } from '../data/novinkyTeaserPosts'
import { eyebrowText } from '../styles/eyebrow'
import {
  getShopifyNovinkyArticleUrl,
  getShopifyNovinkyUrl,
} from '../utils/shopify'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`

const Section = styled.section`
  position: relative;
  isolation: isolate;
  padding-block: clamp(2.75rem, 6vw, 4.5rem);
  overflow: hidden;
  border-block: 1px solid rgba(238, 220, 130, 0.35);
  background:
    radial-gradient(
      ellipse 70% 55% at 50% 0%,
      rgba(238, 220, 130, 0.16),
      transparent 58%
    ),
    radial-gradient(
      circle at 8% 80%,
      rgba(238, 220, 130, 0.07),
      transparent 28rem
    ),
    linear-gradient(180deg, #0c0b08 0%, #000000 55%, #050505 100%);

  &::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.gold} 20%,
      ${({ theme }) => theme.colors.goldMuted} 50%,
      ${({ theme }) => theme.colors.gold} 80%,
      transparent 100%
    );
    z-index: 1;
  }
`

const Inner = styled(PageContainer)`
  position: relative;
  z-index: 1;
`

const Layout = styled.div`
  display: grid;
  gap: clamp(1.35rem, 3vw, 2rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
    grid-template-areas:
      'intro posts'
      'cta posts';
    align-items: start;
    column-gap: clamp(2rem, 4vw, 3.5rem);
    row-gap: 1.25rem;
  }
`

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: intro;
    justify-content: end;
    padding-top: 0.25rem;
  }
`

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
`

const NewBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const BadgeDot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.black};
  animation: ${pulse} 1.6s ease-in-out infinite;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  ${eyebrowText}
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.1rem, 5.5vw, 3.5rem);
  line-height: 0.92;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`

const Lead = styled.p`
  display: none;
  margin: 0;
  max-width: 38ch;
  padding: 1rem 1.15rem;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  background: rgba(238, 220, 130, 0.05);
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  font-size: 0.98rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: posts;
  }

  & > * {
    height: 100%;
  }
`

const Card = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 100%;
  padding: 1.5rem 1.35rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(238, 220, 130, 0.28);
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(165deg, rgba(238, 220, 130, 0.08), transparent 42%),
    ${({ theme }) => theme.colors.surfaceRaised};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(238, 220, 130, 0.55);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

const StatusPill = styled.span`
  align-self: start;
  border: 1px solid rgba(238, 220, 130, 0.45);
  color: ${({ theme }) => theme.colors.goldMuted};
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.5rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(238, 220, 130, 0.08);
`

const CardKicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.55rem, 3vw, 2rem);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.white};
`

const CardExcerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.92rem;
`

const CardCta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    color: currentColor;
  }
`

const CtaRow = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: cta;
    align-self: start;
  }
`

const CtaLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1.05rem 1.55rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: 0 0 0 0 rgba(238, 220, 130, 0.35);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;

  svg {
    color: ${({ theme }) => theme.colors.black};
    transition: transform 0.2s ease;
  }

  &:hover {
    opacity: 0.95;
    box-shadow: 0 0 28px rgba(238, 220, 130, 0.35);
  }

  &:hover svg {
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

export function NovinkyTeaserSection() {
  const novinkyUrl = getShopifyNovinkyUrl()

  return (
    <Section aria-labelledby="novinky-teaser-title">
      <Inner>
        <Layout>
          <Intro>
            <BadgeRow>
              <NewBadge>
                <BadgeDot aria-hidden />
                Nové
              </NewBadge>
              <Eyebrow>Ze shopu</Eyebrow>
            </BadgeRow>
            <Title id="novinky-teaser-title">Novinky</Title>
            <Lead>
              Co je nové v e-shopu: košík, platby, klub a další změny — přímo od
              Vojty Hubně.
            </Lead>
          </Intro>

          <Grid>
            {novinkyTeaserPosts.map((post) => (
              <Card
                key={post.id}
                href={getShopifyNovinkyArticleUrl(post.handle)}
                aria-label={`Přečíst novinku: ${post.title}`}
              >
                <StatusPill>{post.status}</StatusPill>
                <CardKicker>{post.kicker}</CardKicker>
                <CardTitle>{post.title}</CardTitle>
                <CardExcerpt>{post.excerpt}</CardExcerpt>
                <CardCta>
                  Přečíst <ArrowIcon />
                </CardCta>
              </Card>
            ))}
          </Grid>

          <CtaRow>
            <CtaLink href={novinkyUrl}>
              Všechny novinky <ArrowIcon />
            </CtaLink>
          </CtaRow>
        </Layout>
      </Inner>
    </Section>
  )
}
