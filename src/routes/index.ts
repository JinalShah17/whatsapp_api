import express, { Express, Request, Response } from "express";

import webhookRouters from "./webhooks";

const router = express.Router();

router.use("/webhook", webhookRouters);

export default router;
