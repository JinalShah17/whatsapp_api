import axios from "axios";

const WHATSAPP_VERSION = process.env.WHATSAPP_VERSION || "v22.0";
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "704866496024822";
const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;

export function sendProductListMessage(wa_id: string) {
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
        type: "product_list",
        header: {
          type: "text",
          text: "Check out our latest products!"
        },
        body: {
          text: "Choose a product to view more details."
        },
        footer: {
          text: "Tap a product to view"
        },
        action: {
          catalog_id: "{{CATALOG_ID}}",
          sections: [
            {
              title: "Best Sellers",
              product_items: [
                {
                  product_retailer_id: "lbikhq6hef"
                },
                {
                  product_retailer_id: "7nisdhiere"
                },
                {
                  product_retailer_id: "54p5mxxzwj"
                },
                {
                  product_retailer_id: "3a07rh3gje"
                },
                {
                  product_retailer_id: "keszqr3ay2"
                }
              ]
            }
          ]
        }
      }
    }
  });
}
