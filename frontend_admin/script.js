document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const addButton = document.getElementById('add-button');
    const editButton = document.getElementById('edit-button');
    const deleteButton = document.getElementById('delete-button');

    let selectedProductId = null;

    function loadProducts() {
        fetch('/products')
            .then(response => response.json())
            .then(products => {
                productList.innerHTML = '';
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product-card');
                    productDiv.dataset.id = product.id;
                    productDiv.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>Id: ${product.id}</p>
                        <p>Цена: $${product.price}</p>
                        <p>Описание: ${product.description}</p>
                        <p>Категория: ${Array.isArray(product.category) ? product.category.join(', ') : product.category}</p>
                    `;
                    productDiv.addEventListener('click', () => {
                        selectedProductId = product.id;
                        highlightSelectedProduct(productDiv);
                    });
                    productList.appendChild(productDiv);
                });
            })
            .catch(error => console.error('Ошибка:', error));
    }

    function highlightSelectedProduct(productDiv) {
        const allProducts = document.querySelectorAll('.product-card');
        allProducts.forEach(div => div.classList.remove('selected'));
        productDiv.classList.add('selected');
    }

    addButton.addEventListener('click', () => {
        const newProduct = {
            name: prompt('Введите название товара:'),
            price: parseFloat(prompt('Введите цену товара:')),
            description: prompt('Введите описание товара:'),
            category: prompt('Введите категорию товара:')
        };
        fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(product => {
            loadProducts();
        })
        .catch(error => console.error('Ошибка:', error));
    });

    editButton.addEventListener('click', () => {
        if (selectedProductId) {
            const updatedProduct = {
                name: prompt('Введите новое название товара:'),
                price: parseFloat(prompt('Введите новую цену товара:')),
                description: prompt('Введите новое описание товара:'),
                category: prompt('Введите новую категорию товара:')
            };
            fetch(`/products/${selectedProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            })
            .then(response => response.json())
            .then(product => {
                loadProducts();
            })
            .catch(error => console.error('Ошибка:', error));
        } else {
            alert('Выберите товар для редактирования.');
        }
    });

    deleteButton.addEventListener('click', () => {
        if (selectedProductId) {
            fetch(`/products/${selectedProductId}`, {
                method: 'DELETE'
            })
            .then(() => {
                loadProducts();
            })
            .catch(error => console.error('Ошибка:', error));
        } else {
            alert('Выберите товар для удаления.');
        }
    });

    loadProducts();
});
