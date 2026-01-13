const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

const FUNCTION_URL =
  "https://mlcdpcwxmetruidbbsqz.supabase.co/functions/v1/send-lead";

const SUPABASE_ANON_KEY = "sb_publishable_at5RSE6MtpExGx48HFu_lQ_MlLK3Jqs";

function setMsg(text) {
  if (formMsg) formMsg.textContent = text;
}

if (!form) {
  console.error("❌ No se encontró #contactForm en el HTML");
} else {
  console.log("✅ contact.js cargado y form encontrado");
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
        "apikey": SUPABASE_ANON_KEY
        // 👇 NO mandamos Authorization porque anon_key NO es JWT
      },
      body: JSON.stringify({ nombre, correo, telefono, mensaje }),
    });

    const text = await res.text(); // para ver errores aunque no sea JSON
    console.log("Status:", res.status);
    console.log("Response:", text);

    if (!res.ok) {
      setMsg(`No se pudo enviar (HTTP ${res.status}).`);
      return;
    }

    setMsg("¡Listo! Revisá tu correo ✅");
    form.reset();
  } catch (err) {
    console.error(err);
    setMsg("No se pudo enviar. Intentá de nuevo.");
  }
});
