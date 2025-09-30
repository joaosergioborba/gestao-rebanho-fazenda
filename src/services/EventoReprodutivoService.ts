import { withAccelerate } from "@prisma/extension-accelerate";
import {
  FinalidadesBezerros,
  Lua,
  PrismaClient,
  Sexo,
  StatusVida,
  TipoEventoReprodutivo,
  TipoParicao,
} from "../../generated/prisma";
import { Prisma } from "@prisma/client";
import { threadCpuUsage } from "process";

const prisma = new PrismaClient().$extends(withAccelerate());

type eventoReprodutivoData = {
  id?: number;
  tipo_evento: TipoEventoReprodutivo;
  data_evento: Date;
  descricao_evento?: string | null;
  resultado?: string | null;
  observacoes: string | null;
  finalidade?: FinalidadesBezerros | null;
  finalidade_descricao?: string | null;
  lua?: Lua | null;
  animal_id: number;
  animal?: never;
  bezerro_nascido?: never;
};
type partoData = {
  mae_id?: number;
  dados_bezerro: {
    nome: string;
    brinco_id?: number | null;
    data_nascimento: Date;
    raca: string | null;
    sexo: Sexo;
    paricao: TipoParicao;
    escore?: number | null;
    pelagem?: string | null;
    url_foto?: string | null;
    pertence_a_fazenda?: boolean | null;
    status: StatusVida;
    pai_id?: number | null;
    mae_id?: number | null;
    lote_id?: number | null;
    fazendaId?: number | null;
    evento_parto?: number | null;
    ativo?: boolean | null;
  };
  dados_parto: {
    tipo_evento?: TipoEventoReprodutivo | null;
    descricao_evento?: string | null;
    data_evento: Date;
    resultado?: string | null;
    observacoes?: string | null;
    finalidade?: FinalidadesBezerros | null;
    lua?: Lua | null;
    animal_id: number;
  };
};

export async function listarEventoReprodutivoPorIdService(id: number) {
  if (!id) {
    throw new Error("ID_DEVE_SER_INFORMADO");
  }

  const animalSelecionado = await prisma.animal.findUnique({
    where: { id: id },
  });

  if (!animalSelecionado) {
    throw new Error("NAO_FOI_ENCONTRADO_NENHUM_ANIMAL_COM_O_ID_INFORMADO");
  }

  const eventos = await prisma.eventoReprodutivo.findMany({
    where: { animal_id: id },
  });

  return eventos;
}
export async function listarEventoReprodutivoPorBrincoService(
  brincoId: number
) {
  if (!brincoId) {
    throw new Error("BRINCO_ID_DEVE_SER_INFORMADO");
  }

  const animalSelecionado = await prisma.animal.findUnique({
    where: { brinco_id: brincoId },
  });

  if (!animalSelecionado) {
    throw new Error(
      "NAO_FOI_ENCONTRADO_NENHUM_ANIMAL_COM_O_BRINCO_ID_INFORMADO"
    );
  }

  const eventoCadastrado = await prisma.eventoReprodutivo.findMany({
    where: { id: brincoId },
  });

  return eventoCadastrado;
}

export async function cadastrarEventoReprodutivoService(
  id: number,
  data: eventoReprodutivoData
) {
  if (!id) {
    throw new Error("O_ID_DEVE_SER_INFORMADO");
  }
  const animal = await prisma.animal.findUnique({ where: { id: id } });
  if (!animal) {
    throw new Error("ID_INFORMADO_NAO_EXISTE");
  }
  if (!data.tipo_evento) {
    throw new Error("O_TIPO_DO_EVENTO_DEVE_SER_INFORMADO");
  }
  if (
    data.tipo_evento != "CIO" &&
    data.tipo_evento != "COBERTURA" &&
    data.tipo_evento != "INSEMINACAO" &&
    data.tipo_evento != "DIAGNOSTICO_GESTAO" &&
    data.tipo_evento != "PARTO" &&
    data.tipo_evento != "ABORTO" &&
    data.tipo_evento != "OUTRO"
  ) {
    throw new Error("TIPO_EVENTO_INFORMADO_INVALIDO");
  }

  if (!data.data_evento) {
    throw new Error("A_DATA_DO_EVENTO_DEVE_SER_INFORMADA");
  }

  const data_evento = new Date(data.data_evento);
  console.log(data_evento);

  data.animal_id = id;
  data.data_evento = data_evento;
  console.log(data);

  const eventoCadastrado = await prisma.eventoReprodutivo.create({
    data: data,
  });

  return eventoCadastrado;
}

export async function cadastrarPartoService(id: number, data: partoData) {
  const idAnimal = id;
  const dataAnimal = data;

  if (!idAnimal) {
    throw new Error("O_ID_DO_ANIMAL_DEVE_SER_INFORMADO");
  }
  const animalSelecionado = await prisma.animal.findUnique({
    where: { id: idAnimal },
  });

  if (!animalSelecionado) {
    throw new Error("O_ID_INFORMADO_INVALIDO");
  }

  if (
    !data.dados_bezerro.nome ||
    !data.dados_bezerro.data_nascimento ||
    !data.dados_bezerro.raca ||
    !data.dados_bezerro.sexo ||
    !data.dados_bezerro.paricao ||
    !data.dados_bezerro.status
  ) {
    throw new Error("TODOS_OS_CAMPOS_OBRIGATORIOS_DEVEM_SER_INFORMADOS");
  }

  if (data.dados_bezerro.brinco_id) {
    const animal = await prisma.animal.findUnique({
      where: { brinco_id: data.dados_bezerro.brinco_id },
    });

    if (animal) {
      throw new Error("O_BRINCO_INFORMADO_JA_ESTA_CADASTRADO");
      return;
    }
  }

  if (!data.dados_parto) {
    throw new Error("OS_DADOS_DO_PARTO_DEVE_SER_INFORMADO");
  }

  if (!data.dados_parto.data_evento) {
    throw new Error("A_DATA_EVENTO_DEVE_SER_INFORMADA");
  }
  const dataNascimento = new Date(data.dados_bezerro.data_nascimento);

  data.dados_bezerro.mae_id = idAnimal;
  data.dados_parto.tipo_evento = "PARTO";
  data.dados_parto.animal_id = idAnimal;
  data.dados_bezerro.data_nascimento = dataNascimento;

  data.dados_parto.data_evento = new Date(data.dados_parto.data_evento);

  const cadastro = await prisma.$transaction(async (tx) => {
    const bezerroCadastrado = await tx.animal.create({
      data: data.dados_bezerro,
    });
    const idBezerro = bezerroCadastrado.id;
    const eventoCadastrado = await tx.eventoReprodutivo.create({
      data: data.dados_parto,
    });
    const idEventoCadastrado = eventoCadastrado.id;
    const bezerroAtualizado = await tx.animal.update({
      where: { id: idBezerro },
      data: { evento_parto_id: idEventoCadastrado },
    });
    return { eventoCadastrado, bezerroAtualizado };
  });

  return { cadastro };
}
export async function atualizarEventoReprodutivoService(
  id: number,
  data: eventoReprodutivoData
) {}

export async function deletarEventoReprodutivoPorIdService(id: number) {}
export async function deletarEventoReprodutivoPorBrincoIdService(
  brincoId: number
) {}
