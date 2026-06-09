import styled, { css } from "styled-components";
import { eyebrowText } from "../styles/eyebrow";
import type { Product } from "../data/products";
import { getShopifyProductUrl } from "../utils/shopify";

const cardSurface = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }
`;

const Card = styled.article`
  ${cardSurface}
`;

const CardLink = styled.a`
  ${cardSurface}
  width: 100%;
  min-height: 100%;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  min-height: clamp(13rem, 22vw, 17rem);
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  background: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
  user-select: none;
`;

const Badge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1;
  padding: 0.35rem 0.6rem;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
`;

const Category = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  ${eyebrowText}
`;

const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

const Price = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gold};
`;

const Tagline = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const Meta = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Benefits = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Benefit = styled.li`
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const CtaLabel = styled.span`
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.85rem 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: opacity 0.2s ease;

  ${CardLink}:hover & {
    opacity: 0.9;
  }
`;

const CtaDisabled = styled.span`
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.85rem 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.pill};
  opacity: 0.6;
`;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const shopUrl = getShopifyProductUrl(product.shopifyHandle);

  const content = (
    <>
      <ImageWrap>
        <Badge>Nejprodávanější</Badge>
        <Image src={product.image} alt={product.name} loading="lazy" />
      </ImageWrap>
      <Body>
        <Category>{product.category}</Category>
        <Name>{product.name}</Name>
        {product.price ? <Price>{product.price}</Price> : null}
        <Tagline>{product.tagline}</Tagline>
        <Description>{product.description}</Description>
        <Meta>{product.format}</Meta>
        <Benefits>
          {product.benefits.map((benefit) => (
            <Benefit key={benefit}>{benefit}</Benefit>
          ))}
        </Benefits>
        {shopUrl ? (
          <CtaLabel>Zobrazit v e-shopu</CtaLabel>
        ) : (
          <CtaDisabled>Brzy v e-shopu</CtaDisabled>
        )}
      </Body>
    </>
  );

  if (shopUrl) {
    return (
      <CardLink
        href={shopUrl}
        aria-label={`${product.name} — zobrazit v e-shopu`}
      >
        {content}
      </CardLink>
    );
  }

  return <Card>{content}</Card>;
}
