/*
  Warnings:

  - Added the required column `description` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL;
