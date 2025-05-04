import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { GoogleAuth } from 'google-auth-library'

const TARGET_AUDIENCE =
    'https://us-central1-kh2-rando.cloudfunctions.net/kh2r_gen_seed'

const authenticate = async () => {
    const auth = new GoogleAuth()
    return await auth.getIdTokenClient(TARGET_AUDIENCE)
}

const client = await authenticate()

export const server = {
    getRandoSeed: defineAction({
        handler: async () => {
            const res = await client.request({ url: TARGET_AUDIENCE })
            return res.data as string
        },
    }),
}
