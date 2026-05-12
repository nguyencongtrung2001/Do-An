import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routers/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminRoutes from "./routers/admin.routes.js";
import fieldRoutes from "./routers/field.routes.js";
import ownerRoutes from "./routers/owner.routes.js";
import bookingRoutes from "./routers/booking.routes.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://do-an-blue.vercel.app", "http://localhost:3000", "*"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/field", fieldRoutes);
app.use("/owner", ownerRoutes);
app.use("/booking", bookingRoutes);
app.use(errorHandler);

export default app;