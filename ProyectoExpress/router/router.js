const express = require("express");

const router = express.Router();



// MODELOS
const productsModel = require("../model/products.model");

//ROUTERS
const productsRoutes = require("./products.routes");
const cartsRoutes = require("./carts.routes");
const registerRoutes = require("./register.routes");
const loginRoutes = require("./login.routes");
const checkoutRoutes = require("./checkout.routes");
const error404Routes = require("./error404.routes");
const logoutRoutes = require("./logout.routes");
const error500Routes = require("./error500.routes");


// ======================================================
// INICIO
// ======================================================


router.get("/", (req, res) => {
//Cuando se hace una petición GET a la ruta raíz ("/"), se obtiene la lista de productos desde el modelo productsModel
// y se renderiza la vista "pages/index" pasando los productos como datos para que puedan ser utilizados en la
//plantilla EJS.
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

router.use(logoutRoutes);

router.use(error404Routes);

router.use(error500Routes);




module.exports = router;