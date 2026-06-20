import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { customerPaths } from '../data/altHomepage'

type RegimeQuizContextValue = {
  selectedId: string | null
  selectPath: (pathId: string | null) => void
  togglePath: (pathId: string) => void
  paths: typeof customerPaths
}

const RegimeQuizContext = createContext<RegimeQuizContextValue | null>(null)

export function RegimeQuizProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectPath = useCallback((pathId: string | null) => {
    setSelectedId(pathId)
  }, [])

  const togglePath = useCallback((pathId: string) => {
    setSelectedId((current) => (current === pathId ? null : pathId))
  }, [])

  const value = useMemo(
    () => ({
      selectedId,
      selectPath,
      togglePath,
      paths: customerPaths,
    }),
    [selectedId, selectPath, togglePath],
  )

  return (
    <RegimeQuizContext.Provider value={value}>
      {children}
    </RegimeQuizContext.Provider>
  )
}

export function useRegimeQuiz() {
  const context = useContext(RegimeQuizContext)
  if (!context) {
    throw new Error('useRegimeQuiz must be used within RegimeQuizProvider')
  }
  return context
}
