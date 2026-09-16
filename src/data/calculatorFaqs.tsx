export const calculatorFaqs = [
  {
    question: 'Jak správně změřit pas?',
    answer: (
      <>
        Měřte vestoje na holé kůži, uprostřed mezi spodním žebrem a horním
        okrajem kyčelní kosti. Metr držte vodorovně, bez stlačování kůže.
        Odečtěte po běžném výdechu a nezatahujte břicho.{' '}
        <a
          href="https://iris.who.int/bitstreams/ca408ade-05c9-4b7c-8967-6ee5b5e0ccd8/download"
          target="_blank"
          rel="noopener noreferrer"
        >
          Doporučení WHO ↗
        </a>
      </>
    ),
  },
  {
    question: 'Co znamenají BMI a BRI?',
    answer: (
      <>
        BMI porovnává hmotnost s výškou. U dospělých rozlišujeme podváhu pod
        18,5, běžné rozmezí od 18,5 do méně než 25, nadváhu od 25 do méně než 30
        a obezitu od 30. BMI nerozlišuje svaly a tuk. Kategorie se určuje z
        nezaokrouhlené hodnoty.{' '}
        <a
          href="https://www.who.int/europe/news-room/fact-sheets/item/nutrition---maintaining-a-healthy-lifestyle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kategorie BMI podle WHO ↗
        </a>{' '}
        BRI vyjadřuje tvar těla pomocí obvodu pasu a výšky. Není to procento
        tuku ani diagnóza. Zobrazujeme číselný index bez univerzálních
        barevných pásem rizika. Oba rozměry počítáme v centimetrech podle
        vzorce 364,2 − 365,5 × √(1 − (pas / (π × výška))²).{' '}
        <a
          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3692604/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Původní studie BRI ↗
        </a>
      </>
    ),
  },
  {
    question: 'Musím při hubnutí snídat?',
    answer: (
      <>
        Nemusíte. Snídaně může pomoci, pokud vás ranní hlad vede k pozdějšímu
        přejídání. Jestli vám první jídlo vyhovuje později, lze denní příjem
        rozdělit jinak. Samotné snídání nezaručuje hubnutí.{' '}
        <a
          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4095657/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Studie o snídani a hubnutí ↗
        </a>
      </>
    ),
  },
  {
    question: 'Jak příjem počítáme?',
    answer: (
      <>
        Klidový výdej odhadujeme rovnicí Mifflin–St Jeor podle věku, výšky,
        hmotnosti a pohlaví. Násobíme jej odhadem aktivity 1,25 až 1,70. Pro
        hubnutí navrhujeme mírný deficit přibližně 15 % a výsledek
        zaokrouhlujeme na 50 kcal. Skutečný výdej se může lišit o stovky kcal.{' '}
        <a
          href="https://pubmed.ncbi.nlm.nih.gov/2305711/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Podklad pro výpočet ↗
        </a>
      </>
    ),
  },
  {
    question: 'Jsou to kalorie navíc k pohybu?',
    answer:
      'Ne. Výsledek je celkový denní příjem z jídla a pití. Běžný pohyb už zahrnuje zvolená aktivita. Kalorie ze sportu k němu proto znovu automaticky nepřičítejte.',
  },
  {
    question: 'Pro koho je kalkulačka určená?',
    answer:
      'Jde o orientační pomůcku pro dospělé. Není určená pro těhotenství, kojení ani plánování příjmu při poruchách příjmu potravy. Při léčebné dietě nebo onemocnění, které ovlivňuje výživu, nastavte příjem s lékařem či nutričním terapeutem. Nízký výsledek nebo podváhu kalkulačka automatickým hubnoucím plánem neřeší.',
  },
] as const
