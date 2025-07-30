const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const cartTableBody = document.querySelector("#cart-table-body");
const clearCartBtn = document.querySelector("#clear-cart");

navToggle?.addEventListener("click", function () {
  links?.classList.toggle("show-links");
});

// Load products
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.length) {
    cartTableBody.innerHTML = `
      <tr><td colspan="6" class="text-center py-6 text-gray-500">The cart is empty</td></tr>
    `;
    return;
  }

  let rowsHTML = '';

  cart.forEach(product => {
    rowsHTML += `
      <tr class="border-b border-gray-200" data-id="${product.id}">
        <td class="px-6 py-4 flex items-center gap-2">
          <img src="${product.img}" alt="${product.title}" class="w-12 h-12 object-cover rounded" />
          <span>${product.title}</span>
        </td>
        <td class="px-6 py-4">${product.desc}</td>
        <td class="px-6 py-4 text-green-600 font-semibold">$${product.price}</td>
        <td class="px-6 py-4">
          <select class="cart-qty-select">
            ${[...Array(10)].map((_, i) => `
              <option value="${i+1}" ${product.quantity === i+1 ? 'selected' : ''}>${i+1}</option>
            `).join('')}
          </select>
        </td>
        <td class="px-6 py-4 item-total">$${(product.price * product.quantity).toFixed(2)}</td>
        <td class="px-6 py-4 text-red-500 cursor-pointer delete-item" data-id="${product.id}">Delete</td>
      </tr>
    `;
  });

  cartTableBody.innerHTML = rowsHTML;
}

// Delete product
cartTableBody?.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    const id = e.target.dataset.id;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => String(item.id) !== String(id));
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
});

// Clean the cart
clearCartBtn?.addEventListener("click", () => {
  if (confirm("Are you sure you want to clean the cart?")) {
    localStorage.removeItem("cart");
    loadCart();
  }
});

// Change quantity
cartTableBody?.addEventListener("change", (e) => {
  if (e.target.classList.contains("cart-qty-select")) {
    const row = e.target.closest("tr");
    const id = row.dataset.id;
    const newQty = parseInt(e.target.value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(p => p.id === id);
    if (item) {
      item.quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }
  }
});

loadCart();
