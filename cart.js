// ✅ cart.js

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const cartTableBody = document.querySelector("#cart-table-body");

navToggle?.addEventListener("click", function () {
  links?.classList.toggle("show-links");
});

// Cargar productos del carrito
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.length) {
    cartTableBody.innerHTML = `
      <tr><td colspan="6" class="text-center py-6 text-gray-500">El carrito está vacío</td></tr>
    `;
    return;
  }

  cartTableBody.innerHTML = cart.map(product => `
    <tr class="border-b border-gray-200">
      <td class="px-6 py-4 flex items-center gap-2">
        <img src="${product.img}" alt="${product.title}" class="w-12 h-12 object-cover rounded" />
        <span>${product.title}</span>
      </td>
      <td class="px-6 py-4">${product.desc}</td>
      <td class="px-6 py-4 text-green-600 font-semibold">$${product.price}</td>
      <td class="px-6 py-4">${product.quantity}</td>
      <td class="px-6 py-4">$${(product.price * product.quantity).toFixed(2)}</td>
      <td class="px-6 py-4 text-red-500 cursor-pointer delete-item" data-id="${product.id}">Delete</td>
    </tr>
  `).join('');
}

// Eliminar producto del carrito
cartTableBody?.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    const id = e.target.dataset.id;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
});

loadCart();
