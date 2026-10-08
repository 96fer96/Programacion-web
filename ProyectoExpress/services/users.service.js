const usersModel =
    require("../model/users.model");
//Esta línea de código importa el módulo bcryptjs, que es una biblioteca de JavaScript utilizada para encriptar y 
// verificar contraseñas de manera segura.
const bcrypt =
    require("bcryptjs");

function registerUser(userData) {
    if (!comparePassword(userData.password, userData.confirmPassword)) {
        return {
            success: false,
            error: "PASSWORD_DIFERENTES"
        }
    }

    if (!controlCaracteres(userData.password))
        return {
            success: false,
            error: "ERROR_CONTROL_CARACTERES"
        }

    if (!controlForbiddenPassword(userData.password))
        return {
            success: false,
            error: "PASSWORD_PROHIBIDA"
        }

    if (existingUser(userData.username)) {
        return {
            success: false,
            error: "USUARIO_EXISTENTE"
        }
    }

    const hashedPassword = hashPassword(userData.password);

    usersModel.create(
        userData.username,
        userData.name,
        userData.email,
        hashedPassword
    );

    return {
        success: true,
    }

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

function hashPassword(password) {
    return bcrypt.hashSync(
                password,
                10
            )
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

module.exports = {
    registerUser,
    processLogin
}