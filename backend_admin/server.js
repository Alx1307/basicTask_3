const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const dataFilePath = path.join(__dirname, '..', 'data.json');

const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'frontend_admin')));

app.get("/products", (req, res) => {
    res.json(products);
});

app.post("/products", (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(newProduct);
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
        res.json(products[index]);
    } else {
        res.status(404).json({ message: "Товар не найден" });
    }
});

app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Товар не найден" });
    }
});


app.listen(PORT, () => {
    console.log(`Admin сервер запущен на http://localhost:${PORT}`);
})