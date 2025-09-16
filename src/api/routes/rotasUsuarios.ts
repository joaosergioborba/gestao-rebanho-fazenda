import { Router } from "express";
import {
  cadastrar,
  usuariosAtivos,
  autenticarLogin,
  pesquisarPorId,
  pesquisarPorEmail,
} from "../../controllers/UsuarioController";

const router = Router();

router.post("/cadastro", cadastrar);
router.post("/login", autenticarLogin);
router.get("/usuarios-ativos", usuariosAtivos);
router.get("/selecionar-por-email/:email", pesquisarPorEmail);
router.get("/selecionar-por-id/:id", pesquisarPorId);

export default router;
