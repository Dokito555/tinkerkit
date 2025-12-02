import Elysia from "elysia"
import { createItemRequest, itemIdRequest, itemQueryRequest } from "../validators/items.validator"
import { createItem, deleteItem, getAllItems, getItem, updateItemAvaiabelityStatus } from "../services/item.service"
import { errorResponse, successResponse } from "../utils/response.util"

export const itemController = (app: Elysia) => {
    return app.group('/items', (r)  => 
    r
    .get('/', async ({query, set}) => {
        try {
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
        } catch (error) {
            set.status = 500;
            return errorResponse(
                "failed to fetch items",
                500,
                error
            );
        }
    }, {
        query: itemQueryRequest
    })
    .get('/:id', async ({params, set}) => {
        try {
            const item = await getItem(params.id)

            if (!item) {
                set.status = 404
                return errorResponse('item not found', 404)
            }

            return successResponse(item)
        } catch (error) {
            set.status = 500;
            return errorResponse(
                "failed to fetch item",
                500, error
            );
        }
    }, {
        params: itemIdRequest
    })
    .guard({
        beforeHandle: (ctx: any) => {
            const { user, set } = ctx
            console.log(user)
            if (!user || user.role !== 'admin') {
                set.status = 403
                throw errorResponse(
                    "forbidden",
                    403,
                )
            }
        }
    }, (admin) => 
        admin
        .post('/', async ({body, set}) => {
            try {
                 const item = await createItem(
                    body.name,
                    body.tag,
                    body.price,
                )
                    
                return successResponse(item);
            } catch (error) {
                set.status = 500;
                return errorResponse(
                    "failed to add item",
                    500, error
                );
            }
        }, {
            body: createItemRequest
        })
        .patch('/:id/availability', async ({params, set}) => {
            try {
                const i = await updateItemAvaiabelityStatus(params.id)

                if (i === null) {
                    set.status = 404
                    return errorResponse('item not found', 404)
                }

                return successResponse(i)
            } catch (error) {
                set.status = 500;
                return errorResponse(
                    "failed to change item availability",
                    500, error
                );
            }
        }, {
            params: itemIdRequest
        })
        .delete('/:id', async ({params, set}) => {
            try {
                const deleted = await deleteItem(params.id)
                return successResponse()
            } catch (error) {
                set.status = 500;
                return errorResponse(
                    "failed to delete item",
                    500, error
                );
           }
        }, {
            params: itemIdRequest
        })
    )
    )
}
