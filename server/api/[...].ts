import { eventHandler, getRequestURL, getRequestHeaders, readRawBody } from 'h3'
import { Elysia } from 'elysia'
import { authController } from './controllers/auth.controller'
import { itemController } from './controllers/item.controller'
import { errorResponse } from './utils/response.util'

const app = new Elysia({ prefix: '/api' })
    .use(authController)
    .use(itemController)
    .onError(({ code, error, set }) => {
        if (code === 'VALIDATION') {
            return errorResponse('Validation failed', set.status = 400, error.message)
        }

        if (code === 'NOT_FOUND') {
            return errorResponse('Route not found', set.status = 404)
        }

        return errorResponse('Internal Server Error', set.status = 500)
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