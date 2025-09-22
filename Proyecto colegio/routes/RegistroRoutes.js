// routes/RegistroRoutes.js
const express = require("express");
const router = express.Router();
const RegistroController = require("../controllers/RegistroController");

router.post("/", RegistroController.createRegistro);
router.get("/", RegistroController.getRegistros);
router.get("/:id", RegistroController.getRegistroById);
router.put("/:id", RegistroController.updateRegistro);
router.delete("/:id", RegistroController.deleteRegistro);

module.exports = router;
