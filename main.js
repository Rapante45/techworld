document.addEventListener("DOMContentLoaded", () => {
  // ===== Toggle Theme =====
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("tw_theme");

  function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);

    if (themeToggle) {
      const icon = themeToggle.querySelector(".theme-toggle__icon");
      const text = themeToggle.querySelector(".theme-toggle__text");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙";
      if (text) text.textContent = isDark ? "Light" : "Dark";
    }

    localStorage.setItem("tw_theme", isDark ? "dark" : "light");
  }

  if (savedTheme === null) {
  setTheme(true); // dark por defecto
} else {
  setTheme(savedTheme === "dark");
}

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(!document.body.classList.contains("dark"));
    });
  }

  // ===== Fake Form Submit + Validación =====
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formMsg");


  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fields = form.querySelectorAll("input[required], textarea");
      let ok = true;

      fields.forEach((el) => {
        el.classList.remove("invalid");

        // Validación mínima:
        const value = el.value.trim();
        if (el.hasAttribute("required") && value === "") {
          ok = false;
          el.classList.add("invalid");
        }

        // Validación simple de email
        if (el.type === "email" && value !== "") {
          const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          if (!emailOk) {
            ok = false;
            el.classList.add("invalid");
          }
        }
      });

      if (!ok) {
        if (status) {
          status.textContent = "Revisá los campos marcados. Falta información o hay un correo inválido.";
          status.style.color = "rgba(255, 80, 80, .95)";
        }
        return;
      }

      // Mensaje fake de éxito
      if (status) {
        status.textContent = "¡Gracias! Te contactamos pronto ✅";
        status.style.color = "rgba(120, 255, 180, .95)";
      }

      // Limpia el form (opcional)
      form.reset();
    });
  }
});
