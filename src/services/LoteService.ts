import { withAccelerate } from "@prisma/extension-accelerate";
import { Prisma } from "../../generated/prisma";
import { PrismaClient } from "../../generated/prisma";
//import { PrismaClient, Sexo, StatusVida } from "../../generated/prisma";

const prisma = new PrismaClient().$extends(withAccelerate());

export type CreateLoteData = {
  id: number;
  nome: string;
  descricao?: string;
  ativo?: boolean;
  fazendaId: number;
  foto_url: string;
};

export async function cadastrarLote(data: CreateLoteData) {
  if (!data.nome) {
    throw new Error("NOME_DEVE_SER_INFORMADO");
  }
  if (!data.fazendaId) {
    throw new Error("FAZENDA_ID_DEVE_SER_INFORMADO");
  }

  const novoLote = await prisma.lote.create({
    data: {
      nome: data.nome,
      descricao: data.descricao ? data.descricao : null,
      fazendaId: data.fazendaId,
      foto_url: data.foto_url ? data.foto_url : null,
    },
  });
  return novoLote;
}

export async function atualizarLote(data: CreateLoteData) {
  if (!data.id) {
    throw new Error("NOME_DEVE_SER_INFORMADO");
  }

  const loteSelecionado = await prisma.lote.findUnique({
    where: { id: data.id },
    select: { nome: true },
  });
  console.log(loteSelecionado);

  if (!loteSelecionado) {
    throw new Error("LOTE_ID_INFORMADO_NAO_EXISTE");
  }

  const novoLote = await prisma.lote.update({
    where: { id: data.id },
    data: {
      nome: data.nome ? data.nome : loteSelecionado.nome,
      descricao: data.descricao ? data.descricao : null,
      foto_url: data.foto_url ? data.foto_url : null,
    },
  });
  return novoLote;
}

export async function deletarLote(id: number) {
  if (!id) {
    throw new Error("ID_DEVE_SER_INFORMADO");
  }
  const loteSelecionada = await prisma.lote.findUnique({ where: { id: id } });

  if (!loteSelecionada) {
    throw new Error("ID_INFORMADO_INVALIDO");
  }
  const loteDesativado = await prisma.lote.update({
    where: { id: id },
    data: { ativo: false },
  });
  return loteDesativado;
}

export async function todosLotesAtivos() {
  const lotes = prisma.lote.findMany({ where: { ativo: true } });
  return lotes;
}

export async function buscarLoteService(id: number) {
  if (!id) {
    throw new Error("ID_DO_LOTE_DEVE_SER_INFORMADO");
  }
  const lote = await prisma.lote.findUnique({ where: { id: id } });
  if (!lote) {
    throw new Error("ID_LOTE_INFORMADO_INVALIDO");
  }
  return lote;
}
