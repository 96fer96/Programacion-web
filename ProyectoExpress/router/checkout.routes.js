const express = require("express");
const checkoutController = require("../controller/checkout.controller");

const router = express.Router();

// ======================================================
// CHECKOUT
// ======================================================

// Mostrar formulario de checkout
router.get(
    "/checkout",
    checkoutController.showCheckout
);

// Procesar checkout
router.post(
    "/checkout",
    checkoutController.processCheckout
);

module.exports = router;