// src/controllers/webhookController.ts
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { SessionManager } from "../utils/sessionManager";
import { sendTextMessage } from "../utils/sendTextMessage";
import { sendMultiButtonMessage } from "../utils/messageTemplate/sendMultiButtonMessage";
import { sendProductListMessage } from "../utils/messageTemplate/productListMessage";

export const getMessage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body = req.body;
  const query = req.query;

  if (
    body.object === "whatsapp_business_account" &&
    Array.isArray(body.entry)
  ) {
    const entry = body.entry[0];
    const changes = entry.changes?.[0];
    const value = changes?.value;

    // 🚫 Ignore statuses-only updates
    if (!value?.messages || !value?.contacts) {
      res.sendStatus(200);
      return;
    }

    const contact = value.contacts[0];
    const wa_id = contact?.wa_id;
    const name = contact?.profile?.name;

    const message = value.messages[0];
    const messageText = message?.text?.body;
    const messageType = message?.type;

    // console.log("📲 New WhatsApp Message Received!");
    // console.log("From:", name, `(${wa_id})`);
    // console.log("Type:", messageType);
    // console.log("Message:", messageText);
    let client_reply = null;
    if (messageType === "interactive") {
      client_reply =
        body.entry[0].changes[0].value.messages[0].interactive.button_reply.id;
    }

    const sessionActive = SessionManager.isSessionActive(wa_id);

    if (!sessionActive) {
      if (
        messageText?.toLowerCase() === "hi" ||
        messageText?.toLowerCase() === "hello"
      ) {
        SessionManager.startSession(wa_id);
        // sendTextMessage(wa_id, "👋 Welcome! Your session has started.");
        sendMultiButtonMessage(wa_id);

        switch (client_reply) {
          case "Store": {
            sendProductListMessage(wa_id);
          }
        }
      } else {
        sendTextMessage(wa_id, "⚠️ Please type 'hi' to start a session.");
      }
    } else {
      SessionManager.updateSession(wa_id);
      sendTextMessage(wa_id, `🔄 Received: ${messageText}`);
    }
  } else {
    console.log("❌ Unexpected payload format:", JSON.stringify(body, null, 2));
  }

  res.sendStatus(200);
};

export const verifyWebhook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403); // Token doesn't match
    }
  } else {
    res.sendStatus(400); // Missing required params
  }
};
