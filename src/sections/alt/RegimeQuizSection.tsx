import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { CareStyleProductCard } from "../../components/CareStyleProductCard";
import { useRegimeQuiz } from "../../contexts/RegimeQuizContext";
import { ALT_SECTION_IDS, customerPaths } from "../../data/altHomepage";
import { theme } from "../../styles/theme";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useProductReviewStats } from "../../hooks/useProductReviewStats";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useShopifyCollectionProducts } from "../../hooks/useShopifyCollectionProducts";
import { scrollToSection } from "../../utils/scrollToSection";
import { getShopifyCollectionUrl } from "../../utils/shopify";
import { Reveal } from "./motion";
import { ProblemsSection, REGIME_QUIZ_PRODUCTS_ID } from "./ProblemsSection";
import { AltInner, AltSection, GhostButton } from "./shared";

type RegimeQuizSectionProps = {
  showProblems?: boolean;
};

const Panel = styled.div`
  width: 100%;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
`;

const Header = styled.header`
  max-width: 42rem;
  margin-inline: auto;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 0.65rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 4.5vw, 2.75rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`;

const Subtitle = styled.p`
  margin: 0 0 clamp(1.75rem, 4vw, 2.25rem);
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const GoalGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: contents;
  }
`;

const GoalCard = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
  width: 100%;
  padding: clamp(1.15rem, 2.5vw, 1.35rem);
  text-align: left;
  cursor: pointer;
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.gold : theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $selected }) =>
    $selected ? "rgba(238, 220, 130, 0.06)" : theme.colors.surface};
  box-shadow: ${({ $selected }) =>
    $selected ? "0 0 0 1px rgba(238, 220, 130, 0.18)" : "none"};
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 100%;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
  }
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.colors.gold};

  svg {
    width: 1.65rem;
    height: 1.65rem;
  }
`;

const CardTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.15rem, 2.2vw, 1.35rem);
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

const CardText = styled.span`
  font-size: 0.82rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ProductsWrap = styled(motion.div)`
  overflow: hidden;
`;

const InlineProductsWrap = styled.div`
  display: block;
  width: 100%;
  min-width: 0;
  padding-bottom: 0.35rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const DesktopProductsWrap = styled(ProductsWrap)``;

const ProductsInner = styled.div`
  padding-top: clamp(1.75rem, 4vw, 2.5rem);
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  margin-top: clamp(1.75rem, 4vw, 2.25rem);
`;

const InlineProductsInner = styled.div`
  padding-top: 0.15rem;
`;

const ProductsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const ProductsTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StatusText = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const REGIME_QUIZ_PRODUCTS_DESKTOP_ID = `${REGIME_QUIZ_PRODUCTS_ID}-desktop`;

type CustomerPath = (typeof customerPaths)[number];

type RegimeQuizProductsPanelProps = {
  selectedPath: CustomerPath;
  collection: ReturnType<typeof useShopifyCollectionProducts>["collection"];
  loading: boolean;
  error: string | null;
  collectionUrl: string | null;
  reviewStatsByHandle: ReturnType<typeof useProductReviewStats>;
  inner: typeof ProductsInner | typeof InlineProductsInner;
  id?: string;
};

function RegimeQuizProductsPanel({
  selectedPath,
  collection,
  loading,
  error,
  collectionUrl,
  reviewStatsByHandle,
  inner: Inner,
  id,
}: RegimeQuizProductsPanelProps) {
  return (
    <Inner id={id}>
      <ProductsHeader>
        <ProductsTitle>{selectedPath.headline}</ProductsTitle>
        {collectionUrl ? (
          <GhostButton href={collectionUrl}>Celá kolekce →</GhostButton>
        ) : null}
      </ProductsHeader>

      {loading ? (
        <StatusText>Načítám doporučené produkty…</StatusText>
      ) : error ? (
        <StatusText>{error}</StatusText>
      ) : collection && collection.products.length > 0 ? (
        <ProductsGrid>
          {collection.products.map((product) => (
            <CareStyleProductCard
              key={product.handle}
              product={product}
              reviewStats={reviewStatsByHandle.get(product.handle)}
            />
          ))}
        </ProductsGrid>
      ) : (
        <StatusText>V této kolekci zatím nejsou žádné produkty.</StatusText>
      )}
    </Inner>
  );
}

function GoalIcon({ pathId }: { pathId: string }) {
  switch (pathId) {
    case "no-meds":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M7 12h10" strokeLinecap="round" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    case "nutrition":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 3v4M12 17v4M5 12H3M21 12h-2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
    case "hunger-cravings":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path
            d="M12 3c2 3 4 5.5 4 8a4 4 0 0 1-8 0c0-2.5 2-5 4-8Z"
            strokeLinejoin="round"
          />
          <path d="M12 15v6" strokeLinecap="round" />
        </svg>
      );
    case "post-tapering":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path
            d="M6 18L12 6l6 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 14h8" strokeLinecap="round" />
        </svg>
      );
    case "glp1-regime":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M8 12h8M12 8v8" strokeLinecap="round" />
          <rect x="5" y="5" width="14" height="14" rx="3" />
        </svg>
      );
    default:
      return null;
  }
}

export function RegimeQuizSection({
  showProblems = true,
}: RegimeQuizSectionProps) {
  const isTabletUp = useMediaQuery(`(min-width: ${theme.breakpoints.tablet})`);
  const reducedMotion = useReducedMotion();
  const reviewStatsByHandle = useProductReviewStats();
  const { selectedId, togglePath, paths: customerPaths } = useRegimeQuiz();

  const selectedPath = useMemo(
    () => customerPaths.find((path) => path.id === selectedId) ?? null,
    [selectedId],
  );

  const { collection, loading, error } = useShopifyCollectionProducts(
    selectedPath?.collectionHandle ?? null,
  );

  const collectionUrl = selectedPath
    ? getShopifyCollectionUrl(selectedPath.collectionHandle)
    : null;

  const handleSelect = (pathId: string) => {
    const willSelect = selectedId !== pathId;
    togglePath(pathId);

    if (willSelect) {
      requestAnimationFrame(() => {
        const isMobile = window.matchMedia(
          `(max-width: calc(${theme.breakpoints.tablet} - 1px))`,
        ).matches;

        scrollToSection(
          isMobile ? REGIME_QUIZ_PRODUCTS_ID : REGIME_QUIZ_PRODUCTS_DESKTOP_ID,
        );
      });
    }
  };

  const desktopMotionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <AltSection id={ALT_SECTION_IDS.regimeQuiz}>
      <AltInner>
        <Reveal>
          <Panel>
            <Header>
              <Title>Jaká je vaše situace?</Title>
              <Subtitle>
                Vyberte možnost, která vás vystihuje nejvíc. Hned pod tím
                uvidíte produkty doporučené pro vaši fázi.
              </Subtitle>
            </Header>

            <Grid role="list">
              {customerPaths.map((path) => {
                const selected = selectedId === path.id;
                return (
                  <GoalGroup key={path.id}>
                    <GoalCard
                      type="button"
                      role="listitem"
                      $selected={selected}
                      aria-pressed={selected}
                      aria-expanded={selected}
                      onClick={() => handleSelect(path.id)}
                    >
                      <IconWrap>
                        <GoalIcon pathId={path.id} />
                      </IconWrap>
                      <CardTitle>{path.headline}</CardTitle>
                      <CardText>{path.subtext}</CardText>
                    </GoalCard>

                    {selectedId === path.id && selectedPath ? (
                      <InlineProductsWrap key={selectedPath.id}>
                        <RegimeQuizProductsPanel
                          id={REGIME_QUIZ_PRODUCTS_ID}
                          selectedPath={selectedPath}
                          collection={collection}
                          loading={loading}
                          error={error}
                          collectionUrl={collectionUrl}
                          reviewStatsByHandle={reviewStatsByHandle}
                          inner={InlineProductsInner}
                        />
                      </InlineProductsWrap>
                    ) : null}
                  </GoalGroup>
                );
              })}
            </Grid>

            {isTabletUp ? (
              <AnimatePresence initial={false}>
                {selectedPath ? (
                  <DesktopProductsWrap
                    key={selectedPath.id}
                    {...desktopMotionProps}
                  >
                    <RegimeQuizProductsPanel
                      id={REGIME_QUIZ_PRODUCTS_DESKTOP_ID}
                      selectedPath={selectedPath}
                      collection={collection}
                      loading={loading}
                      error={error}
                      collectionUrl={collectionUrl}
                      reviewStatsByHandle={reviewStatsByHandle}
                      inner={ProductsInner}
                    />
                  </DesktopProductsWrap>
                ) : null}
              </AnimatePresence>
            ) : null}
          </Panel>
        </Reveal>

        {showProblems ? <ProblemsSection /> : null}
      </AltInner>
    </AltSection>
  );
}
