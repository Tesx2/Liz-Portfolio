// script.js

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }

  // Add staggered reveal effect
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el, i) => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 80) {
        setTimeout(() => el.classList.add("active"), i * 150);
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// ----- Contact Form Submission with Toast -----
const contactForm = document.querySelector(".contact-form");
const toast = document.getElementById("toast");

// Function to show toast
function showToast(message, type = "success") {
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.className = "toast";
  }, 4000);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showToast("Thank you! Your message has been sent successfully 💜", "success");
        contactForm.reset();
      } else {
        showToast("Oops! Something went wrong. Please try again.", "error");
      }
    } catch {
      showToast("Network error — please check your connection.", "error");
    }
  });
}

// Auto-update footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
