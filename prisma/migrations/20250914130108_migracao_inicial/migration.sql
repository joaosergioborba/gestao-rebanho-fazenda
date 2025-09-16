-- CreateEnum
CREATE TYPE "public"."Sexo" AS ENUM ('MACHO', 'FEMEA');

-- CreateEnum
CREATE TYPE "public"."StatusVida" AS ENUM ('VIVO', 'ABATIDO', 'MORTO', 'VENDIDO');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."animais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(225) NOT NULL,
    "brinco_id" INTEGER NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "raca" TEXT NOT NULL,
    "sexo" "public"."Sexo" NOT NULL,
    "url_foto" TEXT,
    "pertence_a_fazenda" BOOLEAN NOT NULL DEFAULT true,
    "status" "public"."StatusVida" NOT NULL,
    "lote_id" INTEGER,
    "mae_id" INTEGER,
    "pai_id" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lotes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."eventos_saude" (
    "id" SERIAL NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "data_evento" TIMESTAMP(3) NOT NULL,
    "produto_utilizado" TEXT,
    "dosagem" TEXT,
    "observacoes" TEXT,
    "animal_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "eventos_saude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."eventos_reprodutivos" (
    "id" SERIAL NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "data_evento" TIMESTAMP(3) NOT NULL,
    "resultado" TEXT,
    "observacoes" TEXT,
    "animal_id" INTEGER NOT NULL,

    CONSTRAINT "eventos_reprodutivos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "animais_brinco_id_key" ON "public"."animais"("brinco_id");

-- CreateIndex
CREATE UNIQUE INDEX "lotes_nome_key" ON "public"."lotes"("nome");

-- AddForeignKey
ALTER TABLE "public"."animais" ADD CONSTRAINT "animais_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "public"."lotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animais" ADD CONSTRAINT "animais_mae_id_fkey" FOREIGN KEY ("mae_id") REFERENCES "public"."animais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."animais" ADD CONSTRAINT "animais_pai_id_fkey" FOREIGN KEY ("pai_id") REFERENCES "public"."animais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."eventos_saude" ADD CONSTRAINT "eventos_saude_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "public"."animais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."eventos_reprodutivos" ADD CONSTRAINT "eventos_reprodutivos_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "public"."animais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
