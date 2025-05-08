// src/routes/index.ts
import express from "express";
import webhookRoutes from "./webhooks";

const router = express.Router();

router.use("/webhook", webhookRoutes);

export default router;
