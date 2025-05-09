// src/controllers/webhookController.ts
import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { to, message } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/704866496024822/messages`,
      {
        messaging_product: "whatsapp",
        to: "918238852545",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US"
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return res.status(500).send("Failed to send message");
  }
};

export const getWebhook = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
};
