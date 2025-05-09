import axios from "axios";

const WHATSAPP_VERSION = process.env.WHATSAPP_VERSION || "v22.0";
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "704866496024822";
const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;

export function sendMultiButtonMessage(wa_id: string) {
  axios({
    method: "POST",
    url: `https://graph.facebook.com/${WHATSAPP_VERSION}/${PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    data: {
      messaging_product: "whatsapp",
      to: wa_id,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "👋 Welcome! Please choose an option below:"
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "Store",
                title: "Get Products"
              }
            },
            // {
            //   type: "reply",
            //   reply: {
            //     id: "news",
            //     title: "News Headlines"
            //   }
            // },
            {
              type: "reply",
              reply: {
                id: "support",
                title: "Contact Support"
              }
            }
          ]
        }
      }
    }
  });
}
