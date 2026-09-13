const express = require("express");

const router = express.Router();



// MODELOS
const usersModel = require("../model/users.model");
const productsModel = require("../model/products.model");

//ROUTERS
const productsRoutes = require("./products.routes");
const cartsRoutes = require("./carts.routes");
const registerRoutes = require("./register.routes");
const loginRoutes = require("./login.routes");
const checkoutRoutes = require("./checkout.routes");
const error404Routes = require("./error404.routes");


// ======================================================
// INICIO
// ======================================================

router.get("/", (req, res) => {

    const products = productsModel.getAll();

    res.render("pages/index", {
        products: products
    });

});

// ======================================================
// RUTAS DE PRODUCTOS
// ======================================================

router.use(productsRoutes);

router.use(cartsRoutes);

router.use(registerRoutes);

router.use(loginRoutes);

router.use(checkoutRoutes);

router.use(error404Routes);



module.exports = router;