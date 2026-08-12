import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  ALT_SECTION_IDS,
  ALT_SUB_NAV_CLUB,
  ALT_SUB_NAV_LINKS,
} from '../data/altHomepage'
import { useRegimeQuiz } from '../contexts/RegimeQuizContext'
import { scrollToSection } from '../utils/scrollToSection'
import { PageContainer } from './PageContainer'

const Bar = styled.nav`
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: rgba(10, 10, 10, 0.96);
`

const Inner = styled(PageContainer)`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  min-height: 2.75rem;
  padding-block: 0.7rem;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.75rem);
  min-width: 0;
  flex: 1;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const linkStyles = css`
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: color 0.2s ease;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
`

const LinkItem = styled.a<{ $active?: boolean }>`
  ${linkStyles}
  color: ${({ theme, $active }) =>
    $active ? theme.colors.gold : theme.colors.textMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`

const ClubLink = styled(Link)`
  ${linkStyles}
  flex-shrink: 0;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.gold};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`

export function AltSubNav() {
  const { selectedId, selectPath } = useRegimeQuiz()

  const openCategory = (pathId: string) => {
    selectPath(pathId)
    scrollToSection(ALT_SECTION_IDS.regimeQuiz)
  }

  return (
    <Bar aria-label="Situační navigace">
      <Inner>
        <Links>
          {ALT_SUB_NAV_LINKS.map((link) => (
            <LinkItem
              key={link.pathId}
              href={link.collectionUrl ?? '#regime-quiz'}
              $active={selectedId === link.pathId}
              aria-current={selectedId === link.pathId ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault()
                openCategory(link.pathId)
              }}
            >
              {link.label}
            </LinkItem>
          ))}
        </Links>

        <ClubLink to={ALT_SUB_NAV_CLUB.path}>{ALT_SUB_NAV_CLUB.label}</ClubLink>
      </Inner>
    </Bar>
  )
}

export function openRegimeCategory(
  pathId: string,
  selectPath: (pathId: string | null) => void,
) {
  selectPath(pathId)
  scrollToSection(ALT_SECTION_IDS.regimeQuiz)
}
