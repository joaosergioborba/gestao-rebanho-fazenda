import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../generated/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function todosUsuariosAtivos() {
  const usuario = await prisma.usuario.findMany({
    where: { usuario_ativo: true },
    select: { id: true, nome: true, email: true, data_criacao: true },
  });
  return usuario;
}

export async function buscarUsuarioPorId(id: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
    select: { id: true, nome: true, email: true, data_criacao: true },
  });
  return usuario;
}

export async function buscarUsuarioPorEmail(email: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
    select: { id: true, nome: true, email: true, data_criacao: true },
  });
  return usuario;
}

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string
) {
  if (!nome || !email || !senha) {
    throw new Error("OS_CAMPOS_NOME_EMAIL_SENHA_DEVEM_SEREM_PREENCHIDOS!");
  }
  const emailJaCadastrado = await prisma.usuario.findUnique({
    where: { email: email },
  });

  if (emailJaCadastrado) {
    throw new Error("EMAIL_JA_CADASTRADO");
  }
  const novoUsuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha,
    },
    select: { id: true, nome: true, email: true, data_criacao: true },
  });

  //delete novoUsuario.senha;

  return novoUsuario;
}

export async function autenticarUsuario(email: string, senha: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    throw new Error("USUARIO_NAO_ENCONTRADO");
  }

  const senhaCorreta = await compare(senha, usuario.senha);
  if (!senhaCorreta) {
    throw new Error("SENHA_INVALIDA");
  }

  const token = sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return {
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
  };
}
