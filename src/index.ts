import express, { Express, Request, Response } from "express";
import { userRouter } from "./routes";
import { validateData } from "./middleware/validationMiddleware";
import { userRegistrationSchema } from "./schemas/userSchema";

const app: Express = express();
const port = 3000;
app.use(express.json());

app.use("/api", validateData(userRegistrationSchema), userRouter);

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${3000}`);
});
