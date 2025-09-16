import { Router } from "express";
//import usuarioRoutes from "./usuario.routes";
import usuarioRoutes from "./rotasUsuarios";
import animaisRouter from "./rotasAnimais";
import fazendasRouter from "./rotasLotes";
import eventosRouter from "./rotasEventos";
const router = Router();

// agrupar módulos
router.use("/usuario", usuarioRoutes);
router.use("/animal", animaisRouter);
router.use("/lote", fazendasRouter);
router.use("/evento", eventosRouter);

export default router;
