/*
  Warnings:

  - You are about to drop the column `stipend` on the `Internship` table. All the data in the column will be lost.
  - Added the required column `salary` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internship" DROP COLUMN "stipend",
ADD COLUMN     "salary" INTEGER NOT NULL;
