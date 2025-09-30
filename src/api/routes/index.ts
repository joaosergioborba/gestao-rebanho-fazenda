import { Router } from "express";
//import usuarioRoutes from "./usuario.routes";
import usuarioRoutes from "./rotasUsuarios";
import animaisRouter from "./rotasAnimais";
import lotesRouter from "./rotasLotes";
import eventosRouter from "./rotasEventos";
import fazendasRouter from "./rotasFazendas";
const router = Router();

// agrupar módulos
router.use("/usuario", usuarioRoutes);
router.use("/animal", animaisRouter);
router.use("/lote", lotesRouter);
router.use("/evento", eventosRouter);
router.use("/fazenda", fazendasRouter);

export default router;
