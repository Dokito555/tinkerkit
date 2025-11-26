import Elysia from "elysia"
import { createItemRequest, itemIdSchema, querySchema } from "../validators/items.validator"
import { createItem, deleteItem, getAllItems, getItem, updateItemAvaiabelityStatus } from "../services/item.service"
import { errorResponse, successResponse } from "../utils/response.util"

export const itemController = (app: Elysia) => {
    return app.group('/items', (app) => 
        app
        .post('/', async ({body}) => {
            const {name, price, tag} = body

            const item = await createItem(
                name,
                tag,
                price,
            )
            
            return successResponse(item);
        }, {
            body: createItemRequest
        })
        .get('/', async ({query}) => {
            const page = Number(query.page) || 1
            const limit = Number(query.limit) || 10

            const [items, total] = await getAllItems(page, limit)

            return {
                page,
                limit,
                total,
                totalPages: Math.ceil(Number(total) / limit),
                items
            }
        }, {
            query: querySchema
        })
        .get('/:id', async ({params, set}) => {
            const item = await getItem(params.id)

            if (!item) {
                return errorResponse(
                    'Item not found',
                    set.status = 404
                )
            }

            return successResponse(item)
        }, {
            params: itemIdSchema
        })
        .get('/:id/isAvailable', async ({params, set}) => {
            const i = await updateItemAvaiabelityStatus(params.id)

            if (i === null) {
                return errorResponse(
                    'Item not found',
                    set.status = 404
                )
            }

            return successResponse(i)
        }, {
            params: itemIdSchema
        })
        .delete('/:id', async ({params, set}) => {
            const deleted = await deleteItem(params.id)

            return successResponse()
        }, {
            params: itemIdSchema
        })
    )
}