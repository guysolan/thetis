import { defineConfig } from 'astro/config'

// Stack
import vercel from '@astrojs/vercel/serverless'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// Performance
import partytown from '@astrojs/partytown'
// Content
import { articles } from './src/data/articles'
import { pages } from './src/data/pages'
// Services
import sitemap from '@astrojs/sitemap'

// For MD rendering Notion
import markdownIntegration from '@astropub/md'
const url = 'https://thetismedical.com/'

const allPages = []
pages.forEach((page) => {
    allPages.push(url + page.href)
})
articles.forEach((page) => {
    allPages.push(url + page.href)
})

// https://astro.build/config
export default defineConfig({
    site: 'https://thetismedical.com',
    integrations: [
        sitemap({
            customPages: allPages,
        }),
        partytown(),
        react(),
        markdownIntegration(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
    experimental: {
        assets: true,
    },
    output: 'server',
    adapter: vercel(),
})
