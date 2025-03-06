const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema'); // Импортируем схему и резолверы
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Создание сервера Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Применение middleware Apollo к приложению Express
server.start().then(() => {
  server.applyMiddleware({ app });

  // Обслуживание статических файлов
  app.use(express.static(path.join(__dirname, '..', 'frontend_user')));

  // Обслуживание HTML-файла по умолчанию
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend_user', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  });
});
