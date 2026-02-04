/*
  Warnings:

  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - Added the required column `cloudId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "url",
ADD COLUMN     "cloudId" TEXT NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL;
