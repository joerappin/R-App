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
      if (!active) return e.preventDefault();
      if (app.wake) {
        e.preventDefault();
        launch(key, app);
      }
    });

    deck.appendChild(key);
  });

  function press(key) {
    key.classList.remove("is-pressed");
    void key.offsetWidth; // relance l'animation
    key.classList.add("is-pressed");
  }

  // Vérifie que l'app répond; si elle se réveille, affiche un compte à rebours sur la touche.
  function launch(key, app) {
    if (key.classList.contains("is-waking")) return;
    var ready = false;
    var timer = null;
    var open = function () {
      ready = true;
      clearInterval(timer);
      window.location.href = app.url;
    };

    waitUntilUp(app.wake, open);

    // Réponse rapide : on ouvre directement, sans compte à rebours
    setTimeout(function () {
      if (ready) return;
      var left = app.wakeSeconds || 50;
      var wait = document.createElement("span");
      wait.className = "key-wait";
      wait.innerHTML = '<span class="key-count"></span><span class="key-wait-text">Démarrage…</span>';
      key.querySelector(".key-screen").appendChild(wait);
      key.classList.add("is-waking");
      var count = wait.querySelector(".key-count");
      var tick = function () {
        count.textContent = left > 0 ? left : "…";
        if (left <= 0) wait.querySelector(".key-wait-text").textContent = "Presque prêt";
        left--;
      };
      tick();
      timer = setInterval(tick, 1000);
    }, 1200);
  }

  function waitUntilUp(url, done) {
    fetch(url, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        done();
      })
      .catch(function () {
        setTimeout(function () { waitUntilUp(url, done); }, 2000);
      });
  }

  // Retour arrière depuis l'app : la page revient du cache, on retire les comptes à rebours
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    deck.querySelectorAll(".key-wait").forEach(function (w) { w.remove(); });
    deck.querySelectorAll(".is-waking").forEach(function (k) { k.classList.remove("is-waking"); });
  });

  // Touches 1 à 6 du clavier, comme sur un Stream Deck
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var key = deck.querySelector('[data-index="' + e.key + '"]');
    if (key) key.click();
  });
})();
