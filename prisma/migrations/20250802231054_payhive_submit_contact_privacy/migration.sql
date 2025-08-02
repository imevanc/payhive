-- AlterTable
ALTER TABLE "public"."Contact" ADD COLUMN     "privacyAccepted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "telephoneNumber" DROP NOT NULL;
