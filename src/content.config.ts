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

const randoRoute = defineCollection({
    loader: file('./src/data/route2.json'),
    schema: z.object({
        world: z.object({
            name: z.string(),
            abbr: z.string(),
        }),
        rooms: z.array(
            z.object({
                name: z.string(),
                boss: z.optional(z.boolean()),
            })
        ),
    }),
})

export const collections = { rankings, randoRoute }
