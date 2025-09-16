import { Request, Response } from "express";
import {
  atualizarCadastroAnimal,
  buscarAnimalPorBrincoId,
  cadastrarAnimal,
  deletarAnimalPorId,
  TodosAnimaisAtivos,
} from "../services/AnimalService";
import { Sexo, StatusVida } from "../../generated/prisma";

export async function animaisAtivos(req: Request, res: Response) {
  try {
    const animais = await TodosAnimaisAtivos();
    if (!animais) {
      res.status(404).json({ error: "Nenhum animal encontrado" });
    }
    res.status(200).json(animais);
  } catch (error: any) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function pesquisarPorId(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Informe o id" });
    }

    try {
      const idNumber = Number(id);
    } catch {
      res.status(404).json({ error: "o id deve ser um número" });
      throw new Error("MUST_BE_A_NUMBER");
    }

    const animal = await buscarAnimalPorBrincoId(Number(id));
    if (!animal) {
      res.status(404).json({ error: "Animal não encontrado" });
    }
    res.status(200).json(animal);
  } catch (error: any) {
    if (error === "O_ID_DEVE_SER_INFORMADO") {
      res.status(404).json({ error: "Informe o id" });
    }
    if (error === "MUST_BE_A_NUMBER") {
      res.status(400).json({ error: "O id deve ser um numero" });
    }

    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function pesquisarPorBrincoId(req: Request, res: Response) {
  try {
    const { brincoId } = req.params;

    if (!brincoId) {
      res.status(404).json({ error: "Informe o número do brinco" });
    }

    try {
      const idNumber = Number(brincoId);
    } catch {
      res.status(404).json({ error: "o id do brinco deve ser um número" });
      throw new Error("MUST_BE_A_NUMBER");
    }

    const animal = await buscarAnimalPorBrincoId(Number(brincoId));
    if (!animal) {
      res.status(404).json({ error: "Animal não encontrado" });
    }
    res.status(200).json(animal);
  } catch (error: any) {
    if (error === "O_ID_BRINCO_DEVE_SER_INFORMADO") {
      res.status(404).json({ error: "Informe o id do brinco" });
    }
    if (error === "MUST_BE_A_NUMBER") {
      res.status(404).json({ error: "O id do brinco deve ser um numero" });
    }

    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function cadastrar(req: Request, res: Response) {
  try {
    const animal = req.body;

    const novoAnimal = await cadastrarAnimal(animal);

    res.status(201).json(novoAnimal);

    console.log(animal);
  } catch (error: any) {
    if (error.message === "O_LOTE_INFORMADO_NAO_EXISTE") {
      res.status(400).json({ error: "O lote informado não é cadastrado" });
    }
    if (error.message === "A_FAZENDA_INFORMADA_NAO_EXISTE") {
      res.status(400).json({ error: "A fazenda informada não é cadastrada" });
    }
    if (error.message === "BRINCO_JA_CADASTRADO") {
      res.status(400).json({
        error: "Esse brinco já foi cadastrado, por favor, use um diferente!",
      });
    }

    if (
      error.message === "O_ID_MAE_INFORMADO_NAO_EXISTE_OU_E_O_ID_DE_UM_MACHO"
    ) {
      res.status(400).json({
        error:
          "O id informado para a mâe não existe ou é um codigo de um animal macho",
      });
    }

    if (
      error.message === "O_ID_PAI_INFORMADO_NAO_EXISTE_OU_E_O_ID_DE_UMA_FEMEA"
    ) {
      res.status(400).json({
        error:
          "O id informado para o pai não existe ou é um codigo de uma animal fêmea",
      });
    }

    if (error.message === "MAE_OU_PAI_DEVE_CONTER_ID_DIFERENTE_DO_FILHO") {
      res.status(400).json({
        error: "O código do filho não pode ser o mesmo codigo do pai ou da mãe",
      });
    }

    res
      .status(500)
      .json({ error: "Erro interno no servidor", codigo: error.message });
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const dadosParaAtualizar = req.body;
    const dadosAtulizados = await atualizarCadastroAnimal(dadosParaAtualizar);

    res.status(201).json(dadosAtulizados);
  } catch (error: any) {
    if (
      error.message ===
      "CASO_INFORME_ID_E_BRINCO_ID_ESTES_DEVEM_SER_DO_MESMO_ANIMAL"
    ) {
      res.status(400).json({
        error:
          "Caso opte por informar o id e o brinco id, esses devem ser referentes ao mesmo animal.",
      });
    }
    if (
      error.message ===
      "PARA_ATUALIZAR_OS_DADOS_DO_ANIMAL_O_ID_OU_O_BRINCO_ID_DEVE_SER_INFORMADO"
    ) {
      res.status(400).json({ error: "Informe o id ou o brinco id" });
    }
    if (error.message === "INFORME_UM_ID_OU_BRINCO_ID_VALIDO") {
      res.status(404).json({
        error: "Nenhum animal com esse id ou com esse brinco id foi encontrado",
      });
    }
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function deleteCadastroAnimalPorId(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Informe um id" });
    }

    const animalDesativado = await deletarAnimalPorId(id);

    res.status(201).json(animalDesativado);
  } catch (error: any) {
    if (error.message === "CODIGO_ANIMAL_INVALIDO") {
      res.status(404).json({ error: "O brinco id informado é inválido" });
    }
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
export async function deleteCadastroAnimalPorBricoId(
  req: Request,
  res: Response
) {
  try {
    const { brinco_id } = req.body;
    if (!brinco_id) {
      res.status(400).json({ error: "Informe um id" });
    }
    const animalDesativado = await deletarAnimalPorId(brinco_id);

    res.status(201).json(animalDesativado);
  } catch (error: any) {
    if (error.message === "CODIGO_ANIMAL_INVALIDO") {
      res.status(404).json({ error: "O brinco id informado é inválido" });
    }
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
