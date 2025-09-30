import { Router } from "express";
import {
  atualizar,
  cadastrar,
  deletar,
  fazendasAtivas,
} from "../../controllers/FazendaController";
import { atualizarCadastroFazenda } from "../../services/FazendaService";

const router = Router();

router.get("/fazendas-ativas", fazendasAtivas);
router.post("/cadastrar", cadastrar);
router.put("/atualizar-cadastro", atualizar);
router.put("/deletar-fazenda", deletar);

export default router;
