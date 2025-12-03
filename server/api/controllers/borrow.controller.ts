import Elysia from "elysia";
import { borrowItem, returnItem } from "../services/borrow.service";
import { createBorrowRequest, returnItemRequest } from "../validators/borrow.validator";
import { errorResponse, successResponse } from "../utils/response.util";

export const borrowController = (app: Elysia) => {
    return app.group('/borrow', (app) => 
        app
        .guard({
            beforeHandle: (ctx: any) => {
                const {user, set} = ctx
                console.log(user)
                if (!user) {
                    set.status = 403
                    throw errorResponse(
                        "forbidden",
                        403,
                    )
                }
            }
        }, (app) => 
            app
            .post('/', async ({body, user, set}: any) => {
                console.log("User from borrow:", JSON.stringify(user, null, 2)) 
                console.log("Body:", JSON.stringify(body, null, 2))
                try {

                    const { id, days } = body
                    
                    console.log("id:", id)
                    console.log("days:", days)
                    console.log("userId:", user.id)

                    if (!id) {
                        set.status = 400
                        return errorResponse("id is required", 400)
                    }

                    const res = await borrowItem(
                        user.id, 
                        body.id, 
                        body.days
                    )

                    return successResponse(res)
                } catch (error) {
                    set.status = 500;
                    return errorResponse(
                        "failed to add item",
                        500, error
                    );
                }
            }, {
                body: createBorrowRequest
            }) 
            .post('/return/:id', async ({params, user, set}: any) => {
                console.log("user from return item: %d", user)
                try {
                    const res = await returnItem(params.id, user.id)

                    return successResponse(res)
                } catch (error) {
                    set.status = 500;
                    return errorResponse(
                        "failed to add item",
                        500, error
                    );
                }
            }, {
                params: returnItemRequest
            })
        )
    )
}