const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const backToTop = document.querySelector(".back-to-top");
const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".top-nav a, .mobile-menu a");

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

const modal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const closeModal = document.querySelector(".modal-close");

document.querySelectorAll(".image-button").forEach((button) => {
  button.addEventListener("click", () => {
    modalImage.src = button.dataset.modalImage;
    modalImage.alt = button.querySelector("img").alt;
    modalTitle.textContent = button.dataset.modalTitle;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    hideModal();
  }
});

const exhibitSteps = [
  "Start with the object itself: what do you notice first?",
  "Look for details that reveal time, place, labor, power, or identity.",
  "Connect the object to a larger historical change or conflict.",
  "End by explaining why this evidence still matters today."
];

let currentStep = 0;
const stepText = document.querySelector("#step-text");
const progressBar = document.querySelector("#progress-bar");
const nextButton = document.querySelector("#next");
const restartButton = document.querySelector("#restart");

function updateInteractiveStep() {
  stepText.textContent = exhibitSteps[currentStep];
  const progress = ((currentStep + 1) / exhibitSteps.length) * 100;
  progressBar.style.width = `${progress}%`;
}

nextButton.addEventListener("click", () => {
  currentStep = (currentStep + 1) % exhibitSteps.length;
  updateInteractiveStep();
});

restartButton.addEventListener("click", () => {
  currentStep = 0;
  updateInteractiveStep();
});

updateInteractiveStep();
