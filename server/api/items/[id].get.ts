import { getItem } from "~~/server/services/item.service";

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id")

        if (!id) {
             throw createError({
            statusCode: 400,
            statusMessage: "missing required parameter",
        });
        }

        const i = await getItem(id)

        return {
            item: i,
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || "failed to get item"
        })
    }
})