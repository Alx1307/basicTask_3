document.addEventListener('DOMContentLoaded', () => {
  let products = [];

  const fetchProducts = () => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        products = data;
        displayProducts(products);
      })
      .catch(error => console.error('Ошибка:', error));
  };

  const displayProducts = (productsToDisplay) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productsToDisplay.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-card');
      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        <p>Цена: $${product.price}</p>
        <p>Описание: ${product.description}</p>
        <p>Категория: ${Array.isArray(product.category) ? product.category.join(', ') : product.category}</p>
      `;
      productList.appendChild(productDiv);
    });
  };

  const sortProductsByCategory = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const categoryA = Array.isArray(a.category) ? a.category.join(', ') : a.category;
      const categoryB = Array.isArray(b.category) ? b.category.join(', ') : b.category;
      return categoryA.localeCompare(categoryB);
    });
    displayProducts(sortedProducts);
  };

  const sortButton = document.querySelector('.button1');
  sortButton.addEventListener('click', sortProductsByCategory);

  fetchProducts();
});
