const productsService = require('../services/products.service');

// ======================================================
// TODOS LOS PRODUCTOS
// ======================================================

function list(req, res, next) {

    try {

        const category =
            req.query.category;


        const query =
            req.query.q
                ? req.query.q.trim()
                : "";


        const order =
            req.query.sort
                ? req.query.sort.trim()
                : "";


        const products =
            productsService.list(
                category,
                query,
                order
            );


        const categoryNames =
            productsService.getCategoryNames();


        // Renderizamos la vista de productos, la cual puede recibir un array de productos,
        // una categoría seleccionada, un término de búsqueda y un criterio de ordenamiento.
        res.render("pages/products", {

            products: products,

            selectedCategory:
                category
                    ? categoryNames[category]
                    : null,

            category:
                category,

            searchTerm:
                query,

            sortOrder:
                order

        });


    } catch (error) {

        next(error);

    }

}




// ======================================================
// DETALLE DE UN PRODUCTO
// ======================================================

function detail(req, res, next) {

    try {

        // Normalizamos y validamos el ID recibido
        // como parámetro desde la URL.
        const id =
            productsService.normalizeId(
                req.params.id
            );


        // El parámetro recibido no representa
        // un ID válido.
        if (id === null) {

            //este error es para un programador, de modo que no es necesario
            //renderizar una vista ejs, porque creo que no es posible que un 
            //producto tenga una id NaN
            return res
                .status(400)
                .send(
                    "ID de producto no válido"
                );

        }


        // Una vez validado el ID, buscamos
        // el producto correspondiente.
        const product =
            productsService.getProductById(
                id
            );


        // Si el producto solicitado no existe,
        // respondemos con un error 404.
        if (!product) {

            return res
                .status(404)
                .render(
                    "pages/error404"
                );

        }


        const suggestedProducts =
            productsService.getSuggestedProducts(
                product
            );


        res.render("pages/product", {

            product: product,

            suggestedProducts:
                suggestedProducts

        });


    } catch (error) {

        next(error);
    }
}


// ======================================================
// EXPORTACIONES
// ======================================================

module.exports = {
    list,
    detail
};