import styled from 'styled-components'

const Icon = styled.svg`
  display: block;
  flex-shrink: 0;
  width: 0.85rem;
  height: 0.85rem;
`

export function ArrowIcon() {
  return (
    <Icon
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 10h11M11 6l4 4-4 4" />
    </Icon>
  )
}
