import { Request, Response } from "express";

import { hash } from "bcryptjs";
import {
  autenticarUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  cadastrarUsuario,
  todosUsuariosAtivos,
} from "../services/UsuarioService";

export async function cadastrar(req: Request, res: Response) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      res.status(400).json({ erro: "Preencha todos os campos" });
    }

    const senhaCriptografada = await hash(senha, 10);
    const novoUsuario = await cadastrarUsuario(nome, email, senhaCriptografada);

    console.log(novoUsuario);
    res.status(201).json(novoUsuario);
  } catch (error: any) {
    if (error.message === "EMAIL_JA_CADASTRADO") {
      console.error("Esse email já foi cadastrado");
      res.status(409).json({ Erro: "Email já está cadastrado" });
    }
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

export async function autenticarLogin(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      res
        .status(400)
        .json({ error: "Os campos email e senha devem ser informados" });
    }
    const login = await autenticarUsuario(email, senha);
    res.status(200).json(login);
  } catch (error: any) {
    console.error("Erro ao efeituar login:", error);
    if (error.message === "USUARIO_NAO_ENCONTRADO") {
      res
        .status(404)
        .json({ error: "O usuário informado não está cadastrado" });
    }
    if (error.message === "SENHA_INVALIDA") {
      res.status(401).json({ error: "A senha informada é invalida" });
    }
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

export async function pesquisarPorEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const usuario = await buscarUsuarioPorEmail(String(email));
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    console.log("Erro ao consultar por email");
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function pesquisarPorId(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: "Parâmetro ID é obrigatório" });
    }
    console.log(id);
    const usuario = await buscarUsuarioPorId(id);
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: "Houve um erro ao buscar por id" });
  }
}

export async function usuariosAtivos(req: Request, res: Response) {
  try {
    const usuario = await todosUsuariosAtivos();
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Houve um erro ao consultar todos os usuários" });
  }
}
