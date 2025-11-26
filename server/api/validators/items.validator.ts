import { t } from 'elysia'

export const createItemRequest = t.Object({
    name: t.String({
        minLength: 1
    }),
    price: t.Number({
        minimum: 0
    }),
    tag: t.String({
        minLength: 1
    }),
})

export const itemIdSchema = t.Object({
    id: t.String({
        minLength: 1
    })
})

export const querySchema = t.Object({
    page: t.Optional(
        t.Numeric({
            default: 1
        })
    ),
    limit: t.Optional(
        t.Numeric({
            default: 10
        })
    )
})