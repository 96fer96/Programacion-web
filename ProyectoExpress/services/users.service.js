const usersModel =
    require("../model/users.model");
//Esta línea de código importa el módulo bcryptjs, que es una biblioteca de JavaScript utilizada para encriptar y 
// verificar contraseñas de manera segura.
const bcrypt =
    require("bcrypt");

const SALT_ROUNDS =
    Number(
        process.env.BCRYPT_SALT_ROUNDS
    ) || 10;

function registerUser(
    userData
) {

    // ==================================================
    // VALIDAR CAMPOS OBLIGATORIOS
    // ==================================================

    if (
        !userData.username ||
        !userData.name ||
        !userData.email ||
        !userData.password ||
        !userData.confirmPassword
    ) {

        return {
            success: false,
            error:
                "CAMPOS_OBLIGATORIOS"
        };
    }


    // ==================================================
    // VALIDAR COINCIDENCIA DE CONTRASEÑAS
    // ==================================================

    if (
        !comparePassword(
            userData.password,
            userData.confirmPassword
        )
    ) {

        return {
            success: false,
            error:
                "PASSWORD_DIFERENTES"
        };
    }


    // ==================================================
    // VALIDAR COMPLEJIDAD
    // ==================================================

    if (
        !controlCaracteres(
            userData.password
        )
    ) {

        return {
            success: false,
            error:
                "ERROR_CONTROL_CARACTERES"
        };
    }


    // ==================================================
    // VALIDAR CONTRASEÑAS PROHIBIDAS
    // ==================================================

    if (
        !controlForbiddenPassword(
            userData.password
        )
    ) {

        return {
            success: false,
            error:
                "PASSWORD_PROHIBIDA"
        };
    }


    // ==================================================
    // VALIDAR USERNAME DUPLICADO
    // ==================================================

    if (
        existingUser(
            userData.username
        )
    ) {

        return {
            success: false,
            error:
                "USUARIO_EXISTENTE"
        };
    }


    // ==================================================
    // VALIDAR EMAIL DUPLICADO
    // ==================================================

    if (
        existingEmail(
            userData.email
        )
    ) {

        return {
            success: false,
            error:
                "EMAIL_EXISTENTE"
        };
    }


    // ==================================================
    // HASHEAR CONTRASEÑA
    // ==================================================

    const hashedPassword =
        hashPassword(
            userData.password
        );


    // ==================================================
    // ASIGNAR ROL
    // ==================================================

    const role =
        "consumer";


    // ==================================================
    // CREAR USUARIO
    // ==================================================

    usersModel.create(
        userData.username,
        userData.name,
        userData.email,
        hashedPassword,
        role
    );


    return {
        success: true
    };
}

function comparePassword(password, confirmPassword) {
    if (password!== confirmPassword) {
        return false;
    } return true;
}

function controlCaracteres(password) {
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

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialCharacter || password.length < 8) {
        return false
    }
    return true
}

function controlForbiddenPassword(password) {
    const hasForbiddenPassword =
        /(1234|password|qwerty)/i.test(password);

    if (hasForbiddenPassword) {
        return false
    }
    return true
}

function existingUser(username) {
    if (usersModel.findByUsername(username)) {
        return true;
    }
    return false
}

function hashPassword(
    password
) {

    return bcrypt.hashSync(
        password,
        SALT_ROUNDS
    );
}
function processLogin(data) {

    const user =
        usersModel.findByUsername(
            data.username
        );


    if (!user) {

        return {
            success: false,
            error: "USUARIO_INCORRECTO"
        };
    }


    if (!bcrypt.compareSync(
        data.password,
        user.password
    )) {

        return {
            success: false,
            error: "PASSWORD_INCORRECTO"
        };
    }


    return {
        success: true,
        userId: user.id
    };
}

function existingEmail(
    email
) {

    if (
        usersModel.findByEmail(
            email
        )
    ) {

        return true;
    }

    return false;
}

module.exports = {
    registerUser,
    processLogin
}