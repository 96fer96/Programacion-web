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

function create(product) {
    const { name, description, price, category } = product;
    const result = db.prepare(
        'INSERT INTO products (name, description, price, category) VALUES (:name, :description, :price, :category)'
    ).run(
        { name, description, price, category }
    );
    return { ...product, id: result.lastInsertRowid };
}

function update(id, product) {
    const { name, description, price, category } = product;
    const result = db.prepare(
        'UPDATE products SET name = :name, description = :description, price = :price, category = :category WHERE id = :id'
    ).run(
        { name, description, price, category, id }
    );
    return { ...product, id };
}

function remove(id) {
    const result = db.prepare(
        'DELETE FROM products WHERE id = :id'
    ).run(
        { id }
    );
    return result;
}

module.exports = {
    getAll,
    getById,
    getByCategory,
    search,
    create,
    update,
    remove
};