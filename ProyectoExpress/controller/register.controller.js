// ======================================================
// MODELOS Y DEPENDENCIAS
// ======================================================

const usersService = require("../service/users.service");

// ======================================================
// MOSTRAR FORMULARIO DE REGISTRO
// ======================================================

function showRegister(req, res) {

    res.render("pages/register",
        //Indico explicitamente que no quiero usar el layout principal para esta vista, sino que quiero renderizarla 
        //sin ningún layout.
        {
            layout: false
        }
    );
}

// ======================================================
// PROCESAR REGISTRO
// ======================================================
function registerUser(req, res, next) {

    try {

        /*sintaxis de JavaScript llamada desestructuración de objetos
        Las llaves: { ... } en este caso significan: “Extraé estas propiedades
        del objeto que está a la derecha”.
        Es lo mismo que hacer:
        const username =
            req.body.username;

        const name =
            req.body.name;

        const email =
            req.body.email;

        const password =
            req.body.password;

        const confirmPassword =
            req.body.confirmPassword;
        */
        const {
            username,
            name,
            email,
            password,
            confirmPassword
        } = req.body;

        const userData = {
            username,
            name,
            email,
            password,
            confirmPassword
        }

        const result = usersService.registerUser(userData);

        if (result.success) {
            // Una vez registrado, enviamos al login
            return res.redirect("/login");
        }

        if (!result.success) {
            if (result.error === "PASSWORD_DIFERENTES")
                return res.render("pages/register", {
                    layout: false,
                    error: "Las contraseñas no coinciden"
                });

            if (result.error === "ERROR_CONTROL_CARACTERES")
                return res.render("pages/register", {
                layout: false,
                error: "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial."
            })

            if (result.error === "PASSWORD_PROHIBIDA")
                return res.render("pages/register", {
                    layout: false,
                    error: "La contraseña no puede contener palabras comunes como 'password', 'mi nombre', 'mi usuario/username', '1234' o 'qwerty'."
                });

            if (result.error === "USUARIO_EXISTENTE")
                return res.render("pages/register", {
                    layout: false,
                    error: "El nombre de usuario ya se encuentra registrado"
                });
        }

    } catch (error) {
/* Si ocurre un error, lo pasamos al middleware de manejo de errores.
Por ejemplo:
- error al ejecutar una consulta SQL
- violación de una restricción UNIQUE
- problema de acceso al archivo de la base de datos
- error durante el hashing de la contraseña*/
        next(error);

    }

}



// ======================================================
// EXPORTACIONES
// ======================================================

module.exports = {
    showRegister,
    registerUser
};