document.addEventListener("contextmenu", function(e){
  e.preventDefault();
});

// Blok shortcut keyboard
document.addEventListener("keydown", function(e) {
  // Daftar kombinasi yang diblok
  if (
    e.key === "F12" || 
    (e.ctrlKey && ["c", "u", "s", "a", "f", "+", "=", "-", "p"].includes(e.key.toLowerCase())) || 
    (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase()))
  ) {
    e.preventDefault();
  }
});

// Blok zoom menggunakan Ctrl + Scroll
window.addEventListener("wheel", function(e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });
