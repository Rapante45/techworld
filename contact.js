import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://mlcdpcwxmetruidbbsqz.supabase.co";
const SUPABASE_KEY = "sb_publishable_at5RSE6MtpExGx48HFu_lQ_MlLK3Jqs"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

if (!form) {
  console.error("No existe #contactForm en el HTML");
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre")?.value.trim();
  const correo = document.getElementById("correo")?.value.trim();
  const telefono = document.getElementById("telefono")?.value.trim();
  const mensaje = document.getElementById("mensaje")?.value.trim();

  console.log("Datos:", { nombre, correo, telefono, mensaje });

  // Como pusiste NOT NULL en casi todo, validamos
  if (!nombre || !correo || !telefono || !mensaje) {
    if (formMsg) formMsg.textContent = "Llená todos los campos.";
    return;
  }

  if (formMsg) formMsg.textContent = "Enviando...";

  const { data, error } = await supabase.from("leads").insert([
    { nombre, correo, telefono, mensaje }
  ]);

  console.log("Respuesta:", { data, error });

  if (error) {
    if (formMsg) formMsg.textContent = "Error: " + error.message;
    return;
  }

  if (formMsg) formMsg.textContent = "¡Listo! Te contactaremos pronto ✅";
  form.reset();
});
