// js/counter.js  ← Replace the entire file with this
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 97; // Adjust speed: lower = faster

  const countUp = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / speed;

    const update = () => {
      if (count < target) {
        count += increment;
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  };

  // Check if element is in viewport
  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Start counting when page loads if stats are already visible
  const startCountersIfVisible = () => {
    counters.forEach(counter => {
      if (isInViewport(counter) && counter.textContent === "0") {
        countUp(counter);
      }
    });
  };

  // Also trigger on scroll (for users who scroll down later)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".stat-number");
        if (counter && counter.textContent === "0") {
          countUp(counter);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Observe each stat item
  document.querySelectorAll(".stat-item").forEach(item => observer.observe(item));

  // Run immediately in case hero is already visible
  startCountersIfVisible();
});


// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.menu-overlay');
const closeBtn = document.querySelector('.close-menu');

function openMenu() {
  hamburger.classList.add('active');
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Keep active nav highlight working on mobile too
document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});