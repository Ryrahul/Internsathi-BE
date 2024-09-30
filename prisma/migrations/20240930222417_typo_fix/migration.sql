/*
  Warnings:

  - You are about to drop the column `tranning` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "tranning",
ADD COLUMN     "training" JSONB;
