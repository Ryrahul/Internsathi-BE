/*
  Warnings:

  - You are about to drop the column `salary` on the `Internship` table. All the data in the column will be lost.
  - Added the required column `stipend` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internship" DROP COLUMN "salary",
ADD COLUMN     "stipend" INTEGER NOT NULL;
