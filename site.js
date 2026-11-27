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
    "Research Scholar"
  ],
  affiliation: [                          // shown under the position, linked to affiliationUrl
    "Department of Mathematics",
    "IIT Kharagpur"
  ],
  affiliationUrl: "https://www.iitkgp.ac.in/department/MA",

  // Advisors shown in the sidebar (on every page except About).
  // To add/remove one, copy/delete a line.
  advisors: [
    { name: "Prof. Hari Shankar Mahato", url: "https://www.iitkgp.ac.in/department/MA/faculty/ma-hsmahato" },
    { name: "Prof. G. P. Raja Sekhar",   url: "https://www.iitkgp.ac.in/department/MA/faculty/ma-rajas" }
  ],
  location: "Kharagpur, India",
  email: "sbanerjee.24@kgpian.iitkgp.ac.in",
  cvFile: "Swarupananda_Banerjee_CV.pdf",   // the PDF itself (used on the CV page)
  cvPage: "cv.html",                      // the sidebar "View CV" button opens this page
  lastUpdated: "November 2026",           // ✏️ change this when you update the site

  // Profile links shown as icons (official logos) in the sidebar.
  // "label" is the text shown when the mouse hovers over the icon.
  // To remove one, delete its line. To add one, copy a line and change it.
  // Available icons: scholar, rg, orcid, linkedin, x, gmail, email
  links: [
    { label: "Google Scholar", icon: "scholar",  url: "https://scholar.google.com/citations?user=_a5852EAAAAJ&hl=en&oi=ao" },
    { label: "ResearchGate",   icon: "rg",       url: "https://www.researchgate.net/profile/Swarupananda-Banerjee" },
    { label: "ORCID",          icon: "orcid",    url: "https://orcid.org/0009-0005-6362-4923" },
    { label: "LinkedIn",       icon: "linkedin", url: "https://www.linkedin.com/in/iamswarupananda" },
    { label: "Gmail",          icon: "gmail",    url: "mailto:sbmathrkmveri@gmail.com" }
  ],

  // Sub-pages: not shown in the top menu, but they highlight their parent menu item.
  // Format:  "subpage.html": "parent.html"
  subpages: {
    "publications.html": "research.html"
  },

  // Top menu. "file" must match the page's file name exactly.
  menu: [
    { label: "About",        file: "index.html" },
    { label: "Research",     file: "research.html" },
    { label: "Education",    file: "education.html" },
    { label: "Experience",   file: "experience.html" },
    { label: "Achievements", file: "achievements.html" },
    { label: "Teaching",     file: "teaching.html" },
    { label: "Talks",        file: "talks.html" },
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
    scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285f4" d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>',
    rg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#a6ce39" d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>',
    linkedin: '<svg viewBox="0 0 448 512" aria-hidden="true"><path fill="#0a66c2" d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>',
    gmail: '<svg viewBox="52 42 88 66" aria-hidden="true"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
    cap: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z"/><path d="M6 11.3v4.2c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4.2M22 9.5V14"/></svg>',
    cv: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6v18h12V7l-4-4Z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
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
      const parent = ((SITE.subpages || {})[current] || "").toLowerCase();
      const active = m.file.toLowerCase() === current || m.file.toLowerCase() === parent;
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
      return `<a class="pl-${esc(l.icon)}" href="${esc(l.url)}" data-tip="${esc(l.label)}" aria-label="${esc(l.label)}"${ext ? ' target="_blank" rel="noopener me"' : ""}>${ICONS[l.icon] || esc(l.label)}</a>`;
    }).join("");
    const affiliation = (SITE.affiliation || []).map(esc).join("<br>");
    const advisors = (SITE.advisors || []).map((a) =>
      `<li><a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.name)}</a></li>`).join("");
    const onCvPage = current === (SITE.cvPage || "cv.html").toLowerCase();
    sidebar.className = current === "index.html" ? "sidebar" : "sidebar compact";
    sidebar.innerHTML = `
      <img class="avatar" src="${esc(SITE.photo)}" alt="Photo of ${esc(SITE.name)}" width="150" height="150">
      <div class="sidebar-id">
        <p class="name">${esc(SITE.name)}</p>
        <p class="position">${SITE.position.map(esc).join("<br>")}${affiliation ? `<br><a class="affil" href="${esc(SITE.affiliationUrl)}" target="_blank" rel="noopener">${affiliation}</a>` : ""}</p>
      </div>
      ${advisors ? `<div class="sidebar-advisors"><p class="sa-label">${ICONS.cap}${SITE.advisors.length > 1 ? "Advisors" : "Advisor"}</p><ul>${advisors}</ul></div>` : ""}
      <ul class="sidebar-meta">
        <li>${ICONS.pin}<span>${esc(SITE.location)}</span></li>
        <li>${ICONS.email}<a href="mailto:${esc(SITE.email)}">${esc(SITE.email).replace("@", "@<wbr>")}</a></li>
      </ul>
      <div class="profile-links">${links}</div>
      ${onCvPage ? "" : `<a class="btn outline cv-btn" href="${esc(SITE.cvPage || "cv.html")}">${ICONS.cv}View CV</a>`}`;
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
