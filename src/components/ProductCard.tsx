import styled from 'styled-components'
import type { Product } from '../data/products'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }
`

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const Badge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.35rem 0.6rem;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
`

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
`

const Category = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Tagline = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Description = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`

const Meta = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Benefits = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Benefit = styled.li`
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`

const Cta = styled.button`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.85rem 1rem;
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <ImageWrap>
        <Badge>Nejprodávanější</Badge>
        <Image src={product.image} alt={product.name} loading="lazy" />
      </ImageWrap>
      <Body>
        <Category>{product.category}</Category>
        <Name>{product.name}</Name>
        <Tagline>{product.tagline}</Tagline>
        <Description>{product.description}</Description>
        <Meta>{product.format}</Meta>
        <Benefits>
          {product.benefits.map((benefit) => (
            <Benefit key={benefit}>{benefit}</Benefit>
          ))}
        </Benefits>
        <Cta type="button">Brzy v e-shopu</Cta>
      </Body>
    </Card>
  )
}
