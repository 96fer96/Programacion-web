const express = require("express");

const productsController = require("../controller/products.controller");

const router = express.Router();



// ======================================================
// PRODUCTOS
// ======================================================


// Listado de productos
router.get(
    "/products",
    productsController.list
);


// Detalle de un producto
router.get(
    "/products/:id",
    productsController.detail
);



module.exports = router;