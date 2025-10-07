import { Router } from "express";
import {
  cadastrar,
  usuariosAtivos,
  autenticarLogin,
  pesquisarPorId,
  pesquisarPorEmail,
} from "../../controllers/UsuarioController";
import validarToken from "../middleware/autenticarToken";
const router = Router();

router.post("/cadastro", cadastrar);
router.post("/login", autenticarLogin);
router.get("/usuarios-ativos", validarToken, usuariosAtivos);
router.get("/selecionar-por-email/:email", validarToken, pesquisarPorEmail);
router.get("/selecionar-por-id/:id", validarToken, pesquisarPorId);

export default router;
