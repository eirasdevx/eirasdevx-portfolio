// Año automático
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Menú móvil
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

// Formulario: redirige a la sección de contacto o abre cliente
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  window.open("https://eirasdevx.netlify.app/contact", "_blank", "noopener");
});
