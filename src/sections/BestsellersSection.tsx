import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BestsellersPagination } from '../components/BestsellersPagination'
import { PageContainer } from '../components/PageContainer'
import { ProductCard } from '../components/ProductCard'
import { useItemsPerPage } from '../hooks/useItemsPerPage'
import { useShopifyProducts } from '../hooks/useShopifyProducts'

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
  background: ${({ theme }) => theme.colors.surface};
`

const Inner = styled(PageContainer)``

const Header = styled.header`
  margin-bottom: 2.5rem;
`

const Eyebrow = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`

const Grid = styled.div<{ $columns: number }>`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
`

const Status = styled.p`
  margin: 0 0 1.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function BestsellersSection() {
  const { products, loading } = useShopifyProducts()
  const itemsPerPage = useItemsPerPage()
  const [page, setPage] = useState(0)

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage))

  const visibleProducts = useMemo(() => {
    const start = page * itemsPerPage
    return products.slice(start, start + itemsPerPage)
  }, [page, itemsPerPage, products])

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(0)
    }
  }, [page, totalPages])

  useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  return (
    <Section id="produkty">
      <Inner>
        <Header>
          <Eyebrow>Nejprodávanější</Eyebrow>
          <Title>Trendy bestsellery</Title>
        </Header>

        {loading ? <Status>Načítám produkty z e-shopu…</Status> : null}

        <Grid $columns={Math.min(itemsPerPage, Math.max(visibleProducts.length, 1))}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>

        <BestsellersPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Inner>
    </Section>
  )
}
