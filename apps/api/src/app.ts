import express,{ Express } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"
import {errorHandler} from "./middleware/errorHandler.js"
import { verifyToken } from "./middleware/auth.js";
import linkRoutes from "./routes/link.js"
import redirectRoutes from "./routes/redirect.js"
import qrRouter from "./routes/qr.js"

const app:Express = express();


app.use(cors({ 
    origin: [
      process.env.BACKEND_URL,
      process.env.FRONTEND_URL
    ].filter(Boolean) as string[],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use('/api', linkRoutes);
app.use('/', redirectRoutes);
app.use('/api/qr', verifyToken, qrRouter);


app.use(errorHandler);

export default app;