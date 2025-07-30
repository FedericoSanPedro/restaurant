const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const API_URL = 'https://68856436f52d34140f69bceb.mockapi.io/api/menu';

// Toggle menu
navToggle?.addEventListener("click", function () {
  links?.classList.toggle("show-links");
});

// Get menu
async function fetchMenu() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error when getting menu:', error);
    return [];
  }
}

// Show menu
function displayMenuItems(menuItems) {
  const displayMenu = menuItems.map(item => {
    return `
      <article class="menu-item">
        <img src="${item.img}" alt="${item.title}">
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
          </header>
            <p class="item-text">${item.desc}</p>
            <button class="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
      </article>
    `;
  }).join('');
  sectionCenter.innerHTML = displayMenu;
}

// Add to cart
sectionCenter?.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    const id = e.target.dataset.id;
    fetchMenu().then(menu => {
      const item = menu.find(p => String(p.id) === id);
      if (!item) return;

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(p => p.id === id);

    if (existingItem) {
        if (existingItem.quantity >= 10) {
            alert(`You are at the limit of "${item.title}".`);
            return;
        }
        existingItem.quantity += 1;
        } else {
        cart.push({ ...item, quantity: 1 });
    }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`"${item.title}"  added to cart`);
    });
  }
});

// Category button
function displayMenuButtons(menuItems) {
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const categoryBtns = categories.map(category => {
    return `<button class="filter-btn" data-category="${category}">${category}</button>`;
  }).join('');

  btnContainer.innerHTML = categoryBtns;

  const filterBtns = btnContainer.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const category = e.currentTarget.dataset.category;
      const menu = await fetchMenu();

      const filtered = category === 'all' ? menu : menu.filter(item => item.category === category);
      displayMenuItems(filtered);
    });
  });
}

// Starting app
(async () => {
  const menu = await fetchMenu();
  displayMenuItems(menu);
  displayMenuButtons(menu);
})();
