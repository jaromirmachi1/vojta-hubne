import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useJsonLd } from '../hooks/useJsonLd'
import { getAbsoluteUrl } from '../seo/site'
import { PageContainer } from './PageContainer'

export type BreadcrumbItem = {
  label: string
  /** Internal path (`/kontakt`) or absolute URL. Omit for the current page. */
  to?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

const Nav = styled.nav`
  padding-block: 0.85rem 0;
`

const Inner = styled(PageContainer)`
  min-width: 0;
`

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.15rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.goldMuted};

  &:not(:last-child)::after {
    content: '/';
    margin-inline-start: 0.15rem;
    color: rgba(255, 255, 255, 0.28);
    font-weight: 400;
  }
`

const linkStyles = `
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
  max-width: 28ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #eedc82;
  }
`

const CrumbLink = styled(Link)`
  ${linkStyles}
`

const ExternalLink = styled.a`
  ${linkStyles}
`

const Current = styled.span`
  color: rgba(255, 255, 255, 0.72);
  max-width: 36ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function isExternal(to: string) {
  return /^https?:\/\//i.test(to) || to.startsWith('mailto:')
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail = items.filter((item) => item.label.trim())

  useJsonLd(
    'vh-breadcrumbs-jsonld',
    trail.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.to
              ? {
                  item: isExternal(item.to)
                    ? item.to
                    : getAbsoluteUrl(item.to),
                }
              : {}),
          })),
        }
      : null,
  )

  if (trail.length < 2) return null

  return (
    <Nav aria-label="Drobečková navigace">
      <Inner>
        <List>
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1

            return (
              <Item key={`${item.label}-${index}`}>
                {isLast || !item.to ? (
                  <Current aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </Current>
                ) : isExternal(item.to) ? (
                  <ExternalLink href={item.to}>{item.label}</ExternalLink>
                ) : (
                  <CrumbLink to={item.to}>{item.label}</CrumbLink>
                )}
              </Item>
            )
          })}
        </List>
      </Inner>
    </Nav>
  )
}
