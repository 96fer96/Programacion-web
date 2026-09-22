const cartsService = require('../services/carts.service')

// ======================================================
// MOSTRAR CARRITO
// ======================================================

function showCart(req, res) {

    const userId =
        req.session.userId;


    if (!userId) {
        return res.redirect("/login");
    }
    
    // Obtengo el carrito almacenado previamente en la sesión. Si todavía no fue creado, su valor será undefined, pues
    //la funcion session permite agregar atributos "al vuelo" a la session
    const cart =
        req.session.cart;

    const items = cartsService.getItems(cart);

    const total = cartsService.getTotal(items);

    res.render("pages/cart", {
        items: items,
        total: total
    });

}



// ======================================================
// AGREGAR PRODUCTO AL CARRITO
// ======================================================

function addProduct(req, res, next) {

    try {

        const userId =
            req.session.userId;


        // Verificar que haya un usuario logueado
        if (!userId) {

            return res.redirect("/login");

        }


        const productId =
            Number(req.params.id);


        const quantity =
            Number(req.body.quantity);


        // Si todavía no existe un carrito en la sesión,
        // se crea uno asociado al usuario logueado.
        if (!req.session.cart) {

            req.session.cart =
                cartsService.createCart(
                    userId
                );

        }


        // Delegamos al servicio la lógica necesaria
        // para agregar el producto al carrito.
        const result =
            cartsService.addProduct(
                req.session.cart,
                productId,
                quantity
            );


        if (!result.success) {


            if (
                result.error ===
                "INVALID_QUANTITY"
            ) {

                return res
                    .status(400)
                    .send(
                        "Cantidad no válida"
                    );

            }


            if (
                result.error ===
                "PRODUCT_NOT_FOUND"
            ) {

                return res
                    .status(404)
                    .send(
                        "Producto no encontrado"
                    );

            }


            if (
                result.error ===
                "INSUFFICIENT_STOCK"
            ) {

                return res
                    .status(400)
                    .send(
                        "La cantidad supera el stock disponible"
                    );

            }

        }


        res.redirect("/cart");


    } catch (error) {

        next(error);

    }

}

// ======================================================
// MODIFICAR CANTIDAD DEL CARRITO
// ======================================================

function updateQuantity(req, res, next) {

    try {

        const userId =
            req.session.userId;


        // Verificar que haya un usuario logueado
        if (!userId) {

            return res.redirect("/login");

        }


        const productId =
            Number(req.params.id);


        const quantity =
            Number(req.body.quantity);


        // Obtengo el carrito almacenado en la sesión
        const cart =
            req.session.cart;


        if (!cart) {

            return res.redirect("/cart");

        }


        // Delegamos al servicio la lógica necesaria para
        // modificar la cantidad del producto en el carrito.
        const result =
            cartsService.updateQuantity(
                cart,
                productId,
                quantity
            );


        if (!result.success) {


            if (
                result.error ===
                "INVALID_QUANTITY"
            ) {

                return res
                    .status(400)
                    .send(
                        "Cantidad no válida"
                    );

            }


            if (
                result.error ===
                "PRODUCT_NOT_FOUND"
            ) {

                return res
                    .status(404)
                    .send(
                        "Producto no encontrado"
                    );

            }


            if (
                result.error ===
                "INSUFFICIENT_STOCK"
            ) {

                return res
                    .status(400)
                    .send(
                        "La cantidad supera el stock disponible"
                    );

            }


            if (
                result.error ===
                "ITEM_NOT_FOUND"
            ) {

                return res
                    .status(404)
                    .send(
                        "El producto no se encuentra en el carrito"
                    );

            }

        }

        res.redirect("/cart");

    } catch (error) {

        next(error);

    }

}


// ======================================================
// ELIMINAR PRODUCTO DEL CARRITO
// ======================================================

function removeProduct(req, res, next) {
    try {
        const userId =
            req.session.userId;


        // Verificar que haya un usuario logueado
        if (!userId) {
            return res.redirect("/login");
        }

        const productId = Number(req.params.id);

        const cart = req.session.cart;

        if (!cart) {
            return res.redirect("/cart")
        }

        const result = cartsService.removeProduct(cart, productId);

        if (!result.success) {
            if (result.error === "ITEM_NOT_FOUND") {
                return res
                        .status(404)
                        .send(
                            "El producto no se encuentra en el carrito"
                        );
            }
        }

        res.redirect("/cart");


    } catch (error) {
        next(error);
    }
}




// ======================================================
// EXPORTACIONES
// ======================================================

module.exports = {
    showCart,
    addProduct,
    updateQuantity,
    removeProduct
};