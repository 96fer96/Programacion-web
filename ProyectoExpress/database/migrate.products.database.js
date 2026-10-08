const {db} = require("./database")

const fs = require("fs");
const path = require("path");

function addProducts() {

    const filePath =
    path.join(
        __dirname,
        "../model/data/products.json"
    );

    const contenido =
        fs.readFileSync(
            filePath,
            "utf-8"
        );

    const products =
        JSON.parse(contenido);
        products.forEach(product => {
            create(product)
    })
}

function create(product) {
        db.prepare(`
        INSERT INTO products
        (
        name,
        price,
        stock,
        category,
        description,
        image,
        pedidos
        )
        VALUES(
        :name,
        :price,
        :stock,
        :category,
        :description,
        :image,
        :pedidos
        )
        `).run({
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            description: product.description,
            image: product.image,
            pedidos: product.pedidos
        }
    )
}

addProducts();
