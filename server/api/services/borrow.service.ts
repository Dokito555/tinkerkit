import { PrismaClient } from "@prisma/client/extension"
import { status } from "elysia"
import prisma from "~~/server/db/prisma"

export async function createBorrowRequest(userId: string, itemId: string, days: number) {
    console.log("createBorrowRequest called with:", { userId, itemId, days })

    const dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)

    const request = await prisma.$transaction(async (tx) => {
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

        const existingRequest = await tx.borrowedItem.findFirst({
            where: {
                userId,
                itemId,
                status: {
                    in: ['PENDING', 'APPROVED', 'BORROWED']
                }
            }
        })

        if (existingRequest) {
            throw new Error('you already have an active request for this item')
        }

        const request = await tx.borrowedItem.create({
            data: {
                userId,
                itemId,
                durationDays: days,
                status: 'PENDING',
                dueDate: dueDate,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                item: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        })

        return request;
    })
    return request;
}   

export async function getBorrowRequest(requestId: string, userId?: string) {
    const where: any = { id: requestId }

    if (userId) {
        where.userId = userId
    }

    const request = await prisma.borrowedItem.findUnique({
        where,
        include: {
            item: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true
                }
            }
        }
    })

    if (!request) {
        throw new Error('Request not found')
    }

    return request
}

export async function getAllRequests(page: number, limit: number, status?: string, userId?: string) {
     const skip = (page - 1) * limit

    const where: any = {}

    if (status) {
        where.status = status
    }

    if (userId) {
        where.userId = userId
    }

    const [requests, total] = await Promise.all([
        prisma.borrowedItem.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                item: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        }),
        prisma.borrowedItem.count({where})
    ])

    return {
        requests,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    }
}

export async function approveRequest(requestId: string, adminId: string) {
    console.log("approveRequest called with:", { requestId, adminId })

    return await prisma.$transaction(async (tx) => {
        const request = await tx.borrowedItem.findUnique({
            where: {
                id: requestId
            },
            include: {
                item: true
            }
        })

        if (!request) {
            throw new Error('request not found')
        }

        if (request.status !== 'PENDING') {
            throw new Error(`cannot approve request with status: ${request.status}`)
        }

        if (!request.item.isAvailable || request.item.quantity <= 0) {
            throw new Error('item no longer available')
        }

        const approved = await tx.borrowedItem.update({
            where: { id: requestId },
            data: {
                status: 'APPROVED',
                updatedAt: new Date()
            },
            include: {
                item: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        })

        return approved
    })
}

export async function rejectRequest(requestId: string, adminId: string) {
    console.log("rejectRequest called with:", { requestId, adminId })

    return await prisma.$transaction(async (tx) => {
        const request = await tx.borrowedItem.findUnique({
            where: {
                id: requestId
            },
            include: {
                item: true
            }
        })

        if (!request) {
            throw new Error('request not found')
        }

        if (request.status !== 'PENDING') {
            throw new Error(`cannot reject request with status: ${request.status}`)
        }

        if (!request.item.isAvailable || request.item.quantity <= 0) {
            throw new Error('item no longer available')
        }

        const approved = await tx.borrowedItem.update({
            where: { id: requestId },
            data: {
                status: 'REJECTED',
                updatedAt: new Date()
            },
            include: {
                item: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        })

        return approved
    })
}

export async function checkoutItem(requestId: string, userId: string) {
    console.log("checkoutItem called with: ", {requestId, userId})

    return await prisma.$transaction(async (tx) => {
        const request = await tx.borrowedItem.findUnique({
            where: {
                id: requestId
            },
            include: {
                item: true
            }
        })

        if (!request) {
            throw new Error('request not found')
        }

        if (request.status !== 'APPROVED') {
            throw new Error('request must be approved before checkout')
        }

        if (request.userId !== userId) {
            throw new Error('not authrorized to checkout this item')
        }

        if (request.item.quantity <= 0) {
            throw new Error('item no longer available')
        }

        const updatedItem = await tx.item.update({
            where: {
                id: request.itemId
            },
            data: {
                quantity: {
                    decrement: 1
                }
            }
        })

        if (updatedItem.quantity === 0) {
            await tx.item.update({
                where: {
                    id: request.itemId
                },
                data: {
                    isAvailable: false
                }
            })
        }

        const borrowed = await tx.borrowedItem.update({
            where: {
                id: requestId
            },
            data: {
                status: 'BORROWED',
                borrowedAt: new Date(),
                updatedAt: new Date()
            },
            include: {
                item: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        })

        return borrowed
    })
}

export async function cancelBorrowRequest(requestId: string, userId: string) {
    const request = await prisma.borrowedItem.findUnique({
        where: {
            id: requestId
        }
    })

    if (!request) {
        throw new Error('request not found')
    }

    if (request.userId !== userId) {
        throw new Error('not authorized to cancel this request')
    }

    if (request.status !== 'PENDING' && request.status !== 'APPROVED') {
        throw new Error(`cannot cancel request with status: ${request.status}`)
    }

    return await prisma.borrowedItem.update({
        where: {
            id: requestId,
        },
        data: {
            status: 'CANCELLED',
            updatedAt: new Date()
        },
        include: {
            item: true
        }
    })
}

export async function returnItem(borrowedItemId: string, userId: string) {
    console.log("returnItem called with:", { borrowedItemId, userId })

    return prisma.$transaction(async (tx) => {
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

        if (borrow.status !== 'BORROWED') {
            throw new Error(`cannot return item with status: ${borrow.status}`)
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

export async function checkOverdue() {
    const now = new Date()

    const overdueItems = await prisma.borrowedItem.findMany({
        where: {
            status: 'BORROWED',
            dueDate: {
                lt: now
            }
        },
        include: {
            item: true,
            user: {
                select: {
                    id: true,
                    email: true
                }
            }
        }
    })

    return overdueItems.map(item => ({
        ...item,
        daysOverdue: Math.ceil((now.getTime() - item.dueDate!.getTime()) / (24 * 60 * 60 * 1000))
    }))
}

export async function getUserBorrowHistory(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page-1) * limit

    const [history, total] = await Promise.all([
        prisma.borrowedItem.findMany({
            where: {
                userId
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                item: true
            }
        }),
        prisma.borrowedItem.count({
            where: {
                userId
            }
        })
    ])

    return {
        history,
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
    }
}

export async function renewal() {}

