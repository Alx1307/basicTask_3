const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data.json');
const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

const schema = buildSchema(`
  type Product {
    name: String
    price: Float
    description: String
  }

  type Query {
    products: [Product]
  }
`);

const root = {
  products: () => products.map(product => ({
    name: product.name,
    price: product.price,
    description: product.description
  }))
};

module.exports = { schema, root };
