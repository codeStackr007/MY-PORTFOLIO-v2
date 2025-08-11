"use strict";

// Initialize Lucide icons
lucide.createIcons();

// Set nav height as CSS variable
const nav = document.querySelector(".nav");
if (nav) {
  const navHeight = nav.offsetHeight;
  document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
}

// Scroll to top, remove hash
if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname);
}
window.scrollTo({ top: 0, behavior: "instant" });

// Mobile menu elements
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("nav-menu");
const overlay = document.getElementById("menu-overlay");

if (hamburger && menu && overlay) {
  // Open menu
  function openMenu() {
    hamburger.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
    // Add outside click listener after delay
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
  }

  // Close menu
  function closeMenu() {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("click", handleOutsideClick);
  }

  // Handle outside clicks
  function handleOutsideClick(e) {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  }

  // Toggle menu on hamburger click
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    const isOpening = !hamburger.classList.contains("active");
    if (isOpening) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Close menu on link clicks
  const menuLinks = document.querySelectorAll(".nav__link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

// Add scrolled class to nav
if (nav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

// Scroll to projects section
function scrollToNext() {
  const projectsSection = document.getElementById("projects");
  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
    });
  }
}

// Make scroll indicator clickable
const scrollIndicator = document.getElementById("scrollIndicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToNext();
  });
}

// Download CV
function downloadCV() {
  alert("CV download would start here - please add your CV file link!");
}
