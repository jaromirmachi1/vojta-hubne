import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { eyebrowText } from '../styles/eyebrow'
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
  letter-spacing: 0.22em;
  ${eyebrowText}
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
  align-items: stretch;

  & > a,
  & > article {
    height: 100%;
  }
`

const MobileViewport = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  margin-inline: calc(-1 * ${({ theme }) => theme.layout.contentPadding});
  padding-inline: ${({ theme }) => theme.layout.contentPadding};
  padding-bottom: 0.35rem;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${({ theme }) => theme.layout.contentPadding};
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MobileTrack = styled.div`
  display: flex;
  gap: 1rem;
  width: max-content;
`

const MobileSlide = styled.div`
  flex: 0 0 clamp(16rem, 82vw, 20rem);
  scroll-snap-align: start;

  & > a,
  & > article {
    height: 100%;
  }
`

const Status = styled.p`
  margin: 0 0 1.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`

export function BestsellersSection() {
  const { products, loading } = useShopifyProducts()
  const itemsPerPage = useItemsPerPage()
  const [page, setPage] = useState(0)
  const mobileViewportRef = useRef<HTMLDivElement>(null)
  const scrollSyncFrame = useRef<number | null>(null)
  const isProgrammaticScroll = useRef(false)
  const isMobileCarousel = itemsPerPage === 1

  const totalPages = isMobileCarousel
    ? Math.max(1, products.length)
    : Math.max(1, Math.ceil(products.length / itemsPerPage))

  const visibleProducts = useMemo(() => {
    if (isMobileCarousel) return products

    const start = page * itemsPerPage
    return products.slice(start, start + itemsPerPage)
  }, [isMobileCarousel, page, itemsPerPage, products])

  const updatePageFromScroll = useCallback(() => {
    const viewport = mobileViewportRef.current
    if (!viewport || !isMobileCarousel) return

    const slides = viewport.querySelectorAll('[data-slide-index]')
    if (!slides.length) return

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Infinity

    slides.forEach((slide, index) => {
      const element = slide as HTMLElement
      const slideCenter = element.offsetLeft + element.offsetWidth / 2
      const distance = Math.abs(viewportCenter - slideCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setPage((current) => (current === closestIndex ? current : closestIndex))
  }, [isMobileCarousel])

  const handleMobileScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return

    if (scrollSyncFrame.current !== null) {
      cancelAnimationFrame(scrollSyncFrame.current)
    }

    scrollSyncFrame.current = requestAnimationFrame(() => {
      updatePageFromScroll()
      scrollSyncFrame.current = null
    })
  }, [updatePageFromScroll])

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (isMobileCarousel && mobileViewportRef.current) {
        const slide = mobileViewportRef.current.querySelector(
          `[data-slide-index="${nextPage}"]`,
        ) as HTMLElement | null

        isProgrammaticScroll.current = true
        setPage(nextPage)
        slide?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
          block: 'nearest',
        })

        window.setTimeout(() => {
          isProgrammaticScroll.current = false
        }, 450)
        return
      }

      setPage(nextPage)
    },
    [isMobileCarousel],
  )

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(0)
    }
  }, [page, totalPages])

  useEffect(() => {
    setPage(0)
    mobileViewportRef.current?.scrollTo({ left: 0 })
  }, [itemsPerPage])

  useEffect(() => {
    return () => {
      if (scrollSyncFrame.current !== null) {
        cancelAnimationFrame(scrollSyncFrame.current)
      }
    }
  }, [])

  return (
    <Section id="produkty">
      <Inner>
        <Header>
          <Eyebrow>Nejprodávanější</Eyebrow>
          <Title>Trendy bestsellery</Title>
        </Header>

        {loading ? <Status>Načítám produkty z e-shopu…</Status> : null}

        {isMobileCarousel ? (
          <MobileViewport ref={mobileViewportRef} onScroll={handleMobileScroll}>
            <MobileTrack>
              {products.map((product, index) => (
                <MobileSlide key={product.id} data-slide-index={index}>
                  <ProductCard product={product} />
                </MobileSlide>
              ))}
            </MobileTrack>
          </MobileViewport>
        ) : (
          <Grid $columns={Math.min(itemsPerPage, Math.max(visibleProducts.length, 1))}>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        )}

        <BestsellersPagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Inner>
    </Section>
  )
}
