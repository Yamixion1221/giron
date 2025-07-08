  // Utility functions
  function toggleLoginPopup(show) {
    document.getElementById('loginPopup').style.display = show ? 'block' : 'none';
  }
  
  function showRegister() {
    document.getElementById('popupTitle').textContent = 'Registrasi Giron';
    document.getElementById('loginRole').style.display = 'block';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.querySelector('#loginPopup button').onclick = handleRegister;
  }

  function showLogin() {
    document.getElementById('popupTitle').textContent = 'Login Giron';
    document.getElementById('loginRole').style.display = 'none';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.querySelector('#loginPopup button').onclick = handleLogin;
  }

  function handleRegister() {
    const u = document.getElementById('loginUsername').value.trim();
    const p = document.getElementById('loginPassword').value.trim();
    const r = document.getElementById('loginRole').value;

    if (!u || !p) {
      alert('Isi username dan password!');
      return;
    }

    // Cek user sudah ada
    if (localStorage.getItem('gironUser_' + u)) {
      alert('Username sudah terdaftar!');
      return;
    }

    const userData = { username: u, password: p, role: r };
    localStorage.setItem('gironUser_' + u, JSON.stringify(userData));
    alert('Registrasi berhasil! Silakan login.');
    showLogin();
  }

  function handleLogin() {
    const u = document.getElementById('loginUsername').value.trim();
    const p = document.getElementById('loginPassword').value.trim();

    if (!u || !p) {
      alert('Isi username dan password!');
      return;
    }

    const userDataRaw = localStorage.getItem('gironUser_' + u);
    if (!userDataRaw) {
      alert('Username tidak ditemukan!');
      return;
    }
    const userData = JSON.parse(userDataRaw);
    if (userData.password !== p) {
      alert('Password salah!');
      return;
    }

    // Sukses login
    localStorage.setItem('gironLoggedInUser', JSON.stringify(userData));
    toggleLoginPopup(false);
    updateUserStatus();
  }

  function updateUserStatus() {
    const userRaw = localStorage.getItem('gironLoggedInUser');
    const btnLoginLogout = document.getElementById('btnLoginLogout');
    const userStatus = document.getElementById('userStatus');
    const buatTopikLink = document.querySelector('#nav a[href="/p/buat-topik.html"]');

    if (userRaw) {
      const user = JSON.parse(userRaw);
      btnLoginLogout.textContent = 'Logout';
      userStatus.innerHTML = user.username + (user.role === 'admin' ? ' <span class="badge">👑 Admin</span>' : '');
      btnLoginLogout.onclick = () => {
        localStorage.removeItem('gironLoggedInUser');
        updateUserStatus();
      };
      // Aktifkan link buat topik
      if (buatTopikLink) buatTopikLink.classList.remove('buat-topik-disabled');
    } else {
      btnLoginLogout.textContent = 'Login';
      userStatus.textContent = 'Guest';
      btnLoginLogout.onclick = () => toggleLoginPopup(true);
      // Nonaktifkan link buat topik
      if (buatTopikLink) buatTopikLink.classList.add('buat-topik-disabled');
    }
  }

  // Inisialisasi saat halaman load
  window.addEventListener('load', () => {
    updateUserStatus();
  });
