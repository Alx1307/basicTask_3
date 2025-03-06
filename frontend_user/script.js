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
        <p>Категория: ${product.category}</p>
      `;
      productList.appendChild(productDiv);
    });
  };

  const handleDisplayChange = async () => {
    const displayMode = document.getElementById('displaySelect').value;
    let query = '';
    if (displayMode === 'title-price') {
      query = `{ productsWithPrice { name price category } }`;
    } else if (displayMode === 'title-description') {
      query = `{ productsWithDescription { name description category } }`;
    } else {
      query = `{ products { name price description category } }`;
    }
    const data = await fetchProducts(query);
    const products = displayMode === 'title-price' ? data.productsWithPrice :
                     displayMode === 'title-description' ? data.productsWithDescription :
                     data.products;
    displayProducts(products);
  };

  const sortProductsByCategory = () => {
    const displayMode = document.getElementById('displaySelect').value;
    let products = [];
    if (displayMode === 'title-price') {
      products = [...document.querySelectorAll('.product-card')].map(card => ({
        name: card.querySelector('h2').textContent,
        price: parseFloat(card.querySelector('p').textContent.replace('Цена: $', '')),
        category: card.querySelectorAll('p')[1].textContent.replace('Категория: ', ''),
      }));
    } else if (displayMode === 'title-description') {
      products = [...document.querySelectorAll('.product-card')].map(card => ({
        name: card.querySelector('h2').textContent,
        description: card.querySelector('p').textContent.replace('Описание: ', ''),
        category: card.querySelectorAll('p')[1].textContent.replace('Категория: ', ''),
      }));
    } else {
      products = [...document.querySelectorAll('.product-card')].map(card => ({
        name: card.querySelector('h2').textContent,
        price: parseFloat(card.querySelectorAll('p')[0].textContent.replace('Цена: $', '')),
        description: card.querySelectorAll('p')[1].textContent.replace('Описание: ', ''),
        category: card.querySelectorAll('p')[2].textContent.replace('Категория: ', ''),
      }));
    }

    const sortedProducts = products.sort((a, b) => a.category.localeCompare(b.category));
    displayProducts(sortedProducts);
  };

  document.getElementById('displaySelect').addEventListener('change', handleDisplayChange);
  document.querySelector('.button1').addEventListener('click', sortProductsByCategory);

  handleDisplayChange();
});
