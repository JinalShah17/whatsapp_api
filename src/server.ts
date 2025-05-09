// src/server.ts
import express from "express";
import dotenv from "dotenv";
import rootRouters from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

import { errorHandler } from "./middlewares/errorHandler.middleware";

// Add this route to handle verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("challenge", challenge);
  console.log("mode", mode);
  console.log("token", token);

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
});

// Keep your POST route for receiving messages
app.post("/webhook", (req, res) => {
  const body = req.body;

  // Ensure the structure is as expected
  if (
    body.object === "whatsapp_business_account" &&
    body.entry &&
    Array.isArray(body.entry)
  ) {
    const entry = body.entry[0];
    const changes = entry.changes?.[0];
    const value = changes?.value;

    const contact = value?.contacts?.[0];
    const wa_id = contact?.wa_id;
    const name = contact?.profile?.name;

    const message = value?.messages?.[0];
    const messageText = message?.text?.body;
    const messageType = message?.type;

    console.log("📲 New WhatsApp Message Received!");
    console.log("From:", name, `(${wa_id})`);
    console.log("Type:", messageType);
    console.log("Message:", messageText);
  } else {
    console.log("❌ Unexpected payload format:", JSON.stringify(body, null, 2));
  }

  // Always respond with 200
  res.sendStatus(200);
});

app.use("/", rootRouters);

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
