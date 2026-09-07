import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4Pipeline,
  altV4PipelineCopy,
  getAltV4ProductHref,
} from '../../../data/altHomeV4'
import { useAltV4Catalog } from '../../../hooks/useAltV4Catalog'
import { altV4 } from '../../../styles/altV4'
import { V4Inner, V4Lead, V4Section, V4Title } from './shared'

const Head = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
`

const All = styled(Link)`
  flex: none;
  color: ${altV4.goldInk};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
`

const Track = styled.div`
  display: flex;
  gap: 0.65rem;
  padding-bottom: 0.25rem;
  overflow-x: auto;
  scrollbar-width: thin;
`

const Card = styled.div`
  flex: none;
  width: 15.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.9rem;
  border-radius: 1.125rem;
  background: ${altV4.paper2};
  border: 1px solid ${altV4.line};
`

const State = styled.span<{ $live?: boolean }>`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${({ $live }) => ($live ? altV4.live : altV4.paper2)};
  color: ${({ $live }) => ($live ? '#fff' : altV4.goldInk)};
  border: 1px solid ${({ $live }) => ($live ? altV4.live : altV4.line)};
`

const Name = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.3rem;
  line-height: 1.05;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

const Desc = styled.span`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${altV4.ink2};
`

const Buy = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3rem;
  margin-top: auto;
  border: 0;
  border-radius: 999px;
  background: ${altV4.live};
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
`

export function AltPipelineV4Section() {
  const { get } = useAltV4Catalog()

  return (
    <V4Section id={ALT_V4_SECTION_IDS.pipeline} aria-labelledby="alt-v4-pipeline-title">
      <V4Inner>
        <Head>
          <V4Title id="alt-v4-pipeline-title" style={{ margin: 0 }}>
            {altV4PipelineCopy.title}
          </V4Title>
          <All to={altV4PipelineCopy.allHref}>{altV4PipelineCopy.allLabel}</All>
        </Head>
        <V4Lead>{altV4PipelineCopy.lead}</V4Lead>
        <Track>
          {altV4Pipeline.map((item) => {
            const product =
              'productId' in item && item.productId ? get(item.productId) : undefined
            const href = product ? getAltV4ProductHref(product) : undefined
            return (
              <Card key={item.id}>
                <State $live={item.buyable}>{item.state}</State>
                <Name>{item.name}</Name>
                <Desc>{item.desc}</Desc>
                {item.buyable && href ? (
                  <Buy
                    href={href}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.cta}
                  </Buy>
                ) : null}
              </Card>
            )
          })}
        </Track>
      </V4Inner>
    </V4Section>
  )
}
