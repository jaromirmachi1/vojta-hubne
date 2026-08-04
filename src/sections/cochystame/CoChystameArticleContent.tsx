import styled from 'styled-components'
import type { CoChystameProjectId } from '../../data/coChystameProjects'
import { FactsGrid } from '../../components/cochystame/FactsGrid'
import { FAQList } from '../../components/cochystame/FAQList'
import { Timeline } from '../../components/cochystame/Timeline'
import { SectionHeading } from '../../components/cochystame/SectionHeading'

const ArticleBodySection = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding-bottom: 3.25rem;
  margin-bottom: 3.25rem;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`

const Lead = styled.p`
  margin: 1rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.95;
  font-size: 1.02rem;
`

const StyledBlockquote = styled.blockquote`
  margin: 2.1rem 0 0;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  padding-left: 1.2rem;
  color: rgba(238, 220, 130, 0.9);
  font-family: ${({ theme }) => theme.fonts.sans};
  font-style: italic;
  font-weight: 300;
  line-height: 1.6;
  font-size: clamp(1.1rem, 2.1vw, 1.35rem);
`

const Notice = styled.div`
  margin-top: 1.8rem;
  padding: 1.25rem 1.4rem;
  border: 1px solid rgba(238, 220, 130, 0.28);
  border-radius: ${({ theme }) => theme.radii.xl};
  background: linear-gradient(
    90deg,
    rgba(238, 220, 130, 0.1),
    rgba(238, 220, 130, 0.03)
  );
  color: rgba(205, 199, 175, 0.95);
  line-height: 1.75;
  font-size: 0.98rem;

  b {
    color: ${({ theme }) => theme.colors.goldMuted};
    font-weight: 700;
  }
`

const FinePrint = styled.p`
  margin-top: 1.15rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`

const CheckList = styled.ul`
  display: grid;
  gap: 0.9rem;
  list-style: none;
  padding: 0;
  margin: 1.35rem 0 0;
`

const CheckItem = styled.li`
  position: relative;
  padding-left: 1.55rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 1rem;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 0.1rem;
    width: 1.15rem;
    height: 1.15rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors.gold};
    border-radius: 999px;
    color: ${({ theme }) => theme.colors.gold};
    font-size: 0.68rem;
    background: transparent;
  }
`

const TableWrap = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1.4rem;
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.radii.xl};
`

const Table = styled.table`
  border-collapse: collapse;
  min-width: 520px;
  width: 100%;
`

const Th = styled.th`
  background: rgba(238, 220, 130, 0.1);
  color: ${({ theme }) => theme.colors.goldMuted};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  padding: 0.85rem 1.1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

const Td = styled.td`
  color: rgba(185, 181, 170, 0.95);
  font-size: 0.95rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child,
  ${Th}:last-child {
    text-align: right;
  }
`

const TableLastTd = styled(Td)`
  text-align: right;
`

export function CoChystameArticleContent({ id }: { id: CoChystameProjectId }) {
  if (id === 'nevinatko') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Proč vzniká">Večer často nekončí. Jen se pomalu rozpadne.</SectionHeading>
          <Lead>
            Ráno máme budík. Přes den práci, schůzky, jídlo a povinnosti. Večer ale často nemá jasnou hranici. Ještě
            jeden e-mail, ještě jeden díl, ještě něco malého k jídlu — a najednou je pozdě.
          </Lead>
          <Lead>
            Neviňátko nevzniká jako výrobek, který má člověka „vypnout“. Vzniká jako <strong>večerní rituál pro klidnější
            režim</strong>: jednoduchý krok, který každý den připomene, že dnešek končí.
          </Lead>
          <StyledBlockquote>
            „Nechceme slibovat zázrak. Chceme vytvořit něco, co se dá večer jednoduše připravit, opakovat a přirozeně zařadit do běžného dne.“
          </StyledBlockquote>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Potvrzený stav">Co dnes opravdu víme</SectionHeading>
          <CheckList>
            <CheckItem>Jedna dávka má podle pracovní etikety 4,1005 g.</CheckItem>
            <CheckItem>
              Produkt je navržen jako prášková večerní směs rozmíchaná ve vodě.
            </CheckItem>
            <CheckItem>Doporučené užívání je jedna dávka večer.</CheckItem>
            <CheckItem>Čistá hmotnost a počet dávek zatím nejsou finálně doplněny.</CheckItem>
          </CheckList>
          <Notice>
            <b>Transparentně:</b> složení vychází z aktuální pracovní etikety. Před výrobou se musí ověřit jeho shoda s
            poslední schválenou recepturou.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Pracovní etiketa">Složení jedné dávky</SectionHeading>
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <Th>Složka</Th>
                  <Th>Množství</Th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Aquamin Mg', '500 mg'],
                  ['Heřmánek', '500 mg'],
                  ['Levandule', '300 mg'],
                  ['Kozlík lékařský', '500 mg'],
                  ['Meduňka', '500 mg'],
                  ['Mučenka', '500 mg'],
                  ['Chmel', '300 mg'],
                  ['Šišák bajkalský', '300 mg'],
                  ['L-theanin 40 %', '500 mg'],
                  ['GABA', '200 mg'],
                  ['Melatonin', '0,5 mg'],
                ].map(([name, amount]) => (
                  <tr key={name}>
                    <Td>{name}</Td>
                    <TableLastTd>{amount}</TableLastTd>
                  </tr>
                ))}
                <tr>
                  <Td>
                    <strong>Celkem aktivních látek</strong>
                  </Td>
                  <TableLastTd>
                    <strong>4 100,5 mg</strong>
                  </TableLastTd>
                </tr>
              </tbody>
            </Table>
          </TableWrap>
          <Lead>
            Každou složku uvádíme samostatně. Nechceme recepturu schovávat pod neurčitý název směsi.
          </Lead>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Použití">Tři kroky k večernímu rituálu</SectionHeading>
          <FactsGrid
            items={[
              { title: '1. Připravit', text: 'Odměřit jednu dávku podle finálního balení.' },
              { title: '2. Rozmíchat', text: 'Rozmíchat ve vodě. Přesné množství doplní konečná etiketa.' },
              { title: '3. Uzavřít den', text: 'Zařadit nápoj do stejného času a spojit jej s klidnějším večerním režimem.' },
            ]}
          />
          <Lead>
            Neviňátko nemá nahrazovat pestrou stravu, léčbu ani řešení dlouhodobých potíží se spánkem. U takových problémů je správnou
            cestou konzultace s lékařem.
          </Lead>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Kde se právě nacházíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Pracovní receptura', text: 'Etiketa a pracovní složení připraveny', done: true },
              { title: 'Kontrola receptury', text: 'Ověření poslední schválené verze', done: true },
              { title: 'Dodání surovin', text: 'Pracovní očekávání do konce srpna' },
              { title: 'Výroba a spuštění', text: 'Orientační cíl začátkem září 2026' },
            ]}
          />
          <FinePrint>
            Termín je orientační a může se změnit podle dodání surovin, kontroly kvality a finálního schválení produktu.
          </FinePrint>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Důležité">Pro koho produkt není určen</SectionHeading>
          <Notice>
            Podle pracovní etikety není Neviňátko určeno pro děti, těhotné a kojící ženy. Při užívání léků je potřeba použití konzultovat s lékařem.
            Doplněk stravy není náhradou pestré stravy ani zdravého životního stylu.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              {
                q: 'Je Neviňátko lék na nespavost?',
                a: 'Ne. Jde o připravovaný doplněk stravy a večerní směs, nikoli léčbu nespavosti nebo jiného zdravotního problému.',
              },
              {
                q: 'Je složení už definitivní?',
                a: 'Máme přesné pracovní složení z aktuální etikety. Před výrobou musí být ověřeno proti poslední schválené receptuře.',
              },
              {
                q: 'Kolik bude v balení dávek?',
                a: 'Počet dávek a čistá hmotnost zatím nebyly finálně potvrzeny.',
              },
              {
                q: 'Kdy bude dostupné?',
                a: 'Pracovní plán míří na začátek září 2026. Přesné datum zveřejníme až po dodání surovin a dokončení výroby.',
              },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  // The remaining projects follow the same pattern: <ArticleBodySection> + small blocks.
  // To keep this port maintainable, we render the prototype content directly per id.

  if (id === 'cafe') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Nový produkt">Káva ano. Těžký shake ne.</SectionHeading>
          <Lead>
            Ráno mnoho lidí nechce řešit velkou snídani. Dají si kávu a první skutečné jídlo přichází až později. Jiní by si rádi dali protein, ale hustý mléčný shake je po probuzení příliš těžký.
          </Lead>
          <StyledBlockquote>
            Cílem není přidat kávové aroma do stávajícího LEAN SHAKE. Vyvíjíme nový, samostatný a skutečně řídký ranní nápoj z pravé kávy.
          </StyledBlockquote>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Potvrzené zadání">Co dnes opravdu víme</SectionHeading>
          <CheckList>
            <CheckItem>Jde o samostatný produkt, ne další příchuť stávajícího LEAN SHAKE.</CheckItem>
            <CheckItem>Základem má být pravá káva, nikoli jen kávové aroma.</CheckItem>
            <CheckItem>Nápoj má obsahovat proteinovou složku.</CheckItem>
            <CheckItem>Konzistence musí zůstat úplně řídká a dobře pitelná.</CheckItem>
            <CheckItem>Testovat se bude tekutost, chuť kávy, sladkost a rozpustnost.</CheckItem>
          </CheckList>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Bez odhadů">Co zatím nezveřejňujeme</SectionHeading>
          <FactsGrid
            items={[
              { title: 'Druh a množství proteinu', text: 'Budou potvrzeny až finální recepturou a výživovými údaji.' },
              { title: 'Obsah kofeinu', text: 'Musí vycházet z finálního druhu a množství kávy.' },
              { title: 'Sladidlo a alergeny', text: 'Určí je schválená receptura.' },
              { title: 'Dávka, cena a balení', text: 'Stanoví se po úspěšném testu chuti a výrobního řešení.' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Testování">Co musí výsledný nápoj splnit</SectionHeading>
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <Th>Co testujeme</Th>
                  <Th>Požadovaný výsledek</Th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tekutost', 'Bez husté nebo kašovité textury'],
                  ['Chuť kávy', 'Přirozená a jasně rozpoznatelná'],
                  ['Sladkost', 'Vyvážená, ne dezertně přeslazená'],
                  ['Rozpustnost', 'Bez výrazných hrudek a usazenin'],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <Td>{k}</Td>
                    <TableLastTd>{v}</TableLastTd>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
          <Notice>
            <b>Správné očekávání:</b> lehký kávový proteinový nápoj pro ráno. Ne příslib plnohodnotné náhrady jídla, dokud to nepotvrdí finální složení.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Kde se právě nacházíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Vývojové zadání', text: 'Pravá káva, protein a řídká forma', done: true },
              { title: 'Testovací receptura', text: 'Příprava první reálné varianty' },
              { title: 'Senzorický test', text: 'Tekutost, chuť, sladkost a rozpustnost' },
              { title: 'Etiketa a výroba', text: 'Až po finálním písemném schválení' },
            ]}
          />
          <FinePrint>
            Dřívější interní plán počítal s možným spuštěním kolem 10. srpna 2026. Jde o pracovní cíl, nikoli slíbené datum prodeje.
          </FinePrint>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              {
                q: 'Je to jen kávová příchuť LEAN SHAKE?',
                a: 'Ne. Jde o samostatný produkt s výrazně řidší konzistencí a pravou kávou.',
              },
              {
                q: 'Kolik bude obsahovat proteinu a kofeinu?',
                a: 'Množství zatím není potvrzeno. Zveřejníme ho až po schválení receptury.',
              },
              {
                q: 'Půjde připravit s horkou vodou?',
                a: 'Teplá příprava musí projít technologickým testem. Do té doby ji neslibujeme.',
              },
              {
                q: 'Kdy bude dostupný?',
                a: 'Reálné datum potvrdíme až po úspěšném testu, dokončení etikety a výrobě.',
              },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  // Generic versions (flavor, xxl, samples, affiliate, lab, active).
  // These are direct ports of the prototype page blocks.
  if (id === 'flavor') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Hlasování ukončeno">
            Dvě nové příchutě jdou do výroby
          </SectionHeading>
          <Lead>
            Děkujeme všem, kdo se zapojili do hlasování o nové příchutě Lean Shake GLP-1. Máme jasno: do výroby zařadíme{' '}
            <strong>Višeň v čokoládě</strong> a <strong>Čokoládu</strong> — dvě varianty, které získaly nejvíc hlasů.
          </Lead>
          <StyledBlockquote>
            Nejvíce hlasů získala Višeň v čokoládě. Hned za ní skončila Čokoláda. Obě příchutě teď ladíme do finální podoby.
          </StyledBlockquote>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vítězné příchutě">Co připravujeme</SectionHeading>
          <FactsGrid
            items={[
              {
                title: 'Višeň v čokoládě',
                text: 'Nejsilnější hlas komunity. Sladká višeň v bohaté čokoládové vrstvě.',
              },
              {
                title: 'Čokoláda',
                text: 'Druhé místo v hlasování. Klasická, plná chuť pro každodenní pití.',
              },
              {
                title: 'Stávající nabídka',
                text: 'Jahoda, Slaný karamel a Piškotový dort zůstávají v prodeji.',
              },
              {
                title: 'Co teď',
                text: 'Doladíme recepturu, chuť, konzistenci a připravíme výrobu.',
              },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Postup">Kde jsme teď</SectionHeading>
          <Timeline
            steps={[
              { title: 'Sběr návrhů', text: 'Komunita navrhla nové příchutě', done: true },
              { title: 'Veřejné hlasování', text: 'Rozhodlo se o vítězných variantách', done: true },
              { title: 'Finální receptura', text: 'Ladíme chuť, vůni a konzistenci' },
              { title: 'Výroba a uvedení', text: 'Potvrdíme termín, až bude vše připravené' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <Notice>
            Přesný termín uvedení na prodej oznámíme po dokončení receptury, testování a ověření výrobních možností. Už teď se těšíme, až společně ochutnáme Višeň v čokoládě a Čokoládu.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              {
                q: 'Které příchutě vyhrály?',
                a: 'Nejvíc hlasů získala Višeň v čokoládě, druhá skončila Čokoláda. Obě jdou do výroby.',
              },
              {
                q: 'Zůstanou stávající příchutě?',
                a: 'Ano. Jahoda, Slaný karamel a Piškotový dort zůstávají součástí nabídky.',
              },
              {
                q: 'Kdy budou nové příchutě v prodeji?',
                a: 'Termín potvrdíme po dokončení finální receptury a výroby. Sledujte tuto stránku nebo newsletter.',
              },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  if (id === 'xxl') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Pro pravidelné zákazníky">
            Méně objednávek, větší zásoba doma
          </SectionHeading>
          <Lead>
            U GLP-1 Support i LEAN SHAKE prověřujeme větší balení pro zákazníky, kteří produkty používají pravidelně. Smyslem není měnit obsah. Jde o praktičtější formát, méně časté objednávky a možnost výhodnější ceny za porci.
          </Lead>
          <Notice>
            <b>Beze změny receptury:</b> projekt se týká velikosti balení, obalu, hmotnosti a výrobní proveditelnosti.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Co prověřujeme">XXL musí dávat smysl i v praxi</SectionHeading>
          <FactsGrid
            items={[
              { title: 'Velikost a obal', text: 'Stabilita, uzavírání a pohodlné každodenní používání.' },
              { title: 'Cena za porci', text: 'Větší balení musí mít pro pravidelného zákazníka jasný přínos.' },
              { title: 'Výroba', text: 'Plnění, skladování a logistika bez zhoršení kvality.' },
              { title: 'XXL týdny', text: 'Možnost nabídnout větší balení ve vybraných obdobích.' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Kde se právě nacházíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Zákaznická potřeba', text: 'Poptávku po větším balení máme potvrzenou', done: true },
              { title: 'Obal a hmotnost', text: 'Ověřujeme vhodné varianty' },
              { title: 'Cena a marže', text: 'Počítáme reálnou úsporu za porci' },
              { title: 'Prodejní test', text: 'Až po potvrzení výroby a balení' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              { q: 'Změní se složení?', a: 'Ne. Záměrem je zachovat stávající recepturu a změnit pouze velikost balení.' },
              { q: 'Které produkty budou v XXL?', a: 'Prověřujeme GLP-1 Support a LEAN SHAKE.' },
              { q: 'Kolik bude XXL balení stát?', a: 'Cena zatím není potvrzená. Zveřejníme ji až po výpočtu obalu, výroby a logistiky.' },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  if (id === 'samples') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Snazší první krok">Vyzkoušet, než koupíte celé balení</SectionHeading>
          <Lead>
            Nový zákazník často neví, zda mu bude produkt nebo konkrétní příchuť vyhovovat. Proto připravujeme malá placená balení, která umožní ochutnat LEAN SHAKE bez nákupu plné velikosti — ideálně i jako výběr všech dostupných příchutí.
          </Lead>
          <StyledBlockquote>
            Malé balení má snížit nejistotu před prvním nákupem, ne předstírat bezplatný vzorek.
          </StyledBlockquote>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Férově">Jak bude cena fungovat</SectionHeading>
          <Lead>
            Jedna porce v malém balení bude kvůli obalu, plnění a manipulaci dražší než porce z běžného balení. Tento rozdíl chceme komunikovat otevřeně.
          </Lead>
          <FactsGrid
            items={[
              { title: 'Placený test', text: 'Jasně označený testovací produkt, ne dárek zdarma.' },
              { title: 'Více příchutí', text: 'Cílem je umožnit ochutnat současnou nabídku.' },
              { title: 'Malý závazek', text: 'Bez nutnosti kupovat celé balení naslepo.' },
              { title: 'Stejná receptura', text: 'Vzorek má odpovídat prodávanému produktu.' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Co ještě řešíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Formát porce', text: 'Volíme praktické a dobře uzavíratelné řešení' },
              { title: 'Sestava příchutí', text: 'Rozhodujeme o jednotlivých kusech a sadách' },
              { title: 'Cena', text: 'Počítáme náklady malého balení' },
              { title: 'Zkušební prodej', text: 'Spustíme až s přesnými údaji a fotografiemi' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              { q: 'Půjde o vzorky zdarma?', a: 'Ne. Připravujeme placená malá balení.' },
              { q: 'Bude porce stát stejně jako ve velkém balení?', a: 'Nejspíš ne. Kvůli samostatnému obalu a plnění bude cena za porci vyšší.' },
              { q: 'Budou dostupné všechny příchutě?', a: 'To je náš cíl, finální podobu sady ale ještě potvrzujeme.' },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  if (id === 'affiliate') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Autentická spolupráce">
            Doporučení od lidí, kteří mají vlastní zkušenost
          </SectionHeading>
          <Lead>
            Affiliate program připravujeme pro aktivní zákazníky a tvůrce, kteří značku skutečně znají. Nechceme anonymní síť kuponů. Chceme dlouhodobé spolupráce postavené na vlastní zkušenosti, srozumitelných pravidlech a férové odměně.
          </Lead>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Tři úrovně">Program, který může růst s partnerem</SectionHeading>
          <FactsGrid
            items={[
              { title: 'Affiliate Partner', text: 'Vstupní úroveň pro zákazníky, kteří chtějí sdílet svoji zkušenost.' },
              { title: 'Performance Partner', text: 'Pro aktivní partnery s prokazatelnými výsledky a pravidelným obsahem.' },
              { title: 'Ambassador', text: 'Nejužší dlouhodobá spolupráce se značkou a komunitou.' },
            ]}
          />
          <Notice>
            Počítáme se slevovým kódem 10 % pro zákazníky. Přesné výkonnostní podmínky, odměny a pravidla jednotlivých úrovní finalizujeme; závazné budou až zveřejněné podmínky programu.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Principy">Na čem má spolupráce stát</SectionHeading>
          <CheckList>
            <CheckItem>Vlastní a pravdivá zkušenost s produkty.</CheckItem>
            <CheckItem>Transparentní označení placené nebo provizní spolupráce.</CheckItem>
            <CheckItem>Žádné léčebné sliby ani nerealistická tvrzení.</CheckItem>
            <CheckItem>Pravidelná komunikace a měřitelné, srozumitelné podmínky.</CheckItem>
          </CheckList>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Kde se právě nacházíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Struktura úrovní', text: 'Tři stupně programu jsou navržené', done: true },
              { title: 'Podmínky', text: 'Sjednocujeme výkonová a obsahová pravidla' },
              { title: 'Technické měření', text: 'Ověřujeme kódy, objednávky a odměny' },
              { title: 'Pilot', text: 'První menší skupina partnerů' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              { q: 'Musím být influencer?', a: 'Ne nutně. Důležitá je vlastní zkušenost, důvěryhodnost a aktivní komunikace.' },
              { q: 'Jaká bude provize?', a: 'Finální odměny budou součástí zveřejněných podmínek. Nechceme uvádět neuzavřená čísla jako závazná.' },
              { q: 'Kdy se půjde přihlásit?', a: 'Po dokončení pravidel a technického měření otevřeme pilotní skupinu.' },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  if (id === 'lab') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Společný vývoj">
            Produkty, o kterých nerozhoduje jen interní tým
          </SectionHeading>
          <Lead>
            VOJTA LAB má být menší tým nejaktivnějších zákazníků. Členové mohou navrhovat produkty a příchutě, hodnotit malé testovací vzorky a pomáhat rozhodovat, co má smysl poslat do výroby.
          </Lead>
          <StyledBlockquote>
            Komunita přinese nápady. My zajistíme vývoj a proveditelnost. Skutečný test ukáže, čemu dát zelenou.
          </StyledBlockquote>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Jak to bude fungovat">Od nápadu k rozhodnutí</SectionHeading>
          <Timeline
            steps={[
              { title: 'Návrhy', text: 'Zákazníci a tvůrci přinesou témata' },
              { title: 'Hlasování', text: 'Komunita vybere nejsilnější nápady' },
              { title: 'Malé testy', text: 'Vybrané koncepty dostanou reálný vzorek' },
              { title: 'Rozhodnutí', text: 'Zpětná vazba pomůže určit další krok' },
            ]}
          />
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Zapojení">Nejen ochutnávky</SectionHeading>
          <FactsGrid
            items={[
              { title: 'Testování', text: 'Chuť, použití, balení a celková zkušenost.' },
              { title: 'Recepty a videa', text: 'Praktické využití produktů v běžném dni.' },
              { title: 'Pohyb a výzvy', text: 'Komunitní běh, chůze a společné aktivity.' },
              { title: 'Živé diskuze', text: 'Přímá zpětná vazba k tomu, co připravujeme.' },
            ]}
          />
          <Notice>
            Členové HeroHero mají mít při výběru testerů přednost. Testy chceme pořádat přibližně každé 1–2 měsíce podle připravenosti konkrétních projektů.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              { q: 'Je VOJTA LAB pro každého?', a: 'Počítáme s menší aktivní skupinou. Přesná pravidla výběru ještě zveřejníme.' },
              { q: 'Budou testeři rozhodovat o výrobě?', a: 'Jejich hodnocení bude důležitým podkladem. Výroba ale vždy závisí i na kvalitě, legislativě a proveditelnosti.' },
              { q: 'Jak často budou testy?', a: 'Cílem je přibližně jeden test za 1–2 měsíce, pokud bude připravený vhodný produkt.' },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  if (id === 'odvodnovac') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Proč vzniká">
            Lehčí pocit. Méně zadržené vody.
          </SectionHeading>
          <Lead>
            Ne každé kilo navíc znamená tuk. Během hubnutí může váha kolísat také
            kvůli zadržování vody, vyššímu příjmu soli, změnám režimu nebo menšímu
            pohybu. Proto připravujeme produkt zaměřený na podporu přirozeného
            hospodaření organismu s vodou a na pocit větší lehkosti.
          </Lead>
          <Lead>
            Recepturu už aktivně ladíme a testujeme tak, aby dobře zapadla do
            systému Vojta Hubne a byla vhodná pro jednoduché každodenní použití.
          </Lead>
          <Notice>
            <b>Bez léčebných slibů:</b> neuvádíme finální složení, cenu ani termín
            uvedení, dokud nebudou schválené. Texty budou před spuštěním
            zkontrolovány podle finální receptury.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Kde se právě nacházíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Zadání produktu', text: 'Podpora lehkosti a hospodaření s vodou', done: true },
              { title: 'Ladění receptury', text: 'Aktivní testování finální podoby', done: true },
              { title: 'Schválení a etiketa', text: 'Po uzavření receptury' },
              { title: 'Výroba a spuštění', text: 'Až po finálním potvrzení' },
            ]}
          />
          <FinePrint>
            Aktuální stav vývoje je přibližně 60 %. Průběh budeme průběžně
            aktualizovat.
          </FinePrint>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              {
                q: 'Je složení už finální?',
                a: 'Ne. Recepturu ještě ladíme. Finální složení zveřejníme až po schválení.',
              },
              {
                q: 'Kdy bude produkt dostupný?',
                a: 'Konkrétní termín zatím neuvádíme. Ozveme se, až bude potvrzený.',
              },
              {
                q: 'Nahradí pohyb nebo změnu jídelníčku?',
                a: 'Ne. Má doplnit cestu Vojta Hubne, ne nahradit režim, stravu ani pohyb.',
              },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  if (id === 'kreatin') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Proč vzniká">
            Síla. Výkon. Udržení aktivního režimu.
          </SectionHeading>
          <Lead>
            Kreatin není jen pro kulturisty. Při redukci hmotnosti může být
            důležité udržet pravidelný pohyb, kvalitní trénink a dostatek síly pro
            každodenní aktivitu. Připravujeme proto vlastní produkt s kreatinem,
            který nebude působit jako běžný sportovní doplněk, ale jako přirozená
            součást programu Vojta Hubne.
          </Lead>
          <Lead>
            Zaměřujeme se na jednoduché dávkování, dobrou rozpustnost a použití,
            které zvládne opravdu každý.
          </Lead>
          <Notice>
            <b>Bez přehnaných slibů:</b> produkt nemá garantovat výkon ani
            nahrazovat trénink. Finální složení, cenu a termín zveřejníme až po
            schválení.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Kde se právě nacházíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Zadání produktu', text: 'Kreatin jako součást programu Vojta Hubne', done: true },
              { title: 'Ladění receptury', text: 'Dávkování, rozpustnost a praktické použití', done: true },
              { title: 'Schválení a etiketa', text: 'Po uzavření receptury' },
              { title: 'Výroba a spuštění', text: 'Až po finálním potvrzení' },
            ]}
          />
          <FinePrint>
            Aktuální stav vývoje je přibližně 60 %. Průběh budeme průběžně
            aktualizovat.
          </FinePrint>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              {
                q: 'Je to klasický sportovní kreatin?',
                a: 'Cílem je produkt, který zapadne do programu Vojta Hubne — jednoduchý, srozumitelný a použitelný i mimo tvrdé tréninky.',
              },
              {
                q: 'Je složení už finální?',
                a: 'Ne. Stále ladíme finální podobu. Detaily zveřejníme po schválení.',
              },
              {
                q: 'Kdy bude dostupný?',
                a: 'Termín zatím neuvádíme. Přihlaste se k novinkám a dáme vědět jako první.',
              },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  if (id === 'probiotika') {
    return (
      <>
        <ArticleBodySection>
          <SectionHeading eyebrow="Proč vzniká">
            Každodenní podpora trávení a střevního mikrobiomu
          </SectionHeading>
          <Lead>
            Trávení a střevní mikrobiom mohou výrazně ovlivňovat každodenní
            komfort, pravidelnost i celkový pocit při změně jídelníčku. Proto
            připravujeme vlastní probiotický produkt jako doplněk k ostatním
            produktům Vojta Hubne.
          </Lead>
          <Lead>
            Aktuálně ladíme výběr kmenů, jejich množství, stabilitu a vhodnou formu
            tak, aby výsledný produkt byl praktický, kvalitní a dlouhodobě
            použitelný.
          </Lead>
          <Notice>
            <b>Bez léčebných tvrzení:</b> neuvádíme finální kmeny, dávkování, cenu
            ani termín, dokud nebudou schválené. Texty projdou kontrolou před
            spuštěním.
          </Notice>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="Vývoj">Kde se právě nacházíme</SectionHeading>
          <Timeline
            steps={[
              { title: 'Zadání produktu', text: 'Probiotika jako doplněk systému Vojta Hubne', done: true },
              { title: 'Ladění receptury', text: 'Kmeny, množství, stabilita a forma', done: true },
              { title: 'Schválení a etiketa', text: 'Po uzavření receptury' },
              { title: 'Výroba a spuštění', text: 'Až po finálním potvrzení' },
            ]}
          />
          <FinePrint>
            Aktuální stav vývoje je přibližně 60 %. Průběh budeme průběžně
            aktualizovat.
          </FinePrint>
        </ArticleBodySection>

        <ArticleBodySection>
          <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
          <FAQList
            items={[
              {
                q: 'Jaké kmeny budete používat?',
                a: 'Výběr kmenů ještě finalizujeme. Seznam zveřejníme až po schválení receptury.',
              },
              {
                q: 'Nahradí to změnu jídelníčku?',
                a: 'Ne. Má doplnit každodenní komfort v rámci programu, ne nahradit stravu ani režim.',
              },
              {
                q: 'Kdy bude produkt dostupný?',
                a: 'Termín zatím neuvádíme. Pošleme potvrzené novinky, až bude produkt připravený.',
              },
            ]}
          />
        </ArticleBodySection>
      </>
    )
  }

  // active
  return (
    <>
      <ArticleBodySection>
        <SectionHeading eyebrow="Pracovní koncept">
          Podpora aktivního režimu, ne zkratka k výsledku
        </SectionHeading>
        <Lead>
          „Spalovač“ je pouze interní pracovní označení. Hledáme koncept produktu pro energii, motivaci a pohyb — pro dny, kdy člověk chce vyrazit na trénink, běh nebo svižnou chůzi a podpořit svůj aktivní režim.
        </Lead>
        <Notice>
          <b>Bez přehnaných slibů:</b> produkt nemá nahrazovat jídlo, spánek ani pohyb a nesmí slibovat automatické spalování tuku nebo garantovaný výkon.
        </Notice>
      </ArticleBodySection>

      <ArticleBodySection>
        <SectionHeading eyebrow="Co je otevřené">Recepturu zatím nezveřejňujeme</SectionHeading>
        <Lead>
          Pracovní materiály obsahují více rozdílných návrhů. Žádný z nich proto nepovažujeme za finální. Dokud nebude písemně schválena jedna receptura, nebudeme zveřejňovat seznam složek ani jejich množství.
        </Lead>
        <FactsGrid
          items={[
            { title: 'Název', text: '„Spalovač“ je pouze pracovní označení.' },
            { title: 'Receptura', text: 'Varianty se vyhodnocují, finální složení není potvrzené.' },
            { title: 'Forma a příchuť', text: 'Zatím nejsou uzavřené.' },
            { title: 'Cena a termín', text: 'Budou stanoveny až po schválení a výrobním testu.' },
          ]}
        />
      </ArticleBodySection>

      <ArticleBodySection>
        <SectionHeading eyebrow="Komunitní test">VOJTA HUBNE RUN</SectionHeading>
        <Lead>
          Uvažujeme o praktickém testu v rámci pohybové výzvy. Smyslem je sledovat chuť, toleranci, snadnost přípravy a subjektivní zkušenost při aktivním dni — ne vyrábět předem zaručený výsledek.
        </Lead>
        <Timeline
          steps={[
            { title: 'Uzavřít zadání', text: 'Jasně určit účel a hranice produktu' },
            { title: 'Schválit recepturu', text: 'Vybrat jednu bezpečnou a proveditelnou variantu' },
            { title: 'Vyrobit vzorky', text: 'Až po kontrole dávkování a etikety' },
            { title: 'Praktický test', text: 'Zpětná vazba komunity v aktivním režimu' },
          ]}
        />
      </ArticleBodySection>

      <ArticleBodySection>
        <SectionHeading eyebrow="FAQ">Časté otázky</SectionHeading>
        <FAQList
          items={[
            { q: 'Je receptura už hotová?', a: 'Ne. Existuje více pracovních návrhů, ale žádný zatím není finálně schválený.' },
            { q: 'Bude produkt spalovat tuk?', a: 'Takový automatický výsledek neslibujeme. Produkt je zamýšlený jako podpora aktivního režimu, nikoli náhrada pohybu a stravy.' },
            { q: 'Kdy bude dostupný?', a: 'Termín zveřejníme až po uzavření receptury, bezpečnostní kontrole a výrobním testu.' },
          ]}
        />
      </ArticleBodySection>
    </>
  )
}

