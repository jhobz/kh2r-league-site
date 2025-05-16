// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [
            tailwindcss(),
            // Wrap old dependency that adds var to window
            {
                name: 'leader-line',
                transform(code, id) {
                    if (id.includes('/leader-line')) {
                        return `${code};export default LeaderLine;`
                    }
                    return null
                },
            },
        ],
    },

    adapter: node({
        mode: 'standalone',
    }),
})
