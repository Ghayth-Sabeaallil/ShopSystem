
import Express from "express";
import userRouter from "./routes/userRoutes";
import itemRouter from "./routes/itemRoutes";

import cookieParser from "cookie-parser";

export const apiRouter = Express.Router();

apiRouter.use(Express.json());
apiRouter.use(cookieParser());
apiRouter.use("/users", userRouter);
apiRouter.use("/items", itemRouter);
