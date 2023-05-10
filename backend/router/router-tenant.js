const express = require("express");
const router = express.Router();
const {
    getAllTenant,
    createTenant
} = require("../controllers/controllerTenant");
const validationFields = require("../middlewares/validationMiddlewares");
const tenantSchema = require("../validations/tenantValidation");


router.get("/api/tenant", getAllTenant);
router.post("/api/tenant", validationFields(tenantSchema), createTenant);


module.exports = router;