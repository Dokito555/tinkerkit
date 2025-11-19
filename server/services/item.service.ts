import prisma from "../db/prisma";
import { ItemRequestModel } from "../models/item.model";
import { PaginationRequest as PaginationParams } from "../models/request.model";

export async function createItem(item: ItemRequestModel) {
  const i = await prisma.item.create({
    data: {
      name: String(item.name),
      tag: String(item.tag),
      price: Number(item.price),
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
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

export async function getAllItems(params: PaginationParams) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        prisma.item.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" }
        }),
        prisma.item.count({})
    ])

    return [items, total]
}