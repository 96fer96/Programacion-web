const {db} = require("./database.js")

function createCategoriesTable() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        )
    `);
}
/*
function insertInitialCategories() {
    const initialCategories = [
        { name: "Electronica", description: "Dispositivos electrónicos y gadgets" },
        { name: "Indumentaria", description: "Vestimenta y accesorios" },
        { name: "Alimentos", description: "Alimentos" },
        { name: "Bebidas", description: "Bebidas y licores" },
        { name: "Juegos", description: "Juegos y juguetes" },
        { name: "Automotor", description: "Productos relacionados con automóviles" },
        { name: "Hogar", description: "Productos para el hogar" },
        { name: "Otros", description: "Categoría para productos diversos" }
    ];
    db.exec(`
        INSERT INTO categories (name, description)
        VALUES ${initialCategories.map(cat => `('${cat.name}', '${cat.description}')`).join(', ')}
    `);
}

createCategoriesTable();
insertInitialCategories();

function addColumnsToUsers() {
    db.exec(`
        ALTER TABLE users
        ADD COLUMN created_at DATETIME
    `);


    db.exec(`
        UPDATE users
        SET created_at = CURRENT_TIMESTAMP
        WHERE created_at IS NULL
    `);
}

addColumnsToUsers();*/