const {
    db
} = require(
    "../database/database.js"
)

function findByUsername(username) {
    return db.prepare(
        `
        SELECT
        id,
        password
        FROM users WHERE
        username = :username
        `
    ).get(
        {username}
    )
}

function create(username, name, email, hashedPassword) {

    return db.prepare(
        `
        INSERT INTO users (
            username,
            name,
            email,
            password
        )
        VALUES (
            :username,
            :name,
            :email,
            :hashedPassword
        )
        `
    ).run({
        username,
        name,
        email,
        hashedPassword
    });
}

//Si bien esta funcion no es invocada por el service, puede ser invocada por un middleware al momento del realizar
//un session y almacenar valores
function getById(id) {
    return db.prepare(
        `
        SELECT * FROM users WHERE
        id = :id
        `
    ).get(
        {id}
    )
}

module.exports = {
    findByUsername,
    getById,
    create
};