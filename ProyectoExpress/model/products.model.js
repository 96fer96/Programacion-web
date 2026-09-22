//fs es el módulo nativo de Node para trabajar con archivos.
const fs = require("fs");

//path sirve para construir rutas de archivos correctamente.
const path = require("path");


const productsPath = path.join(
    __dirname,
    "data",
    "products.json"
);


function getAll() {

    //lee el archivo como texto.
    const data = fs.readFileSync(
        productsPath,
        "utf-8"
    );

    //convierte el texto en un objeto de JavaScript.
    return JSON.parse(data);
}


function getById(id) {

    const products = getAll();

    return products.find(
        product => product.id === id
    );

}


function getByCategory(category) {

    const products = getAll();

    return products.filter(
        product => product.category === category
    );

}


// Buscar productos por texto
function search(query) {

    const products = getAll();

    const text = query
        .toLowerCase()
        .trim();


    return products.filter(product => {

        return (
            product.name
                .toLowerCase()
                .includes(text)

            ||

            product.description
                .toLowerCase()
                .includes(text)

            ||

            product.category
                .toLowerCase()
                .includes(text)
        );

    });

}

module.exports = {
    getAll,
    getById,
    getByCategory,
    search
};