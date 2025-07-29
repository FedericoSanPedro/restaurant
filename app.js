const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

const API_URL = 'https://68856436f52d34140f69bceb.mockapi.io/api/menu';

//  Función para obtener el menú desde MockAPI
async function fetchMenu() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el menú:', error);
    return [];
  }
}

// Función principal
async function displayMenuApp() {
  const menu = await fetchMenu();
  displayMenuItems(menu);
  displayMenuButtons(menu);
}

// Funcion del toggle
navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

// Renderizar platos en el DOM
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
            <p class="item-text">
              ${item.desc}
            </p>
        </div>
      </article>
    `;
  }).join('');

  sectionCenter.innerHTML = displayMenu;
}

// Crear botones de filtro dinámicos
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

      const filtered = category === 'all'
        ? menu
        : menu.filter(item => item.category === category);

      displayMenuItems(filtered);
    });
  });
}

// Iniciar app
displayMenuApp();



