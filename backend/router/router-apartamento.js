const express = require("express");
const router = express.Router();
const {
    getAllApartment,
    getAOneApartment,
    createApartment,
    uptadeApartment,
    deleteApartment,
    getApartmentsNumbers
} = require("../controllers/controllerApartment");

router.get("/api/apartamentos", getAllApartment);
router.get("/api/apartamentos/:id", getAOneApartment);
router.get("/api/edificios/:id/andares/:andar/apartamentos", getApartmentsNumbers);
router.post("/api/edificios/:id/apartamentos", createApartment);
router.put("/api/apartamentos/:id", uptadeApartment);
router.delete("/api/apartamentos/:id", deleteApartment);

module.exports = router;