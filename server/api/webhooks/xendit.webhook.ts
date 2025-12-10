import { defineEventHandler, readBody } from "h3";
import { handlePaymentWebhook } from "../services/borrow.service";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        // verify webhook token
        const webhookToken = event.node.req.headers['x-callback-token']
        if (webhookToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
            return {
                error: 'invalid webhook token',
                statusCode: 401
            }
        }

        const {id: invoiceId, status} = body

        await handlePaymentWebhook(invoiceId, status)
        
        return {
            success: true
        }
    } catch (error) {
        console.error('webhook error: ', error)
        return {
            error: error instanceof Error
            ? error.message
            : 'webhook processing failed'
        }
    }
})