import styled from 'styled-components'

const paymentMethods = [
  { id: 'apple_pay', label: 'Apple Pay' },
  { id: 'american_express', label: 'American Express' },
  { id: 'google_pay', label: 'Google Pay' },
  { id: 'maestro', label: 'Maestro' },
  { id: 'master', label: 'Mastercard' },
  { id: 'visa', label: 'Visa' },
] as const

const PaymentList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const PaymentItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 1.5rem;
  border-radius: 0.2rem;
  background: #fff;
  overflow: hidden;
`

const PaymentImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export function FooterPaymentIcons() {
  return (
    <PaymentList aria-label="Akceptované platební metody">
      {paymentMethods.map(({ id, label }) => (
        <PaymentItem key={id}>
          <PaymentImage
            src={`/payment-icons/${id}.svg`}
            alt={label}
            width={38}
            height={24}
            loading="lazy"
            decoding="async"
          />
        </PaymentItem>
      ))}
    </PaymentList>
  )
}
