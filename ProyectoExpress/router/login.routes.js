const express = require("express");
const loginController = require("../controller/login.controller");
const router = express.Router();

// Mostrar formulario
router.get(
    "/login",
    loginController.showLogin
);


// Procesar login
router.post("/login",
    loginController.processLogin
);

module.exports = router;
