import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 2rem;
`

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  color: ${({ theme }) => theme.colors.gold};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition:
    background 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(238, 220, 130, 0.08);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '1.75rem' : '0.5rem')};
  height: 0.5rem;
  padding: 0;
  border: none;
  border-radius: 0;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.gold : 'rgba(255, 255, 255, 0.2)'};
  cursor: pointer;
  transition:
    width 0.25s ease,
    background 0.2s ease;
`

type BestsellersPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function BestsellersPagination({
  page,
  totalPages,
  onPageChange,
}: BestsellersPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <Nav aria-label="Stránkování produktů">
      <ArrowButton
        type="button"
        aria-label="Předchozí stránka"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </ArrowButton>

      <Dots>
        {Array.from({ length: totalPages }, (_, i) => (
          <Dot
            key={i}
            type="button"
            $active={i === page}
            aria-label={`Stránka ${i + 1}`}
            aria-current={i === page ? 'page' : undefined}
            onClick={() => onPageChange(i)}
          />
        ))}
      </Dots>

      <ArrowButton
        type="button"
        aria-label="Další stránka"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </ArrowButton>
    </Nav>
  )
}
