const express = require("express");

const router = express.Router();

//ROUTERS
const indexRoutes = require("./index.routes");
const productsRoutes = require("./products.routes");
const cartsRoutes = require("./carts.routes");
const registerRoutes = require("./register.routes");
const loginRoutes = require("./login.routes");
const checkoutRoutes = require("./checkout.routes");
const apiRoutes = require("./api.routes");
const error404Routes = require("./error404.routes");
const logoutRoutes = require("./logout.routes");
const error500Routes = require("./error500.routes");


// ======================================================
// INICIO
// ======================================================

router.use(indexRoutes);

// ======================================================
// RUTAS
// ======================================================

router.use(productsRoutes);

router.use(cartsRoutes);

router.use(registerRoutes);

router.use(loginRoutes);

router.use(checkoutRoutes);

router.use(apiRoutes);

router.use(logoutRoutes);

router.use(error404Routes);

router.use(error500Routes);




module.exports = router;