
// https://nuxt.com/docs/api/configuration/nuxt-cofig
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
  ],

  modules: ['@nuxt/image', '@nuxtjs/seo'],
  app: {
    head: {
      title: 'ชื่อเว็บไซต์ของคุณ',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'คำอธิบายเว็บไซต์เบื้องต้น (fallback)' },
        { name: 'author', content: 'ฉัตรชัย สวดดี' },
        { property: 'og:site_name', content: 'blogs ฉัตรชัย' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/bootstrap-logo.svg' }
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
          type: "text/javascript",
        },
      ],
    }
  },
  ssr: true,
  nitro: {
    preset: 'static'
  }
})
