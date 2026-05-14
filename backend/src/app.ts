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
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [
      "https://do-an-blue.vercel.app",
      "https://do-g3jixpcwc-nguyencongtrung2001s-projects.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001"
    ];

app.use(cors({
  origin: (origin, callback) => {
    // Cho phép requests không có origin (như mobile apps hoặc curl requests) 
    // hoặc origin nằm trong danh sách allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
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