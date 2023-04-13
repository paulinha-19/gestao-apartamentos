import express from "express";
import edificio from "../controllers/controllerBuilding.js";
import apartamento from "../controllers/controllerApartment.js";
import locatario from "../controllers/controllerTenant.js";
import locacao from "../controllers/controllerRentApart.js";

const router = express.Router();
router.get("/api", (req, res) => {
    return res.json("Server is on");
});

//rotas edificio
router.get("/api/edificios", edificio.getAllBuilding);
router.get("/api/edificios/:id", edificio.getOneBuilding);
router.post("/api/edificios", edificio.createBuilding);
router.put("/api/edificios/:id", edificio.updateBuilding);
router.delete("/api/edificios/:id", edificio.deleteBuilding);
//rotas apartamento
router.get("/api/apartamentos", apartamento.getAllApartment);
router.get("/api/apartamentos/:id", apartamento.getAOneApartment);
router.post("/api/edificios/:id/apartamentos", apartamento.createApartment);
router.put("/api/apartamentos/:id", apartamento.uptadeApartment);
router.delete("/api/apartamentos/:id", apartamento.deleteApartment);
//rotas locatario
router.get("/api/locatarios", locatario.getAllTenant);
router.post("/api/locatarios", locatario.createTenant);
//rotas locacao
router.post("/api/apartamentos/:id/locatarios/:id/locacao", locacao);

export { router as default };

