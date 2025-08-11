"use strict";

//  Initialize Lucide Icons:
    lucide.createIcons();

  // Get nav height and save it as CSS variable for mobile menu
  const nav = document.querySelector(".nav");
  if (nav) {
    const navHeight = nav.offsetHeight;
    document.documentElement.style.setProperty(
      "--nav-height",
      `${navHeight}px`
    );
  }

  // Always start at top of page, not at any anchor links
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
  window.scrollTo({ top: 0, behavior: "instant" });
});

// Mobile menu stuff - hamburger, overlay, and menu links
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("nav-menu");
const overlay = document.getElementById("menu-overlay");

if (hamburger && menu && overlay) {
  // When hamburger is clicked, open or close menu
  hamburger.addEventListener("click", () => {
    const isOpening = !hamburger.classList.contains("active");

    if (isOpening) {
      hamburger.classList.add("active");
      menu.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");
    } else {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

  // When overlay is clicked (anywhere outside menu), close it
  // NOTE: Removed the e.target check - was causing bugs
  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  // When any menu link is clicked, close the menu
  const menuLinks = document.querySelectorAll(".nav__link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });
}

// Make nav background darker when scrolling down
const nav = document.querySelector(".nav");
if (nav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

// Scroll down to projects section smoothly
function scrollToNext() {
  const projectsSection = document.getElementById("projects");
  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
    });
  }
}

// Make the scroll indicator on the right clickable
const scrollIndicator = document.getElementById("scrollIndicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToNext();
  });
}

// Download CV function
function downloadCV() {
  // Add your CV download logic here
  // For now, just show an alert
  alert("CV download would start here - please add your CV file link!");
}
