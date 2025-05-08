// src/routes/webhookRoutes.ts
import express from "express";

import { sendMessage, getWebhook } from "../controllers/webhookController";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getWebhook);

export default router;
