// ======================================================
// MODELOS Y DEPENDENCIAS
// ======================================================

const usersModel =
    require("../model/users.model");

//Esta línea de código importa el módulo bcryptjs, que es una biblioteca de JavaScript utilizada para encriptar y 
// verificar contraseñas de manera segura.
const bcrypt =
    require("bcryptjs");



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

async function registerUser(req, res, next) {

    try {

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
                layout: false,
                error: "Las contraseñas no coinciden"
            });

        }

        //Declaro expresiones regulares mediante la funcion test(), la cual, aplicada a una determinada cadena de 
        // texto, devuelve true si la cadena cumple con el patrón definido por la expresión regular, o false en caso contrario.
        const hasUppercase =
        /[A-Z]/.test(password);

        const hasLowercase =
            /[a-z]/.test(password);

        const hasNumber =
            /[0-9]/.test(password);

        const hasSpecialCharacter =
            /[^a-zA-Z0-9]/.test(password);

        const hasForbiddenPassword =
            /(1234|password|qwerty)/i.test(password);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialCharacter || password.length < 8) {
            return res.render("pages/register", {
                error: "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial."
            })
        }

        if (hasForbiddenPassword) {
            return res.render("pages/register", {
                error: "La contraseña no puede contener palabras comunes como 'password', 'mi nombre', 'mi usuario/username', '1234' o 'qwerty'."
            });
        }

        // Buscamos si el usuario ya existe
        const existingUser =
            await usersModel.findByUsername(
                username
            );

        if (existingUser) {

            return res.render("pages/register", {
                error: "El nombre de usuario ya se encuentra registrado"
            });

        }

        // Encriptamos la contraseña
        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        // Creamos el nuevo usuario
        const newUser = {

            id: Date.now(),

            username: username,

            name: name,

            email: email,

            password: hashedPassword

        };


        // Guardamos en users.json
        await usersModel.create(
            newUser
        );


        // Una vez registrado, enviamos al login
        res.redirect("/login");


    } catch (error) {
// Si ocurre un error, lo pasamos al middleware de manejo de errores, ya que una operación asincrónica puede fallar. 
// por users.json no existe
// no hay permisos
// JSON corrupto
// problema de escritura
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