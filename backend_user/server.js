const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const dataFilePath = path.join(__dirname, '..', 'data.json');

const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

app.use(express.static(path.join(__dirname, '..', 'frontend_user')));

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`User сервер запущен на http://localhost:${PORT}`);
});