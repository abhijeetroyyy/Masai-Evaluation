document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const sortOrder = document.getElementById('sortOrder');

    let products = [];
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        });
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        });
    categoryFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    sortOrder.addEventListener('change', sortProducts);
    function displayProducts(productsToDisplay) {
        productList.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price : $${product.price}</p>
            `;
            productList.appendChild(productItem);
        });
    }

    function filterProducts() {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        let filteredProducts = products;

        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm));
        }

        displayProducts(filteredProducts);
    }

    function sortProducts() {
        const order = sortOrder.value;
        const sortedProducts = [...products];

        if (order === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(sortedProducts);
    }
});



