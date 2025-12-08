/*
  Warnings:

  - The values [LATE,CANCELED] on the enum `BorrowStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [MAINTENANCE] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BorrowStatus_new" AS ENUM ('PENDING', 'APPROVED', 'BORROWED', 'RETURNED', 'REJECTED', 'CANCELLED');
ALTER TABLE "public"."BorrowedItem" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BorrowedItem" ALTER COLUMN "status" TYPE "BorrowStatus_new" USING ("status"::text::"BorrowStatus_new");
ALTER TYPE "BorrowStatus" RENAME TO "BorrowStatus_old";
ALTER TYPE "BorrowStatus_new" RENAME TO "BorrowStatus";
DROP TYPE "public"."BorrowStatus_old";
ALTER TABLE "BorrowedItem" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ItemStatus_new" AS ENUM ('AVAILABLE', 'UNAVAILABLE');
ALTER TABLE "public"."Item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Item" ALTER COLUMN "status" TYPE "ItemStatus_new" USING ("status"::text::"ItemStatus_new");
ALTER TYPE "ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "public"."ItemStatus_old";
ALTER TABLE "Item" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "BorrowedItem" ALTER COLUMN "borrowedAt" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
