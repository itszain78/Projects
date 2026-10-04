import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config } from './src/config.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// SEO plugin: everything is generated from src/config.js so content and prices never go out of sync.
function seoPlugin() {
  const siteUrl = (process.env.VITE_SITE_URL || config.siteUrl || '').replace(/\/+$/, '')
  const abs = (path) => (siteUrl ? `${siteUrl}${path}` : null)

  const minPrice = Math.min(...config.pricing.map((p) => p.base))

  const jsonLd = () => {
    const graph = [
      {
        '@type': 'Person',
        '@id': abs('/#person') || '#person',
        name: config.name,
        jobTitle: config.title,
        description: config.bio,
        email: `mailto:${config.email}`,
        ...(siteUrl && { url: siteUrl, image: abs('/og-image.png') }),
        address: { '@type': 'PostalAddress', addressLocality: 'Multan', addressCountry: 'PK' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'NFC Institute of Engineering & Technology, Multan' },
        knowsAbout: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST API', 'Web Development'],
        sameAs: [config.github, config.linkedin, config.twitter].filter(Boolean),
      },
      {
        '@type': 'WebSite',
        '@id': abs('/#website') || '#website',
        name: `${config.name} — Portfolio`,
        inLanguage: 'en',
        ...(siteUrl && { url: siteUrl }),
        publisher: { '@id': abs('/#person') || '#person' },
      },
      {
        '@type': 'ProfessionalService',
        '@id': abs('/#service') || '#service',
        name: `${config.name} — Web Development Services`,
        description: 'Custom PHP and MySQL web applications, business websites, landing pages and admin panels.',
        ...(siteUrl && { url: siteUrl, image: abs('/og-image.png') }),
        provider: { '@id': abs('/#person') || '#person' },
        areaServed: 'Worldwide',
        priceRange: `$${minPrice}+`,
        address: { '@type': 'PostalAddress', addressLocality: 'Multan', addressCountry: 'PK' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web development packages',
          itemListElement: config.pricing.map((p) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: p.label },
            priceSpecification: { '@type': 'PriceSpecification', minPrice: p.base, priceCurrency: 'USD' },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: config.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  }

  // Crawlable HTML inside #root; React replaces it on mount.
  const fallback = () => `
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">
  <h1>${esc(config.name)} — ${esc(config.title)} in ${esc(config.location)}</h1>
  <p>${esc(config.bio)}</p>
  <nav aria-label="Primary"><a href="#about">About</a> · <a href="#skills">Skills</a> · <a href="#services">Services</a> · <a href="#projects">Projects</a> · <a href="#contact">Contact</a></nav>
  <h2>Services</h2>
  <ul>${config.services.map((s) => `<li><strong>${esc(s.title)}</strong> — ${esc(s.desc)}</li>`).join('')}</ul>
  <h2>Pricing</h2>
  <ul>${config.pricing.map((p) => `<li>${esc(p.label)} — from $${p.base} (${esc(p.time)})</li>`).join('')}</ul>
  <h2>Projects</h2>
  <ul>${config.projects.map((p) => `<li><strong>${esc(p.title)}</strong>${p.status ? ` (${esc(p.status)} — coming soon)` : ''} — ${esc(p.short)}</li>`).join('')}</ul>
  <h2>Frequently Asked Questions</h2>
  ${config.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
  <p>Contact: <a href="mailto:${esc(config.email)}">${esc(config.email)}</a> · <a href="${esc(config.github)}">GitHub</a></p>
</div>`

  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const tags = []
      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: abs('/og-image.png') }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: abs('/og-image.png') }, injectTo: 'head' },
        )
      } else {
        console.warn('\n[seo] siteUrl is empty — set it in src/config.js (or VITE_SITE_URL) to enable canonical, og:image and sitemap.\n')
      }
      tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonLd(), injectTo: 'head' })
      return { html: html.replace('<!--seo-fallback-->', fallback()), tags }
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', 'Disallow: /projects/academic-portal/config/', 'Disallow: /projects/academic-portal/api/']
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
})
