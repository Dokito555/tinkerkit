import Xendit from 'xendit-node'
import { CreateInvoiceRequest, Invoice } from 'xendit-node/invoice/models'
import { CreateInvoiceOperationRequest } from 'xendit-node/invoice/apis'

const xenditClient = new Xendit({
    secretKey: process.env.XENDIT_SECRET_KEY!
})

export async function createXenditInvoice(params: CreateInvoiceRequest) {
    const { Invoice } = xenditClient
    const data: CreateInvoiceRequest = {
        "amount" : params.amount,
        // 24hrs
        "invoiceDuration" : 172800,
        "externalId" : params.externalId,
        "description" : params.description,
        "currency" : "IDR",
        "reminderTime" : 1,
        "successRedirectUrl": params.successRedirectUrl || `${process.env.BASE_URL}/payment/success`,
        "failureRedirectUrl": params.failureRedirectUrl || `${process.env.BASE_URL}/payment/failed`,
    }

    try {
        const invoice: Invoice = await Invoice.createInvoice({
            data
        })

        return {
            id: invoice.id,
            invoiceUrl: invoice.invoiceUrl,
            expiryDate: invoice.expiryDate,
            status: invoice.status
        }
    } catch (error) {
        console.error('xendit error: ', error)
        throw new Error('failed to create payment invoice')
    }
}

export async function getInvoiceStatus(invoiceId: string) {
    const { Invoice } = xenditClient
    
    try {
        const invoice = await Invoice.getInvoiceById({invoiceId})

        return {
            id: invoice.id,
            status: invoice.status,
            amount: invoice.amount
        }
    } catch (error) {
        console.error('xendit error: ', error)
        throw new Error('failed to get invoice status')
    }
}