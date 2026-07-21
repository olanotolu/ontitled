/**
 * Shared Ontitled marketing nav.
 * Mounts ribbon + bar, hides ONLY Contra/Framer site chrome (never content Headers).
 */
(function () {
  "use strict";

  var CTA =
    "https://calendly.com/partnerships-contra/contra-labs-partnership-request";

  var LINKS = [
    { href: "/themis", label: "Themis" },
    { href: "/dike", label: "Dike" },
    { href: "/index", label: "Index" },
    { href: "/jobs", label: "Jobs" },
    { href: "/company", label: "Company" },
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
      '<image href="/ontitled-favicon-transparent.png" x="8" y="18" width="46" height="46" preserveAspectRatio="xMidYMid meet" />' +
      "</svg></a>" +
      '<header class="ot-nav" id="otNav">' +
      '<div class="ot-nav-shell"><div class="ot-nav-inner">' +
      '<div class="ot-nav-left">' +
      '<a class="ot-logo" href="/">[Ontitled]</a>' +
      '<ul class="ot-nav-links ot-nav-links-desktop">' +
      linkHtml() +
      "</ul></div>" +
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
      '<ul class="ot-nav-drawer-list">' +
      linkHtml() +
      "</ul></div></header>"
    );
  }

  function hideContraChrome() {
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

    // Only hide fixed chrome that literally says "contra LABS" (short brand mark)
    document.querySelectorAll("a, p, span").forEach(function (el) {
      if (el.closest(".ot-nav, .ot-nav-ribbon, .ot-nav-drawer, #otNavRoot")) return;
      var t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!t || t.length > 24) return;
      if (
        !/^contra\s*labs$/i.test(t) &&
        t !== "contra LABS" &&
        t !== "CONTRA LABS"
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

  function boot() {
    pinIndexPath();
    mountNav();
    hideContraChrome();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", function () {
    hideContraChrome();
    setTimeout(hideContraChrome, 200);
    setTimeout(hideContraChrome, 800);
  });
})();
