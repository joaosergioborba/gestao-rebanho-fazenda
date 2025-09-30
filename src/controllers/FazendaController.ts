import { Request, Response } from "express";
import {
  atualizarCadastroFazenda,
  cadastrarFazenda,
  deletarFazenda,
  todasFazendasAtivas,
} from "../services/FazendaService";

export async function cadastrar(req: Request, res: Response) {
  try {
    const { nome, usuarioId } = req.body;

    if (!nome) {
      res.status(400).json({ erro: "Nome da fazenda é obrigatorio!" });
      return;
    }
    if (!usuarioId) {
      res.status(400).json({ erro: "Id do proprietário é obrigatorio!" });
      return;
    }

    const fazendaCadastrada = await cadastrarFazenda(req.body);
    if (fazendaCadastrada) {
      res.status(201).json(fazendaCadastrada);
      return;
    }
    if (!fazendaCadastrada) {
      res.status(500).json({ erro: "Erro interno no servidor" });
      return;
    }
  } catch (error) {
    if (error === "NOME_FAZENDA_E_PROPRIETARIO_SAO_OBRIGATORIOS") {
      res.status(400).json(error);
      return;
    }
    res.status(500).json({ erro: "Erro interno no servidor" });
    return;
  }
}

export async function deletar(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ erro: "O id da fazendo deve ser informado" });
    }

    const fazendaDesativada = await deletarFazenda(id);
    res.status(200).json(fazendaDesativada);
  } catch (error) {
    if (error === "ID_FAZENDA_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O id da fazendo deve ser informado" });
      return;
    }
    if (error === "ID_INFORMADO_INVALIDO") {
      res.status(404).json({ erro: "O id informado é invalido" });
      return;
    }
    res.status(500).json({ erro: "Erro interno no servidor" });
    return;
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const data = req.body;
    console.log(data.id);
    if (!data.id) {
      res.status(400).json({ erro: "Id da fazenda é obrigatório" });
      return;
    }
    const fazendaAtualizada = await atualizarCadastroFazenda(data);
    res.status(200).json(fazendaAtualizada);
  } catch (error) {
    if (error === "ID_FAZENDA_DEVE_SER_INFORMADO") {
      res.status(400).json({ erro: "O id da fazenda deve ser informado" });
    }
    if (error === "ID_INFORMADO_INVALIDO") {
      res.status(404).json({ erro: "O id informado não está cadastrado" });
      return;
    }
    res.status(500).json("Houve um erro interno no servidor" + error);
    return;
  }
}

export async function fazendasAtivas(req: Request, res: Response) {
  try {
    const fazendas = await todasFazendasAtivas();
    res.status(200).json(fazendas);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Houve um erro interno no servidor", message: error });
  }
}
