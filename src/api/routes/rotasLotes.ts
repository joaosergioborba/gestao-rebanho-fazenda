import { Router } from "express";
import { cadastrar } from "../../controllers/LoteController";

const router = Router();

router.post("/cadastrar", cadastrar);

export default router;
