"use strict";

// Wait for DOM to load before initializing icons
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

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

// Force hero animations on load/reload
window.addEventListener("load", () => {
  const heroElements = document.querySelectorAll(
    ".hero--content, .hero__title, .hero__decorative-line, .hero__text, .hero__cta"
  );
  heroElements.forEach((el) => {
    el.classList.remove("animate-in"); // Reset
    el.offsetHeight; // Trigger reflow
    el.classList.add("animate-in"); // Immediately re-apply
  });
});

// Mobile menu elements
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("nav-menu");

if (hamburger && menu) {
  // Open menu
  function openMenu() {
    hamburger.classList.add("active");
    menu.classList.add("active");
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

// Scroll animations for hero and projects sections
const animateElements = document.querySelectorAll(
  ".hero--content, .hero__title, .hero__decorative-line, .hero__text, .hero__cta, .projects__title, .decorative__line, .projects__description, .project__card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      } else {
        entry.target.classList.remove("animate-in"); // Remove to re-trigger on scroll-up
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: "0px 0px -50px 0px", // Slight offset for smoothness
  }
);

animateElements.forEach((el) => observer.observe(el));
