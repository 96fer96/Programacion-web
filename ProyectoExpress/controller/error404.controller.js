

function showError404 (req, res) {
    res.status(404).render("pages/error404");
}

module.exports = {
    showError404
};