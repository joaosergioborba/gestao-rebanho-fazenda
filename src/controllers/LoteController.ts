import { Request, Response } from "express";
import {
  atualizarLote,
  buscarLoteService,
  cadastrarLote,
  deletarLote,
  todosLotesAtivos,
} from "../services/LoteService";

export async function cadastrar(req: Request, res: Response) {
  try {
    const { nome, descricao, fazendaId } = req.body;
    if (!nome) {
      res.status(400).json({ erro: "O nome do lote deve ser informado" });
      return;
    }
    if (!fazendaId) {
      res.status(400).json({ erro: "O ID da fazenda deve ser informado" });
      return;
    }

    const data = req.body;

    const novoLote = await cadastrarLote(data);

    res.status(201).json(novoLote);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Houve um erro interno no servidor", message: error });
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const data = req.body;

    if (!data.id) {
      res.status(200).json({ erro: "O id do lote deve ser informado" });
    }

    const loteAtulizado = await atualizarLote(data);
    res.status(200).json(loteAtulizado);
  } catch (error) {
    if (error === "ID_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O id deve ser informado" });
      return;
    }
    if (error === "ID_INFORMADO_INVALIDO") {
      res.status(404).json({ erro: "O id informado é inválido" });
      return;
    }
    res
      .status(500)
      .json({ erro: "Houve um erro interno no servidor", message: error });
  }
}

export async function deletar(req: Request, res: Response) {
  try {
    const data = req.body;

    if (!data.id) {
      res.status(400).json({ erro: "O id deve ser informado" });
    }

    const loteDesativado = await deletarLote(data.id);

    res.status(200).json(loteDesativado);
  } catch (erro) {
    if (erro === "ID_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O id deve ser informado" });
    }
    if (erro === "ID_INFORMADO_INVALIDO") {
      res.status(404).json({ erro: "O id informado é invalido" });
    }
    res
      .status(500)
      .json({ erro: "Houve um erro interno no servidor", message: erro });
  }
}

export async function lotesAtivos(req: Request, res: Response) {
  try {
    const lotes = await todosLotesAtivos();
    res.status(200).json(lotes);
  } catch (erro) {
    res.status(500).json({ erro: "Houve um erro interno no servidor" });
  }
}

export async function buscarLote(req: Request, res: Response) {
  try {
    const idLote = Number(req.params.loteID);
    if (!idLote) {
      res.status(400).json({ erro: "O id do lote deve ser informado" });
    }
    const lote = await buscarLoteService(idLote);
    res.status(200).json(lote);
  } catch (error: any) {
    if (error.message === "ID_LOTE_INFORMADO_INVALIDO") {
      res.status(404).json({ erro: "O id do lote informado é invalido" });
      return;
    }
    if (error.message === "ID_DO_LOTE_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O id do lote deve ser informado" });
      return;
    }
    res.status(500).json({ erro: "Houve um erro interno no servidor" + error });
  }
}
