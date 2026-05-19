let cart = JSON.parse(localStorage.getItem("cart")) || [];
let checkedOut = JSON.parse(localStorage.getItem("checkedOut")) || [];

// Show a section and hide others
function showSection(id){
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    if(id === 'cart') displayCart();
}

// Add to cart
function addToCart(productId){
    const product = PRODUCTS.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Update cart count in navbar
function updateCartCount(){
    document.getElementById("cart-count").textContent = cart.length;
}

// Display products in catalog
function displayProducts(products){
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button class="add-btn">Add to Cart</button>
            <button class="view-btn">View</button>
        `;
        container.appendChild(div);

        // Add event listeners for buttons
        div.querySelector(".add-btn").addEventListener("click", () => addToCart(p.id));
        div.querySelector(".view-btn").addEventListener("click", () => viewProduct(p.id));
    });
}

// Display cart and checked out items
function displayCart(){
    const container = document.getElementById("cart-items");
    const checkedContainer = document.getElementById("checked-out-items");
    container.innerHTML = "";
    if(checkedContainer) checkedContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("cart-total").textContent = 0;
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement("div");
            div.classList.add("product-card");
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button class="remove-btn" style="background:red;color:white;">Delete</button>
            `;
            div.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(index));
            container.appendChild(div);
        });

        document.getElementById("cart-total").textContent = total;

        const checkoutBtn = document.createElement("button");
        checkoutBtn.textContent = "Checkout";
        checkoutBtn.style.background = "#28a745";
        checkoutBtn.style.color = "white";
        checkoutBtn.style.marginTop = "15px";
        checkoutBtn.addEventListener("click", checkout);
        container.appendChild(checkoutBtn);
    }

    if(checkedOut.length > 0 && checkedContainer){
        checkedOut.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("product-card");
            div.innerHTML = `<h3>${item.name}</h3><p>$${item.price}</p>`;
            checkedContainer.appendChild(div);
        });
    } else if(checkedContainer){
        checkedContainer.innerHTML = "<p>No purchases yet.</p>";
    }
}

// Remove item from cart
function removeFromCart(index){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Checkout
function checkout(){
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you for your purchase! Total: $${total}`);

    checkedOut = checkedOut.concat(cart);
    localStorage.setItem("checkedOut", JSON.stringify(checkedOut));

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// View product detail
function viewProduct(productId){
    const product = PRODUCTS.find(p => p.id === productId);
    const modal = document.getElementById("product-modal");
    const detail = document.getElementById("product-detail");
    detail.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:200px;border-radius:8px;">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button id="modal-add-btn">Add to Cart</button>
    `;
    document.getElementById("modal-add-btn").addEventListener("click", () => {
        addToCart(product.id);
        closeModal();
    });
    modal.classList.add("show");
}

// Close modal
function closeModal(){
    document.getElementById("product-modal").classList.remove("show");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayProducts(PRODUCTS);

    // Close modal when clicking outside modal-box
    const modal = document.getElementById("product-modal");
    modal.addEventListener("click", (e) => {
        if(e.target === modal) closeModal();
    });
});
