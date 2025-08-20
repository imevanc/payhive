/*
  Warnings:

  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."notes";

-- CreateTable
CREATE TABLE "public"."Newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT,
    "refNumber" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "public"."Newsletter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_refNumber_key" ON "public"."Newsletter"("refNumber");

-- CreateIndex
CREATE INDEX "Newsletter_email_idx" ON "public"."Newsletter"("email");

-- CreateIndex
CREATE INDEX "Newsletter_createdAt_idx" ON "public"."Newsletter"("createdAt");

-- CreateIndex
CREATE INDEX "Newsletter_refNumber_idx" ON "public"."Newsletter"("refNumber");

-- AddForeignKey
ALTER TABLE "public"."Newsletter" ADD CONSTRAINT "Newsletter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
