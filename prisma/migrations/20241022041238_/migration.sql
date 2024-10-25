/*
  Warnings:

  - You are about to drop the column `company` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "company",
ADD COLUMN     "company_name" TEXT NOT NULL DEFAULT 'company';
