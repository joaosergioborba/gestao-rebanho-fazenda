import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export default function validarToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ erro: "Acesso negado. Token não fornecido" });
  }
  const partes = authorizationHeader?.split(" ");

  if (partes?.length !== 2 || partes[0]?.toLowerCase() !== "bearer") {
    return res
      .status(401)
      .json({ erro: 'Formato de token inválido. Use "Bearer <token>".' });
  }

  const token = partes[1];
  if (!SECRET_KEY) {
    res.status(500).json({ erro: "Ocorreu um erro no servidor!" });
  }

  if (token && SECRET_KEY) {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      req.usuario = payload;
    } catch (error) {
      return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
    next();
  } else {
    return res
      .status(401)
      .json({ erro: "Acesso negado. Token não fornecido." });
  }
}
