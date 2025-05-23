export const prerender = false

import type { APIRoute } from 'astro'
import { app } from '../../../firebase/server'
import { getAuth } from 'firebase-admin/auth'

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    const auth = getAuth(app)

    /* Get token from request headers */
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1]
    if (!idToken) {
        return new Response('No token found', { status: 401 })
    }

    /* Verify id token */
    try {
        await auth.verifyIdToken(idToken)
    } catch (error) {
        return new Response('Invalid token', { status: 401 })
    }

    /* Create and set session cookie */
    const expiry =
        14 /* days */ * // 2 weeks is the max
        24 /* hrs */ *
        60 /* mins */ *
        60 /* secs */ *
        1000 /* ms */
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: expiry,
    })

    cookies.set('__session', sessionCookie, {
        path: '/',
    })

    return redirect('/dashboard')
}
