import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv/config.js";
import authAndSyncDb from "./utils/authAndSyncDb.js"
import router from "./router/index.js";

const app = express();
const PORT = process.env.PORT;
authAndSyncDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router)
app.listen(PORT, () =>
    console.log(`Servidor iniciado na porta ${PORT}`)
);


