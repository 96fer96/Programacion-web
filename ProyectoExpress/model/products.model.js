const {
    db
} = require(
    "../database/database.js"
)

function getAll() {
    return db.prepare(
        'SELECT * FROM products'
    ).all()
}


function getById(id) {
    return db.prepare(
        `SELECT * FROM products WHERE
        id = :id`
    ).get(
        {id}
    )
}

function getByCategory(category) {
    return db.prepare(
        `SELECT * FROM products WHERE 
        category = :category`
    ).all(
        {category}
    )
}

// Buscar productos por texto
function search(query) {
    const buscar = `%${query}%`
    return db.prepare(
        `SELECT * FROM products WHERE
        name LIKE :buscar
        OR category LIKE :buscar
        OR description LIKE :buscar`
    ).all(
        {buscar}
    )
}

module.exports = {
    getAll,
    getById,
    getByCategory,
    search
};