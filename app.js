(function () {
  var deck = document.getElementById("deck");
  var apps = (window.R_APPS || []).slice(0, 6);

  apps.forEach(function (app, i) {
    var active = Boolean(app.url);
    var key = document.createElement(active ? "a" : "button");
    key.className = "key" + (active ? "" : " is-off");
    key.style.setProperty("--key-color", app.color || "#888");
    key.dataset.index = String(i + 1);

    if (active) {
      key.href = app.url;
      key.rel = "noopener";
    } else {
      key.type = "button";
      key.setAttribute("aria-disabled", "true");
    }

    key.innerHTML =
      '<span class="key-screen">' +
        '<span class="key-icon" aria-hidden="true">' + app.icon + "</span>" +
        '<span class="key-label">' + app.name + "</span>" +
        (active ? "" : '<span class="key-soon">Bientôt</span>') +
      "</span>" +
      '<span class="key-num" aria-hidden="true">' + (i + 1) + "</span>";

    key.addEventListener("click", function (e) {
      press(key);
      if (!active) e.preventDefault();
    });

    deck.appendChild(key);
  });

  function press(key) {
    key.classList.remove("is-pressed");
    void key.offsetWidth; // relance l'animation
    key.classList.add("is-pressed");
  }

  // Touches 1 à 6 du clavier, comme sur un Stream Deck
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var key = deck.querySelector('[data-index="' + e.key + '"]');
    if (!key) return;
    press(key);
    if (key.href) setTimeout(function () { window.location.href = key.href; }, 140);
  });
})();
