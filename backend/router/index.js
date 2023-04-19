const express = require("express");
const router = express.Router();
router.get("/api", (req, res) => {
    return res.json("Server is on");
});


// //rotas locatario
// router.get("/api/locatarios", locatario.getAllTenant);
// router.post("/api/locatarios", locatario.createTenant);
// //rotas locacao
// router.post("/api/apartamentos/:id/locatarios/:id/locacao", locacao);

module.exports = router;

