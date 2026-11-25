const {
    db
} = require(
    "../database/database.js"
);


// ======================================================
// BUSCAR USUARIO POR USERNAME
// ======================================================

function findByUsername(username) {

    return db.prepare(`
        SELECT
            id,
            username,
            password,
            role
        FROM users
        WHERE username = :username
    `).get({
        username
    });
}


// ======================================================
// BUSCAR USUARIO POR EMAIL
// ======================================================

function findByEmail(
    email
) {

    return db.prepare(
        `
        SELECT
            id,
            username,
            name,
            email,
            password,
            role
        FROM users
        WHERE email = :email
        `
    ).get(
        {
            email
        }
    );
}


// ======================================================
// CREAR USUARIO
// ======================================================

function create(
    username,
    name,
    email,
    hashedPassword,
    role
) {

    return db.prepare(
        `
        INSERT INTO users (
            username,
            name,
            email,
            password,
            role
        )
        VALUES (
            :username,
            :name,
            :email,
            :hashedPassword,
            :role
        )
        `
    ).run({
        username,
        name,
        email,
        hashedPassword,
        role
    });
}


// ======================================================
// OBTENER USUARIO POR ID
// ======================================================

// Si bien esta función no es invocada actualmente por el Service,
// puede ser utilizada posteriormente por middleware o mecanismos
// de autenticación/sesión para recuperar los datos del usuario.

function getById(
    id
) {

    return db.prepare(
        `
        SELECT *
        FROM users
        WHERE id = :id
        `
    ).get(
        {
            id
        }
    );
}


module.exports = {
    findByUsername,
    findByEmail,
    getById,
    create
};