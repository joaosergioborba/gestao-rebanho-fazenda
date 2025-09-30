import { Router } from "express";
import {
  atualizarEventoReprodutivoController,
  cadastrarEventoReprodutivoController,
  cadastrarPartoController,
  deletarEventoReprodutivoPorBrincoIdController,
  deletarEventoReprodutivoPorIdController,
  listarEventoReprodutivoPorBrincoController,
  listarEventoReprodutivoPorIdController,
} from "../../controllers/EventoReprodutivoController";
import {
  AlterarEventoSaudeController,
  buscarEventosSaudePorAnimalControler,
  cadastrarEventoSaudeController,
  DeletarEventoSaudeController,
} from "../../controllers/EventoSaudeController";

const router = Router();

router.get(
  "/animais/id/:animalID/evento-reprodutivo",
  listarEventoReprodutivoPorIdController
);
router.get(
  "/animais/brinco-id/:animalID/evento-reprodutivo",
  listarEventoReprodutivoPorBrincoController
);

router.post(
  "/animais/:animalID/cadastrar-evento-reprodutivo",
  cadastrarEventoReprodutivoController
);
router.post(
  "/animais/:animalID/cadastrar-parto-evento-reprodutivo",
  cadastrarPartoController
);
router.put(
  "animais/:animalID/atualizar-evento-reprodutivo",
  atualizarEventoReprodutivoController
);
router.put(
  "animais/id/:animalID/deletar-evento-reprodutivo",
  deletarEventoReprodutivoPorIdController
);
router.put(
  "animais/brinco-id/:animalID/deletar-evento-reprodutivo",
  deletarEventoReprodutivoPorBrincoIdController
);

router.get(
  "/animais/:animalID/evento-saude",
  buscarEventosSaudePorAnimalControler
);
router.post(
  "/animais/:animalID/cadastrar-evento-saude",
  cadastrarEventoSaudeController
);
router.put("/atualizar-evento-saude/:eventoID", AlterarEventoSaudeController);
router.put("/deletar-evento-saude/:eventoID", DeletarEventoSaudeController);
export default router;
