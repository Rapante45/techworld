const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

// URL de tu Edge Function (ya la tenés funcionando)
const FUNCTION_URL =
  "https://mlcdpcwxmetruidbbsqz.supabase.co/functions/v1/send-lead";

function setMsg(text) {
  if (formMsg) formMsg.textContent = text;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre")?.value.trim();
  const correo = document.getElementById("correo")?.value.trim();
  const telefono = document.getElementById("telefono")?.value.trim();
  const mensaje = document.getElementById("mensaje")?.value.trim();

  // Validación simple
  if (!nombre || !correo || !telefono || !mensaje) {
    setMsg("Llená todos los campos.");
    return;
  }

  setMsg("Enviando...");

  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, telefono, mensaje }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Error al enviar");
    }

    setMsg("¡Listo! Revisá tu correo ✅");
    form.reset();
  } catch (err) {
    console.error(err);
    setMsg("No se pudo enviar. Intentá de nuevo.");
  }
});
