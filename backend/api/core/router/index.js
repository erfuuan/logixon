import { Router } from 'express';
const router = Router();

import authRouter from './auth.js'
import ruleRouter from './rule.js'
import reportRouter from "./report.js"


router.use('/auth', authRouter)
router.use('/rule', ruleRouter)
router.use('/report', reportRouter)

export default router;