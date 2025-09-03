// Initialize sliders and navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeSliders();
  initializeMobileNav();
});

function initializeSliders() {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.parentElement.querySelector(".prev-btn");
    const nextBtn = slider.parentElement.querySelector(".next-btn");
    const dots = slider.parentElement.querySelectorAll(".slider-dot");

    if (slides.length === 0) return;

    let currentSlide = 0;

    // Show first slide
    slides[0].classList.add("active");

    function showSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      // Add active class to current slide and dot
      slides[index].classList.add("active");
      if (dots[index]) {
        dots[index].classList.add("active");
      }

      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    // Add event listeners for arrow buttons
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Add event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
      });
    });
  });
}

// Mobile Navigation - Dropdown Style
function initializeMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !navMenu) return;

  // Toggle dropdown menu
  navToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
