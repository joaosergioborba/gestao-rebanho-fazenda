import { withAccelerate } from "@prisma/extension-accelerate";
import { Prisma } from "../../generated/prisma";
import { PrismaClient } from "../../generated/prisma";
//import { PrismaClient, Sexo, StatusVida } from "../../generated/prisma";

const prisma = new PrismaClient().$extends(withAccelerate());

export type CreateLoteData = {
  id: number;
  nome: string;
  descricao?: string;
  cidade?: string;
  estado?: string;
  ativo?: boolean;
  fazendaId: number;
};

export async function cadastrarLote(data: CreateLoteData) {
  const novoLote = await prisma.lote.create({
    data: data,
  });

  return novoLote;
}
