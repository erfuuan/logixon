import { Router } from "express";
import controllers from "../controller/index.js";
const router = Router();

router.get("/", controllers.rule.getAll);
router.get("/:id", controllers.rule.getOne);
router.post("/", controllers.rule.create);
router.put("/:id", controllers.rule.update);
router.delete("/:id", controllers.rule.delete);

export default router;