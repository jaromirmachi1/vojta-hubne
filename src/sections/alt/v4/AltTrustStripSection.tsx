import styled from 'styled-components'
import { altV4Trust } from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import { V4Inner } from './shared'

const Strip = styled.section`
  padding: 1.25rem 0 1.1rem;
  background: radial-gradient(120% 100% at 50% 0%, #1b1710, #000 70%);
  border-bottom: 1px solid rgba(238, 220, 130, 0.25);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: none;
    padding-block: 1.15rem 1.05rem;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`

const Item = styled.div<{ $last?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  padding: 0 0.35rem;
  border-right: ${({ $last }) =>
    $last ? '0' : '1px solid rgba(238, 220, 130, 0.22)'};
`

const Label = styled.div`
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1.35;
  text-transform: uppercase;
  color: #fff;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }
`

function TrustIcon({ icon }: { icon: (typeof altV4Trust)[number]['icon'] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: altV4.gold,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  if (icon === 'leaf') {
    return (
      <svg {...common}>
        <path d="M12 21c-4 0-7-3-7-7 0-5 4-9 14-11 0 10-3 18-7 18z" />
        <path d="M8 20c2-6 5-9 9-11" />
      </svg>
    )
  }
  if (icon === 'people') {
    return (
      <svg {...common}>
        <circle cx="8" cy="9" r="3" />
        <circle cx="16" cy="9" r="3" />
        <path d="M2 19c0-3 3-5 6-5s6 2 6 5" />
        <path d="M14 14c1-1 2-1 2-1 3 0 6 2 6 5" />
      </svg>
    )
  }
  if (icon === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l4 2" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  )
}

export function AltTrustStripSection() {
  return (
    <Strip aria-label="Proč Vojta Hubne">
      <V4Inner>
        <Row>
          {altV4Trust.map((item, index) => (
            <Item key={item.id} $last={index === altV4Trust.length - 1}>
              <TrustIcon icon={item.icon} />
              <Label>
                {item.label[0]}
                <br />
                {item.label[1]}
              </Label>
            </Item>
          ))}
        </Row>
      </V4Inner>
    </Strip>
  )
}
