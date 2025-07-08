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

function openModal() {
  document.getElementById("authModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("authModal").style.display = "none";
}
function showTab(tabId) {
  document.getElementById("loginTab").style.display = "none";
  document.getElementById("registerTab").style.display = "none";
  document.getElementById(tabId).style.display = "block";
}

function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  if (username && password) {
    localStorage.setItem("dummyUser", JSON.stringify({ username, password }));
    alert("Register berhasil! Silakan login.");
    showTab('loginTab');
  } else {
    alert("Isi semua kolom.");
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const stored = JSON.parse(localStorage.getItem("dummyUser"));

  if (stored && username === stored.username && password === stored.password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
    closeModal();
    showUser();
  } else {
    alert("Login gagal.");
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  showUser();
}

function showUser() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("currentUser");

  if (isLoggedIn === "true") {
    document.getElementById("userInfo").style.display = "block";
    document.getElementById("displayUser").innerText = username;
  } else {
    document.getElementById("userInfo").style.display = "none";
  }
}

window.onload = function() {
  showUser();
  showTab('loginTab');
};
