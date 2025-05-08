import { Request, Response } from "express";

export const getWebhook = (req: Request, res: Response) => {
  return res.status(200).send("GET Webhook Verified");
};
