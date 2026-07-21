import styled from 'styled-components'

const List = styled.div`
  margin-top: 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: grid;
  gap: 0;
`

const Item = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &[open] > summary span {
    transform: rotate(45deg);
  }
`

const Summary = styled.summary`
  list-style: none;
  cursor: pointer;
  padding: 1.05rem 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;

  &::-webkit-details-marker {
    display: none;
  }

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.6rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
    background: rgba(238, 220, 130, 0.12);
    color: ${({ theme }) => theme.colors.gold};
    transition: transform 0.2s ease;
  }
`

const Answer = styled.p`
  margin: 0;
  padding: 0 0 1.05rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`

export function FAQList({
  items,
}: {
  items: { q: string; a: string }[]
}) {
  return (
    <List aria-label="Časté otázky">
      {items.map((item, index) => (
        <Item key={item.q} open={index === 0}>
          <Summary>
            {item.q}
            <span aria-hidden>+</span>
          </Summary>
          <Answer>{item.a}</Answer>
        </Item>
      ))}
    </List>
  )
}

