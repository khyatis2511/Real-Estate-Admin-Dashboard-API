import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT = process.env.PORT ?? 3088;
const app = express();
// const router = express.Router();

// console.log('process : ', process.env.DATABASE_URL, process.env.PORT )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
