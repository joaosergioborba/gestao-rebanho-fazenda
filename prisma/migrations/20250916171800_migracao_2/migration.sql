/*
  Warnings:

  - Added the required column `fazendaId` to the `animais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fazendaId` to the `lotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."lotes_nome_key";

-- AlterTable
ALTER TABLE "public"."animais" ADD COLUMN     "fazendaId" INTEGER NOT NULL,
ALTER COLUMN "brinco_id" DROP NOT NULL,
ALTER COLUMN "data_nascimento" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."lotes" ADD COLUMN     "fazendaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."usuarios" ADD COLUMN     "usuario_ativo" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "public"."fazendas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(225) NOT NULL,
    "descricao" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "fazendas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."animais" ADD CONSTRAINT "animais_fazendaId_fkey" FOREIGN KEY ("fazendaId") REFERENCES "public"."fazendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lotes" ADD CONSTRAINT "lotes_fazendaId_fkey" FOREIGN KEY ("fazendaId") REFERENCES "public"."fazendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fazendas" ADD CONSTRAINT "fazendas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
