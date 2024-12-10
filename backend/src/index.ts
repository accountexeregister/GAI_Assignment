import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { openAIApiRouter } from "./controllers/openAIApiRouter";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static("build"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/chats', openAIApiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});