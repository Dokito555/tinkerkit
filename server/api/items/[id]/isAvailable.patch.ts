import { updateItemAvaiabelityStatus } from "~~/server/services/item.service"

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id")

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: "missing required parameter",
            })
        }

        const i = await updateItemAvaiabelityStatus(id)

        return {
            item: i,
            message: "item availability successfully updated"
        }
    } catch (error: any) {
         throw createError({
            statusCode: 500,
            statusMessage: error.message || "failed to update item availability"
        })
    }
})