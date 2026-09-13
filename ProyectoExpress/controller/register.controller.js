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

    res.render("pages/register");

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
                error: "Las contraseñas no coinciden"
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