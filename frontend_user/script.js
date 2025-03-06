document.addEventListener('DOMContentLoaded', () => {
  const fetchProducts = async (query) => {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const { data } = await response.json();
    return data;
  };

  const displayProducts = (productsToDisplay) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productsToDisplay.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-card');
      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        ${product.price !== undefined ? `<p>Цена: $${product.price}</p>` : ''}
        ${product.description !== undefined ? `<p>Описание: ${product.description}</p>` : ''}
      `;
      productList.appendChild(productDiv);
    });
  };

  const handleDisplayChange = async () => {
    const displayMode = document.getElementById('displaySelect').value;
    let query = '';
    if (displayMode === 'title-price') {
      query = `{ productsWithPrice { name price } }`;
    } else if (displayMode === 'title-description') {
      query = `{ productsWithDescription { name description } }`;
    }
    const data = await fetchProducts(query);
    const products = displayMode === 'title-price' ? data.productsWithPrice : data.productsWithDescription;
    displayProducts(products);
  };

  document.getElementById('displaySelect').addEventListener('change', handleDisplayChange);

  // Initial load
  handleDisplayChange();
});
