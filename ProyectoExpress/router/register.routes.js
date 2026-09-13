const express = require("express");

const registerController =
    require("../controller/register.controller");

const router = express.Router();


// ======================================================
// REGISTRO
// ======================================================


// Mostrar formulario
router.get(
    "/register",
    registerController.showRegister
);


// Procesar formulario
router.post(
    "/register",
    registerController.registerUser
);


module.exports = router;
