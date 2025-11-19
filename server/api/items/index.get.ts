import { getAllItems } from "~~/server/services/item.service"

export default defineEventHandler(async (event) => {
   const query = getQuery(event)

   const page = Number(query.page) || 1
   const limit = Number(query.limit) || 10

   const [items, total] = await getAllItems({page, limit})

   return {
    page, 
    limit,
    total,
    totalPages: Math.ceil(Number(total) / limit),
    items
   }
})