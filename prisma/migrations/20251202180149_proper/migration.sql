/*
  Warnings:

  - You are about to drop the column `Duration` on the `BorrowedItem` table. All the data in the column will be lost.
  - The `status` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `dueDate` to the `BorrowedItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "BorrowStatus" AS ENUM ('BORROWED', 'RETURNED', 'LATE', 'CANCELED');

-- AlterTable
ALTER TABLE "BorrowedItem" DROP COLUMN "Duration",
ADD COLUMN     "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "durationDays" INTEGER,
ADD COLUMN     "returnedAt" TIMESTAMP(3),
ADD COLUMN     "status" "BorrowStatus" NOT NULL DEFAULT 'BORROWED';

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "status",
ADD COLUMN     "status" "ItemStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE INDEX "BorrowedItem_itemId_idx" ON "BorrowedItem"("itemId");

-- AddForeignKey
ALTER TABLE "BorrowedItem" ADD CONSTRAINT "BorrowedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowedItem" ADD CONSTRAINT "BorrowedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
