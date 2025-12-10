/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `BorrowedItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BorrowStatus" ADD VALUE 'AWAITING_PAYMENT';
ALTER TYPE "BorrowStatus" ADD VALUE 'PAYMENT_FAILED';
ALTER TYPE "BorrowStatus" ADD VALUE 'PAID';

-- AlterTable
ALTER TABLE "BorrowedItem" ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentUrl" TEXT,
ADD COLUMN     "totalAmount" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "BorrowedItem_paymentId_key" ON "BorrowedItem"("paymentId");

-- CreateIndex
CREATE INDEX "BorrowedItem_status_idx" ON "BorrowedItem"("status");

-- CreateIndex
CREATE INDEX "BorrowedItem_paymentId_idx" ON "BorrowedItem"("paymentId");
