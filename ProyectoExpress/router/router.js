const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();


// MODELOS
const usersModel = require("../model/users.model");
const productsModel = require("../model/products.model");
const cartsModel = require("../model/carts.model");


// ======================================================
// INICIO
// ======================================================

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
// TODOS LOS PRODUCTOS
// ======================================================

router.get("/products", (req, res) => {

    const category = req.query.category;

    const query = req.query.q
        ? req.query.q.trim()
        : "";

    let products;


    if (query) {

        products =
            productsModel.search(query);

    } else if (category) {

        products =
            productsModel.getByCategory(category);

    } else {

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


    //
    res.render("pages/products", {

        products: products,

        selectedCategory:
            category
                ? categoryNames[category]
                : null,

        searchTerm: query

    });

});


// Detalle de un producto
router.get("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product =
        productsModel.getById(id);


    if (!product) {

        return res
            .status(404)
            .send("Producto no encontrado");

    }


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

});

// ======================================================
// CARRITO
// ======================================================

router.get("/cart", (req, res) => {

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

});

router.post("/cart/add/:id", (req, res) => {

    const userId = req.session.userId;

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


    cartsModel.addProduct(
        userId,
        productId,
        quantity
    );


    res.redirect("/cart");

});

//Modificar el carrito
router.post("/cart/update/:id", (req, res) => {

    const userId = req.session.userId;

    // Verificar que haya un usuario logueado
    if (!userId) {
        return res.redirect("/login");
    }


    const productId = Number(req.params.id);

    const quantity = Number(req.body.quantity);


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

});



//eliminar un producto del carrito

router.post("/cart/remove/:id", (req, res) => {

    const userId = req.session.userId;


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

});

// ======================================================
// CHECKOUT
// ======================================================

router.get("/checkout", (req, res) => {

    res.render("pages/checkout");

});


// ======================================================
// REGISTRO
// ======================================================

// Mostrar formulario
router.get("/register", (req, res) => {

    res.render("pages/register");

});


// Procesar formulario
router.post("/register", async (req, res) => {

    const {
        username,
        name,
        email,
        password,
        confirmPassword
    } = req.body;


    // Verificamos que las contraseñas coincidan
    if (password !== confirmPassword) {

        return res.render("pages/register", {
            error: "Las contraseñas no coinciden"
        });

    }


    // Buscamos si el usuario ya existe
    const existingUser =
        await usersModel.findByUsername(username);


    if (existingUser) {

        return res.render("pages/register", {
            error: "El nombre de usuario ya se encuentra registrado"
        });

    }


    // Encriptamos la contraseña
    const hashedPassword =
        await bcrypt.hash(password, 10);


    // Creamos el nuevo usuario
    const newUser = {

        id: Date.now(),

        username: username,

        name: name,

        email: email,

        password: hashedPassword

    };


    // Guardamos en users.json
    await usersModel.create(newUser);


    // Una vez registrado, enviamos al login
    res.redirect("/login");

});




// ======================================================
// LOGIN
// ======================================================

// Mostrar formulario
router.get("/login", (req, res) => {

    res.render("pages/login");

});


// Procesar login
router.post("/login", async (req, res) => {

    const {
        username,
        password
    } = req.body;

    const user =
        await usersModel.findByUsername(username);

    if (!user) {
        return res.render("pages/login", {
            error: "Usuario o contraseña incorrectos"
        });
    }

    const passwordIsValid =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!passwordIsValid) {
        return res.render("pages/login", {
            error: "Usuario o contraseña incorrectos"
        });
    }

    // Login correcto
    //En la sesión actual, guardá qué usuario inició sesión.
    req.session.userId = user.id;

    res.redirect("/");
});


module.exports = router;