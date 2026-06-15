import { companyInfo } from '../data/company'
import { getAbsoluteUrl, getDefaultOgImageUrl, SITE_NAME, SITE_URL } from './site'

export function getHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: companyInfo.name,
        url: SITE_URL,
        email: companyInfo.email,
        logo: {
          '@type': 'ImageObject',
          url: getAbsoluteUrl('/favicon.png'),
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: companyInfo.address,
          postalCode: '739 25',
          addressLocality: 'Žabeň',
          addressCountry: 'CZ',
        },
        identifier: {
          '@type': 'PropertyValue',
          name: 'IČO',
          value: companyInfo.ico,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'cs-CZ',
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'Vojta Hubne — Prémiové doplňky pro transformaci',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'cs-CZ',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: getDefaultOgImageUrl(),
        },
      },
    ],
  }
}
