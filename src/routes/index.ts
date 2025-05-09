// src/routes/index.ts
import express from "express";
import webhookRoutes from "./webhooks";

const router = express.Router();

router.use("/test", webhookRoutes);

export default router;
