const {
    db
} = require(
    "../database/database.js"
)

function findByUsername(username) {
    return db.prepare(
        `
        SELECT * FROM users WHERE
        username = :username
        `
    ).get(
        {username}
    )
}

function create(user) {

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
            :password
        )
        `
    //Dado que los atributos de user se llaman igual que los valores que re proveen a la consulta, no hace falta
    //especificar que cada uno le corresponde a uno del mismo nombre:
    //username: user.username,
    //name: user.name,
    //email: user.email,
    //password: user.password
    ).run(user);
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