(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll("[data-note-link]").forEach((link) => {
    const url = window.OFFSTAGE_LOVE?.noteMagazineUrl;
    if (url) {
      link.setAttribute("href", url);
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-disabled");
      link.textContent = "noteマガジンへ";
    } else {
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-disabled");
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });
})();
