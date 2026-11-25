/* =====================================================================
   SITE SETTINGS — the top menu, the left sidebar and the footer are
   built from the settings below and appear identically on every page.

   ✏️  To change your position, links, or menu: edit ONLY this
       "SITE" block. Every page updates automatically.
   ===================================================================== */
const SITE = {
  name: "Swarupananda Banerjee",
  shortName: "Swarup Banerjee",           // shown at the top-left of the menu bar
  photo: "profile.jpg",        // replace this file to change your photo (keep the same name)
  position: [                             // each line appears on its own line under your name
    "PhD Research Scholar",
    "Department of Mathematics",
    "IIT Kharagpur"
  ],
  affiliationUrl: "https://www.iitkgp.ac.in/department/MA",
  location: "Kharagpur, India",
  email: "sbanerjee.24@kgpian.iitkgp.ac.in",
  cvFile: "Swarupananda_Banerjee_CV.pdf",
  lastUpdated: "November 2026",           // ✏️ change this when you update the site

  // Profile links shown as icons in the sidebar.
  // To remove one, delete its line. To add one, copy a line and change it.
  links: [
    { label: "Google Scholar", icon: "scholar",  url: "https://scholar.google.com/citations?user=_a5852EAAAAJ&hl=en&oi=ao" },
    { label: "ResearchGate",   icon: "rg",       url: "https://www.researchgate.net/profile/Swarupananda-Banerjee" },
    { label: "ORCID",          icon: "orcid",    url: "https://orcid.org/0009-0005-6362-4923" },
    { label: "LinkedIn",       icon: "linkedin", url: "https://www.linkedin.com/in/iamswarupananda" },
    { label: "Email",          icon: "email",    url: "mailto:sbanerjee.24@kgpian.iitkgp.ac.in" }
  ],

  // Top menu. "file" must match the page's file name exactly.
  menu: [
    { label: "About",        file: "index.html" },
    { label: "Research",     file: "research.html" },
    { label: "Publications", file: "publications.html" },
    { label: "Talks",        file: "talks.html" },
    { label: "Teaching",     file: "teaching.html" },
    { label: "CV",           file: "cv.html" },
    { label: "Contact",      file: "contact.html" }
  ]
};
/* ======================= END OF SITE SETTINGS ========================
   You normally don't need to edit anything below this line.
   ===================================================================== */

(function () {
  "use strict";

  const ICONS = {
    scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3 1 9.2l11 6.2 9-5.07V16h2V9.2L12 3Zm-6.6 9.9v3.4c0 2.07 2.95 3.9 6.6 3.9s6.6-1.83 6.6-3.9v-3.4L12 16.6l-6.6-3.7Z"/></svg>',
    rg: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="12" y="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9.5" font-weight="700" fill="currentColor">RG</text></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="12" y="15.6" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9.5" font-weight="700" fill="currentColor">iD</text></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="currentColor" d="M6.6 9.8h2.2V17H6.6zM7.7 6.3a1.27 1.27 0 1 1 0 2.54 1.27 1.27 0 0 1 0-2.54ZM10.3 9.8h2.1v1c.3-.55 1.03-1.13 2.12-1.13 2.27 0 2.68 1.45 2.68 3.33V17H15v-3.5c0-.84-.02-1.92-1.17-1.92-1.17 0-1.35.92-1.35 1.86V17h-2.18Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    building: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-5h6v5M9 12h.01M15 12h.01"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"/></svg>',
    sun: '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Which page are we on? (works for "/", "/index.html", "/research.html", "/research")
  let current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!current.includes(".")) current += ".html";

  /* ---------- Top bar ---------- */
  const header = document.getElementById("site-header");
  if (header) {
    const items = SITE.menu.map((m) => {
      const active = m.file.toLowerCase() === current;
      return `<li><a href="${esc(m.file)}"${active ? ' class="active" aria-current="page"' : ""}>${esc(m.label)}</a></li>`;
    }).join("");
    header.className = "topbar";
    header.innerHTML = `
      <div class="topbar-inner">
        <a class="brand" href="index.html">${esc(SITE.shortName)}</a>
        <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">${ICONS.menu}</button>
        <nav aria-label="Main"><ul class="nav-links" id="nav-links">${items}</ul></nav>
        <button class="icon-btn theme-toggle" type="button" aria-label="Toggle light/dark mode" title="Toggle light/dark mode">${ICONS.moon}${ICONS.sun}</button>
      </div>`;

    const menuBtn = header.querySelector(".menu-toggle");
    const list = header.querySelector(".nav-links");
    menuBtn.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    header.querySelector(".theme-toggle").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Sidebar ---------- */
  const sidebar = document.getElementById("site-sidebar");
  if (sidebar) {
    const links = SITE.links.map((l) => {
      const ext = /^https?:/.test(l.url);
      return `<a href="${esc(l.url)}" title="${esc(l.label)}" aria-label="${esc(l.label)}"${ext ? ' target="_blank" rel="noopener me"' : ""}>${ICONS[l.icon] || esc(l.label)}</a>`;
    }).join("");
    sidebar.className = current === "index.html" ? "sidebar" : "sidebar compact";
    sidebar.innerHTML = `
      <img class="avatar" src="${esc(SITE.photo)}" alt="Photo of ${esc(SITE.name)}" width="150" height="150">
      <div>
        <p class="name">${esc(SITE.name)}</p>
        <p class="position">${SITE.position.map(esc).join("<br>")}</p>
      </div>
      <ul class="sidebar-meta">
        <li>${ICONS.building}<a href="${esc(SITE.affiliationUrl)}" target="_blank" rel="noopener">Dept. of Mathematics, IIT KGP</a></li>
        <li>${ICONS.pin}<span>${esc(SITE.location)}</span></li>
        <li>${ICONS.email}<a href="mailto:${esc(SITE.email)}">${esc(SITE.email).replace("@", "@<wbr>")}</a></li>
      </ul>
      <div class="profile-links">${links}</div>
      <a class="btn outline cv-btn" href="${esc(SITE.cvFile)}" target="_blank" rel="noopener">${ICONS.download}Download CV</a>`;
  }

  /* ---------- Footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <span>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}</span>
        <span>Last updated: ${esc(SITE.lastUpdated)}</span>
      </div>`;
  }
})();
