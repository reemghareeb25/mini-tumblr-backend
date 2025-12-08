import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();

connectDB();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running...., Hello There!")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});