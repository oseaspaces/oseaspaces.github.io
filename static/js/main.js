// Initialize sliders and navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeSliders();
  initializeMobileNav();
  initializeLanguageDetection();
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
    let startX = 0;

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

    // Simple touch support
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      // If swipe is more than 50px, change slide
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide(); // Swiped left
        } else {
          prevSlide(); // Swiped right
        }
      }
    });

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
  const navLinks = document.querySelectorAll(
    ".nav-link:not(.language-switcher)"
  ); // Exclude language switcher

  if (!navToggle || !navMenu) return;

  // Toggle dropdown menu
  navToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking nav links (but NOT the language switcher)
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

// Language Switcher Functionality
function initializeLanguageSwitcher() {
  // Check for stored language preference and redirect if necessary
  const storedLang = localStorage.getItem("preferredLanguage");
  const currentLang = getCurrentLanguage();

  if (storedLang && storedLang !== currentLang) {
    // Redirect to the stored language version of current page
    const currentPath = window.location.pathname;
    const newUrl = buildLanguageUrl(storedLang, currentPath);
    window.location.href = newUrl;
    return;
  }

  // Store current language if not stored yet
  if (!storedLang) {
    localStorage.setItem("preferredLanguage", currentLang);
  }
}

function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith("/fr/")) return "fr";
  if (path.startsWith("/nl/")) return "nl";
  return "en";
}

function buildLanguageUrl(targetLang, currentPath) {
  // Remove current language prefix from path
  let cleanPath = currentPath;
  if (cleanPath.startsWith("/fr/")) {
    cleanPath = cleanPath.substring(3);
  } else if (cleanPath.startsWith("/nl/")) {
    cleanPath = cleanPath.substring(3);
  }

  // Ensure path starts with /
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }

  // Build new URL with target language
  if (targetLang === "en") {
    return cleanPath;
  } else {
    return `/${targetLang}${cleanPath}`;
  }
}

function switchLanguage(targetLang) {
  // Store language preference
  localStorage.setItem("preferredLanguage", targetLang);

  // Build URL for current page in target language
  const currentPath = window.location.pathname;
  const newUrl = buildLanguageUrl(targetLang, currentPath);

  // Close dropdown
  const dropdown = document.getElementById("language-dropdown");
  if (dropdown) {
    dropdown.classList.remove("show");
  }

  // Navigate to new URL
  window.location.href = newUrl;
}

function toggleLanguageDropdown() {
  const dropdown = document.getElementById("language-dropdown");
  if (dropdown) {
    dropdown.classList.toggle("show");

    // Close dropdown when clicking outside (but not when clicking the mobile menu)
    document.addEventListener(
      "click",
      function (e) {
        if (!e.target.closest(".language-switcher")) {
          dropdown.classList.remove("show");
        }
      },
      { once: true }
    );
  }
}

function switchLanguage(targetLang) {
  // Store language preference
  localStorage.setItem("preferredLanguage", targetLang);

  // Build URL for current page in target language
  const currentPath = window.location.pathname;
  const newUrl = buildLanguageUrl(targetLang, currentPath);

  // Close dropdown
  const dropdown = document.getElementById("language-dropdown");
  if (dropdown) {
    dropdown.classList.remove("show");
  }

  // Close mobile menu if open
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }

  // Navigate to new URL
  window.location.href = newUrl;
}

// Language Detection and Cookie Management
function getLanguageCookie() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "lang") {
      return value;
    }
  }
  return null;
}

function setLanguageCookie(lang) {
  // Set cookie for 1 year
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `lang=${lang}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function detectLanguageFromAcceptHeader() {
  // Get browser's preferred languages
  const browserLanguages = navigator.languages || [navigator.language];
  const supportedLanguages = ["en", "fr", "nl"];

  for (let browserLang of browserLanguages) {
    // Extract 2-letter language code
    const langCode = browserLang.split("-")[0].toLowerCase();
    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }
  }

  // Default to English if no match
  return "en";
}

function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith("/fr/")) return "fr";
  if (path.startsWith("/nl/")) return "nl";
  return "en";
}

function initializeLanguageDetection() {
  const currentLang = getCurrentLanguage();
  let targetLang = currentLang;

  // 1. Check for existing language cookie
  const cookieLang = getLanguageCookie();

  if (cookieLang) {
    // Use cookie language if it exists
    targetLang = cookieLang;
  } else {
    // 2. No cookie: detect from Accept-Language header
    const detectedLang = detectLanguageFromAcceptHeader();
    targetLang = detectedLang;

    // Don't set cookie here - only set when manually changed
  }

  // Redirect if target language differs from current
  if (targetLang !== currentLang) {
    const currentPath = window.location.pathname;
    const newUrl = buildLanguageUrl(targetLang, currentPath);
    window.location.href = newUrl;
  }
}

function switchLanguage(targetLang) {
  // Set cookie ONLY when language is manually changed
  setLanguageCookie(targetLang);

  // Build URL for current page in target language
  const currentPath = window.location.pathname;
  const newUrl = buildLanguageUrl(targetLang, currentPath);

  // Close dropdown
  const dropdown = document.getElementById("language-dropdown");
  if (dropdown) {
    dropdown.classList.remove("show");
  }

  // Close mobile menu if open
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }

  // Navigate to new URL
  window.location.href = newUrl;
}
