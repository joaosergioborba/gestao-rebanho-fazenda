import { Request, Response } from "express";
import { cadastrarLote } from "../services/LoteService";

export async function cadastrar(req: Request, res: Response) {
  const { nome, descricao, ativo } = req.body;
  const data = req.body;

  const novoLote = await cadastrarLote(data);

  res.status(201).json(novoLote);
}
