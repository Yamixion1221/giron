document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebarMenu = document.getElementById("sidebar-menu");
  const searchBtn = document.getElementById("search-btn");
  const closeSearch = document.getElementById("close-search");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const loader = document.getElementById("search-loading");
  const results = document.getElementById("search-results");

  // Menu toggle
  if (hamburger && sidebarMenu) {
    hamburger.addEventListener("click", function () {
      sidebarMenu.classList.toggle("active");
    });
  }

  // Search toggle
  if (searchBtn && searchOverlay && closeSearch) {
    searchBtn.addEventListener("click", function () {
      searchOverlay.classList.remove("hidden");
    });

    closeSearch.addEventListener("click", function () {
      searchOverlay.classList.add("hidden");
    });
  }

  // Search input AJAX simulation
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const input = this.value;
      loader.classList.remove("hidden");
      results.innerHTML = "";

      clearTimeout(window._searchTimer);
      window._searchTimer = setTimeout(() => {
        loader.classList.add("hidden");
        results.innerHTML = input
          ? `<p style="color:#fff">Hasil untuk: <b>${input}</b></p>`
          : "";
      }, 1000);
    });
  }
});
