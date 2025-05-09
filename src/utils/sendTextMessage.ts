import axios from "axios";
import dotenv from "dotenv";

// dotenv config
dotenv.config();

const WHATSAPP_VERSION = process.env.WHATSAPP_VERSION || "v22.0";
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "704866496024822";
const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;

export async function sendTextMessage(to: string, text: string) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/${WHATSAPP_VERSION}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: text
        }
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(`[Send to ${to}]: ${text}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to send message:",
      error.response?.data || error.message
    );
  }
}
