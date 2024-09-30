import express, { Express, Request, Response } from "express";
import { authRouter, userRouter } from "./routes";
import { jwtAuth } from "./middleware/verifyToken";

const app: Express = express();
const port = 3000;
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
app.use("/api", apiRouter);
app.listen(port, () => {
  console.log(` Server is running at http://localhost:${3000}`);
});
