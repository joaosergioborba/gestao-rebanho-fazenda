-- DropForeignKey
ALTER TABLE "public"."animais" DROP CONSTRAINT "animais_fazendaId_fkey";

-- AlterTable
ALTER TABLE "public"."animais" ALTER COLUMN "fazendaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."fazendas" ADD COLUMN     "foto_url" TEXT;

-- AlterTable
ALTER TABLE "public"."lotes" ADD COLUMN     "foto_url" TEXT;

-- AddForeignKey
ALTER TABLE "public"."animais" ADD CONSTRAINT "animais_fazendaId_fkey" FOREIGN KEY ("fazendaId") REFERENCES "public"."fazendas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
