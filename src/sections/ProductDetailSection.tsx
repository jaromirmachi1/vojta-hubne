import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { createCart } from '../api/shopify'
import { PageContainer } from '../components/PageContainer'
import type { ShopifyProduct, ShopifyProductVariant } from '../types/shopify'
import {
  formatShopifyPrice,
  hasMultipleVariants,
  isDefaultVariantOnly,
} from '../utils/shopifyFormat'

const Section = styled.section`
  padding-block: clamp(2rem, 5vw, 3.5rem);
  background: ${({ theme }) => theme.colors.black};
`

const Grid = styled(PageContainer)`
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.65fr) minmax(320px, 0.95fr);
    align-items: start;
    gap: clamp(2rem, 4vw, 3rem);
  }
`

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const MainImageWrap = styled.div`
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  overflow: hidden;
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ThumbGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ThumbButton = styled.button<{ $active?: boolean }>`
  aspect-ratio: 1;
  padding: 0;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.border : theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: sticky;
    top: calc(${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.layout.promoBarHeight} + 1rem);
    max-height: calc(
      100svh - ${({ theme }) => theme.layout.headerHeight} -
        ${({ theme }) => theme.layout.promoBarHeight} - 2rem
    );
    overflow-y: auto;
    scrollbar-width: thin;
  }
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Price = styled.p`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gold};
`

const ComparePrice = styled.span`
  margin-left: 0.75rem;
  font-size: 0.95rem;
  font-weight: 400;
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.textMuted};
`

const VariantLabel = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const VariantList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const VariantButton = styled.button<{ $active?: boolean }>`
  padding: 0.65rem 1rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.colors.gold : theme.colors.text)};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.border : theme.colors.borderSubtle};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

const BuyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: stretch;
`

const QuantityInput = styled.input`
  width: 4rem;
  padding: 0.85rem 0.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const AddButton = styled.button`
  flex: 1;
  min-width: 12rem;
  padding: 1rem 1.5rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ErrorText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #e57373;
`

const Description = styled.div`
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-size: 0.9375rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.text};

  p {
    margin: 0 0 1rem;
  }

  ul {
    margin: 0 0 1rem;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.35rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.textHeading};
  }
`

type ProductDetailSectionProps = {
  product: ShopifyProduct
}

function pickInitialVariant(variants: ShopifyProductVariant[]): ShopifyProductVariant {
  return variants.find((v) => v.availableForSale) ?? variants[0]!
}

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const images = useMemo(() => {
    const list = product.images.length
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : []
    return list
  }, [product])

  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(() =>
    pickInitialVariant(product.variants),
  )
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [cartError, setCartError] = useState<string | null>(null)

  const showVariants =
    hasMultipleVariants(product.variants.length) &&
    !isDefaultVariantOnly(product.variants)

  const displayPrice = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAt = selectedVariant?.compareAtPrice

  async function handleAddToCart() {
    if (!selectedVariant?.availableForSale) return

    setAdding(true)
    setCartError(null)

    try {
      const cart = await createCart(selectedVariant.id, quantity)
      window.location.href = cart.checkoutUrl
    } catch (err) {
      setCartError(err instanceof Error ? err.message : 'Košík se nepodařilo vytvořit.')
      setAdding(false)
    }
  }

  const mainImage = images[activeImage] ?? images[0]

  return (
    <Section>
      <Grid>
        <Gallery>
          <MainImageWrap>
            {mainImage ? (
              <MainImage
                src={mainImage.url}
                alt={mainImage.altText ?? product.title}
                width={mainImage.width}
                height={mainImage.height}
              />
            ) : null}
          </MainImageWrap>

          {images.length > 1 ? (
            <ThumbGrid>
              {images.map((image, index) => (
                <ThumbButton
                  key={image.url}
                  type="button"
                  $active={index === activeImage}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Obrázek ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={image.altText ?? `${product.title} ${index + 1}`}
                    loading="lazy"
                  />
                </ThumbButton>
              ))}
            </ThumbGrid>
          ) : null}
        </Gallery>

        <Details>
          <Title>{product.title}</Title>

          <Price>
            {formatShopifyPrice(displayPrice)}
            {compareAt ? (
              <ComparePrice>{formatShopifyPrice(compareAt)}</ComparePrice>
            ) : null}
          </Price>

          {showVariants ? (
            <div>
              <VariantLabel>Varianta</VariantLabel>
              <VariantList>
                {product.variants.map((variant) => (
                  <VariantButton
                    key={variant.id}
                    type="button"
                    $active={variant.id === selectedVariant?.id}
                    disabled={!variant.availableForSale}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.title}
                  </VariantButton>
                ))}
              </VariantList>
            </div>
          ) : null}

          <BuyRow>
            <QuantityInput
              type="number"
              min={1}
              max={99}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              aria-label="Množství"
            />
            <AddButton
              type="button"
              onClick={handleAddToCart}
              disabled={adding || !selectedVariant?.availableForSale}
            >
              {adding
                ? 'Přidávám…'
                : selectedVariant?.availableForSale
                  ? 'Přidat do košíku'
                  : 'Vyprodáno'}
            </AddButton>
          </BuyRow>

          {cartError ? <ErrorText>{cartError}</ErrorText> : null}

          {product.descriptionHtml ? (
            <Description
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : null}
        </Details>
      </Grid>
    </Section>
  )
}
