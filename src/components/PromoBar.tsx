import styled from "styled-components";
import { getShopifyCatalogUrl } from "../utils/shopify";

const Bar = styled.a`
  display: block;
  padding: 0.6rem 1rem;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  transition: opacity 0.2s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    letter-spacing: 0.14em;
  }

  &:hover {
    opacity: 0.92;
  }
`;

const catalogUrl = getShopifyCatalogUrl();

export function PromoBar() {
  return (
    <Bar href={catalogUrl}>
      Objednávky přijaté v pracovní dny do 12:00 expedujeme ještě tentýž den
    </Bar>
  );
}
