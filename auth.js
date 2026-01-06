import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://mlcdpcwxmetruidbbsqz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_at5RSE6MtpExGx48HFu_lQ_MlLK3Jqs";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

function setMsg(text, type = "") {
  msg.className = `auth-msg ${type}`.trim();
  msg.textContent = text;
}

async function redirectIfLoggedIn() {
  const { data } = await supabase.auth.getSession();
  if (data?.session) {
    window.location.href = "./dashboard.html";
  }
}

redirectIfLoggedIn();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("Ingresando...");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMsg(error.message, "error");
    return;
  }

  if (data?.session) {
    setMsg("Listo, entrando...", "ok");
    window.location.href = "./dashboard.html";
  } else {
    setMsg("No se pudo iniciar sesión.", "error");
  }
});
