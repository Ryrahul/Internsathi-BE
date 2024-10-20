import express, { Express, Request, Response } from "express";
import { authRouter, userRouter } from "./routes";
import cors from "cors";
import { companyRouter } from "./routes/companyRouter";
import { internshipRouter } from "./routes/internshipRouter";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/company", companyRouter);
apiRouter.use("/internship", internshipRouter);
app.use("/api", apiRouter);
app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});
