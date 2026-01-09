document.addEventListener("DOMContentLoaded", () => {
  // ===== Siempre DARK =====
  document.body.classList.add("dark");

  // ===== Form Submit + Validación =====
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formMsg"); // ✅ este es el id correcto

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll("input[required], textarea[required]");
    let ok = true;

    fields.forEach((el) => {
      el.classList.remove("invalid");

      const value = el.value.trim();
      if (value === "") {
        ok = false;
        el.classList.add("invalid");
      }

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
        status.textContent =
          "Revisá los campos marcados. Falta información o hay un correo inválido.";
        status.style.color = "rgba(255, 80, 80, .95)";
      }
      return;
    }

    if (status) {
      status.textContent = "¡Gracias! Te contactamos pronto ✅";
      status.style.color = "rgba(120, 255, 180, .95)";
    }

    form.reset();
  });
});
