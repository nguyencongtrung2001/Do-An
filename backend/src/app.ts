import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routers/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminRoutes from "./routers/admin.routes.js";
import fieldRoutes from "./routers/field.routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/field", fieldRoutes);
app.use(errorHandler);

export default app;