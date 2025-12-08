import { t } from "elysia";

export const createBorrowRequestRequest = t.Object({
    itemId: t.String({
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

export const myRequestsRequest = t.Object({
    page: t.Number({
        minimum: 1
    }),
    limit: t.Number({
        minimum: 10
    }),
    status: t.String()
})

export const getRequestId = t.Object({
    id: t.String({
        format: 'uuid',
        error: 'wrong id format'
    })
})

export const borrowPagination = t.Object({
    page: t.Number({
        minimum: 1
    }),
    limit: t.Number({
        minimum: 10
    }),
})