// ======================================================
// MODELOS
// ======================================================

const cartsModel =
    require("../model/carts.model");

const productsModel =
    require("../model/products.model");



// ======================================================
// MOSTRAR CARRITO
// ======================================================

function showCart(req, res) {

    const userId =
        req.session.userId;


    if (!userId) {
        return res.redirect("/login");
    }


    const cart =
        cartsModel.getByUserId(userId);


    const items = cart
        ? cart.items.map(item => {

            const product =
                productsModel.getById(
                    item.productId
                );


            return {
                product: product,
                quantity: item.quantity,
                subtotal:
                    product.price *
                    item.quantity
            };

        })
        : [];


    const total =
        items.reduce(
            (sum, item) =>
                sum + item.subtotal,
            0
        );


    res.render("pages/cart", {
        items: items,
        total: total
    });

}



// ======================================================
// AGREGAR PRODUCTO AL CARRITO
// ======================================================

function addProduct(req, res) {

    const userId =
        req.session.userId;


    // Si no inició sesión, lo mandamos al login
    if (!userId) {
        return res.redirect("/login");
    }


    const productId =
        Number(req.params.id);


    const quantity =
        Number(req.body.quantity);


    const product =
        productsModel.getById(productId);


    if (!product) {

        return res
            .status(404)
            .send("Producto no encontrado");

    }


    // Validación de cantidad
    if (
        !quantity
        ||
        quantity < 1
        ||
        quantity > product.stock
    ) {

        return res
            .status(400)
            .send("Cantidad no válida");

    }


    cartsModel.addProduct(
        userId,
        productId,
        quantity
    );


    res.redirect("/cart");

}



// ======================================================
// MODIFICAR CANTIDAD DEL CARRITO
// ======================================================

function updateQuantity(req, res) {

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


    // Validación básica
    if (!quantity || quantity < 1) {

        return res
            .status(400)
            .send("Cantidad no válida");

    }


    const product =
        productsModel.getById(productId);


    if (!product) {

        return res
            .status(404)
            .send("Producto no encontrado");

    }


    // No permitir superar el stock
    if (quantity > product.stock) {

        return res
            .status(400)
            .send("La cantidad supera el stock disponible");

    }


    cartsModel.updateQuantity(
        userId,
        productId,
        quantity
    );


    res.redirect("/cart");

}



// ======================================================
// ELIMINAR PRODUCTO DEL CARRITO
// ======================================================

function removeProduct(req, res) {

    const userId =
        req.session.userId;


    if (!userId) {
        return res.redirect("/login");
    }


    const productId =
        Number(req.params.id);


    cartsModel.removeProduct(
        userId,
        productId
    );


    res.redirect("/cart");

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