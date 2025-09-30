import { Router } from "express";
import {
  atualizar,
  buscarLote,
  cadastrar,
  deletar,
  lotesAtivos,
} from "../../controllers/LoteController";

const router = Router();

router.get("/lotes-ativos", lotesAtivos);
router.get("/buscar-lote/:loteID", buscarLote);
router.post("/cadastrar", cadastrar);
router.put("/atualizar-cadastro", atualizar);
router.put("/deletar-lote", deletar);

export default router;
