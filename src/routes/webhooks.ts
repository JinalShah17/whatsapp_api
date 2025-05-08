import express from "express";
import { getWebhook } from "../controllers/webhookController";

const router = express.Router();
router.get("/", getWebhook); // GET /webhook
export default router;
