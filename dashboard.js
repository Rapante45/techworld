import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://mlcdpcwxmetruidbbsqz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_at5RSE6MtpExGx48HFu_lQ_MlLK3Jqs"; // <-- pegá la real

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
const refreshBtn = document.getElementById("refreshBtn");
const leadsBody = document.getElementById("leadsBody");
const dashMsg = document.getElementById("dashMsg");

function setMsg(text) {
  if (dashMsg) dashMsg.textContent = text || "";
}

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString();
}

async function protectPage() {
  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    window.location.href = "/panel/";
    return null;
  }

  userEmail.textContent = data.session.user.email ?? "(sin email)";
  return data.session;
}

async function loadLeads() {
  setMsg("Cargando leads...");
  leadsBody.innerHTML = "";

  const { data, error } = await supabase
    .from("leads")
    .select("id,nombre,correo,telefono,mensaje,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error(error);
    setMsg("Error cargando leads: " + error.message);
    return;
  }

  if (!data || data.length === 0) {
    setMsg("Aún no hay contactos guardados.");
    return;
  }

  setMsg(`Mostrando ${data.length} lead(s).`);

  leadsBody.innerHTML = data
    .map(
      (l) => `
      <tr>
        <td class="fecha">${escapeHtml(formatDate(l.created_at))}</td>
        <td>${escapeHtml(l.nombre || "")}</td>
        <td>${escapeHtml(l.correo || "")}</td>
        <td class="telefono">${escapeHtml(l.telefono || "")}</td>
        <td class="mensaje">${escapeHtml(l.mensaje || "")}</td>
      </tr>
    `
    )
    .join("");
}

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "/panel/";
});

refreshBtn?.addEventListener("click", loadLeads);

(async () => {
  const session = await protectPage();
  if (!session) return;
  await loadLeads();
})();
