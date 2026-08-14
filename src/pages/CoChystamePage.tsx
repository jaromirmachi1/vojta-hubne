import { useMemo, useState } from 'react'
import { ShopLayout } from '../layouts/ShopLayout'
import { usePageMeta } from '../hooks/usePageMeta'
import { coChystamePageMeta } from '../seo/coChystamePageMeta'
import {
  coChystameCategories,
  coChystameProjects,
  type CoChystameCategory,
  type CoChystameProjectId,
  type CoChystameProject,
} from '../data/coChystameProjects'
import { scrollToSection } from '../utils/scrollToSection'
import { CoChystameProjectsSection } from '../sections/cochystame/CoChystameProjectsSection'
import { CoChystameLabManifestoSection } from '../sections/cochystame/CoChystameLabManifestoSection'
import { CoChystameArticleSection } from '../sections/cochystame/CoChystameArticleSection'
import { CoChystameNewsletterSection } from '../sections/cochystame/CoChystameNewsletterSection'

export function CoChystamePage() {
  usePageMeta(coChystamePageMeta)

  const [activeCategory, setActiveCategory] =
    useState<CoChystameCategory>('Vše')
  const [selected, setSelected] = useState<CoChystameProjectId | null>(null)

  const visibleProjects = useMemo(() => {
    const projects =
      activeCategory === 'Vše'
        ? [...coChystameProjects]
        : coChystameProjects.filter((p) => p.category === activeCategory)

    return projects.sort((a, b) => b.progress - a.progress)
  }, [activeCategory])

  const selectedProject: CoChystameProject | null = useMemo(() => {
    if (!selected) return null
    return coChystameProjects.find((p) => p.id === selected) ?? null
  }, [selected])

  function openProject(id: CoChystameProjectId) {
    setSelected(id)
    window.setTimeout(() => scrollToSection('detail'), 0)
  }

  function backToProjects() {
    setSelected(null)
    window.setTimeout(() => scrollToSection('projekty'), 0)
  }

  return (
    <ShopLayout>
      <CoChystameProjectsSection
        categories={coChystameCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        visibleProjects={visibleProjects}
        onOpenProject={openProject}
      />

      {selectedProject ? (
        <CoChystameArticleSection
          project={selectedProject}
          onBackToProjects={backToProjects}
        />
      ) : (
        <CoChystameLabManifestoSection onOpenLab={() => openProject('lab')} />
      )}

      <CoChystameNewsletterSection />
    </ShopLayout>
  )
}

