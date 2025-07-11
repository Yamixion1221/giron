function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
function searchPosts(q) {
  const l = document.getElementById("search-loader");
  const r = document.getElementById("search-results");
  l.style.display = "block"; r.style.display = "none";
  fetch('/feeds/posts/summary?alt=json&q=' + encodeURIComponent(q))
    .then(res => res.json()).then(data => {
      let e = data.feed.entry || [];
      let h = e.map(p => `<li><a href="${p.link.find(l => l.rel === 'alternate').href}">${p.title.$t}</a></li>`).join('');
      r.innerHTML = '<ul>' + (h || '<li>Tidak ditemukan</li>') + '</ul>';
      l.style.display = "none"; r.style.display = "block";
    });
}
document.addEventListener("DOMContentLoaded", () => {
  const s = document.querySelector("input#search-box");
  if (s) {
    const r = document.createElement("div"); r.id = "search-results";
    const l = document.createElement("div"); l.id = "search-loader";
    l.innerHTML = "<img src='https://i.imgur.com/LLF5iyg.gif' width='30'/>";
    s.parentElement.append(r, l);
    s.addEventListener("input", debounce(e => {
      const v = e.target.value.trim();
      if (v.length > 2) searchPosts(v); else r.style.display = "none";
    }, 600));
  }
});
