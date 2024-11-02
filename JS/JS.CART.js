// JS.CART.js

let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: 1,
            name: 'Flower Pot',
            price: 120.00
        };
        addToCart(product);
        showModal();
    });
});

document.querySelector('.close').addEventListener('click', () => {
    closeModal();
});

document.querySelector('.buy-button').addEventListener('click', () => {
    buyProducts();
});

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeFromCart(product.id);
        });
        li.appendChild(removeButton);
        cartList.appendChild(li);
        total += product.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function showModal() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

function buyProducts() {
    fetch('/api/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Purchase successful:', data);
        cart = [];
        updateCart();
        closeModal();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
