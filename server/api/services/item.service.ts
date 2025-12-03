import prisma from "~~/server/db/prisma";

export async function createItem(name: string, tag: string, price: number) {
    const i = await prisma.item.create({
        data: {
            name: String(name),
            tag: String(tag),
            price: Number(price),
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: "AVAILABLE"
        },
    });
  return i;
}

export async function getItem(itemId: string) {
    const i = await prisma.item.findUnique({
        where: { id: itemId },
    });

    if (!i) {
        throw new Error("item not found");
    }

    return i;
}

export async function deleteItem(itemId: string) {
    await prisma.item.delete({
        where: { id: itemId },
    });
}

export async function updateItemAvaiabelityStatus(itemId: string) {
    const i = await prisma.item.findFirst({
        where: { id: itemId },
        select: {
        id: true,
        name: true,
        tag: true,
        isAvailable: true,
        },
    });

    if (!i) {
        throw new Error("item not found");
    }

    const new_item = await prisma.item.update({
        where: { id: itemId },
        data: {
        isAvailable: !i?.isAvailable,
        },
    });

    return new_item;
}

export async function getAllItems(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        prisma.item.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        }),
        prisma.item.count({}),
    ]);

    return [items, total];
}
