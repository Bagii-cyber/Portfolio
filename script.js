const menu = document.querySelector(".menu-button");
const links = document.querySelector(".nav-links");

if (menu && links) {
  menu.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

const form = document.querySelector("#contact-form");

if (form) {
  const error = (input, message) => {
    const field = input.closest(".field");
    field.classList.toggle("invalid", !!message);
    field.querySelector("small").textContent = message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const { name, email, subject, message } = form.elements;

    error(name, name.value.trim().length < 2 ? "Please enter at least 2 characters." : "");
    error(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "Enter a valid email address." : "");
    error(subject, subject.value.trim().length < 3 ? "Please enter a clear subject." : "");
    error(message, message.value.trim().length < 10 ? "Enter at least 10 characters." : "");

    const invalid = form.querySelector(".invalid input,.invalid textarea");
    const status = form.querySelector(".form-status");

    if (invalid) {
      status.textContent = "Please correct the highlighted fields.";
      invalid.focus();
      return;
    }

    status.textContent = "Opening your email app with the message ready to send.";
    location.href =
      "mailto:malithbhagya5@gmail.com?subject=" +
      encodeURIComponent(subject.value) +
      "&body=" +
      encodeURIComponent("From: " + name.value + " (" + email.value + ")\n\n" + message.value);
  });
}

