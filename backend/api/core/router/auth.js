import { Router } from "express";
import controllers from "../controller/index.js";
const router = Router();

router.post("/login", controllers.auth.login);

export default router;