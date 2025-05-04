import { defineCollection, z } from 'astro:content'
import { file } from 'astro/loaders'

const rankings = defineCollection({
    loader: file('./src/data/leaderboard.json'),
    schema: z.object({
        rank: z.number(),
        name: z.string(),
        img: z.string(),
        points: z.number(),
        averageTime: z.string(),
    }),
})

export const collections = { rankings }
