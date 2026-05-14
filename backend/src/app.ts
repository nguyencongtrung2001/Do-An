import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routers/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import adminRoutes from "./routers/admin.routes.js";
import fieldRoutes from "./routers/field.routes.js";
import ownerRoutes from "./routers/owner.routes.js";
import bookingRoutes from "./routers/booking.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://do-an-blue.vercel.app", "http://localhost:3001", "*"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));
app.use(express.json());
// Bắt lỗi cú pháp JSON từ body-parser
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      success: false, 
      message: "Dữ liệu JSON không hợp lệ" 
    });
  }
  next(err);
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/field", fieldRoutes);
app.use("/owner", ownerRoutes);
app.use("/booking", bookingRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

export default app;