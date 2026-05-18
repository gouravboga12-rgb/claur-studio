import { useData } from '../hooks/useData'

const LocalBusinessSchema = () => {
  const { settings } = useData()

  const phone = settings?.phone || '+91 90328 93101'
  const email = settings?.email || 'claurstudio@gmail.com'
  const address = settings?.address || 'Hyderabad, Telangana, India'
  const instagram = settings?.instagram || 'https://www.instagram.com/claur_studio'
  const logo = (typeof window !== 'undefined' ? window.location.origin : 'https://claurstudio.com') + '/visionaries.png'
  const url = typeof window !== 'undefined' ? window.location.origin : 'https://claurstudio.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    'name': 'Claur Studio',
    'image': logo,
    '@id': `${url}/#organization`,
    'url': url,
    'telephone': phone,
    'email': email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': address,
      'addressLocality': 'Hyderabad',
      'addressRegion': 'Telangana',
      'postalCode': '500033',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '17.4065',
      'longitude': '78.4772'
    },
    'priceRange': '$$$',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      'opens': '09:00',
      'closes': '20:00'
    },
    'sameAs': [
      instagram
    ]
  }

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default LocalBusinessSchema
