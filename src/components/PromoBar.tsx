import styled from 'styled-components'

const Bar = styled.div`
  padding: 0.6rem 1rem;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
`

export function PromoBar() {
  return (
    <Bar>
      E-shop spouštíme brzy — sledujte odpočet na úvodní stránce
    </Bar>
  )
}
