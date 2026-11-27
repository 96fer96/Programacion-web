const express =
    require("express");

const cartsController =
    require("../controller/carts.controller");

const {
    requireLogin
} = require(
    "../middleware/sessionAuth.middleware.js"
);


const router =
    express.Router();



// ======================================================
// CARRITO
// ======================================================


// Mostrar carrito
router.get(
    "/cart",
    requireLogin,
    cartsController.showCart
);


// Agregar producto
router.post(
    "/cart/add/:id",
    requireLogin,
    cartsController.addProduct
);


// Modificar cantidad
router.post(
    "/cart/update/:id",
    requireLogin,
    cartsController.updateQuantity
);


// Eliminar producto
router.post(
    "/cart/remove/:id",
    requireLogin,
    cartsController.removeProduct
);



module.exports = router;