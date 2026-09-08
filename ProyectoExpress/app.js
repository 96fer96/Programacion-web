const express = require("express");

const path = require("path");

const app = express();

const port = 3000;

const router = require("./Router/router.js");

const session = require("express-session");

const usersModel = require("./model/users.model");

const cartsModel = require("./model/carts.model");

app.set("view engine", "ejs");




//asocio la constante con la ruta de la carpeta public, esta diciendo: “Para las peticiones que comiencen desde /,
//utilizá los archivos estáticos que se encuentran dentro de la carpeta assets.”
app.use(
    express.static(
        path.join(__dirname, "assets")
    )
);


// Leer formularios HTML
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    session({
        secret: "mi-clave-secreta",
        resave: false,
        saveUninitialized: false
    })
);

// Middleware para pasar información al carrito y al usuario logueado a todas las vistas
app.use(async (req, res, next) => {

    res.locals.currentUser = null;
    res.locals.cartCount = 0;


    try {

        // Si hay un usuario logueado, tomo su id y busco el usuario y su carrito
        if (req.session.userId) {

            const user =
                await usersModel.getById(
                    req.session.userId
                );


            const cart =
                cartsModel.getByUserId(
                    req.session.userId
                );


            res.locals.currentUser = user;


            //Si el usuario tiene un carrito, calculo la cantidad de productos y la paso a las vistas
            if (cart) {

                res.locals.cartCount =
                    cart.items.reduce(
                        (total, item) =>
                            total + item.quantity,
                        0
                    );

            }

        }


        //Si no hubiera next, el flujo de la aplicación se detendría aquí y no se ejecutaría el siguiente middleware o ruta.
        next();


    } catch (error) {

        next(error);

    }

});


//asocio la constante con la ruta raiz, esta diciendo: “Para las peticiones que comiencen desde /,
//utilizá las rutas definidas dentro de router.”
app.use("/", router);


app.listen(port, () => {

    console.log(
        `Servidor funcionando en http://localhost:${port}`
    );

});
