import { t } from 'elysia'

export const loginRequest = t.Object({
    email: t.String({
        format: 'email',
        error: 'Invalid email format'
    }),
    password: t.String({
        minLength: 8,
        error: 'Password must be at least 8 characters'
    })
})

export const registerRequest = t.Object({
    email: t.String({
        format: 'email',
        error: 'Invalid email format'
    }),
    password: t.String({
        minLength: 8,
        error: 'Password must be at least 8 characters'
    }),
})

export const getUserById = t.Object({
    id: t.String({
        format: 'uuid',
        error: 'invalid id'
    })
})