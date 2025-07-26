-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "company" TEXT DEFAULT '',
ADD COLUMN     "emailSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "telephoneNumber" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "notes" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_emailSent_idx" ON "Contact"("emailSent");
