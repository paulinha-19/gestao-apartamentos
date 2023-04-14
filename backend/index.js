const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const authAndSyncDb = require("./utils/authAndSyncDb");
const router = require("./router/index");
const app = express();
require("dotenv").config();
// authAndSyncDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router)
app.listen(process.env.PORT || 4005, () =>
    console.log(`Servidor iniciado na porta ${process.env.PORT}`)
);


