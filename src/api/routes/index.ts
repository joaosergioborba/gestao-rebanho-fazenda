import { Router } from "express";
import validarToken from "../middleware/autenticarToken";
//import usuarioRoutes from "./usuario.routes";
import usuarioRoutes from "./rotasUsuarios";
import animaisRouter from "./rotasAnimais";
import lotesRouter from "./rotasLotes";
import eventosRouter from "./rotasEventos";
import fazendasRouter from "./rotasFazendas";
const router = Router();

// agrupar módulos
router.use("/usuario", usuarioRoutes);
router.use("/animal", validarToken, animaisRouter);
router.use("/lote", validarToken, lotesRouter);
router.use("/evento", validarToken, eventosRouter);
router.use("/fazenda", validarToken, fazendasRouter);

export default router;
