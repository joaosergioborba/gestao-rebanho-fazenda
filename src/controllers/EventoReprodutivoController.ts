import { Request, Response } from "express";
import {
  cadastrarEventoReprodutivoService,
  cadastrarPartoService,
  listarEventoReprodutivoPorBrincoService,
  listarEventoReprodutivoPorIdService,
} from "../services/EventoReprodutivoService";
import { EventoReprodutivo } from "../../generated/prisma";

export async function listarEventoReprodutivoPorIdController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.animalID);
    if (!id) {
      res.status(400).json({ erro: "O id deve ser informado" });
      return;
    }
    const eventos = await listarEventoReprodutivoPorIdService(id);
    res.status(200).json(eventos);
  } catch (error) {
    if (error === "ID_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O id deve ser informado" });
      return;
    }
    if (error === "NAO_FOI_ENCONTRADO_NENHUM_ANIMAL_COM_O_ID_INFORMADO") {
      res
        .status(404)
        .json({ erro: "Não foi encontrado nenhum animal com esse id" });
      return;
    }

    res.status(500).json({ erro: "Houve um erro interno no servidor" });
  }
}
export async function listarEventoReprodutivoPorBrincoController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.animalID);
    if (!id) {
      res.status(400).json({ erro: "O id deve ser informado" });
      return;
    }
    const eventos = await listarEventoReprodutivoPorBrincoService(id);
    res.status(200).json(eventos);
  } catch (error) {
    if (error === "BRINCO_ID_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O brinco id deve ser informado" });
      return;
    }
    if (
      error === "NAO_FOI_ENCONTRADO_NENHUM_ANIMAL_COM_O_BRINCO_ID_INFORMADO"
    ) {
      res
        .status(404)
        .json({ erro: "Não foi encontrado nenhum animal com esse brinco id" });
      return;
    }

    res.status(500).json({ erro: "Houve um erro interno no servidor" });
  }
}

export async function cadastrarEventoReprodutivoController(
  req: Request,
  res: Response
) {
  try {
    const animalId = Number(req.params.animalID);
    const data: EventoReprodutivo = req.body;

    if (!animalId) {
      res.status(400).json({
        erro: "O id do animal relacionado a esse evento deve ser informado",
      });
      return;
    }

    if (!data.tipo_evento) {
      res.status(400).json({
        erro: "O tipo de evento (cio, cobertura, inseminacao, diagnostico_gestao, parto, aborto ou outro) deve ser informado",
      });
      return;
    }
    if (!data.data_evento) {
      res.status(400).json({ erro: "A data do evento deve ser informada" });
      return;
    }

    if (data.tipo_evento === "PARTO") {
      res.status(400).json({
        erro: "Para cadastrar um parto use a rota /animais/:animalID/cadastrar-parto-evento-reprodutivo",
      });
      return;
    }

    const eventoCadastrado = await cadastrarEventoReprodutivoService(
      animalId,
      data
    );
    res.status(201).json(eventoCadastrado);
  } catch (error: any) {
    if (error.message === "O_ID_DEVE_SER_INFORMADO") {
      res.status(400).json({
        erro: "O id do animal que deseja cadastrar evento deve ser informado",
      });
      return;
    }
    if (error.message === "ID_INFORMADO_NAO_EXISTE") {
      res.status(404).json({
        erro: "O id do animal informado não existe",
      });
      return;
    }
    if (error.message === "O_TIPO_DO_EVENTO_DEVE_SER_INFORMADO") {
      res.status(400).json({
        erro: "O tipo do envento deve ser informado",
      });
      return;
    }
    if (error.message === "TIPO_EVENTO_INFORMADO_INVALIDO") {
      res.status(400).json({
        erro: "O tipo do envento informado não existe. informe (CIO, COBERTURA, INSEMINACAO, DIAGNOSTICO_GESTAO, PARTO, ABORTO, OUTRO)",
      });
      return;
    }

    if (error.message === "A_DATA_DO_EVENTO_DEVE_SER_INFORMADA") {
      res.status(400).json({
        erro: "A data do evento deve ser informada!",
      });
      return;
    }
    res
      .status(500)
      .json({ erro: "Houve um erro interno no servidor", message: error });
  }
}
export async function cadastrarPartoController(req: Request, res: Response) {
  try {
    const id = Number(req.params.animalID);
    const data = req.body;

    if (!id) {
      res.status(400).json({ erro: "O id da mae deve ser informado" });
      return;
    }
    if (!data.dados_bezerro) {
      res.status(400).json({ erro: "Os dados do bezerro deve ser informados" });
      return;
    }
    if (!data.dados_bezerro.nome) {
      res.status(400).json({ erro: "O nome do bezerro deve ser informado" });
      return;
    }
    if (!data.dados_bezerro.data_nascimento) {
      res
        .status(400)
        .json({ erro: "A data de nascimento do bezerro deve ser informada" });
      return;
    }
    if (!data.dados_bezerro.raca) {
      res.status(400).json({ erro: "A raça do bezerro deve ser informada" });
      return;
    }
    if (!data.dados_bezerro.sexo) {
      res.status(400).json({ erro: "O sexo do bezerro deve ser informado" });
      return;
    }
    if (!data.dados_bezerro.status) {
      res.status(400).json({ erro: "O status do bezerro deve ser informado" });
      return;
    }

    if (!data.dados_parto) {
      res.status(400).json({ erro: "Os dados do parto devem ser infromados" });
      return;
    }

    const partoCadastrado = await cadastrarPartoService(id, data);
    res.status(201).json(partoCadastrado);
  } catch (error: any) {
    if (error.message === "O_ID_DO_ANIMAL_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O id do animal deve ser informado" });
    }
    if (error.message === "O_ID_INFORMADO_INVALIDO") {
      res.status(404).json({ erro: "O id do animal é invalido" });
    }
    if (error.message === "TODOS_OS_CAMPOS_OBRIGATORIOS_DEVEM_SER_INFORMADOS") {
      res
        .status(400)
        .json({ erro: "Todos os campso obrigatorio deve ser informado" });
      return;
    }
    if (error.message === "O_BRINCO_INFORMADO_JA_ESTA_CADASTRADO") {
      res.status(400).json({ erro: "O brinco informado já esta cadastrado" });
      return;
    }
    if (error.message === "OS_DADOS_DO_PARTO_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "Os dados do parto deve ser informado" });
      return;
    }
    if (error.message === "A_DATA_EVENTO_DEVE_SER_INFORMADA") {
      res.status(400).json({ erro: "A data do evento deve ser informada" });
      return;
    }
    res
      .status(500)
      .json({ erro: "Houve um erro interno no servidor", message: error });
  }
}
export async function atualizarEventoReprodutivoController(
  req: Request,
  res: Response
) {
  try {
  } catch (error) {}
}

export async function buscarEventosReprodutivoPorAnimalController(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.animalID;
  } catch (error) {}
}

export async function deletarEventoReprodutivoPorIdController(
  req: Request,
  res: Response
) {
  try {
  } catch (error) {}
}
export async function deletarEventoReprodutivoPorBrincoIdController(
  req: Request,
  res: Response
) {
  try {
  } catch (error) {}
}
