// Buka modal saat user belum login
function handleLoginClick() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    alert("Kamu sudah login sebagai " + localStorage.getItem("currentUser"));
    // Bisa diarahkan ke halaman profil, dashboard, dll
  } else {
    openModal();
  }
}

// Ubah tampilan tombol berdasarkan status login
function updateLoginButton() {
  const loginBtn = document.getElementById("loginButton");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("currentUser");

  if (isLoggedIn === "true") {
    loginBtn.textContent = "Akun Saya";
  } else {
    loginBtn.textContent = "Login / Register";
  }
}

// Panggil saat selesai login
function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const stored = JSON.parse(localStorage.getItem("dummyUser"));

  if (stored && username === stored.username && password === stored.password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
    closeModal();
    showUser();
    updateLoginButton();
  } else {
    alert("Login gagal.");
  }
}

// Logout + update tombol
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  showUser();
  updateLoginButton();
}

window.onload = function () {
  showUser();
  showTab('loginTab');
  updateLoginButton(); // ← Tambahan di sini
};
