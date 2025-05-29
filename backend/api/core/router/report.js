import { Router } from "express";
import controllers from "../controller/index.js";
const router = Router();

router.get("/", controllers.report.getAll);
router.get("/:id", controllers.report.getOne);

export default router;