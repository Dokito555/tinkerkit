import { t } from "elysia";

export const createBorrowRequest = t.Object({
    id: t.String({
        format: 'uuid',
        error: 'wrong id format'
    }),
    days: t.Number({
        minimum: 1
    })
})

export const returnItemRequest = t.Object({
    id: t.String({
        format: 'uuid',
        error: 'wrong id format'
    }),
})