import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
import rootRouters from "./routes/index";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/healthcheck", (req: Request, res: Response, next) => {
  res.status(200).json({ message: "Server is running", success: true });
  next();
});

app.use("/", rootRouters);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
