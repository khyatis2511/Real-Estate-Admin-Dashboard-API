import cors from "cors";
import dotenv from "dotenv";
import express, { Router } from "express";
import checkAuth from "./middlewares/check-auth.middleware";
import applyActivityRoutes from "./modules/activity/activity.router";
import applyAnalyticsRoutes from "./modules/analytics/analytics.router";
import applyAuthRoutes from "./modules/auth/auth.route";
import applyUserRoutes from "./modules/user/user.router";

dotenv.config();

const PORT = process.env.PORT ?? 3088;
const app = express();
const router = Router();

const userRouter = Router();
const activityRouter = Router();
const analyticsRouter = Router();

// console.log('process : ', process.env.DATABASE_URL, process.env.PORT )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// general routes

app.use('/api/v1/auth', applyAuthRoutes(router));

// user routes


// admin routes

app.use('/api/v1/admin/users', checkAuth, applyUserRoutes(userRouter));
app.use('/api/v1/admin/activity', checkAuth, applyActivityRoutes(activityRouter));
app.use('/api/v1/admin/analytics', checkAuth, applyAnalyticsRoutes(analyticsRouter));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
