const express = require("express");
const {
    getAllBuilding,
    getOneBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding
} = require('../controllers/controllerBuilding');
// import apartamento from "../controllers/controllerApartment.js";
// import locatario from "../controllers/controllerTenant.js";
// import locacao from "../controllers/controllerRentApart.js";

const router = express.Router();
router.get("/api", (req, res) => {
    return res.json("Server is on");
});

//rotas edificio
router.get("/api/edificios", getAllBuilding);
router.get("/api/edificios/:id", getOneBuilding);
router.post("/api/edificios", createBuilding);
router.put("/api/edificios/:id", updateBuilding);
router.delete("/api/edificios/:id", deleteBuilding);
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

