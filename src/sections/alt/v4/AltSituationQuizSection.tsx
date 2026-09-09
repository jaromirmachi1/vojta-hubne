import { useState } from 'react'
import styled from 'styled-components'
import { customerPaths } from '../../../data/altHomepage'
import {
  ALT_V4_SECTION_IDS,
  altV4Products,
  altV4QuizCopy,
  altV4QuizScopes,
  altV4Situations,
  getAltV4ProductHref,
  getAltV4ProductPrice,
} from '../../../data/altHomeV4'
import { useAltV4Catalog } from '../../../hooks/useAltV4Catalog'
import { altV4 } from '../../../styles/altV4'
import {
  getShopifyCatalogUrl,
  getShopifyCollectionUrl,
} from '../../../utils/shopify'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
  V4PillGold,
  V4PillOutline,
  V4Section,
  V4Title,
} from './shared'

const situationByCollection = Object.fromEntries(
  altV4Situations.map((situation) => [situation.collectionHandle, situation]),
) as Record<string, (typeof altV4Situations)[number]>

const QuizSection = styled(V4Section)`
  border-top: 1px solid ${altV4.line};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    background: ${altV4.black};
    color: #fff;
    border-top: 0;
  }
`

const DesktopOnly = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }
`

const MobileOnly = styled.div`
  display: block;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`

const DesktopPanel = styled.div`
  width: 100%;
  padding: clamp(1.75rem, 3.5vw, 2.5rem);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem;
  background: #111111;
`

const DesktopHeader = styled.header`
  max-width: 42rem;
  margin: 0 auto clamp(1.75rem, 3.5vw, 2.25rem);
  text-align: center;
`

const DesktopTitle = styled.h2`
  margin: 0 0 0.65rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
`

const DesktopLead = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.78);
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.85rem;
  width: 100%;
`

const PathCard = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
  width: 100%;
  min-height: 100%;
  padding: 1.2rem 1.1rem;
  text-align: left;
  cursor: pointer;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? altV4.gold : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 0.9rem;
  background: ${({ $selected }) =>
    $selected ? 'rgba(238, 220, 130, 0.06)' : '#0a0a0a'};
  box-shadow: ${({ $selected }) =>
    $selected ? '0 0 0 1px rgba(238, 220, 130, 0.18)' : 'none'};
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ $selected }) =>
      $selected ? altV4.gold : 'rgba(238, 220, 130, 0.35)'};
  }

  &:focus-visible {
    outline: 2px solid ${altV4.gold};
    outline-offset: 2px;
  }
`

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: ${altV4.gold};

  svg {
    width: 1.65rem;
    height: 1.65rem;
  }
`

const CardTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.1rem, 1.4vw, 1.3rem);
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${altV4.gold};
`

const CardText = styled.span`
  font-size: 0.82rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
`

const DesktopResults = styled.div`
  margin-top: clamp(1.5rem, 3vw, 2rem);
  padding-top: clamp(1.5rem, 3vw, 2rem);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`

const QuizEyebrow = styled(V4Eyebrow)``

const QuizTitle = styled(V4Title)``

const QuizLead = styled(V4Lead)``

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`

const GoalWrap = styled.div``

const GoalBtn = styled.button<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  padding: 1rem 1.05rem;
  border-radius: 1rem;
  border: 1px solid ${({ $open }) => ($open ? altV4.black : altV4.line)};
  background: ${({ $open }) => ($open ? altV4.black : altV4.paper2)};
  color: ${({ $open }) => ($open ? '#fff' : altV4.ink)};
  cursor: pointer;
  text-align: left;
`

const GoalTop = styled.span`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
`

const Num = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $open }) => ($open ? 'rgba(238,220,130,0.55)' : altV4.line)};
  background: ${({ $open }) => ($open ? 'rgba(238,220,130,0.12)' : altV4.paper)};
  color: ${({ $open }) => ($open ? altV4.gold : altV4.goldInk)};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
`

const GoalName = styled.span`
  flex: 1;
  min-width: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.35rem, 4vw, 1.55rem);
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Chevron = styled.span<{ $open: boolean }>`
  font-size: 1rem;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.2s ease;
`

const GoalNote = styled.span<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  padding-left: 3.2rem;
  font-size: 0.88rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
`

const Panel = styled.div`
  margin-top: 0.15rem;
  padding: 1.1rem 1rem 1.15rem;
  border-radius: 1rem;
  background: ${altV4.black};
  color: #fff;
`

const Modes = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
`

const ModeBtn = styled.button<{ $on: boolean }>`
  flex: 1;
  min-height: 2.75rem;
  padding: 0 0.75rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $on }) => ($on ? altV4.gold : 'rgba(255,255,255,0.22)')};
  background: ${({ $on }) => ($on ? altV4.gold : 'transparent')};
  color: ${({ $on }) => ($on ? altV4.black : '#fff')};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
`

const ProductRow = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.07);
  text-decoration: none;
  color: #fff;
  text-align: left;
`

const Thumb = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  object-fit: contain;
  border-radius: 0.65rem;
  background: rgba(255, 255, 255, 0.06);
`

const ProductName = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const ProductWhy = styled.span`
  display: block;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
`

const ProductPrice = styled.span`
  flex: none;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.2rem;
  color: ${altV4.gold};
`

const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 0.9rem 0 0.25rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
`

const Total = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.9rem;
  letter-spacing: 0;
  text-transform: none;
  color: ${altV4.gold};
`

const Points = styled.div`
  margin-bottom: 0.9rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    flex-wrap: wrap;

    a {
      width: auto;
      flex: 1;
    }
  }
`

function GoalIcon({ pathId }: { pathId: string }) {
  switch (pathId) {
    case 'no-meds':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M7 12h10" strokeLinecap="round" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
    case 'nutrition':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 3v4M12 17v4M5 12H3M21 12h-2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      )
    case 'hunger-cravings':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path
            d="M12 3c2 3 4 5.5 4 8a4 4 0 0 1-8 0c0-2.5 2-5 4-8Z"
            strokeLinejoin="round"
          />
          <path d="M12 15v6" strokeLinecap="round" />
        </svg>
      )
    case 'post-tapering':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M6 18L12 6l6 12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 14h8" strokeLinecap="round" />
        </svg>
      )
    case 'glp1-regime':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M8 12h8M12 8v8" strokeLinecap="round" />
          <rect x="5" y="5" width="14" height="14" rx="3" />
        </svg>
      )
    default:
      return null
  }
}

function SituationResults({
  situationId,
  scope,
  setScope,
  get,
}: {
  situationId: string
  scope: (typeof altV4QuizScopes)[number]['id']
  setScope: (id: (typeof altV4QuizScopes)[number]['id']) => void
  get: (id: string) => (typeof altV4Products)[string]
}) {
  const situation = altV4Situations.find((item) => item.id === situationId)
  if (!situation) return null

  const ids = scope === 'plan' ? situation.plan : situation.rec
  const items = ids.map((id) => get(id)).filter(Boolean)
  const total = items.reduce((sum, item) => sum + item.value, 0)
  const collectionUrl =
    getShopifyCollectionUrl(situation.collectionHandle) ??
    getShopifyCatalogUrl()

  return (
    <Panel>
      <Modes>
        {altV4QuizScopes.map((mode) => (
          <ModeBtn
            key={mode.id}
            type="button"
            $on={scope === mode.id}
            onClick={() => setScope(mode.id)}
          >
            {mode.label}
          </ModeBtn>
        ))}
      </Modes>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {items.map((item) => (
          <ProductRow
            key={item.id}
            href={getAltV4ProductHref(item)}
            rel="noopener noreferrer"
          >
            <Thumb src={item.image} alt="" width={58} height={58} />
            <span style={{ flex: 1, minWidth: 0 }}>
              <ProductName>{item.name}</ProductName>
              <ProductWhy>{item.why}</ProductWhy>
            </span>
            <ProductPrice>{getAltV4ProductPrice(item)}</ProductPrice>
          </ProductRow>
        ))}
      </div>
      <TotalRow>
        <span>Celkem</span>
        <Total>
          {items.some((item) => item.soon)
            ? 'Předprodej'
            : items[0]?.livePrice && items.length === 1
              ? items[0].livePrice
              : `${Math.round(total).toLocaleString('cs-CZ').replace(/\u00a0/g, ' ')} Kč`}
        </Total>
      </TotalRow>
      <Points>{situation.note}</Points>
      <Actions>
        <V4PillGold href={collectionUrl} rel="noopener noreferrer">
          {altV4QuizCopy.addAll}
        </V4PillGold>
        <V4PillOutline
          $onDark
          href={getShopifyCatalogUrl()}
          rel="noopener noreferrer"
        >
          {altV4QuizCopy.seeAll}
        </V4PillOutline>
      </Actions>
    </Panel>
  )
}

export function AltSituationQuizSection() {
  const { get } = useAltV4Catalog()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [scope, setScope] = useState<(typeof altV4QuizScopes)[number]['id']>(
    'single',
  )

  return (
    <QuizSection
      id={ALT_V4_SECTION_IDS.quiz}
      aria-label={altV4QuizCopy.desktopTitle}
    >
      <V4Inner>
        <DesktopOnly>
          <DesktopPanel>
            <DesktopHeader>
              <DesktopTitle id="alt-v4-quiz-title">
                {altV4QuizCopy.desktopTitle}
              </DesktopTitle>
              <DesktopLead>{altV4QuizCopy.desktopLead}</DesktopLead>
            </DesktopHeader>

            <CardGrid role="list">
              {customerPaths.map((path) => {
                const situation = situationByCollection[path.collectionHandle]
                if (!situation) return null
                const selected = selectedId === situation.id

                return (
                  <PathCard
                    key={path.id}
                    type="button"
                    role="listitem"
                    $selected={selected}
                    aria-pressed={selected}
                    aria-expanded={selected}
                    onClick={() =>
                      setSelectedId((current) =>
                        current === situation.id ? null : situation.id,
                      )
                    }
                  >
                    <IconWrap>
                      <GoalIcon pathId={path.id} />
                    </IconWrap>
                    <CardTitle>{path.headline}</CardTitle>
                    <CardText>{path.subtext}</CardText>
                  </PathCard>
                )
              })}
            </CardGrid>

            {selectedId ? (
              <DesktopResults>
                <SituationResults
                  situationId={selectedId}
                  scope={scope}
                  setScope={setScope}
                  get={get}
                />
              </DesktopResults>
            ) : null}
          </DesktopPanel>
        </DesktopOnly>

        <MobileOnly>
          <QuizEyebrow>{altV4QuizCopy.eyebrow}</QuizEyebrow>
          <QuizTitle id="alt-v4-quiz-title-mobile">
            {altV4QuizCopy.title}
          </QuizTitle>
          <QuizLead>{altV4QuizCopy.lead}</QuizLead>
          <List>
            {altV4Situations.map((situation) => {
              const open = selectedId === situation.id

              return (
                <GoalWrap key={situation.id}>
                  <GoalBtn
                    type="button"
                    $open={open}
                    aria-expanded={open}
                    onClick={() =>
                      setSelectedId((current) =>
                        current === situation.id ? null : situation.id,
                      )
                    }
                  >
                    <GoalTop>
                      <Num $open={open}>{situation.num}</Num>
                      <GoalName>{situation.name}</GoalName>
                      <Chevron $open={open} aria-hidden>
                        ▾
                      </Chevron>
                    </GoalTop>
                    <GoalNote $open={open}>{situation.note}</GoalNote>
                  </GoalBtn>
                  {open ? (
                    <SituationResults
                      situationId={situation.id}
                      scope={scope}
                      setScope={setScope}
                      get={get}
                    />
                  ) : null}
                </GoalWrap>
              )
            })}
          </List>
        </MobileOnly>
      </V4Inner>
    </QuizSection>
  )
}
