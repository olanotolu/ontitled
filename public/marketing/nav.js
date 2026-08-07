/**
 * Shared Ontitled marketing nav.
 * Mounts ribbon + bar, hides ONLY Ontitled/Framer site chrome (never content Headers).
 */
(function () {
  "use strict";

  var CTA =
    "https://calendly.com/partnerships-ontitled/ontitled-partnership-request";

  var LINKS = [
    { href: "/dyson", label: "Dyson" },
    { href: "/company", label: "Company" },
    { href: "/our-thesis", label: "Our thesis" },
    { href: "/omposition", label: "Omposition" },
  ];

  // Exact chrome names only — never bare "Header" / "Banner" (content uses those)
  var CHROME_NAMES = {
    nav: 1,
    navigation: 1,
    navbar: 1,
    "top nav": 1,
    "desktop nav": 1,
    "mobile nav": 1,
    "site header": 1,
    "logo ribbon": 1,
    "logo banner": 1,
    "primary nav": 1,
    "main nav": 1,
  };

  function currentPath() {
    var p = (location.pathname || "/").replace(/\/+$/, "") || "/";
    if (p === "/research" || p.indexOf("/research/") === 0) return "/index";
    if (p.indexOf("/index/") === 0) return "/index";
    return p;
  }

  function isCurrent(href) {
    var p = currentPath();
    if (href === "/") return p === "/";
    return p === href || p.indexOf(href + "/") === 0;
  }

  function linkHtml() {
    return LINKS.map(function (l) {
      var cur = isCurrent(l.href) ? ' aria-current="page"' : "";
      return (
        "<li><a href=\"" + l.href + "\"" + cur + ">" + l.label + "</a></li>"
      );
    }).join("");
  }

  function navMarkup() {
    return (
      '<a class="ot-nav-ribbon" href="/" aria-label="[Ontitled] home">' +
      '<svg viewBox="0 0 62 130" xmlns="http://www.w3.org/2000/svg" role="presentation">' +
      '<path d="M 62 128.979 C 57.834 127.71 53.925 125.957 50.356 123.798 C 45.31 120.894 40.991 117.089 37.692 112.642 C 35.187 109.429 33.16 105.897 31.714 102.135 L 30.652 102.135 L 30.652 130 L 30.652 102.135 L 29.575 102.135 C 28.163 105.868 26.2 109.375 23.773 112.568 C 20.548 117.035 16.328 120.857 11.389 123.773 C 7.901 125.94 4.076 127.702 0.001 128.978 L 0.001 130 L 0 130 L 0 0 L 62 0 Z" fill="#2b2b29"/>' +
      '<image href="/ontitled-favicon-transparent.png" x="3" y="10" width="56" height="56" preserveAspectRatio="xMidYMid meet" />' +
      "</svg></a>" +
      '<header class="ot-nav" id="otNav" role="banner">' +
      '<div class="ot-nav-shell"><div class="ot-nav-inner">' +
      '<div class="ot-nav-left">' +
      '<a class="ot-logo" href="/">[Ontitled]</a>' +
      '<nav aria-label="Primary"><ul class="ot-nav-links ot-nav-links-desktop">' +
      linkHtml() +
      "</ul></nav></div>" +
      '<div class="ot-nav-right">' +
      '<a class="ot-nav-cta ot-nav-cta-desktop" href="' +
      CTA +
      '" target="_blank" rel="noopener">Get in touch</a>' +
      '<button class="ot-nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" id="otNavToggle">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
      '<path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />' +
      "</svg></button></div></div></div>" +
      '<div class="ot-nav-drawer" id="otNavDrawer" hidden>' +
      '<a class="ot-nav-cta" href="' +
      CTA +
      '" target="_blank" rel="noopener">Get in touch</a>' +
      '<nav aria-label="Mobile primary"><ul class="ot-nav-drawer-list">' +
      linkHtml() +
      "</ul></nav></div></header>"
    );
  }

  function hideOntitledChrome() {
    document.querySelectorAll("[data-framer-name]").forEach(function (el) {
      var name = (el.getAttribute("data-framer-name") || "").trim().toLowerCase();
      if (CHROME_NAMES[name]) el.classList.add("ot-hide-framer-nav");
    });

    // Framer ribbon SVG (bookmark mark) — duplicate behind Ontitled ribbon
    document.querySelectorAll(".framer-hw1M8, svg.framer-hw1M8").forEach(function (el) {
      if (el.closest("#otNavRoot, .ot-nav-ribbon")) return;
      el.classList.add("ot-hide-framer-nav");
      var p = el.parentElement;
      if (p && p.getAttribute("data-framer-name") === "Logo Banner") {
        p.classList.add("ot-hide-framer-nav");
      }
      // also hide parent <a> for Logo Banner
      if (p && p.tagName === "A") p.classList.add("ot-hide-framer-nav");
    });

    // Legacy company.html static nav only
    document
      .querySelectorAll("header.nav.nav-legacy, a.nav-ribbon.nav-legacy")
      .forEach(function (el) {
        el.classList.add("ot-hide-framer-nav");
      });

    // Only hide fixed chrome that literally says "Ontitled" (brand mark)
    document.querySelectorAll("a, p, span").forEach(function (el) {
      if (el.closest(".ot-nav, .ot-nav-ribbon, .ot-nav-drawer, #otNavRoot")) return;
      var t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!t || t.length > 24) return;
      if (
        !/^ontitled$/i.test(t) &&
        t !== "Ontitled" &&
        t !== "ONTITLED"
      ) {
        return;
      }
      var n = el;
      for (var i = 0; i < 10 && n; i++) {
        try {
          var s = window.getComputedStyle(n);
          var r = n.getBoundingClientRect();
          if (
            (s.position === "fixed" || s.position === "sticky") &&
            r.top < 120 &&
            r.height > 0 &&
            r.height < 160 &&
            r.width > 80
          ) {
            n.classList.add("ot-hide-framer-nav");
            break;
          }
        } catch (e) {}
        n = n.parentElement;
      }
    });

    document.documentElement.classList.add("ot-nav-ready");
  }

  function mountNav() {
    if (document.getElementById("otNavRoot")) return;
    var wrap = document.createElement("div");
    wrap.id = "otNavRoot";
    wrap.innerHTML = navMarkup();
    document.body.appendChild(wrap);

    var toggle = document.getElementById("otNavToggle");
    var drawer = document.getElementById("otNavDrawer");
    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        var open = drawer.classList.toggle("is-open");
        drawer.hidden = !open;
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
    }
  }

  function pinIndexPath() {
    var main = document.getElementById("main");
    var hyd = main && main.getAttribute("data-framer-hydrate-v2");
    if (!hyd || hyd.indexOf("CM7egJx8U") === -1) return;
    var p = (location.pathname || "/").replace(/\/+$/, "") || "/";
    if (p === "/") {
      history.replaceState(
        history.state,
        "",
        "/index" + location.search + location.hash
      );
    }
  }

  function isHomeSplashPage() {
    // Only the marketing home has the Framer Pre_Loader / hero splash.
    return !!document.querySelector('#hero [data-framer-name="Pre_Loader"], #hero .framer-ghci25-container');
  }

  function showNav() {
    document.body.classList.add("ot-nav-show");
  }

  var splashFinishing = false;

  /**
   * Ontitled-owned splash (outside Framer). Avoids mutating the Pre_Loader tree,
   * which caused React hydration mismatches and stuck appear animations.
   */
  function mountSplash() {
    if (!isHomeSplashPage()) return;
    if (document.body.classList.contains("ot-preloader-done")) return;

    document.body.classList.add("ot-splash-active");

    // Prefer the static first-paint node in home.html; create only if missing.
    var el = document.getElementById("ot-splash");
    if (!el) {
      el = document.createElement("div");
      el.id = "ot-splash";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML =
        '<div class="ot-splash-inner">' +
        '<div class="ot-splash-mark">' +
        '<svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true">' +
        '<path d="M12 1.5 L22.5 12 L12 22.5 L1.5 12 Z" fill="#2b2b29"/>' +
        "</svg></div>" +
        '<div class="ot-splash-word">[Ontitled]</div>' +
        "</div>";
      document.body.appendChild(el);
    }

    // Hard-hide broken Framer preloader so it never covers the hero.
    document
      .querySelectorAll(
        '#hero [data-framer-name="Pre_Loader"], #hero .framer-ghci25-container, [data-framer-name="Pre_Loader"]'
      )
      .forEach(function (node) {
        node.style.setProperty("display", "none", "important");
        node.style.setProperty("pointer-events", "none", "important");
        node.style.setProperty("opacity", "0", "important");
        node.style.setProperty("visibility", "hidden", "important");
      });
  }

  /** Framer appear often freezes at opacity:0.001 / scale(0) after hydration errors. */
  function revealAppear() {
    document.querySelectorAll("#hero [data-framer-appear-id]").forEach(function (el) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
    });
    // Building gallery: Framer code-component bakes transform:scale(0) on
    // [data-framer-name="Symbol & Images"] until it hydrates; if hydration
    // stalls the gallery stays invisible. Force reveal.
    document.querySelectorAll('[data-framer-name="Symbol & Images"]').forEach(function (el) {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
    });
    // Stuck appear nodes page-wide (opacity:0.001) — reveal after splash so
    // content is never silently blank. Scope to appear-id only to avoid
    // touching the rescaled 1920px canvas container.
    document.querySelectorAll("[data-framer-appear-id]").forEach(function (el) {
      if (el.closest(".ot-nav, .ot-nav-ribbon, #otNavRoot")) return;
      var cur = (el.getAttribute("style") || "") + (el.style.cssText || "");
      if (/opacity:\s*0\.00?1/.test(cur) || /scale\(0\)/.test(cur)) {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
      }
    });
  }

  /**
   * Safety net for legacy "Labs" nodes. The CSS hide-rule matches both quoted
   * and un-quoted data-framer-name="Labs" forms, but Framer can rehydrate with
   * new variants — strip any remaining ones at runtime too.
   */
  function hideLegacyLabs() {
    document.querySelectorAll('[data-framer-name="Labs"], [data-framer-name="\\\"Labs\\\""]').forEach(function (el) {
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
    });
  }

  /** Decorative SVGs without aria-hidden — hide from AT. */
  function hideDecorativeSvg() {
    document.querySelectorAll(
      '#main svg[role="presentation"]:not([aria-hidden])'
    ).forEach(function (el) {
      el.setAttribute("aria-hidden", "true");
    });
  }

  /** Give Framer's #main a main landmark for screen-reader region nav. */
  function landmarkMain() {
    var main = document.getElementById("main");
    if (main && !main.getAttribute("role")) {
      main.setAttribute("role", "main");
      main.setAttribute("aria-label", "Main content");
    }
  }

  /**
   * Soft exit: fade splash → reveal hero → hard-remove overlay.
   */
  function forceHidePreLoader() {
    if (splashFinishing || document.body.classList.contains("ot-preloader-done")) {
      showNav();
      killBgVideos();
      revealAppear();
      return;
    }
    splashFinishing = true;
    killBgVideos();
    document.body.classList.add("ot-preloader-exiting");
    showNav();
    // Start hero content fade-in while splash is dissolving
    requestAnimationFrame(function () {
      document.body.classList.add("ot-hero-in");
      revealAppear();
    });

    window.setTimeout(function () {
      var splash = document.getElementById("ot-splash");
      if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
      document
        .querySelectorAll(
          '#hero [data-framer-name="Pre_Loader"], #hero .framer-ghci25-container, [data-framer-name="Pre_Loader"]'
        )
        .forEach(function (el) {
          el.style.setProperty("display", "none", "important");
          el.style.setProperty("pointer-events", "none", "important");
          el.style.setProperty("opacity", "0", "important");
          el.style.setProperty("visibility", "hidden", "important");
        });
      document.body.classList.add("ot-preloader-done");
      document.body.classList.remove("ot-preloader-exiting");
      document.body.classList.remove("ot-splash-active");
      splashFinishing = false;
      revealAppear();
    }, 720);
  }

  /** Remove decorative bg videos (user: no longer needed). */
  function killBgVideos() {
    document.body.classList.add("ot-no-bg-video");
    var selectors = [
      "#hero video",
      '[data-framer-name="HERO BKG Image"] video',
      '[data-framer-name="Image Scramble"] video',
      '[data-framer-name="BKG"] video',
      'video[src*="xXF7zMolOXHM52BTEfXsZnKa0Fw"]',
      'video[src*="hmg5dFU33RwVgzS4V0wrSxuKJ3E"]',
      'video[src*="MLWPbW1dUQawJLhhun3dBwpgJak"]',
    ];
    document.querySelectorAll(selectors.join(",")).forEach(function (v) {
      try {
        v.pause();
        v.removeAttribute("src");
        v.load && v.load();
      } catch (e) {}
      v.style.setProperty("display", "none", "important");
    });
  }

  function watchSplash() {
    killBgVideos();

    if (!isHomeSplashPage()) {
      // No home splash (other marketing pages) — just show nav.
      // Clear any stale ot-splash-active from the inline init script so
      // the nav isn't hidden and the static splash div doesn't linger.
      document.body.classList.remove("ot-splash-active");
      var staleSplash = document.getElementById("ot-splash");
      if (staleSplash) staleSplash.style.display = "none";
      showNav();
      return;
    }

    mountSplash();
    // Hold brand mark briefly, then soft handoff. Hard-capped so a stuck
    // Framer D-01 never freezes the page.
    var holdMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 200
      : 1200;
    window.setTimeout(function () {
      forceHidePreLoader();
    }, holdMs);

    // Safety net if something re-inserts the Framer preloader late
    window.setTimeout(function () {
      if (!document.body.classList.contains("ot-preloader-done")) {
        forceHidePreLoader();
      }
      revealAppear();
    }, holdMs + 1500);
  }

  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    pinIndexPath();
    mountNav();
    hideOntitledChrome();
    landmarkMain();
    hideLegacyLabs();
    hideDecorativeSvg();
    watchSplash();
    // Re-assert appear / labs / svg after Framer late hydration.
    // Hero CTA text + href are baked into SSR and the hydration bundle —
    // no runtime rewriting needed (that fought Framer's hover layers).
    [400, 900, 1600, 2800, 4500].forEach(function (ms) {
      setTimeout(function () {
        hideLegacyLabs();
        hideDecorativeSvg();
        if (document.body.classList.contains("ot-preloader-done") ||
            document.body.classList.contains("ot-hero-in")) {
          revealAppear();
        }
      }, ms);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", function () {
    hideOntitledChrome();
    setTimeout(hideOntitledChrome, 200);
    setTimeout(hideOntitledChrome, 800);
    setTimeout(function () {
      hideLegacyLabs();
      hideDecorativeSvg();
      landmarkMain();
    }, 300);
  });
})();
