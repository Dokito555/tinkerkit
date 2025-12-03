import { PrismaClient } from "@prisma/client/extension"
import prisma from "~~/server/db/prisma"

export async function borrowItem(userId: string, itemId: string, days: number) {
    console.log("borrowItem called with:", { userId, itemId, days }) // Debug log
    const dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)

    const result = await prisma.$transaction(async (tx) => {

        const item = await tx.item.findUnique({
            where: {
                id: itemId
            }
        })

        if (!item) {
            throw new Error('item not found')
        }

        if (item.quantity <= 0) {
            throw new Error('item not available')
        }

        const updated = await tx.item.update({
            where: {
                id: itemId
            },
            data: {
                quantity: {
                    decrement: 1
                }
            }
        })

        if (updated.quantity === 0) {
            await tx.item.update({
                where: { id: itemId },
                data: { isAvailable: false }
            })
        }

        const borrow = await tx.borrowedItem.create({
            data: {
                userId,
                itemId,
                borrowedAt: new Date(),
                dueDate,
                durationDays: days,
                status: 'BORROWED',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return borrow;
    })
    return result;
}   

export async function returnItem(borrowedItemId: string, userId: string) {
    console.log("returnItem called with:", { borrowedItemId, userId })
    return prisma.$transaction(async (tx: PrismaClient) => {
        const borrow = await tx.borrowedItem.findUnique({
            where: {
                id: borrowedItemId
            }
        })

        if (!borrow) {
            throw new Error('borrow record not found')
        }

        if (borrow.userId !== userId) {
            throw new Error('not permitted')
        }

        const now = new Date()
        let daysLate = 0
        if (borrow.dueDate && now > borrow.dueDate) {
            daysLate = Math.ceil((now.getTime()) - borrow.dueDate.getTime()) / (24 * 60 * 60 *1000)
        }

        await tx.borrowedItem.update({
            where: {
                id: borrowedItemId
            }, data: {
                returnedAt: now,
                status: 'RETURNED',
            }
        })

        await tx.item.update({
            where: {
                id: borrow.itemId
            }, data: {
                quantity: {
                    increment: 1,
                },
                isAvailable: true
            }
        })

        return { 
            success: true,
            daysLate
        };
    })
}

export async function renewal() {}

export async function checkOverdue() {}

// need new prisma model?
// export async function insertToHIstory() {}

// export async function getAllHistory() {}