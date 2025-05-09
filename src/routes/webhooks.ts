// src/routes/webhookRoutes.ts
import express from "express";

import { getMessage, verifyWebhook } from "../controllers/webhookController";

const router = express.Router();

router.post("/", getMessage);
router.get("/", verifyWebhook);

export default router;
