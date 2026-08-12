import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PROMO_BAR_CODE } from '../data/promoBar'

const Button = styled.button<{ $compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${({ $compact }) => ($compact ? '0.65rem' : '0.85rem')};
  padding: ${({ $compact }) => ($compact ? '0.7rem 1rem' : '0.85rem 1.25rem')};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font: inherit;
  font-size: ${({ $compact }) => ($compact ? '0.62rem' : '0.7rem')};
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

type PromoCodeCopyButtonProps = {
  compact?: boolean
  className?: string
}

export function PromoCodeCopyButton({
  compact = false,
  className,
}: PromoCodeCopyButtonProps) {
  const [codeCopied, setCodeCopied] = useState(false)

  const copyPromoCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROMO_BAR_CODE)
      setCodeCopied(true)
    } catch {
      setCodeCopied(false)
    }
  }, [])

  useEffect(() => {
    if (!codeCopied) return

    const timer = window.setTimeout(() => setCodeCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [codeCopied])

  return (
    <Button
      type="button"
      className={className}
      $compact={compact}
      onClick={copyPromoCode}
      aria-label={`Zkopírovat slevový kód ${PROMO_BAR_CODE}`}
    >
      {codeCopied ? 'Kód zkopírován' : `Zkopírovat kód ${PROMO_BAR_CODE}`}
    </Button>
  )
}
