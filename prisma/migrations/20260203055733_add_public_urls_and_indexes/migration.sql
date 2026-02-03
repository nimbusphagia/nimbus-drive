/*
  Warnings:

  - You are about to drop the column `shareUrl` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `shareUrl` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicUrlId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicUrlId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PublicUrlType" AS ENUM ('FILE', 'FOLDER');

-- AlterTable
ALTER TABLE "File" DROP COLUMN "shareUrl",
ADD COLUMN     "publicUrlId" INTEGER;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "shareUrl",
ADD COLUMN     "publicUrlId" INTEGER;

-- CreateTable
CREATE TABLE "PublicUrl" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "type" "PublicUrlType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicUrl_hash_key" ON "PublicUrl"("hash");

-- CreateIndex
CREATE INDEX "PublicUrl_hash_idx" ON "PublicUrl"("hash");

-- CreateIndex
CREATE INDEX "PublicUrl_type_idx" ON "PublicUrl"("type");

-- CreateIndex
CREATE UNIQUE INDEX "File_publicUrlId_key" ON "File"("publicUrlId");

-- CreateIndex
CREATE INDEX "File_folderId_idx" ON "File"("folderId");

-- CreateIndex
CREATE INDEX "File_ownerId_idx" ON "File"("ownerId");

-- CreateIndex
CREATE INDEX "File_publicUrlId_idx" ON "File"("publicUrlId");

-- CreateIndex
CREATE INDEX "File_folderId_name_idx" ON "File"("folderId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_publicUrlId_key" ON "Folder"("publicUrlId");

-- CreateIndex
CREATE INDEX "Folder_publicUrlId_idx" ON "Folder"("publicUrlId");

-- CreateIndex
CREATE INDEX "Folder_ownerId_parentId_idx" ON "Folder"("ownerId", "parentId");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_publicUrlId_fkey" FOREIGN KEY ("publicUrlId") REFERENCES "PublicUrl"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_publicUrlId_fkey" FOREIGN KEY ("publicUrlId") REFERENCES "PublicUrl"("id") ON DELETE SET NULL ON UPDATE CASCADE;
