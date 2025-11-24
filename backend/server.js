import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config(); // PRIMEIRO DE TUDO!!!

import { connectDB } from "./config/db.js"; // só depois

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(rateLimit({
    windowMs: 30000,
    max: 50
}));

connectDB(); // conecta ANTES das rotas

// IMPORTAR ROTAS SOMENTE DEPOIS DA CONEXÃO / DOTENV
import authRoutes from "./routes/authRoutes.js";
import helpRoutes from "./routes/helpRoutes.js";

app.use("/auth", authRoutes);
app.use("/help", helpRoutes);

app.get("/", (req, res) => {
    res.send("RescueLink API rodando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
