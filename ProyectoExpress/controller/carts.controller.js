// ======================================================
// MODELOS
// ======================================================

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
    
    // Obtengo el carrito almacenado previamente en la sesión. Si todavía no fue creado, su valor será undefined, pues
    //la funcion session permite agregar atributos "al vuelo" a la session
    const cart =
        req.session.cart;

    //Se almacenan en la constante items los productos que se encuentran en el carrito, si el carrito no tiene
    //productos, se asigna un arreglo vacío.
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


    // Si todavía no existe un carrito en la sesión, se crea uno asociado al usuario logueado.
    if (!req.session.cart) {
        req.session.cart = {
            userId: userId,
            items: []
        };
    }


    const existingItem =
        req.session.cart.items.find(
            item =>
                item.productId === productId
        );


    // Si el producto ya estaba en el carrito,
    // aumentamos su cantidad.
    if (existingItem) {

        existingItem.quantity +=
            quantity;

    }

    // Si el producto no estaba en el carrito,
    // lo agregamos.
    else {

        req.session.cart.items.push({

            productId: productId,

            quantity: quantity

        });

    }


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


    // Obtengo el carrito almacenado en la sesión
    const cart =
        req.session.cart;


    if (!cart) {

        return res.redirect("/cart");

    }


    // Busco dentro del carrito el producto que se desea modificar
    const item =
        cart.items.find(
            item =>
                item.productId === productId
        );


    if (!item) {

        return res
            .status(404)
            .send("El producto no se encuentra en el carrito");

    }


    // Modifico directamente la cantidad almacenada en la sesión
    item.quantity =
        quantity;


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


    // Obtengo el carrito almacenado en la sesión
    const cart =
        req.session.cart;

    //si no existe el carrito, redirijo al usuario a la vista del carrito, que estará vacía
    if (!cart) {

        return res.redirect("/cart");

    }


    // Busco dentro del carrito el producto que se desea eliminar
    const item =
        cart.items.find(
            item =>
                item.productId === productId
        );


    if (!item) {

        return res
            .status(404)
            .send("El producto no se encuentra en el carrito");

    }


    // Elimino el producto del carrito, filtrando los items que no coincidan con el productId del producto a eliminar
    //es decir, si se encuentra una coincidencia, se elimina el producto del carrito, y si no se encuentra, el carrito
    // permanece igual
    cart.items = cart.items.filter(
        item =>
            item.productId !== productId
    );

    //uso redirect para redirigir al usuario a la vista del carrito, que ahora estará actualizada sin el producto
    //eliminado
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