const express =
    require("express");

const cartsController =
    require("../controller/carts.controller");


const router =
    express.Router();



// ======================================================
// CARRITO
// ======================================================


// Mostrar carrito
router.get(
    "/cart",
    cartsController.showCart
);


// Agregar producto
router.post(
    "/cart/add/:id",
    cartsController.addProduct
);


// Modificar cantidad
router.post(
    "/cart/update/:id",
    cartsController.updateQuantity
);


// Eliminar producto
router.post(
    "/cart/remove/:id",
    cartsController.removeProduct
);



module.exports = router;