/* =====================================================================
   SITE SETTINGS — the top menu, the left sidebar and the footer are
   built from the settings below and appear identically on every page.

   ✏️  To change your position, links, or menu: edit ONLY this
       "SITE" block. Every page updates automatically.
   ===================================================================== */
const SITE = {
  name: "Swarupananda Banerjee",
  nameBn: "স্বরূপানন্দ ব্যানার্জ্জী",     // shown under your name in the menu bar and footer (Bengali)
  photo: "profile.jpg",        // replace this file to change your photo (keep the same name)
  position: [                             // each line appears on its own line under your name
    "PhD Candidate"
  ],
  affiliation: [                          // shown under the position, linked to affiliationUrl
    "Department of Mathematics",
    "IIT Kharagpur"
  ],
  affiliationUrl: "https://www.iitkgp.ac.in/department/MA",

  // Advisors shown in the sidebar (on every page except Home).
  // To add/remove one, copy/delete a line.
  advisors: [
    { name: "Prof. Hari Shankar Mahato", url: "https://www.iitkgp.ac.in/department/MA/faculty/ma-hsmahato" },
    { name: "Prof. G P Raja Sekhar",   url: "https://www.iitkgp.ac.in/department/MA/faculty/ma-rajas" }
  ],
  location: "Kharagpur, India",
  // Written with [dot] and [at] so spam robots cannot read it; the real address is put together only when someone clicks.
  email: "sbanerjee[dot]24[at]kgpian[dot]iitkgp[dot]ac[dot]in",
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

  // Social profiles shown as round icons in the middle of the footer.
  // ✏️ Paste each profile address between the quotes. With an empty address the logo is
  //    still shown but is not clickable (as for YouTube now). To remove an icon, delete its line.
  // Available icons: facebook, instagram, x, linkedin, youtube
  social: [
    { label: "Facebook",  icon: "facebook",  url: "https://www.facebook.com/iamswarupananda/" },
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/iamswarupananda/" },
    { label: "X (Twitter)", icon: "x",       url: "https://x.com/iamswarupananda" },
    { label: "LinkedIn",  icon: "linkedin",  url: "https://www.linkedin.com/in/iamswarupananda" },
    { label: "YouTube",   icon: "youtube",   url: "" }
  ],

  // Sub-pages: not shown in the top menu, but they highlight their parent menu item.
  // Format:  "subpage.html": "parent.html"
  subpages: {
    "publications.html": "research.html"
  },

  // Top menu. "file" must match the page's file name exactly.
  menu: [
    { label: "Home",         file: "index.html", icon: "home" },   // icon: shows a house logo instead of the word
    { label: "Research",     file: "research.html" },
    { label: "Experience",   file: "experience.html" },
    { label: "Achievements", file: "achievements.html" },
    { label: "Teaching",     file: "teaching.html" },
    { label: "Talks",        file: "talks.html" },
    { label: "Life & Beyond", file: "life.html" }
  ]
};
/* ======================= END OF SITE SETTINGS ========================
   You normally don't need to edit anything below this line.
   ===================================================================== */

(function () {
  "use strict";

  // Email shown in readable pieces that only break before [at] / [dot] (never inside a word):
  // sbanerjee[dot]24 | [at]kgpian | [dot]iitkgp | [dot]ac[dot]in
  // Sidebar: the address on two tidy lines, broken after [at]:  name[at] | domain
  const mailTwoLines = (addr) => {
    const i = String(addr).search(/\[at\]/i);
    if (i < 0) return mailHTML(addr);
    const user = String(addr).slice(0, i + 4), domain = String(addr).slice(i + 4);
    return `<span class="mail-2l"><span>${esc(user)}</span><span>${esc(domain)}</span></span>`;
  };
  const mailHTML = (addr) => {
    const parts = String(addr).split(/(?=\[at\]|\[dot\])/i);
    const word = (p) => (p || "").replace(/\[(dot|at)\]/gi, "").length;
    const groups = [];
    parts.forEach((p, i) => {
      // a short piece (like "[dot]24" or "[dot]in") stays with the piece before it,
      // unless the next piece is short too ("[dot]ac" + "[dot]in" travel together)
      const glue = word(p) <= 3 && groups.length && !/^\[at\]/i.test(p) && !(i + 1 < parts.length && word(parts[i + 1]) <= 3);
      if (glue) groups[groups.length - 1] += p; else groups.push(p);
    });
    return '<span class="mail-text">' + groups.map((g) => "<span>" + esc(g) + "</span>").join("<wbr>") + "</span>";
  };
  const SOCIAL = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M13.6 21.5v-8.1h2.8l.4-3.3h-3.2V8c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4v3.3h2.8v8.1h3.4Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M13.9 10.5 20.6 3h-1.6l-5.8 6.5L8.5 3H3.2l7 9.9L3.2 21h1.6l6.1-6.9 4.9 6.9h5.3l-7.2-10.5Zm-2.2 2.4-.7-1L5.3 4.2h2.4l4.6 6.4.7 1 5.9 8.3h-2.4l-4.8-7Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4.3 8.8h3.4V20H4.3V8.8ZM6 3.4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm3.9 5.4h3.3v1.5c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.3V20h-3.4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H9.9V8.8Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M21.6 7.6a2.6 2.6 0 0 0-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 9.2 2 12 2 12s0 2.8.4 4.4a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.4.4-4.4s0-2.8-.4-4.4ZM10 15.1V8.9l5.3 3.1L10 15.1Z"/></svg>'
  };
  const ICONS = {
    home: '<svg class="nav-home-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9v10.2a1 1 0 0 0 1 1h3.7v-5.6h3v5.6h3.7a1 1 0 0 0 1-1V9"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/></svg>',
    access: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="7.2" r="1.3" fill="currentColor" stroke="none"/><path d="M7.5 10.2 12 11l4.5-.8M12 11v3.2m0 0-2.2 4m2.2-4 2.2 4"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
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
      const inner = m.icon === "home"
        ? `${ICONS.home}<span class="nav-home-label">${esc(m.label)}</span>`
        : esc(m.label);
      return `<li><a href="${esc(m.file)}"${m.icon ? ` class="nav-icon${active ? " active" : ""}" aria-label="${esc(m.label)}" title="${esc(m.label)}"` : (active ? ' class="active"' : "")}${active ? ' aria-current="page"' : ""}>${inner}</a></li>`;
    }).join("");
    header.className = "topbar";
    header.innerHTML = `
      <div class="topbar-inner">
        <a class="brand" href="index.html"><img class="brand-mark" src="favicon.svg" alt="" width="30" height="30"><span class="brand-text"><span class="brand-en">${esc(SITE.name)}</span>${SITE.nameBn ? `<span class="brand-bn" lang="bn">${esc(SITE.nameBn)}</span>` : ""}</span></a>
        <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">${ICONS.menu}</button>
        <nav aria-label="Main"><ul class="nav-links" id="nav-links">${items}</ul></nav>
        <div class="topbar-tools">
          <button class="icon-btn search-toggle" type="button" aria-label="Search this website" title="Search (press /)">${ICONS.search}</button>
          <button class="icon-btn a11y-toggle" type="button" aria-label="Accessibility options" title="Accessibility options" aria-expanded="false" aria-controls="a11y-panel">${ICONS.access}</button>
          <button class="icon-btn theme-toggle" type="button" aria-label="Toggle light/dark mode" title="Toggle light/dark mode">${ICONS.moon}${ICONS.sun}</button>
        </div>
      </div>`;

    const menuBtn = header.querySelector(".menu-toggle");
    const list = header.querySelector(".nav-links");
    menuBtn.addEventListener("click", () => {
      const open = list.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    // Soft highlight that glides to the menu item under the mouse (wide screens)
    const glideOk = window.matchMedia && matchMedia("(min-width: 941px)").matches;
    if (glideOk) {
      list.classList.add("has-glide");
      const glide = document.createElement("li");
      glide.className = "nav-glide"; glide.setAttribute("aria-hidden", "true");
      list.appendChild(glide);
      const moveTo = (a) => {
        if (!a) { glide.style.opacity = 0; return; }
        const r = a.getBoundingClientRect(), p = list.getBoundingClientRect();
        glide.style.width = r.width + "px"; glide.style.height = r.height + "px";
        glide.style.transform = `translate(${r.left - p.left}px, ${r.top - p.top}px)`; glide.style.opacity = 1;
      };
      const activeLink = list.querySelector("a.active");
      const settle = () => moveTo(activeLink);
      list.querySelectorAll("a").forEach((a) => { a.addEventListener("mouseenter", () => moveTo(a)); a.addEventListener("focus", () => moveTo(a)); });
      list.addEventListener("mouseleave", settle);
      window.addEventListener("resize", settle);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
      requestAnimationFrame(() => { glide.classList.add("no-anim"); settle(); requestAnimationFrame(() => glide.classList.remove("no-anim")); });
    }

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
    sidebar.classList.add("sb-v2");
    sidebar.innerHTML = `
      <div class="sb-cover" aria-hidden="true"></div>
      <img class="avatar" src="${esc(SITE.photo)}" alt="Photo of ${esc(SITE.name)}" width="150" height="150">
      <div class="sidebar-id">
        <p class="name">${esc(SITE.name)}</p>
        <p class="sb-role">${SITE.position.map(esc).join("<br>")}</p>
        ${affiliation ? `<a class="affil" href="${esc(SITE.affiliationUrl)}" target="_blank" rel="noopener">${affiliation}</a>` : ""}
      </div>
      <div class="profile-links">${links}</div>
      ${advisors ? `<div class="sb-sec"><p class="sb-h">${SITE.advisors.length > 1 ? "Advisors" : "Advisor"}</p><ul class="sb-adv">${advisors}</ul></div>` : ""}
      <div class="sb-sec"><p class="sb-h">Contact</p>
        <ul class="sidebar-meta">
          <li>${ICONS.pin}<span>${esc(SITE.location)}</span></li>
          <li class="sm-email">${ICONS.email}<a href="#" data-mail="${esc(SITE.email)}" aria-label="Email">${mailTwoLines(SITE.email)}</a></li>
        </ul>
      </div>
      ${onCvPage ? "" : `<a class="btn cv-btn" href="${esc(SITE.cvPage || "cv.html")}">${ICONS.cv}View CV</a>`}`;
  }

  /* ---------- Footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "footer";
    const social = (SITE.social || []).filter((l) => SOCIAL[l.icon]).map((l) => l.url
      ? `<a class="f-social ${esc(l.icon)}" href="${esc(l.url)}" target="_blank" rel="noopener me" aria-label="${esc(l.label)}" data-tip="${esc(l.label)}">${SOCIAL[l.icon]}</a>`
      : `<span class="f-social ${esc(l.icon)} is-soon" role="img" aria-label="${esc(l.label)} (coming soon)" data-tip="${esc(l.label)} · coming soon">${SOCIAL[l.icon]}</span>`).join("");
    footer.innerHTML = `
      <div class="footer-inner">
        <a class="f-id" href="index.html">
          <img src="favicon.svg" alt="" width="42" height="42">
          <span><span class="f-name">${esc(SITE.name)}</span>${SITE.nameBn ? `<span class="f-bn" lang="bn">${esc(SITE.nameBn)}</span>` : ""}</span>
        </a>
        <nav class="f-socials" aria-label="Social profiles">${social}</nav>
        <div class="f-meta">
          <span>&copy; ${new Date().getFullYear()} &middot; Last updated ${esc(SITE.lastUpdated)}</span>
          <a class="f-top" href="#" aria-label="Back to top">${ICONS.up}</a>
        </div>
      </div>`;
    footer.querySelector(".f-top").addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
})();

/* =====================================================================
   Motion on every page (styles in style.css, section 14):
   menu-bar shadow + reading line, cards rising in, timelines drawing
   themselves, tags popping in one by one. Nothing to edit here.
   ===================================================================== */
(function () {
  "use strict";
  const reduce = (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) || document.documentElement.classList.contains("a11y-still");

  const start = () => {
    /* B. Menu bar shadow + reading-progress line */
    const bar = document.querySelector(".topbar");
    if (bar) {
      const line = document.createElement("span");
      line.className = "read-progress"; line.setAttribute("aria-hidden", "true");
      bar.appendChild(line);
      let ticking = false;
      const update = () => {
        ticking = false;
        bar.classList.toggle("is-scrolled", window.scrollY > 8);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        line.style.setProperty("--p", max > 40 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
      };
      window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      window.addEventListener("resize", update);
      update();
    }

    if (reduce || !("IntersectionObserver" in window)) return;

    /* Sidebar slides in once per visit (not on every page change) */
    const side = document.querySelector(".sidebar");
    try {
      if (side && !sessionStorage.getItem("sideShown")) { side.classList.add("m-side"); sessionStorage.setItem("sideShown", "1"); }
    } catch (e) { /* private mode: skip */ }

    /* C. Cards rise in */
    const cards = Array.from(document.querySelectorAll(".main .card, .main .m-card, .home-contact .hc-col"));
    cards.forEach((c) => {
      c.classList.add("m-reveal");
      c.addEventListener("transitionend", (e) => {
        if (e.target === c && e.propertyName === "transform" && c.classList.contains("in")) c.classList.add("done");
      });
    });
    /* tags and publications inside a card pop in one by one */
    document.querySelectorAll(".tags, .pub-list").forEach((list) =>
      Array.from(list.children).forEach((li, k) => li.style.setProperty("--k", k)));

    /* E. Timelines */
    const lines = Array.from(document.querySelectorAll(".entries"));
    lines.forEach((ul) => {
      const items = Array.from(ul.children);
      ul.classList.add("m-tl");
      items.forEach((li, k) => li.style.setProperty("--k", k));
      ul._doneAfter = items.length * 240 + 900;
    });

    let batch = 0, resetTimer = null;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        if (el.classList.contains("m-tl")) {
          el.classList.add("in");
          setTimeout(() => el.classList.add("drawn"), el._doneAfter);
        } else {
          el.style.setProperty("--d", `${Math.min(batch++, 5) * 110}ms`);
          el.classList.add("in");
          setTimeout(() => el.classList.add("done"), 1600);   // safety net if transitionend is missed
        }
      });
      clearTimeout(resetTimer); resetTimer = setTimeout(() => { batch = 0; }, 150);
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    cards.forEach((c) => io.observe(c));
    lines.forEach((l) => io.observe(l));
    /* Life & Beyond: cards shown later by a filter are revealed straight away */
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".m-chip")) return;
      setTimeout(() => document.querySelectorAll(".m-card.m-reveal:not(.in)").forEach((c) => { if (!c.hidden) io.observe(c); }), 0);
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();


/* =====================================================================
   Protected email links: <a href="#" data-mail="name[dot]x[at]domain[dot]in">
   The real address is built only when a visitor points at or clicks the
   link, so robots that collect emails from web pages don't find it.
   Optional: data-subject="…" pre-fills the email subject.
   ===================================================================== */
(function () {
  "use strict";
  const real = (s) => String(s).replace(/\s*\[dot\]\s*/gi, ".").replace(/\s*\[at\]\s*/gi, "@");
  window.siteEmail = real;
  const arm = (a) => {
    if (!a || a.dataset.armed) return;
    const subj = a.getAttribute("data-subject");
    a.href = "mailto:" + real(a.getAttribute("data-mail")) + (subj ? "?subject=" + encodeURIComponent(subj) : "");
    a.dataset.armed = "1";
  };
  ["pointerover", "focusin", "touchstart"].forEach((ev) =>
    document.addEventListener(ev, (e) => arm(e.target.closest && e.target.closest("a[data-mail]")), { passive: true }));
  document.addEventListener("click", (e) => { const a = e.target.closest && e.target.closest("a[data-mail]"); if (a) arm(a); }, true);
})();
/* =====================================================================
   Bengali name font: loads only the letters of your name from Google
   Fonts (a few kilobytes), so the Bengali looks the same on every device.
   ===================================================================== */
(function () {
  if (typeof SITE === "undefined" || !SITE.nameBn || document.getElementById("bn-font")) return;
  const l = document.createElement("link");
  l.id = "bn-font"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@500&display=swap&text=" + encodeURIComponent(SITE.nameBn);
  document.head.appendChild(l);
})();

/* =====================================================================
   Accessibility options (the "person in a circle" button in the menu bar):
   text size, high contrast, readable font, wider spacing, underlined links
   and pausing animations. Choices are remembered on the visitor's device.
   The same choices are applied early by the small script in each page's <head>.
   ===================================================================== */
(function () {
  "use strict";
  const btn = document.querySelector(".a11y-toggle");
  if (!btn) return;
  const root = document.documentElement;
  const KEY = "a11y";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  let st = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } };
  const TOGGLES = [
    ["contrast", "High contrast", "Stronger text and borders"],
    ["font", "Readable font", "A plainer, easy-to-read typeface"],
    ["spacing", "Wider spacing", "More room between lines and letters"],
    ["links", "Underline links", "Make every link easy to spot"],
    ["still", "Pause animations", "Stop moving and fading effects"]
  ];
  const apply = () => {
    [1, 2, 3].forEach((n) => root.classList.toggle("a11y-size-" + n, st.size === n));
    TOGGLES.forEach(([k]) => root.classList.toggle("a11y-" + k, !!st[k]));
    if (st.font && !document.getElementById("a11y-font")) {
      const l = document.createElement("link"); l.id = "a11y-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap";
      document.head.appendChild(l);
    }
    btn.classList.toggle("is-on", Object.keys(st).some((k) => st[k]));
  };
  const panel = document.createElement("div");
  panel.className = "a11y-panel"; panel.id = "a11y-panel"; panel.hidden = true;
  panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Accessibility options");
  panel.innerHTML = `
    <div class="ap-head"><p class="ap-title">Accessibility</p><button type="button" class="ap-close" aria-label="Close">&times;</button></div>
    <div class="ap-row"><span class="ap-label">Text size</span>
      <div class="ap-sizes" role="group" aria-label="Text size">
        <button type="button" data-size="0" aria-label="Normal text">A</button>
        <button type="button" data-size="1" aria-label="Larger text">A<sup>+</sup></button>
        <button type="button" data-size="2" aria-label="Large text">A<sup>++</sup></button>
        <button type="button" data-size="3" aria-label="Largest text">A<sup>+++</sup></button>
      </div></div>
    ${TOGGLES.map(([k, t, d]) => `<label class="ap-switch"><span><b>${t}</b><small>${d}</small></span><input type="checkbox" data-k="${k}"><i aria-hidden="true"></i></label>`).join("")}
    <button type="button" class="ap-reset">Reset all</button>`;
  document.body.appendChild(panel);
  const sync = () => {
    panel.querySelectorAll("[data-size]").forEach((b) => b.setAttribute("aria-pressed", String((st.size || 0) === +b.dataset.size)));
    panel.querySelectorAll("[data-k]").forEach((c) => { c.checked = !!st[c.dataset.k]; });
  };
  const open = (v) => {
    panel.hidden = !v; btn.setAttribute("aria-expanded", String(v));
    if (v) { sync(); const r = btn.getBoundingClientRect(); panel.style.top = (r.bottom + 10) + "px"; panel.style.right = Math.max(12, window.innerWidth - r.right - 8) + "px"; panel.querySelector("button, input").focus(); }
  };
  btn.addEventListener("click", (e) => { e.stopPropagation(); open(panel.hidden); });
  panel.querySelector(".ap-close").addEventListener("click", () => { open(false); btn.focus(); });
  document.addEventListener("click", (e) => { if (!panel.hidden && !panel.contains(e.target)) open(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { open(false); btn.focus(); } });
  panel.addEventListener("click", (e) => {
    const b = e.target.closest("[data-size]");
    if (b) { st.size = +b.dataset.size || 0; if (!st.size) delete st.size; save(); apply(); sync(); }
    if (e.target.closest(".ap-reset")) { st = {}; save(); apply(); sync(); }
  });
  panel.addEventListener("change", (e) => {
    const c = e.target.closest("[data-k]"); if (!c) return;
    if (c.checked) st[c.dataset.k] = true; else delete st[c.dataset.k];
    save(); apply();
  });
  apply();
})();

/* =====================================================================
   Search (magnifier button in the menu bar, or press "/").
   It reads the pages of this website itself, so there is nothing to keep
   up to date: new text you add to any page is found automatically.
   ===================================================================== */
(function () {
  "use strict";
  const btn = document.querySelector(".search-toggle");
  if (!btn || typeof SITE === "undefined") return;
  const pages = [...new Set(["index.html"].concat(SITE.menu.map((m) => m.file), Object.keys(SITE.subpages || {}), [SITE.cvPage || "cv.html", "news.html"]))];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clean = (s) => String(s || "").replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g, " ").replace(/\s+/g, " ").trim();   // drops LaTeX formulas
  let index = null, loading = null;

  const build = () => loading || (loading = Promise.all(pages.map((f) =>
    fetch(f).then((r) => (r.ok ? r.text() : "")).catch(() => "").then((html) => {
      if (!html) return [];
      const doc = new DOMParser().parseFromString(html, "text/html");
      doc.querySelectorAll("script, style, noscript, template, dialog, .cv-print-only").forEach((n) => n.remove());
      doc.querySelectorAll("p, li, h1, h2, h3, span, a, dd, dt, div").forEach((n) => n.append(" "));
      const title = clean((doc.querySelector(".page-band h1, main h1") || {}).textContent) || clean(doc.title.split("·")[0].split("|")[0]);
      const out = [];
      doc.querySelectorAll("main section, main .card, .home-contact .hc-col, section.collab").forEach((sec) => {
        if (sec.parentElement && sec.parentElement.closest("main section, main .card")) return;
        const h = sec.querySelector("h2, h3, .hc-eyebrow");
        const text = clean(sec.textContent);
        if (text.length < 20) return;
        const idEl = sec.id ? sec : sec.querySelector("[id]");
        out.push({ file: f, page: f === "index.html" ? "Home" : title, head: clean(h && h.textContent) || title, text, id: idEl && idEl.id });
      });
      if (!out.length) out.push({ file: f, page: title, head: title, text: clean((doc.querySelector("main") || doc.body).textContent) });
      return out;
    })
  )).then((lists) => {
    index = lists.flat();
    const addNews = () => (typeof NEWS !== "undefined" ? NEWS : []).forEach((n) => {
      const d = document.createElement("div"); d.innerHTML = n.text;
      index.push({ file: n.link || "news.html", page: "News", head: n.date, text: clean(d.textContent) });
    });
    if (typeof NEWS !== "undefined") { addNews(); return index; }
    return new Promise((res) => { const s = document.createElement("script"); s.src = "news.js"; s.onload = () => { addNews(); res(index); }; s.onerror = () => res(index); document.head.appendChild(s); });
  }));

  const overlay = document.createElement("div");
  overlay.className = "search-overlay"; overlay.hidden = true;
  overlay.innerHTML = `
    <div class="search-box" role="dialog" aria-modal="true" aria-label="Search this website">
      <div class="search-field">${btn.innerHTML}<input type="search" placeholder="Search this website…" aria-label="Search" autocomplete="off" spellcheck="false"><kbd>Esc</kbd></div>
      <div class="search-results" role="listbox" aria-label="Results"><p class="search-hint">Try <button type="button">homogenization</button> <button type="button">teaching</button> <button type="button">fellowship</button> <button type="button">workshop</button></p></div>
    </div>`;
  document.body.appendChild(overlay);
  const input = overlay.querySelector("input"), box = overlay.querySelector(".search-results");
  const hint = box.innerHTML;
  let active = -1;

  const snippet = (text, words) => {
    const low = text.toLowerCase();
    let at = -1; words.some((w) => (at = low.indexOf(w)) >= 0);
    const start = Math.max(0, at - 60);
    let s = (start > 0 ? "…" : "") + text.slice(start, start + 170) + (start + 170 < text.length ? "…" : "");
    s = esc(s);
    words.forEach((w) => { if (w.length > 1) s = s.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>"); });
    return s;
  };
  const run = () => {
    const q = clean(input.value).toLowerCase();
    active = -1;
    if (!q) { box.innerHTML = hint; return; }
    if (!index) { box.innerHTML = '<p class="search-empty">Loading…</p>'; build().then(run); return; }
    const words = q.split(" ").filter(Boolean);
    const hits = index.map((e) => {
      const hay = (e.head + " " + e.text).toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      let score = 0;
      words.forEach((w) => { if (e.head.toLowerCase().includes(w)) score += 5; if (e.page.toLowerCase().includes(w)) score += 3; score += Math.min(3, hay.split(w).length - 1); });
      return { e, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12);
    if (!hits.length) { box.innerHTML = `<p class="search-empty">No results for “${esc(input.value)}”.</p>`; return; }
    box.innerHTML = hits.map(({ e }) => `<a class="search-hit" role="option" href="${esc(e.file)}${e.id ? "#" + esc(e.id) : ""}">
        <span class="sh-page">${esc(e.page)}</span><span class="sh-head">${esc(e.head)}</span><span class="sh-text">${snippet(e.text, words)}</span></a>`).join("");
  };
  const show = (v) => {
    overlay.hidden = !v; document.documentElement.classList.toggle("search-open", v);
    if (v) { input.value = ""; box.innerHTML = hint; build(); setTimeout(() => input.focus(), 30); } else btn.focus();
  };
  btn.addEventListener("click", () => show(true));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) show(false);
    const t = e.target.closest(".search-hint button"); if (t) { input.value = t.textContent; run(); input.focus(); }
  });
  input.addEventListener("input", run);
  document.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test((e.target.tagName || "")) || e.target.isContentEditable;
    if (overlay.hidden) {
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) { e.preventDefault(); show(true); }
      return;
    }
    const items = [...box.querySelectorAll(".search-hit")];
    if (e.key === "Escape") show(false);
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); if (!items.length) return;
      active = (active + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle("is-active", i === active)); items[active].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && document.activeElement === input) {
      const t = items[active >= 0 ? active : 0]; if (t) location.href = t.href;
    }
  });
})();
