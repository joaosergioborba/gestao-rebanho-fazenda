import { Router } from "express";
import {
  animaisAtivos,
  cadastrar,
  pesquisarPorBrincoId,
  pesquisarPorId,
  atualizar,
  deleteCadastroAnimalPorBricoId,
  deleteCadastroAnimalPorId,
} from "../../controllers/AnimalController";

const router = Router();

router.get("/animais-ativos", animaisAtivos);
router.get("/selecionar-por-id/:id", pesquisarPorId);
router.get("/selecionar-por-brinco-id/:brincoId", pesquisarPorBrincoId);
router.post("/cadastrar", cadastrar);
router.put("/atualizar-cadastro", atualizar);
router.put("/deletar-cadastro-id", deleteCadastroAnimalPorId);
router.put("/deletar-cadastro-brinco-id", deleteCadastroAnimalPorBricoId);

export default router;
