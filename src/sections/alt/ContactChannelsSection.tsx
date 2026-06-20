import styled, { css } from 'styled-components'
import {
  altContactChannels,
  altContactChannelsCopy,
} from '../../data/altContact'
import { Reveal } from './motion'
import { AltInner, AltSection, Eyebrow } from './shared'

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: clamp(2rem, 5vw, 3rem);
`

const Title = styled.h2`
  margin: 0;
  max-width: 14ch;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const TitleWhite = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white};
`

const TitleGold = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.gold};
`

const Grid = styled.div`
  display: grid;
  gap: clamp(0.85rem, 2vw, 1rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const cardStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(1.15rem, 2.5vw, 1.5rem);
  min-height: 100%;
  padding: clamp(1.5rem, 3vw, 2rem);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(155deg, rgba(238, 220, 130, 0.06), transparent 48%),
    ${({ theme }) => theme.colors.surfaceRaised};
  transition:
    border-color 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 100% 0%,
      rgba(238, 220, 130, 0.1),
      transparent 55%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-4px);
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.38);

    &::before {
      opacity: 1;
    }
  }
`

const CardLink = styled.a`
  ${cardStyles}
  text-decoration: none;
  color: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
  }
`

const CardStatic = styled.article`
  ${cardStyles}
`

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const Index = styled.span`
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: ${({ theme }) => theme.colors.goldMuted};
  opacity: 0.75;
`

const IconRing = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  flex-shrink: 0;
  border: 1px solid rgba(238, 220, 130, 0.16);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.gold};
  background: rgba(238, 220, 130, 0.04);

  svg {
    width: 1.45rem;
    height: 1.45rem;
  }
`

const Copy = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
`

const Label = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Value = styled.span<{ $compact?: boolean }>`
  font-family: ${({ theme, $compact }) =>
    $compact ? theme.fonts.sans : theme.fonts.display};
  font-size: ${({ $compact }) =>
    $compact ? 'clamp(0.92rem, 1.6vw, 1.05rem)' : 'clamp(1.35rem, 2.8vw, 1.75rem)'};
  font-weight: ${({ $compact }) => ($compact ? 600 : 400)};
  line-height: ${({ $compact }) => ($compact ? 1.35 : 0.95)};
  letter-spacing: ${({ $compact }) => ($compact ? '0.01em' : '0.03em')};
  text-transform: ${({ $compact }) => ($compact ? 'none' : 'uppercase')};
  color: ${({ theme }) => theme.colors.white};
  word-break: break-word;
`

const ValueRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

const Arrow = styled.span`
  font-size: 1rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.gold};
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;

  ${CardLink}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`

const Hint = styled.p`
  margin: 0;
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.82rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.88;
`

function ChannelIcon({ id }: { id: string }) {
  switch (id) {
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'response':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

type ChannelItem = (typeof altContactChannels)[number]

function ChannelCard({
  channel,
  index,
}: {
  channel: ChannelItem
  index: number
}) {
  const indexLabel = String(index + 1).padStart(2, '0')
  const content = (
    <>
      <CardTop>
        <Index>{indexLabel}</Index>
        <IconRing>
          <ChannelIcon id={channel.id} />
        </IconRing>
      </CardTop>
      <Copy>
        <Label>{channel.label}</Label>
        <Value $compact={channel.id === 'email'}>
          <ValueRow>
            {channel.value}
            {'href' in channel && channel.href ? <Arrow aria-hidden>→</Arrow> : null}
          </ValueRow>
        </Value>
        <Hint>{channel.hint}</Hint>
      </Copy>
    </>
  )

  if ('href' in channel && channel.href) {
    const external = channel.id === 'instagram'
    return (
      <CardLink
        href={channel.href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        aria-label={`${channel.label}: ${channel.value}`}
      >
        {content}
      </CardLink>
    )
  }

  return <CardStatic>{content}</CardStatic>
}

export function ContactChannelsSection() {
  return (
    <AltSection>
      <AltInner>
        <Reveal>
          <Header>
            <Eyebrow>{altContactChannelsCopy.eyebrow}</Eyebrow>
            <Title>
              <TitleWhite>{altContactChannelsCopy.title}</TitleWhite>
              <TitleGold>{altContactChannelsCopy.titleAccent}</TitleGold>
            </Title>
          </Header>
        </Reveal>
        <Grid>
          {altContactChannels.map((channel, index) => (
            <Reveal key={channel.id} delay={index * 0.08}>
              <ChannelCard channel={channel} index={index} />
            </Reveal>
          ))}
        </Grid>
      </AltInner>
    </AltSection>
  )
}
