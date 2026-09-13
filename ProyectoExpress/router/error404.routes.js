const express = require("express");

const error404Controller =
    require("../controller/error404.controller");

const router = express.Router();


// ======================================================
// ERROR 404
// ======================================================

// Este middleware se ejecutará si ninguna de las rutas definidas anteriormente respondió a la petición.
//por eso no lleva un path definido, ya que se ejecutará para cualquier ruta que no haya sido manejada por las rutas anteriores.
router.use(
    error404Controller.showError404
);


module.exports = router;