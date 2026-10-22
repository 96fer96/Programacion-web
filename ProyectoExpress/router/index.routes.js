const productsModel = require("../model/products.model");

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
//Cuando se hace una petición GET a la ruta raíz ("/"), se obtiene la lista de productos desde el modelo productsModel
// y se renderiza la vista "pages/index" pasando los productos como datos para que puedan ser utilizados en la
//plantilla EJS.
    const products = productsModel.getAll();

    res.render("pages/index", {
        products: products
    });

});

module.exports = router;

