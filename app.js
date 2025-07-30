document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".links");

  if (navToggle && links) {
    navToggle.addEventListener("click", () => {
      links.classList.toggle("show-links");
    });
  }

  const buyNowButton = document.querySelector(".buy-now");
  if (buyNowButton) {
    buyNowButton.addEventListener("click", () => {
      // Redirigir a la tienda por ejemplo
      window.location.href = "shop.html";
    });
  }
});