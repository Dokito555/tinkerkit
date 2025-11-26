import { Elysia, t } from 'elysia'
import { loginUser, registerUser } from '../services/user.service'
import { errorResponse, successResponse } from '../utils/response.util'
import { loginRequest, registerRequest } from '../validators/auth.validator'
import { createSession, deleteSession } from '../services/session.service'

export const authController = (app: Elysia) => {
    return app.group('/auth', (app) => 
        app
        .post('/login', async ({body, cookie: {session}, set}) => {
            const user = await loginUser(body.email, body.password)

            if (!user) {
                return errorResponse(
                    'Invalid credentials',
                    set.status = 401
                )
            }

            const s = await createSession(user.id)

            session.value = s.token
            session.httpOnly = true
            session.maxAge = 3 * 24 * 60 * 60
            session.sameSite = 'lax'

            console.log("session token:", session.value)
            return successResponse(user)
        }, {
            body: loginRequest
        })
        .post('/register', async ({body, set}) => {
            try {
                const user = await registerUser(
                    body.email,
                    body.password,
                )

                return successResponse(user)

            } catch (error) {
                return errorResponse(
                    'Registration failed',
                    set.status = 400
                )
            }
        }, {
            body: registerRequest
        })
        .post('/logout', async ({cookie: {session}, set}) => {
            const token = session.value as string || undefined

            if (token == undefined) {
                console.log("token undefined: %d", token)
                return errorResponse(
                    'Token is undefined',
                    set.status = 401
                )
            }

            if (token) {
                await deleteSession(token)
            }
            
            session.remove()
            
            return successResponse()
        })
    )
}