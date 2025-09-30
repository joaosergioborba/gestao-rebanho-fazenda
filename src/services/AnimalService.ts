import { withAccelerate } from "@prisma/extension-accelerate";
import {
  PrismaClient,
  Sexo,
  StatusVida,
  TipoParicao,
} from "../../generated/prisma";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function TodosAnimaisAtivos() {
  const animais = await prisma.animal.findMany({
    where: { ativo: true },
  });

  return animais;
}

export async function buscarAnimalPorId(id: number) {
  if (!id) {
    throw new Error("O_ID_DEVE_SER_INFORMADO");
  }
  const animal = await prisma.animal.findUnique({
    where: { ativo: true, id },
  });

  return animal;
}

export async function buscarAnimalPorBrincoId(brinco_id: number) {
  if (!brinco_id) {
    throw new Error("O_ID_BRINCO_DEVE_SER_INFORMADO");
  }
  const animal = await prisma.animal.findUnique({
    where: { ativo: true, brinco_id },
  });

  return animal;
}

export type CreateAnimalData = {
  id?: number | null;
  nome: string;
  brinco_id?: number | null;
  data_nascimento: Date;
  raca: string;
  sexo: Sexo;
  paricao: TipoParicao | null;
  escore: number | null;
  pelagem: String | null;
  url_foto?: string | null;
  pertence_a_fazenda?: boolean | null;
  status?: StatusVida | null;
  lote_id?: number | null;
  mae_id?: number | null;
  pai_id?: number | null;
  fazendaId?: number | null;
  eventos_reprodutivos?: never;
  eventos_saude?: never;
  evento_parto_id: number | null;
};

export async function cadastrarAnimal(data: CreateAnimalData) {
  if (
    !data.nome ||
    !data.data_nascimento ||
    !data.raca ||
    !data.sexo ||
    !data.status
  ) {
    return {
      error:
        "Os campos obrigatorio ()nome, data_nascimento, raca, sexo e status precisam serem preenchidos",
    };
  }

  if (
    data.lote_id &&
    !(await prisma.lote.findUnique({ where: { id: data.lote_id } }))
  ) {
    throw new Error("O_LOTE_INFORMADO_NAO_EXISTE");
  }

  if (
    data.fazendaId &&
    !(await prisma.fazenda.findUnique({
      where: { id: data.fazendaId },
    }))
  ) {
    console.log("hummmmmmm");
    throw new Error("A_FAZENDA_INFORMADA_NAO_EXISTE");
  }

  let brincoIdJaCadastrado;
  if (data.brinco_id) {
    brincoIdJaCadastrado = await prisma.animal.findUnique({
      where: { brinco_id: data.brinco_id },
    });
  }

  if (brincoIdJaCadastrado) {
    throw new Error("BRINCO_JA_CADASTRADO");
  }

  if (
    data.mae_id &&
    (!(await prisma.animal.findUnique({ where: { id: data.mae_id } })) ||
      (
        await prisma.animal.findUnique({
          where: { id: data.mae_id },
          select: { sexo: true },
        })
      )?.sexo === "MACHO")
  ) {
    throw new Error("O_ID_MAE_INFORMADO_NAO_EXISTE_OU_E_O_ID_DE_UM_MACHO");
  }

  if (
    data.pai_id &&
    (!(await prisma.animal.findUnique({ where: { id: data.pai_id } })) ||
      (
        await prisma.animal.findUnique({
          where: { id: data.pai_id },
          select: { sexo: true },
        })
      )?.sexo === "FEMEA")
  ) {
    throw new Error("O_ID_PAI_INFORMADO_NAO_EXISTE_OU_E_O_ID_DE_UMA_FEMEA");
  }

  const dataNascimento = data.data_nascimento;
  data.data_nascimento = new Date(dataNascimento);
  const novoAnimal = await prisma.animal.create({ data: data });
  return novoAnimal;
}

export async function atualizarCadastroAnimal(data: CreateAnimalData) {
  console.log(data);
  if (
    data.brinco_id &&
    data.id &&
    (
      await prisma.animal.findUnique({
        where: { id: data.id },
        select: { brinco_id: true },
      })
    )?.brinco_id !== data.brinco_id
  ) {
    throw new Error(
      "CASO_INFORME_ID_E_BRINCO_ID_ESTES_DEVEM_SER_DO_MESMO_ANIMAL"
    );
  }

  if (!data.brinco_id && !data.id) {
    throw new Error(
      "PARA_ATUALIZAR_OS_DADOS_DO_ANIMAL_O_ID_OU_O_BRINCO_ID_DEVE_SER_INFORMADO"
    );
  }

  if (
    data.id &&
    (
      await prisma.animal.findUnique({
        where: { id: data.id },
        select: { id: true },
      })
    )?.id === data.id
  ) {
    const animalAtualizado = await prisma.animal.update({
      where: { id: data.id },
      data: data,
    });
    return animalAtualizado;
  } else if (
    data.brinco_id &&
    (
      await prisma.animal.findUnique({
        where: { brinco_id: data.brinco_id },
        select: { brinco_id: true },
      })
    )?.brinco_id === data.brinco_id
  ) {
    const animalAtualizado = await prisma.animal.update({
      where: { brinco_id: data.brinco_id },
      data: data,
    });
    return animalAtualizado;
  } else {
    throw new Error("INFORME_UM_ID_OU_BRINCO_ID_VALIDO");
  }
}

export async function deletarAnimalPorId(id: number) {
  const animalSelecionado = await prisma.animal.findUnique({ where: { id } });

  if (!animalSelecionado) {
    throw new Error("CODIGO_ANIMAL_INVALIDO");
  }
  const animalDesativado = await prisma.animal.update({
    where: { id: id },
    data: { ativo: false },
  });

  return animalDesativado;
}

export async function deletarAnimalPorBrincoId(brinco_id: number) {
  const animalSelecionado = await prisma.animal.findUnique({
    where: { brinco_id },
  });

  if (!animalSelecionado) {
    throw new Error("CODIGO_ANIMAL_INVALIDO");
  }
  const animalDesativado = await prisma.animal.update({
    where: { id: brinco_id },
    data: { ativo: false },
  });

  return animalDesativado;
}

export async function listarFilhos(paisId: number) {
  if (!paisId) {
    throw new Error("MAE_ID_OU_PAI_ID_DEVE_SER_INFORMADO");
  }
  const pais = await prisma.animal.findUnique({ where: { id: paisId } });
  if (!pais) {
    throw new Error("ID_INFORMADO_INVALIDO");
  }
  const sexoPais = pais?.sexo;
  if (sexoPais === "MACHO") {
    const filhos = await prisma.animal.findMany({ where: { pai_id: paisId } });
    return filhos;
  } else if (sexoPais === "FEMEA") {
    const filhos = await prisma.animal.findMany({ where: { mae_id: paisId } });
    return filhos;
  } else {
    throw new Error("Erro no servidor");
  }
}
