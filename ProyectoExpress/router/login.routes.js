const express = require("express");
const loginController = require("../controller/login.controller");
const router = express.Router();

const {
    requireLogin, 
    requireGuest
} = require(
    "../middleware/sessionAuth.middleware.js"
);

// Mostrar formulario
router.get(
    "/login",
    requireGuest,
    loginController.showLogin
);


// Procesar login
router.post(
    "/login",
    requireGuest,
    loginController.processLogin
);

module.exports = router;
