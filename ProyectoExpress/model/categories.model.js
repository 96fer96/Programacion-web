const {
    db
} = require(
    "../database/database.js"
);


// ======================================================
// OBTENER TODAS LAS CATEGORÍAS
// ======================================================

function getAll() {

    const statement =
        db.prepare(`
            SELECT *
            FROM categories
        `);

    return statement.all();
}


// ======================================================
// OBTENER CATEGORÍA POR ID
// ======================================================

function getById(
    id
) {

    const statement =
        db.prepare(`
            SELECT *
            FROM categories
            WHERE id = ?
        `);

    return statement.get(
        id
    );
}


// ======================================================
// CREAR CATEGORÍA
// ======================================================

function create(
    categoryData
) {

    const statement =
        db.prepare(`
            INSERT INTO categories (
                name,
                description
            )
            VALUES (?, ?)
        `);

    const result =
        statement.run(
            categoryData.name,
            categoryData.description
        );

    return getById(
        result.lastInsertRowid
    );
}


// ======================================================
// ACTUALIZAR CATEGORÍA
// ======================================================

function update(
    id,
    categoryData
) {

    const statement =
        db.prepare(`
            UPDATE categories
            SET
                name = ?,
                description = ?
            WHERE id = ?
        `);

    const result =
        statement.run(
            categoryData.name,
            categoryData.description,
            id
        );

    if (
        result.changes === 0
    ) {

        return null;
    }

    return getById(
        id
    );
}


// ======================================================
// ELIMINAR CATEGORÍA
// ======================================================

function remove(
    id
) {

    const category =
        getById(
            id
        );

    if (!category) {

        return null;
    }

    const statement =
        db.prepare(`
            DELETE FROM categories
            WHERE id = ?
        `);

    statement.run(
        id
    );

    return category;
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};