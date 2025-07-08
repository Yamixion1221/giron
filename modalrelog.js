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
