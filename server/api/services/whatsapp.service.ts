import twilio from 'twilio'

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

export async function sendWhatsAppMessage(to: string, message: string) {
    try {
        const result = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to,
            body: message
        })

        console.log("whatsapp message sent: ", result.sid)
        return result
    } catch (error) {
        console.log('whatsapp error: ', error) 
        throw new Error('failed to send whatsapp message')
    }
}

export async function notifyAdminNewCheckout(borrowRequest: any) {
    const message = `
        new item checkout
        user: ${borrowRequest.user.email}
        item: ${borrowRequest.item.name}
        duration: ${borrowRequest.durationDays} days
        total: Rp ${borrowRequest.totalAmount?.toLocaleString('id-ID')}
        status: ${borrowRequest.status}

        request id: ${borrowRequest.id}
    `.trim()

    return sendWhatsAppMessage(process.env.ADMIN_WHATSAPP!, message)
}

export async function notifyUserPaymentLink(userPhone: string, paymentUrl: string, itemName: string, amount: number) {
    const message = `
        payment required

        item: ${itemName}
        amount: Rp ${amount.toLocaleString('id-ID')}

        complete your payment here:
        ${paymentUrl}

        payment link expires in 24 hours
    `.trim()

    return sendWhatsAppMessage(`whatsapp:+62${userPhone}`, message)
}