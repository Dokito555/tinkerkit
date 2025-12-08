import { Elysia } from 'elysia'
import { errorResponse } from './utils/response.util'
import { getSessionByToken } from './services/session.service'
import { authController } from './controllers/auth.controller'
import { itemController } from './controllers/item.controller'
import { borrowController } from './controllers/borrow.controller'

// export interface AuthUser {
//     id: string
//     email: string
//     role: string
//     createdAt: Date
// }

const app = new Elysia({ prefix: '/api' })
    .derive(async ({ cookie }) => {
        console.log("cookie:", cookie?.session?.value)
        const token = cookie?.session?.value
        // if (!token) return { user: null as AuthUser | null}
        if (!token) return { user: null}

        const session = await getSessionByToken(token as string)
        // return { user: (session?.user ?? null) as AuthUser | null }
        return { user: session?.user ?? null}
    })
    // .macro(({ onBeforeHandle }) => ({
    //     isAuth(enabled: boolean) {
    //         if (!enabled) return

    //         onBeforeHandle(({ user, set }) => {
    //             if (!user) {
    //                 set.status = 401
    //                 throw new Error('Unauthorized')
    //             }
    //         })
    //     },
    //     isAdmin(enabled: boolean) {
    //         if (!enabled) return

    //         onBeforeHandle(({ user, set }) => {
    //             if (!user || user.role !== 'admin') {
    //                 set.status = 403
    //                 throw new Error('Forbidden: Admin only')
    //             }
    //         })
    //     }
    // }))
    // .use(authPlugin)
    .use(authController)
    .use(itemController)
    .use(borrowController)

    .onError(({ code, error, set }) => {
        if (code === 'VALIDATION') {
            set.status = 400
            return errorResponse('Validation failed', 400, error.message)
        }
        if (code === 'NOT_FOUND') {
            set.status = 404
            return errorResponse('Route not found', 404, error.message)
        }
        set.status = 500
        return errorResponse('Internal Server Error', 500)
    })

export default eventHandler(async (event) => {
    const url = getRequestURL(event)
    const headers = getRequestHeaders(event)
    const method = event.method || 'GET'
   
    const init: RequestInit = {
        method,
        headers: new Headers(headers as HeadersInit)
    }
    
    if (method !== 'GET' && method !== 'HEAD') {
        const body = await readRawBody(event)
        if (body) {
            init.body = body
        }
    }
    
    const request = new Request(url, init)
    
    return app.handle(request)
})