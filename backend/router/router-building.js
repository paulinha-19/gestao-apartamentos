const express = require("express");
const router = express.Router();
const {
    getAllBuilding,
    getOneBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    getAllBuildingName,
    getAllBuildingFloor
} = require('../controllers/controllerBuilding');
const { getApartmentsNumbers } = require("../controllers/controllerApartment");
const validationFields = require("../middlewares/validationMiddlewares");
const buildingSchema = require("../validations/buildingValidation");

router.get("/api/edificios", getAllBuilding);
router.get("/api/edificios/nomes", getAllBuildingName);
router.get("/api/edificios/:id/andares", getAllBuildingFloor);
router.get("/api/edificios/:id", getOneBuilding);
router.post("/api/edificios", validationFields(buildingSchema), createBuilding);
router.put("/api/edificios/:id", validationFields(buildingSchema), updateBuilding);
router.delete("/api/edificios/:id", deleteBuilding);

module.exports = router;