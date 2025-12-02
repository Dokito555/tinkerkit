import { Elysia } from 'elysia'
import { errorResponse } from './utils/response.util'
import { getSessionByToken } from './services/session.service'
import { authController } from './controllers/auth.controller'
import { itemController } from './controllers/item.controller'

const app = new Elysia({ prefix: '/api' })
    .derive(async ({ cookie }) => {
        console.log("cookie:", cookie?.session?.value)
        const token = cookie?.session?.value
        if (!token) return { user: null }

        const session = await getSessionByToken(token as string)
        return { user: session?.user ?? null }
    })
    
    .use(authController)
    .use(itemController)

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