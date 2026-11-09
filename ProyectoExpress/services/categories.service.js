const categoriesModel = require('../models/categories.model');

function getAll() {
    return categoriesModel.getAll();
}

function getById(id) {
    return categoriesModel.getById(id);
}

function create(categoryData) {
    return categoriesModel.create(categoryData);
}

function update(id, categoryData) {
    return categoriesModel.update(id, categoryData);
}

function remove(id) {
    return categoriesModel.remove(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};