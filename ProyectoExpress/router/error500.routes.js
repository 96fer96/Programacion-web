const express = require("express");

const error500Controller =
    require("../controller/error500.controller");

const router = express.Router();

// ======================================================
// ERROR 500
// ======================================================

// Este middleware se ejecutará si ocurre un error en el servidor.
// Se utiliza para manejar errores internos del servidor y mostrar una página de error 500.
router.use(error500Controller.showError500);

module.exports = router;