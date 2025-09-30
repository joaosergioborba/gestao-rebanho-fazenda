import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient, TipoEventoSaude } from "../../generated/prisma";
const prisma = new PrismaClient().$extends(withAccelerate());

export async function cadastrarEventoSaudeService(
  id: number,
  data: EventoSaudeData
) {
  if (!id) {
    throw new Error("ID_OBRIGATORIO");
  }
  if (
    !data.tipo_evento ||
    (data.tipo_evento != "VACINA" &&
      data.tipo_evento != "VERMIFUGO" &&
      data.tipo_evento != "TRATAMENTO" &&
      data.tipo_evento != "EXAME" &&
      data.tipo_evento != "CIRURGIA" &&
      data.tipo_evento != "OUTRO") ||
    !data.data_evento
  ) {
    throw new Error("TODOS_OS_CAMPOS_OBROGATORIO_DEVEM_SER-PREENCHIDOS");
  }
  const animal = await prisma.animal.findUnique({ where: { id: id } });
  if (!animal) {
    throw new Error("O_ID_INFORMADO_NAO_EXISTE");
  }

  if (id && animal) {
    data.animal_id = id;
  }

  if (data.data_evento) {
    data.data_evento = new Date(data.data_evento);
  }

  const eventoCadastrado = await prisma.eventoSaude.create({ data: data });
  return eventoCadastrado;
}
export async function AlterarEventoSaudeService(
  id: number,
  data: EventoSaudeData
) {
  const evento = await prisma.eventoSaude.findUnique({ where: { id: id } });

  if (!evento) {
    throw new Error("O_ID_INFORMADO_E_INVALIDO");
  }
  if (data.data_evento) {
    data.data_evento = new Date(data.data_evento);
  }
  if (data.tipo_evento) {
    if (
      data.tipo_evento != "VACINA" &&
      data.tipo_evento != "VERMIFUGO" &&
      data.tipo_evento != "TRATAMENTO" &&
      data.tipo_evento != "EXAME" &&
      data.tipo_evento != "CIRURGIA" &&
      data.tipo_evento != "OUTRO"
    ) {
      throw new Error("TIPO_EVENTO_INFORMADO_INVALIDO");
    }
  }

  if (data.animal_id) {
    const animal = await prisma.animal.findUnique({
      where: { id: data.animal_id },
    });
    if (!animal) {
      throw new Error("ANIMAL_ID_INFORMADO_INVALIDO");
      return;
    }
  }

  const eventoAlterado = await prisma.eventoSaude.update({
    where: { id: id },
    data: data,
  });
  return eventoAlterado;
}
export async function DeletarEventoSaudeService(id: number) {
  if (!id) {
    throw new Error("O_ID_ANIMAL_E_OBRIGATORIO");
  }
  const evento = await prisma.eventoSaude.findUnique({ where: { id: id } });
  if (!evento) {
    throw new Error("ID_INFORMADO_INVALIDO");
  }
  const eventoDesativado = await prisma.eventoSaude.update({
    where: { id: id },
    data: { ativo: false },
  });
  console.log(eventoDesativado);
  return eventoDesativado;
}

export async function buscarEventosSaudePorAnimalService(idAnimal: number) {
  if (!idAnimal) {
    throw new Error("O_ID_DO_ANIMAL_DEVE_SER_INFORMADO");
  }
  const animalSelecionado = await prisma.animal.findUnique({
    where: { id: idAnimal },
  });

  if (!animalSelecionado) {
    throw new Error("ID_INFORMADO_INVALIDO");
  }
  const eventosSaudeAnimal = await prisma.eventoSaude.findMany({
    where: { animal_id: idAnimal, ativo: true },
  });
  return eventosSaudeAnimal;
}

type EventoSaudeData = {
  id: number;
  tipo_evento: TipoEventoSaude;
  descricao_Evento?: string | null;
  data_evento: Date;
  produto_utilizado?: string | null;
  dosagem?: string | null;
  observacoes?: string | null;
  animal_id?: number | null;
  ativo?: boolean | true;
  animal?: never;
};
