import { Router } from "express";
import {
  animaisAtivos,
  cadastrar,
  pesquisarPorBrincoId,
  pesquisarPorId,
  atualizar,
  deleteCadastroAnimalPorBricoId,
  deleteCadastroAnimalPorId,
  listarFilhosController,
} from "../../controllers/AnimalController";
import validarToken from "../middleware/autenticarToken";

const router = Router();

router.get("/animais-ativos", animaisAtivos);
router.get("/selecionar-por-id/:id", pesquisarPorId);
router.get("/selecionar-por-brinco-id/:brincoId", pesquisarPorBrincoId);
router.get("/listar-filhos/:paisID", listarFilhosController);
router.post("/cadastrar", cadastrar);
4;
router.put("/atualizar-cadastro", atualizar);
router.put("/deletar-cadastro-id", deleteCadastroAnimalPorId);
router.put("/deletar-cadastro-brinco-id", deleteCadastroAnimalPorBricoId);

export default router;
