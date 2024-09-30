import express, { Express, Request, Response } from "express";
import { userRouter } from "./routes";
import { jwtAuth } from "./middleware/verifyToken";

const app: Express = express();
const port = 3000;
app.use(express.json());

app.use("/api", userRouter);

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${3000}`);
});
