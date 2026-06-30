import styled from 'styled-components'
import {
  altBundles,
  altBundlesCopy,
  altFeaturedProducts,
  altProductsCopy,
  getAltProductUrl,
  getBundleUrl,
} from '../../data/altShopCatalog'
import { ALT_SECTION_IDS } from '../../data/altHomepage'
import { getShopifyCatalogUrl } from '../../utils/shopify'
import { Reveal } from './motion'
import { AltInner, AltSection, altMobileImage, altMobileImageFrame } from './shared'

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3.5rem, 8vw, 5.5rem);
`

const CatalogSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: clamp(2.25rem, 5vw, 3.5rem);
`

const SectionHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  min-width: 0;
`

const BundlesHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: clamp(0.85rem, 2vw, 1.1rem);
  max-width: 40rem;
`

const BundlesTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const BundlesSubtitle = styled.p`
  margin: 0;
  font-size: clamp(0.92rem, 1.8vw, 1rem);
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ProductsTitle = styled.h2`
  margin: 0;
  max-width: 24ch;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 4.5vw, 2.75rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`

const ViewAllLink = styled.a`
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;
  white-space: normal;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const BundleGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.35rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`

const BundleCard = styled.a`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
  transition:
    border-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-3px);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.32);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`

const BundleImageWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 4 / 3;
  min-height: clamp(10.5rem, 26vw, 13rem);
  padding: clamp(1.15rem, 3vw, 1.75rem);
  background:
    radial-gradient(
      ellipse 85% 75% at 50% 88%,
      rgba(238, 220, 130, 0.08) 0%,
      transparent 68%
    ),
    ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${altMobileImageFrame}
`

const BundleImage = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  ${altMobileImage}
`

const BundleBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-height: clamp(11rem, 28vw, 12.5rem);
  padding: clamp(1.15rem, 2.8vw, 1.45rem);
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.gold} 0%,
    #e8d48a 100%
  );
`

const BundleName = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.1rem, 2.1vw, 1.32rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`

const BundleList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
  flex: 1;
`

const BundleItem = styled.li`
  position: relative;
  padding-left: 0.9rem;
  font-size: clamp(0.74rem, 1.4vw, 0.8rem);
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: rgba(0, 0, 0, 0.5);
  }
`

const BundleCta = styled.span`
  margin-top: auto;
  padding-top: 0.15rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`

const ProductGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 2.5vw, 1.25rem);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

const ProductCard = styled.a`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(0.75rem, 2vw, 1rem);
  align-items: stretch;
  min-height: 100%;
  padding: clamp(0.9rem, 2vw, 1.1rem);
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  transition:
    border-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.24);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }

  @media (min-width: 420px) {
    grid-template-columns: minmax(5.25rem, 32%) minmax(0, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(5.75rem, 36%) minmax(0, 1fr);
  }
`

const ProductImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(6.5rem, 18vw, 8rem);
  min-width: 0;
  padding: clamp(0.45rem, 1.5vw, 0.65rem);
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    radial-gradient(
      ellipse 90% 80% at 50% 100%,
      rgba(238, 220, 130, 0.06) 0%,
      transparent 70%
    ),
    ${({ theme }) => theme.colors.black};
  ${altMobileImageFrame}
`

const ProductImage = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  ${altMobileImage}
`

const ProductBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
  min-height: 100%;
`

const ProductName = styled.h3`
  margin: 0;
  font-size: clamp(0.9rem, 1.6vw, 1rem);
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.white};
`

const ProductList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.38rem;
  flex: 1;
`

const ProductItem = styled.li`
  display: flex;
  gap: 0.4rem;
  font-size: clamp(0.68rem, 1.3vw, 0.74rem);
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    content: '✓';
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
    font-weight: 700;
  }
`

const ProductCta = styled.span`
  margin-top: auto;
  padding-top: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gold};
`

const GridReveal = styled.div`
  height: 100%;
`

export function AltShopCatalog() {
  const catalogUrl = getShopifyCatalogUrl()

  return (
    <AltSection id={ALT_SECTION_IDS.products}>
      <AltInner>
        <Block>
          <CatalogSection aria-labelledby="alt-bundles-title">
            <Reveal>
              <BundlesHeader>
                <BundlesTitle id="alt-bundles-title">
                  {altBundlesCopy.title}
                </BundlesTitle>
                <BundlesSubtitle>{altBundlesCopy.subtitle}</BundlesSubtitle>
              </BundlesHeader>
            </Reveal>

            <BundleGrid>
              {altBundles.map((bundle, index) => (
                <Reveal key={bundle.id} delay={0.06 + index * 0.05}>
                  <GridReveal>
                    <BundleCard
                      href={getBundleUrl(bundle.collectionHandle)}
                      aria-label={`${bundle.title} — zobrazit balíček`}
                    >
                      <BundleImageWrap>
                        <BundleImage
                          src={bundle.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </BundleImageWrap>
                      <BundleBody>
                        <BundleName>{bundle.title}</BundleName>
                        <BundleList>
                          {bundle.benefits.map((benefit) => (
                            <BundleItem key={benefit}>{benefit}</BundleItem>
                          ))}
                        </BundleList>
                        <BundleCta>{bundle.cta}</BundleCta>
                      </BundleBody>
                    </BundleCard>
                  </GridReveal>
                </Reveal>
              ))}
            </BundleGrid>
          </CatalogSection>

          <CatalogSection aria-labelledby="alt-products-title">
            <Reveal>
              <SectionHeader>
                <ProductsTitle id="alt-products-title">
                  {altProductsCopy.title}
                </ProductsTitle>
                <ViewAllLink href={catalogUrl}>
                  {altProductsCopy.viewAll}
                </ViewAllLink>
              </SectionHeader>
            </Reveal>

            <ProductGrid>
              {altFeaturedProducts.map((product, index) => (
                <Reveal key={product.id} delay={0.06 + index * 0.05}>
                  <GridReveal>
                    <ProductCard
                      href={getAltProductUrl(product.shopifyHandle)}
                      aria-label={`${product.name} — zjistit více`}
                    >
                      <ProductImageWrap>
                        <ProductImage
                          src={product.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </ProductImageWrap>
                      <ProductBody>
                        <ProductName>{product.name}</ProductName>
                        <ProductList>
                          {product.benefits.map((benefit) => (
                            <ProductItem key={benefit}>{benefit}</ProductItem>
                          ))}
                        </ProductList>
                        <ProductCta>Zjistit více →</ProductCta>
                      </ProductBody>
                    </ProductCard>
                  </GridReveal>
                </Reveal>
              ))}
            </ProductGrid>
          </CatalogSection>
        </Block>
      </AltInner>
    </AltSection>
  )
}
