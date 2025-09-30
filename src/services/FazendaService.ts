import { withAccelerate } from "@prisma/extension-accelerate";
import { Prisma } from "../../generated/prisma";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient().$extends(withAccelerate());

// usuario?: never; id?: number; nome: string; descricao?: string | null; cidade?: string | null; estado?: string | null; ativo?: boolean; usuarioId: string; foto_url?: string | null; lotes?:

export type CreateFazendaData = {
  usuario?: never;
  id?: number;
  nome: string;
  descricao?: string | null;
  cidade?: string | null;
  estado?: string | null;
  usuarioId: string;
  ativo?: boolean;
  foto_url?: string | null;
};
type atualizarCasdastroData = {
  usuario?: never;
  id: number;
  nome: string;
  descricao?: string | null;
  cidade?: string | null;
  estado?: string | null;
  usuarioId: string;
  ativo?: boolean;
  foto_url?: string | null;
};

export async function cadastrarFazenda(data: CreateFazendaData) {
  if (!data.nome || !data.usuarioId) {
    throw new Error("NOME_FAZENDA_E_PROPRIETARIO_SAO_OBRIGATORIOS");
  }

  const novaFazenda = await prisma.fazenda.create({ data });
  return novaFazenda;
}

export async function deletarFazenda(id: number) {
  if (!id) {
    throw new Error("ID_FAZENDA_DEVE_SER_INFORMADO");
  }

  const fazendaSelecionada = await prisma.fazenda.findUnique({
    where: { id },
  });

  if (!fazendaSelecionada) {
    throw new Error("ID_INFORMADO_INVALIDO");
  }

  const fazendaDesativada = await prisma.fazenda.update({
    where: { id: id },
    data: { ativo: false },
  });

  return fazendaDesativada;
}

export async function atualizarCadastroFazenda(data: atualizarCasdastroData) {
  const { id } = data;
  if (!data.id) {
    throw new Error("ID_FAZENDA_DEVE_SER_INFORMADO");
  }

  const fazendaSelecionada = await prisma.fazenda.findUnique({
    where: { id },
  });

  if (!fazendaSelecionada) {
    throw new Error("ID_INFORMADO_INVALIDO");
  }

  const fazendaDesativada = await prisma.fazenda.update({
    where: { id: id },
    data: {
      nome: data.nome,
      descricao: data.descricao ? data.descricao : null,
      cidade: data.cidade ? data.cidade : null,
      estado: data.estado ? data.estado : null,
      ativo: data.ativo ? data.ativo : true,
      foto_url: data.foto_url ? data.foto_url : null,
    },
  });

  return fazendaDesativada;
}

export async function todasFazendasAtivas() {
  const fazendas = await prisma.fazenda.findMany({
    where: { ativo: true },
  });
  return fazendas;
}
