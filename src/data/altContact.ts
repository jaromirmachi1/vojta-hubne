import { customerPaths, regimeProblems } from './altHomepage'

export const altContactCopy = {
  formTitle: 'Napište mi',
  expectationsTitle: 'Co od odezvy ode mě můžete čekat?',
  submit: 'Poslat dotaz',
  privacy:
    'Vaše údaje jsou u mě v bezpečí. Nebudou poskytnuty třetím stranám.',
  phaseLabel: 'V jaké jste fázi?',
  topicLabel: 'Co právě řešíte?',
  phasePlaceholder: 'Vyberte fázi',
  topicPlaceholder: 'Vyberte téma',
} as const

export const altContactPhaseOptions = [
  ...customerPaths.map((path) => path.headline),
  'Nevím — chci poradit',
] as const

export const altContactTopicOptions = [
  ...regimeProblems.map((problem) => problem.title),
  'Jiné',
] as const

export const altContactExpectations = [
  {
    id: 'response',
    title: 'Odpovím do 24 hodin',
    description: 'Bez automatických odpovědí — čtu každý dotaz osobně.',
  },
  {
    id: 'tailored',
    title: 'Dostanete řešení na míru',
    description: 'Podle vaší fáze, cíle a toho, co vás aktuálně brzdí.',
  },
  {
    id: 'honest',
    title: 'Bez nátlaku, upřímně',
    description: 'Doporučím jen to, co dává smysl pro vaši situaci.',
  },
] as const

export const altWhenToWriteCopy = {
  title: 'Kdy mi napsat',
} as const

export const altWhenToWriteCards = [
  {
    id: 'choose',
    title: 'Nevím, co vybrat',
    description:
      'Nevíte, který režim je pro vás vhodný? Pomohu vám zorientovat se a vybrat správně.',
  },
  {
    id: 'post-taper',
    title: 'Jsem po vysazení',
    description:
      'Potřebujete stabilizovat váhu a znovu nastavit tělo? Ukážu vám správný směr.',
  },
  {
    id: 'hunger',
    title: 'Mám problém s hladem',
    description:
      'Hlad, chutě a večerní přejídání vám berou výsledky? Společně najdeme příčinu.',
  },
  {
    id: 'routine',
    title: 'Chci jednodušší rutinu',
    description:
      'Hledáte jednoduchý, udržitelný režim, který zapadne do vašeho života? Pomohu vám ho nastavit.',
  },
] as const

export const altContactChannelsCopy = {
  eyebrow: 'kontakt',
  title: 'Další způsob',
  titleAccent: 'kontaktu',
} as const

export const altContactChannels = [
  {
    id: 'email',
    label: 'E-mail',
    value: 'info@vojtahubne.cz',
    href: 'mailto:info@vojtahubne.cz',
    hint: 'Napište mi kdykoliv.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@vojtahubne',
    href: 'https://www.instagram.com/vojtahubne/',
    hint: 'Sledujte mě a napište zprávu.',
  },
  {
    id: 'response',
    label: 'Odezva',
    value: 'Odpovídám do 24 hodin',
    hint: '(v pracovní dny)',
  },
] as const
