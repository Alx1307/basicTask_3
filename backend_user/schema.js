// schema.js
const { gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data.json');
const products = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

const typeDefs = gql`
  type Product {
    name: String
    price: Float
    description: String
    category: String
  }

  type Query {
    products: [Product]
    productsWithPrice: [Product]
    productsWithDescription: [Product]
  }
`;

const resolvers = {
  Query: {
    products: () => products,
    productsWithPrice: () => products.map(product => ({
      name: product.name,
      price: product.price,
      category: product.category,
    })),
    productsWithDescription: () => products.map(product => ({
      name: product.name,
      description: product.description,
      category: product.category,
    })),
  },
};

module.exports = { typeDefs, resolvers };
