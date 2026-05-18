import { useEffect } from 'react'
import { useData } from '../hooks/useData'

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
}) => {
  const { settings } = useData()

  const siteTitle = 'Claur Studio'
  const displayTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Modern Interior Design Hyderabad`

  // Fallbacks from DB settings or hardcoded values
  const metaDesc = description || settings?.seo_global_description || 'Claur Studio specializes in luxury, modern, and elegant residential and commercial interior design in Hyderabad. End-to-end interior design solutions.'
  const metaKeywords = keywords || settings?.seo_global_keywords || 'Interior Designers Hyderabad, Home Interior Design, Luxury Home Interiors Hyderabad, 2BHK Interior Design Hyderabad, Modern Interior Designers Hyderabad, Claur Studio'
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://claurstudio.com')
  const displayOgImage = ogImage || settings?.seo_global_og_image || '/visionaries.png'
  const googleVerification = settings?.google_site_verification || ''
  const gaId = settings?.google_analytics_id || ''

  // Google Analytics 4 (gtag.js) dynamic script loading
  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return

    const scriptId = 'google-analytics-script'
    const configId = 'google-analytics-config'
    let existingScript = document.getElementById(scriptId)

    if (!existingScript) {
      // Create and inject the gtag.js script
      const script = document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      // Create and inject the config script
      const configScript = document.createElement('script')
      configScript.id = configId
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          page_path: window.location.pathname,
        });
      `
      document.head.appendChild(configScript)
    } else {
      // If script exists, just update page view on route changes
      if (window.gtag) {
        window.gtag('config', gaId, {
          page_path: window.location.pathname,
        })
      }
    }
  }, [gaId])

  return (
    <>
      {/* Dynamic titles and meta tags, automatically hoisted by React 19 */}
      <title>{displayTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Google Site Verification tag from DB settings */}
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={displayOgImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={displayOgImage} />
    </>
  )
}

export default SEO
