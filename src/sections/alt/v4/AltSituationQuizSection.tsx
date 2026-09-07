import { useState } from 'react'
import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
`

const GoalWrap = styled.div<{ $open?: boolean }>`
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: ${({ $open }) => ($open ? '1 / -1' : 'auto')};
  }
`

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

export function AltSituationQuizSection() {
  const { get } = useAltV4Catalog()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [scope, setScope] = useState<(typeof altV4QuizScopes)[number]['id']>(
    'single',
  )

  return (
    <V4Section
      id={ALT_V4_SECTION_IDS.quiz}
      aria-labelledby="alt-v4-quiz-title"
      style={{ borderTop: `1px solid ${altV4.line}` }}
    >
      <V4Inner>
        <V4Eyebrow>{altV4QuizCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-quiz-title">{altV4QuizCopy.title}</V4Title>
        <V4Lead>{altV4QuizCopy.lead}</V4Lead>
        <List>
          {altV4Situations.map((situation) => {
            const open = selectedId === situation.id
            const ids = scope === 'plan' ? situation.plan : situation.rec
            const items = ids.map((id) => get(id)).filter(Boolean)
            const total = items.reduce((sum, item) => sum + item.value, 0)
            const collectionUrl =
              getShopifyCollectionUrl(situation.collectionHandle) ??
              getShopifyCatalogUrl()

            return (
              <GoalWrap key={situation.id} $open={open}>
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                      }}
                    >
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
                ) : null}
              </GoalWrap>
            )
          })}
        </List>
      </V4Inner>
    </V4Section>
  )
}
