import styled from 'styled-components'
import { useRegimeQuiz } from '../../../contexts/RegimeQuizContext'
import { ALT_V4_SECTION_IDS, altV4QuizCopy } from '../../../data/altHomeV4'
import { useShopifyCollectionProducts } from '../../../hooks/useShopifyCollectionProducts'
import { altV4 } from '../../../styles/altV4'
import {
  getShopifyCatalogUrl,
  getShopifyCollectionUrl,
  getShopifyProductUrl,
} from '../../../utils/shopify'
import { formatShopifyPrice } from '../../../utils/shopifyFormat'
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

const GoalDesc = styled.span<{ $open: boolean }>`
  display: block;
  padding-left: 3.2rem;
  font-size: 0.88rem;
  line-height: 1.5;
  color: ${({ $open }) =>
    $open ? 'rgba(255,255,255,0.78)' : altV4.ink2};
`

const Panel = styled.div`
  margin-top: 0.15rem;
  padding: 1.1rem 1rem 1.15rem;
  border-radius: 1rem;
  background: ${altV4.black};
  color: #fff;
`

const PanelNote = styled.p`
  margin: 0 0 0.9rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
`

const ProductRow = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.07);
  text-decoration: none;
  color: #fff;
`

const Thumb = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  object-fit: contain;
  border-radius: 0.65rem;
  background: rgba(255, 255, 255, 0.06);
`

const ProductBody = styled.span`
  flex: 1;
  min-width: 0;
`

const ProductName = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
  line-height: 1.1;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const ProductWhy = styled.span`
  display: block;
  margin-top: 0.15rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
`

const ProductPrice = styled.span`
  display: block;
  margin-top: 0.2rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  color: ${altV4.gold};
`

const AddCircle = styled.span`
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: ${altV4.gold};
  color: ${altV4.black};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  line-height: 1;
`

const Status = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.72);
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    flex-wrap: wrap;

    a {
      width: auto;
      flex: 1;
    }
  }
`

function SituationPanel({
  collectionHandle,
  note,
}: {
  collectionHandle: string
  note: string
}) {
  const { collection, loading, error } =
    useShopifyCollectionProducts(collectionHandle)
  const collectionUrl =
    getShopifyCollectionUrl(collectionHandle) ?? getShopifyCatalogUrl()

  return (
    <Panel>
      <V4Eyebrow $onDark>{altV4QuizCopy.panelEyebrow}</V4Eyebrow>
      <PanelNote>{note}</PanelNote>
      {loading ? (
        <Status>Načítám doporučené produkty…</Status>
      ) : error ? (
        <Status>{error}</Status>
      ) : collection && collection.products.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {collection.products.slice(0, 4).map((product) => {
            const href =
              getShopifyProductUrl(product.handle) ?? collectionUrl
            const price = formatShopifyPrice(
              product.priceRange.minVariantPrice,
            )
            const image = product.featuredImage?.url
            return (
              <ProductRow
                key={product.handle}
                href={href}
                rel="noopener noreferrer"
                aria-label={`${product.title} — zobrazit v e-shopu`}
              >
                {image ? (
                  <Thumb src={image} alt="" width={58} height={58} />
                ) : (
                  <Thumb as="span" aria-hidden />
                )}
                <ProductBody>
                  <ProductName>{product.title}</ProductName>
                  <ProductWhy>Doporučeno pro vaši situaci</ProductWhy>
                  {price ? <ProductPrice>{price}</ProductPrice> : null}
                </ProductBody>
                <AddCircle aria-hidden>+</AddCircle>
              </ProductRow>
            )
          })}
        </div>
      ) : (
        <Status>V této kolekci zatím nejsou žádné produkty.</Status>
      )}
      <Actions>
        <V4PillGold href={collectionUrl} rel="noopener noreferrer">
          {altV4QuizCopy.addAll}
        </V4PillGold>
        <V4PillOutline $onDark href={getShopifyCatalogUrl()} rel="noopener noreferrer">
          {altV4QuizCopy.seeAll}
        </V4PillOutline>
      </Actions>
    </Panel>
  )
}

export function AltSituationQuizSection() {
  const { paths, selectedId, togglePath } = useRegimeQuiz()

  return (
    <V4Section id={ALT_V4_SECTION_IDS.quiz} aria-labelledby="alt-v4-quiz-title">
      <V4Inner>
        <V4Eyebrow>{altV4QuizCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-quiz-title">{altV4QuizCopy.title}</V4Title>
        <V4Lead>{altV4QuizCopy.lead}</V4Lead>
        <List>
          {paths.map((path, index) => {
            const open = selectedId === path.id
            return (
              <GoalWrap key={path.id} $open={open}>
                <GoalBtn
                  type="button"
                  $open={open}
                  aria-expanded={open}
                  onClick={() => togglePath(path.id)}
                >
                  <GoalTop>
                    <Num $open={open}>{String(index + 1).padStart(2, '0')}</Num>
                    <GoalName>{path.headline}</GoalName>
                    <Chevron $open={open} aria-hidden>
                      ▾
                    </Chevron>
                  </GoalTop>
                  <GoalDesc $open={open}>{path.subtext}</GoalDesc>
                </GoalBtn>
                {open ? (
                  <SituationPanel
                    collectionHandle={path.collectionHandle}
                    note={path.subtext}
                  />
                ) : null}
              </GoalWrap>
            )
          })}
        </List>
      </V4Inner>
    </V4Section>
  )
}
