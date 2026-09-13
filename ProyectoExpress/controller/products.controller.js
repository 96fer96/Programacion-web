// ======================================================
// MODELO DE PRODUCTOS
// ======================================================

const productsModel =
    require("../model/products.model");



// ======================================================
// TODOS LOS PRODUCTOS
// ======================================================

function list(req, res) {

    const category = req.query.category;

    const query = req.query.q
        ? req.query.q.trim()
        : "";

    let products;


    // Si existe una búsqueda
    if (query) {

        products =
            productsModel.search(query);

    }

    // Si existe una categoría
    else if (category) {

        products =
            productsModel.getByCategory(category);

    }

    // Si no hay búsqueda ni categoría
    else {

        products =
            productsModel.getAll();

    }


    const categoryNames = {
        electronica: "Electrónica",
        alimentos: "Alimentos",
        bebidas: "Bebidas",
        indumentaria: "Indumentaria",
        juegos: "Juegos",
        automotor: "Automotor",
        hogar: "Hogar",
        otros: "Otros"
    };


    // Renderizamos la vista de productos, la cual puede recibir un array de productos,
    // una categoría seleccionada y un término de búsqueda.
    res.render("pages/products", {

        products: products,

        selectedCategory:
            category
                ? categoryNames[category]
                : null,

        searchTerm: query

    });

}



// ======================================================
// DETALLE DE UN PRODUCTO
// ======================================================

function detail(req, res) {

    const id =
        Number(req.params.id);


    const product =
        productsModel.getById(id);


    if (!product) {

        return res
            .status(404)
            .send("Producto no encontrado");

    }


    // Buscamos productos de la misma categoría
    // para mostrarlos como sugerencias.
    const suggestedProducts =
        productsModel
            .getAll()
            .filter(
                suggested =>
                    suggested.id !== product.id
                    &&
                    suggested.category === product.category
            )
            .slice(0, 3);


    res.render("pages/product", {

        product: product,

        suggestedProducts:
            suggestedProducts

    });

}



// ======================================================
// EXPORTACIONES
// ======================================================

module.exports = {
    list,
    detail
};