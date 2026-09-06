import styled from 'styled-components'
import {
  ALT_V4_SECTION_IDS,
  altV4BlogCopy,
  altV4BlogPosts,
} from '../../../data/altHomeV4'
import { altV4 } from '../../../styles/altV4'
import {
  getShopifyBlogUrl,
  getShopifyNovinkyArticleUrl,
  getShopifyNovinkyUrl,
} from '../../../utils/shopify'
import {
  V4Eyebrow,
  V4Inner,
  V4Lead,
  V4PillGold,
  V4PillOutline,
  V4Section,
  V4Title,
} from './shared'

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
  }
`

const Card = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1rem;
  border-radius: 1.125rem;
  background: ${altV4.paper2};
  border: 1px solid ${altV4.line};
  text-decoration: none;
  color: ${altV4.ink};
  text-align: left;
`

const Meta = styled.span`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
`

const New = styled.span`
  display: inline-flex;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid ${altV4.line};
  color: ${altV4.goldInk};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Cat = styled.span`
  display: inline-flex;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: ${altV4.black};
  color: ${altV4.gold};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.45rem;
  line-height: 1.05;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`

const Lead = styled.span`
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${altV4.ink2};
`

const Read = styled.span`
  margin-top: 0.15rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${altV4.goldInk};
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.9rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export function AltBlogV4Section() {
  const blogUrl = getShopifyBlogUrl()
  const novinkyUrl = getShopifyNovinkyUrl()

  return (
    <V4Section
      id={ALT_V4_SECTION_IDS.blog}
      aria-labelledby="alt-v4-blog-title"
      style={{ borderTop: `1px solid ${altV4.line}` }}
    >
      <V4Inner>
        <V4Eyebrow>{altV4BlogCopy.eyebrow}</V4Eyebrow>
        <V4Title id="alt-v4-blog-title">
          Co si přečíst,
          <br />
          než něco koupíte
        </V4Title>
        <V4Lead>{altV4BlogCopy.lead}</V4Lead>
        <Grid>
          {altV4BlogPosts.map((post) => (
            <Card
              key={post.id}
              href={getShopifyNovinkyArticleUrl(post.handle)}
              rel="noopener noreferrer"
            >
              <Meta>
                <New>{post.status}</New>
                <Cat>{post.kicker}</Cat>
              </Meta>
              <Title>{post.title}</Title>
              <Lead>{post.excerpt}</Lead>
              <Read>Číst článek →</Read>
            </Card>
          ))}
        </Grid>
        <Actions>
          <V4PillGold href={blogUrl} rel="noopener noreferrer">
            {altV4BlogCopy.allLabel}
          </V4PillGold>
          <V4PillOutline href={novinkyUrl} rel="noopener noreferrer">
            {altV4BlogCopy.novinkyLabel}
          </V4PillOutline>
        </Actions>
      </V4Inner>
    </V4Section>
  )
}
