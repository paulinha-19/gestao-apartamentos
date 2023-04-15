const express = require("express");
const router = express.Router();
router.get("/api", (req, res) => {
    return res.json("Server is on");
});

// //rotas apartamento
// router.get("/api/apartamentos", apartamento.getAllApartment);
// router.get("/api/apartamentos/:id", apartamento.getAOneApartment);
// router.post("/api/edificios/:id/apartamentos", apartamento.createApartment);
// router.put("/api/apartamentos/:id", apartamento.uptadeApartment);
// router.delete("/api/apartamentos/:id", apartamento.deleteApartment);
// //rotas locatario
// router.get("/api/locatarios", locatario.getAllTenant);
// router.post("/api/locatarios", locatario.createTenant);
// //rotas locacao
// router.post("/api/apartamentos/:id/locatarios/:id/locacao", locacao);

module.exports = router;

