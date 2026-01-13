const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

const FUNCTION_URL =
  "https://mlcdpcwxmetruidbbsqz.supabase.co/functions/v1/send-lead";

// Tu anon key (la que ya usabas en el frontend)
const SUPABASE_ANON_KEY = "sb_publishable_at5RSE6MtpExGx48HFu_lQ_MlLK3Jqs";

function setMsg(text) {
  if (formMsg) formMsg.textContent = text;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre")?.value.trim();
  const correo = document.getElementById("correo")?.value.trim();
  const telefono = document.getElementById("telefono")?.value.trim();
  const mensaje = document.getElementById("mensaje")?.value.trim();

  if (!nombre || !correo || !telefono || !mensaje) {
    setMsg("Llená todos los campos.");
    return;
  }

  setMsg("Enviando...");

  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ nombre, correo, telefono, mensaje }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Edge Function error:", data);
      throw new Error(data?.error || "Error");
    }

    setMsg("¡Listo! Revisá tu correo ✅");
    form.reset();
  } catch (err) {
    console.error(err);
    setMsg("No se pudo enviar. Intentá de nuevo.");
  }
});
