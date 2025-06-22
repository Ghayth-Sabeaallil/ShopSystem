
import Express from "express";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRouter";

import cookieParser from "cookie-parser";
import receiptRouter from "./routes/receiptRouter";

export const apiRouter = Express.Router();

apiRouter.use(Express.json());
apiRouter.use(cookieParser());
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/receipts", receiptRouter);

