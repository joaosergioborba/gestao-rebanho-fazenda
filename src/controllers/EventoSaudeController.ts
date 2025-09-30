import { Request, Response } from "express";
import {
  AlterarEventoSaudeService,
  buscarEventosSaudePorAnimalService,
  cadastrarEventoSaudeService,
  DeletarEventoSaudeService,
} from "../services/EventoSaudeService";

export async function cadastrarEventoSaudeController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.animalID);
    const data = req.body;

    if (!id) {
      res.status(400).json({ erro: "o ID deve ser informadod" });
      return;
    }
    if (!data.tipo_evento) {
      res.status(400).json({ erro: "O tipo do evento deve ser informado" });
      return;
    }
    if (
      data.tipo_evento != "VACINA" &&
      data.tipo_evento != "VERMIFUGO" &&
      data.tipo_evento != "TRATAMENTO" &&
      data.tipo_evento != "EXAME" &&
      data.tipo_evento != "CIRURGIA" &&
      data.tipo_evento != "OUTRO"
    ) {
      res.status(400).json({
        erro: "O tipo de evento informado é invalido. (VACINA, VERMIFUGO, TRATAMENTO, EXAME, CIRURGIA, OUTRO)",
      });
      return;
    }

    if (!data.data_evento) {
      res.status(400).json({ erro: "A data do evento deve ser informada" });
      return;
    }

    const eventoCadastrado = await cadastrarEventoSaudeService(id, data);
    res.status(201).json(eventoCadastrado);
  } catch (error: any) {
    if (error.message === "ID_OBRIGATORIO") {
      res.status(400).json({ erro: "o ID deve ser informadod" });
      return;
    }
    if (error.message === "TODOS_OS_CAMPOS_OBROGATORIO_DEVEM_SER-PREENCHIDOS") {
      res
        .status(400)
        .json({ erro: "Todos os campos obrigatorios devem ser preenchidos" });
      return;
    }
    if (error.message === "O_ID_INFORMADO_NAO_EXISTE") {
      res.status(404).json({ erro: "o ID informado não existe" });
      return;
    }
    res.status(500).json("Houve um erro no servidor" + error.message);
  }
}
export async function AlterarEventoSaudeController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.eventoID);
    const data = req.body;

    if (!id) {
      res.status(400).json({ erro: "O id do evento deve ser informado" });
    }
    const eventoAlterado = await AlterarEventoSaudeService(id, data);
    res.status(200).json(eventoAlterado);
  } catch (error: any) {
    if (error.message === "O_ID_INFORMADO_E_INVALIDO") {
      res.status(400).json({ erro: "O id do evento informado é inválido" });
      return;
    }
    if (error.message === "TIPO_EVENTO_INFORMADO_INVALIDO") {
      res.status(400).json({ erro: "O tipo de evento é invalido" });
      return;
    }
    if (error.message === "ANIMAL_ID_INFORMADO_INVALIDO") {
      res.status(404).json({ erro: "O id do animal informado é inválido" });
      return;
    }
    res
      .status(500)
      .json({ erro: "Houve um erro interno no servidor", message: error });
  }
}
export async function DeletarEventoSaudeController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.animalID);
    if (!id) {
      res.status(400).json({ erro: "O ID deve ser informado" });
    }
    const eventoDeletado = await DeletarEventoSaudeService(id);
    res.status(200).json(eventoDeletado);
  } catch (error: any) {
    if (error.message === "O_ID_ANIMAL_E_OBRIGATORIO") {
      res.status(400).json({ erro: "O ID deve ser informado" });
      return;
    }
    if (error.message === "ID_INFORMADO_INVALIDO") {
      res.status(400).json({ erro: "O id informado é invalido" });
      return;
    }
    res.status(500).json("Houve um erro no servidor" + error.message);
  }
}

export async function buscarEventosSaudePorAnimalControler(
  req: Request,
  res: Response
) {
  try {
    const idAnimal = Number(req.params.eventoID);

    if (!idAnimal) {
      res.status(400).json({ erro: "O id do animal deve ser informado" });
    }

    const lista = await buscarEventosSaudePorAnimalService(idAnimal);

    res.status(200).json(lista);
  } catch (error: any) {
    if (error.message === "O_ID_DO_ANIMAL_DEVE_SER_INFORMADO") {
      res.status(400).json("O id do animal deve ser informado");
      return;
    }
    if (error.message === "ID_INFORMADO_INVALIDO") {
      res.status(404).json("O id do animal informado é invalido");
      return;
    }
    res.status(500).json("Houve um erro no servidor" + error.message);
  }
}
