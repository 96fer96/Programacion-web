
//Importo el módulo express para poder crear la aplicación web y definir rutas, middleware y otras configuraciones.
const express = require("express");

const path = require("path");

//express() sirve para crear una instancia de la aplicación Express, que es un objeto que representa la aplicación web y permite 
// definir rutas, middleware y otras configuraciones. A diferencia de require("express"), que solo importa el módulo de Express, 
// express() crea una instancia específica de la aplicación que se puede configurar y ejecutar.
const app = express();

const port = 3000;

const router = require("./router/router.js");

const session = require("express-session");

const viewDataMiddleware = require("./middleware/viewdata.middleware.js");

app.set("view engine", "ejs");

const expressLayouts =
    require("express-ejs-layouts");

// Utilizo express-ejs-layouts para definir una estructura común para las vistas de la aplicación.
app.use(expressLayouts);


//Cada vez que se renderice una vista EJS, se envuelve por defecto con el layout principal definido en layouts/main.ejs. 
//Esto permite mantener una apariencia consistente en todas las páginas de la aplicación.
app.set(
    "layout",
    "layouts/main"
);

//asocio la constante con la ruta de la carpeta public, esta diciendo: “Para las peticiones que comiencen desde /,
//utilizá los archivos estáticos que se encuentran dentro de la carpeta assets.”
app.use(
    express.static(
        path.join(__dirname, "assets")
    )
);


//Esta línea de código configura un middleware en la aplicación Express para procesar datos enviados a través de
// formularios HTML utilizando el método POST.
//El middleware express.urlencoded() se utiliza para analizar los datos codificados en la URL 
// (application/x-www-form-urlencoded) que se envían desde un formulario HTML.
//La opción extended: true permite analizar datos complejos, como objetos y matrices, en lugar de solo cadenas simples.
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
app.use(viewDataMiddleware.showCartAndUser);


//asocio la constante con la ruta raiz, esta diciendo: “Para las peticiones que comiencen desde /,
//utilizá las rutas definidas dentro de router.”
app.use("/", router);


app.listen(port, () => {

    console.log(
        `Servidor funcionando en http://localhost:${port}`
    );

});
