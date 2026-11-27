const express = require("express");

const registerController =
    require("../controller/register.controller");

const router = express.Router();

const {
    requireLogin , requireGuest , requireAdminSession
} = require(
    "../middleware/sessionAuth.middleware.js"
);


// ======================================================
// REGISTRO
// ======================================================


// Mostrar formulario
router.get(
    "/register",
    requireGuest,
    registerController.showRegister
);


// Procesar formulario
router.post(
    "/register",
    requireGuest,
    registerController.registerUser
);


module.exports = router;
