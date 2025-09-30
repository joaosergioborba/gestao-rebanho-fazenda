/*
  Warnings:

  - A unique constraint covering the columns `[evento_parto_id]` on the table `animais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lua` to the `eventos_reprodutivos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo_evento` on the `eventos_reprodutivos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipo_evento` on the `eventos_saude` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TipoParicao" AS ENUM ('RETARDADA', 'NORMAL', 'ACELERADA');

-- CreateEnum
CREATE TYPE "public"."TipoEventoSaude" AS ENUM ('VACINA', 'VERMIFUGO', 'TRATAMENTO', 'EXAME', 'CIRURGIA', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."TipoEventoReprodutivo" AS ENUM ('CIO', 'COBERTURA', 'INSEMINACAO', 'DIAGNOSTICO_GESTAO', 'PARTO', 'ABORTO', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."FinalidadesBezerros" AS ENUM ('RECRIA', 'ENGORDA', 'REPRODUCAO', 'SEMEN', 'REPOSICAO_MATRIZES', 'LEITE', 'ABATE', 'VENDA_BEZERRO', 'OUTROS');

-- CreateEnum
CREATE TYPE "public"."Lua" AS ENUM ('NOVA', 'MINGUANTE', 'CHEIA', 'CRESCENTE');

-- AlterTable
ALTER TABLE "public"."animais" ADD COLUMN     "escore" INTEGER,
ADD COLUMN     "evento_parto_id" INTEGER,
ADD COLUMN     "paricao" "public"."TipoParicao",
ADD COLUMN     "pelagem" TEXT;

-- AlterTable
ALTER TABLE "public"."eventos_reprodutivos" ADD COLUMN     "descricao_evento" TEXT,
ADD COLUMN     "finalidade" "public"."FinalidadesBezerros",
ADD COLUMN     "finalidade_descricao" TEXT,
ADD COLUMN     "lua" "public"."Lua" NOT NULL,
DROP COLUMN "tipo_evento",
ADD COLUMN     "tipo_evento" "public"."TipoEventoReprodutivo" NOT NULL;

-- AlterTable
ALTER TABLE "public"."eventos_saude" ADD COLUMN     "descricao_Evento" TEXT,
DROP COLUMN "tipo_evento",
ADD COLUMN     "tipo_evento" "public"."TipoEventoSaude" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "animais_evento_parto_id_key" ON "public"."animais"("evento_parto_id");

-- AddForeignKey
ALTER TABLE "public"."animais" ADD CONSTRAINT "animais_evento_parto_id_fkey" FOREIGN KEY ("evento_parto_id") REFERENCES "public"."eventos_reprodutivos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
