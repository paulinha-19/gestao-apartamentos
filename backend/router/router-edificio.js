const express = require("express");
const router = express.Router();
const {
    getAllBuilding,
    getOneBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding
} = require('../controllers/controllerBuilding');
const validationFields = require("../middlewares/validationMiddlewares");
const edificioSchema = require("../validations/edificioValidation");

router.get("/api/edificios", getAllBuilding);
router.get("/api/edificios/:id", getOneBuilding);
router.post("/api/edificios", validationFields(edificioSchema), createBuilding);
router.put("/api/edificios/:id", validationFields(edificioSchema), updateBuilding);
router.delete("/api/edificios/:id", deleteBuilding);

module.exports = router;