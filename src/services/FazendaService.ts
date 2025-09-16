import { withAccelerate } from "@prisma/extension-accelerate";
import { Prisma } from "../../generated/prisma";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient().$extends(withAccelerate());

export type CreateFazendaData = {
  id: number;
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
  usuarioId: string;
};

export async function criarFazenda(data: CreateFazendaData) {
  if (!data.nome || !data.usuarioId) {
    throw new Error(
      "O nome da fazenda e o usuárioId do responsável devem ser informados"
    );
  }

  const novaFazenda = await prisma.fazenda.create({ data: data });
  return novaFazenda;
}

export async function deletarFazenda(id: number) {
  if (!id) {
    throw new Error("O id da fazenda deve ser informado");
  }
}
