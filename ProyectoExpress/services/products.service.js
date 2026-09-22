const productsModel = require('../model/products.model');

// ======================================================
// TODOS LOS PRODUCTOS
// ======================================================

function list(category, query, order) {

    let products;


    // ======================================================
    // SELECCIÓN DE PRODUCTOS
    // ======================================================

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



    // ======================================================
    // ORDENAMIENTO DE PRODUCTOS
    // ======================================================

    if (order === "price_asc") {

        products =
            [...products].sort(
                (a, b) =>
                    a.price - b.price
            );

    }


    else if (order === "price_desc") {

        products =
            [...products].sort(
                (a, b) =>
                    b.price - a.price
            );

    }


    return products;

}

function getCategoryNames() {

    return {
        electronica: "Electrónica",
        alimentos: "Alimentos",
        bebidas: "Bebidas",
        indumentaria: "Indumentaria",
        juegos: "Juegos",
        automotor: "Automotor",
        hogar: "Hogar",
        otros: "Otros"
    };

}

// ======================================================
// OBTENER PRODUCTO POR ID
// ======================================================

function getProductById(id) {
    return productsModel.getById(id);
}


// ======================================================
// PRODUCTOS SUGERIDOS
// ======================================================

// Buscamos productos de la misma categoría para mostrarlos como sugerencias,
// excluyendo el producto que actualmente se está visualizando.
function getSuggestedProducts(product) {

    const suggestedProducts =
        productsModel
            .getAll()
            .filter(
                suggested =>
                    suggested.id !== product.id
                    &&
                    suggested.category === product.category
            )
            .slice(0, 4);


    return suggestedProducts;

}

function normalizeId(id) {

    const normalizedId =
        Number(id);


    if (
        !Number.isInteger(normalizedId)
        ||
        normalizedId <= 0
    ) {

        return null;

    }


    return normalizedId;

}

module.exports = {
    list,
    getCategoryNames,
    getProductById,
    getSuggestedProducts,
    normalizeId
};