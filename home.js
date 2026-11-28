/* =====================================================================
   Home page + News page behaviour: photo slider, the rolling
   News & Updates column, the full News list and the visitor box.
   You normally don't need to edit this file:
     • photos are listed in index.html  (search for ✏️ PHOTOS)
     • news items are listed in news.js
   ===================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("a11y-still");
  const items = (typeof NEWS !== "undefined" && Array.isArray(NEWS)) ? NEWS : [];
  const plain = (html) => { const d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); };
  const escAttr = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isExternal = (url) => /^https?:/i.test(url);

  /* ---------------- 1. Photo slider (crossfade) ----------------
     Photos fade into each other. Each photo is downloaded only when it is
     about to be shown (the next one is fetched while the current one is on
     screen), so visitors who leave early don't download every photo.      */
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector(".slides");
    const dotsBox = slider.querySelector(".slider-dots");
    const prevBtn = slider.querySelector(".slider-prev");
    const nextBtn = slider.querySelector(".slider-next");
    const DELAY = 5000;            // ✏️ time each photo stays (milliseconds)
    let index = 0, want = 0, timer = null, slides = [];

    const imgOf = (s) => s && s.querySelector("img");
    const load = (s) => {          // start downloading a slide's photo (once)
      const img = imgOf(s);
      if (img && !img.getAttribute("src") && img.dataset.src) img.src = img.dataset.src;
      return img;
    };
    const ready = (img) => (!img || (img.complete && img.naturalWidth > 0)) ? Promise.resolve() :
      new Promise((res) => {
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });
        setTimeout(res, 4000);       // never wait forever
      });

    const build = () => {
      slides = Array.from(track.children);
      dotsBox.innerHTML = slides.map((_, i) =>
        `<button type="button" role="tab" aria-label="Show photo ${i + 1}"></button>`).join("");
      slider.classList.toggle("single", slides.length < 2);
      if (index >= slides.length) index = 0;
      paint(index);
    };
    const paint = (k) => {
      slides.forEach((s, j) => { s.classList.toggle("is-active", j === k); s.setAttribute("aria-hidden", String(j !== k)); });
      Array.from(dotsBox.children).forEach((d, j) => d.setAttribute("aria-selected", String(j === k)));
    };
    const show = (i) => {
      if (!slides.length) return;
      const k = (i + slides.length) % slides.length;
      want = k;
      ready(load(slides[k])).then(() => {
        if (want !== k || !slides[k]) return;        // the visitor already moved on
        index = k; paint(k);
        if (slides.length > 1) load(slides[(k + 1) % slides.length]);   // get the next photo ready
      });
    };
    const play = () => { stop(); if (!reduceMotion && slides.length > 1) timer = setInterval(() => show(index + 1), DELAY); };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };

    // A photo that cannot be loaded is removed from the slider automatically.
    const watch = (img) => img.addEventListener("error", () => {
      const fig = img.closest(".slide"); if (fig) { fig.remove(); build(); play(); }
    });
    track.querySelectorAll("img").forEach((img) => {
      if (img.complete && img.getAttribute("src") && img.naturalWidth === 0) { img.closest(".slide").remove(); } else watch(img);
    });

    dotsBox.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      show(Array.from(dotsBox.children).indexOf(b)); play();
    });
    prevBtn.addEventListener("click", () => { show(index - 1); play(); });
    nextBtn.addEventListener("click", () => { show(index + 1); play(); });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", play);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", play);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : play()));

    // Swipe on phones
    let x0 = null;
    track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      play();
    });

    build(); play();

    // Find extra photos automatically: image-2, image-3, … (.webp, .jpg, .jpeg or .png).
    // Only a tiny "does it exist?" check is made here; the photo itself is
    // downloaded later, just before it is shown. Stops at the first missing number.
    const prefix = slider.getAttribute("data-auto-photos");
    const maxN = parseInt(slider.getAttribute("data-auto-max"), 10) || 12;
    const EXTS = ["webp", "jpg", "jpeg", "png"];
    const exists = (url) => fetch(url, { method: "HEAD" }).then((r) => r.ok).catch(() => null);
    const viaImage = (url) => new Promise((res) => { const t = new Image(); t.onload = () => res(true); t.onerror = () => res(false); t.src = url; });
    const add = (src, n) => {
      const fig = document.createElement("figure");
      fig.className = "slide";
      fig.innerHTML = `<img data-src="${escAttr(src)}" alt="Photo ${n - 1} of Swarupananda Banerjee" decoding="async">`;
      track.appendChild(fig); watch(fig.querySelector("img"));
      build(); play();
      if (slides.length === 2) setTimeout(() => load(slides[1]), 1500);   // first extra photo, after the page has settled
    };
    const discover = async () => {
      for (let n = 2; n <= maxN; n++) {
        let found = null;
        for (const ext of EXTS) {
          const url = `${prefix}${n}.${ext}`;
          let ok = await exists(url);
          if (ok === null) ok = await viaImage(url);     // fallback if the quick check is not possible
          if (ok) { found = url; break; }
        }
        if (!found) return;
        add(found, n);
      }
    };
    if (prefix) (document.readyState === "complete" ? discover() : window.addEventListener("load", discover, { once: true }));
  }

  /* ---------------- 2. Shared helpers for news items ---------------- */
  // Icons and labels for the "type" field in news.js
  const SVG = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const TYPES = {
    preprint:  ["Preprint",  SVG('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>')],
    paper:     ["Paper",     SVG('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>')],
    talk:      ["Talk",      SVG('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>')],
    workshop:  ["Workshop",  SVG('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>')],
    teaching:  ["Teaching",  SVG('<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>')],
    position:  ["Position",  SVG('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>')],
    award:     ["Award",     SVG('<circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 7.5 5-3 5 3-1.5-7.5"/>')],
    milestone: ["Milestone", SVG('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>')]
  };
  const GUESS = { "publications.html": "paper", "talks.html": "talk", "teaching.html": "teaching", "cv.html": "position", "research.html": "milestone" };
  const typeOf = (n) => (TYPES[n.type] ? n.type : GUESS[n.link] || "milestone");

  // "Oct 2026" → months since then (0 = this month)
  const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const today = new Date();
  const monthsAgo = (date) => {
    const m = String(date).toLowerCase().match(/([a-z]{3})[a-z]*\.?\s+(\d{4})/);
    if (!m || MONTHS.indexOf(m[1]) < 0) return null;
    return (today.getFullYear() - +m[2]) * 12 + today.getMonth() - MONTHS.indexOf(m[1]);
  };
  const relative = (date) => {
    const a = monthsAgo(date);
    if (a === null || a < 0 || a >= 12) return date;
    return a === 0 ? "This month" : a === 1 ? "Last month" : `${a} months ago`;
  };
  const isNew = (date) => { const a = monthsAgo(date); return a !== null && a >= 0 && a <= 1; };
  const linkAttrs = (n) => (n.link ? ` href="${escAttr(n.link)}"${isExternal(n.link) ? ' target="_blank" rel="noopener"' : ""}` : "");

  /* ---------------- 3. Home page: rolling News & Updates column ---------------- */
  const rail = document.querySelector("[data-news-rail]");
  if (rail) {
    const limit = parseInt(rail.getAttribute("data-news-rail"), 10) || 8;
    const row = (n) => {
      const t = typeOf(n), [label, icon] = TYPES[t];
      const tag = n.link ? "a" : "div";
      return `<li class="nr-item"><${tag} class="nr-link"${linkAttrs(n)}>` +
        `<span class="nr-ico t-${t}">${icon}</span>` +
        `<span class="nr-body"><span class="nr-meta">${isNew(n.date) ? '<span class="nr-new">New</span>' : ""}` +
        `<span class="nr-cat">${label}</span><span aria-hidden="true">·</span><time title="${escAttr(n.date)}">${escAttr(relative(n.date))}</time></span>` +
        `<span class="nr-text">${n.text}</span></span></${tag}></li>`;
    };
    const html = items.slice(0, limit).map(row).join("");
    rail.innerHTML = html || '<li class="nr-item"><span class="nr-text">No news yet.</span></li>';

    // Rolls upwards without stopping. After the last item has scrolled off the top, the box stays
    // empty for a moment and then the first item comes up again from the bottom.
    // Stops while the mouse / finger / keyboard is on it.
    const win = rail.closest(".nr-window");
    const SPEED = 30;                       // pixels per second (higher = faster)
    const START_AFTER = 2500;               // wait before rolling starts (milliseconds)
    let rolling = false, paused = false, last = 0, pos = 0, cycle = 0;
    const measure = () => {
      const gap = rail.querySelector(".nr-gap");
      if (gap) gap.style.height = win.clientHeight + "px";      // blank space = one full box
      const copy = rail.querySelector(".nr-copy");
      cycle = copy ? copy.offsetTop - rail.firstElementChild.offsetTop : 0;
    };
    const setup = () => {
      if (reduceMotion || !html || rolling || win.scrollHeight - win.clientHeight <= 8) return;
      rail.insertAdjacentHTML("beforeend", '<li class="nr-gap" aria-hidden="true"></li>' +
        html.replace(/<li class="nr-item">/g, '<li class="nr-item nr-copy" aria-hidden="true">'));
      rail.querySelectorAll(".nr-copy a").forEach((a) => a.setAttribute("tabindex", "-1"));
      measure();
      rolling = true; win.classList.add("is-rolling");
      setTimeout(() => requestAnimationFrame(step), START_AFTER);
    };
    const step = (t) => {
      if (last && !paused && !document.hidden && cycle) {
        pos += Math.min(t - last, 100) / 1000 * SPEED;
        if (pos >= cycle) pos -= cycle;
        win.scrollTop = pos;
      }
      last = t;
      requestAnimationFrame(step);
    };
    const hold = () => { paused = true; };
    const go = () => { paused = false; pos = cycle ? win.scrollTop % cycle : win.scrollTop; };
    win.addEventListener("mouseenter", hold);
    win.addEventListener("mouseleave", go);
    win.addEventListener("focusin", hold);
    win.addEventListener("focusout", go);
    win.addEventListener("touchstart", hold, { passive: true });
    win.addEventListener("touchend", () => setTimeout(go, 2500));
    win.addEventListener("scroll", () => { if (paused && cycle && win.scrollTop >= cycle) win.scrollTop -= cycle; });
    window.addEventListener("resize", () => { if (rolling) measure(); });
    if (document.readyState === "complete") setup(); else window.addEventListener("load", setup);
  }

  /* ---------------- 4. News page: full list grouped by year ---------------- */
  document.querySelectorAll("[data-news]").forEach((list) => {
    const limit = parseInt(list.getAttribute("data-news"), 10) || items.length;
    const byYear = list.hasAttribute("data-group-by-year");
    let html = "", lastYear = null, k = 0;
    items.slice(0, limit).forEach((n, i) => {
      const year = (String(n.date).match(/\d{4}/) || [""])[0];
      if (byYear && year !== lastYear) { html += `<li class="news-year" style="--i:${k++}"><span>${escAttr(year)}</span></li>`; lastYear = year; }
      const t = typeOf(n), [label, icon] = TYPES[t];
      const live = i === 0 ? `<span class="live-badge" title="Most recent update"><span class="live-dot" aria-hidden="true"></span>Latest</span>` : "";
      const body = n.link
        ? `<a class="news-text"${linkAttrs(n)}>${n.text}</a>`
        : `<span class="news-text">${n.text}</span>`;
      html += `<li class="news-item${i === 0 ? " is-latest" : ""}" style="--i:${k++}"><span class="date">${escAttr(n.date)}</span>` +
        `<span class="news-ico t-${t}" title="${label}">${icon}</span>` +
        `<span class="news-body"><span class="news-cat">${label}</span>${live}${body}</span></li>`;
    });
    list.innerHTML = html;
    list.classList.add("is-animated");
  });
  const countEl = document.getElementById("news-count");
  if (countEl) countEl.textContent = String(items.length);

  /* ---------------- 5. Visitor box ---------------- */
  // Shows the "setup pending" placeholder until a visitor-map code is pasted in index.html.
  const vbox = document.querySelector("[data-visitor-slot]");
  if (vbox) {
    const hasWidget = !!vbox.querySelector("script, iframe, img, canvas");
    vbox.closest(".visitor-card").classList.toggle("has-widget", hasWidget);

    // Keep the visitor map up to date without reloading the page:
    // every 60 seconds (only while the map is on screen and the tab is open)
    // the map picture is fetched again, so new visits and the new total appear.
    const REFRESH = 60 * 1000;
    let onScreen = false;
    const refreshMap = () => {
      if (document.hidden || !onScreen) return;
      vbox.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src");
        if (!src || src.startsWith("data:")) return;
        const fresh = new Image();
        const url = src.replace(/([?&])_r=\d+/, "$1").replace(/[?&]$/, "");
        fresh.onload = () => { img.src = fresh.src; };          // swap only when the new picture has loaded (no flicker)
        fresh.src = url + (url.includes("?") ? "&" : "?") + "_r=" + Date.now();
      });
      vbox.querySelectorAll("iframe").forEach((f) => { try { f.src = f.src; } catch (e) { /* ignore */ } });
    };
    if (hasWidget) {
      if ("IntersectionObserver" in window) {
        new IntersectionObserver((es) => es.forEach((e) => { onScreen = e.isIntersecting; })).observe(vbox);
      } else onScreen = true;
      setInterval(refreshMap, REFRESH);
      document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshMap(); });   // also when you come back to the tab
    }
  }
})();

/* =====================================================================
   "Want to collaborate?" section: network of connected points that
   follows the mouse, rotating topics, copy-email button.
   ===================================================================== */
(function () {
  "use strict";
  const sec = document.querySelector(".collab");
  if (!sec) return;
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("a11y-still");

  // Entrance when the section scrolls into view
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { sec.classList.add("in-view"); io.disconnect(); } }), { threshold: .25 });
    io.observe(sec);
  } else sec.classList.add("in-view");

  // Rotating topics
  const rot = sec.querySelector(".collab-rot");
  if (rot && !reduce) {
    const topics = (rot.getAttribute("data-topics") || rot.textContent).split("|").map((t) => t.trim()).filter(Boolean);
    let k = 0;
    if (topics.length > 1) setInterval(() => {
      if (document.hidden) return;
      rot.classList.add("out");
      setTimeout(() => { k = (k + 1) % topics.length; rot.textContent = topics[k]; rot.classList.remove("out"); }, 360);
    }, 2600);
  }

  // Copy email
  const copyBtn = sec.querySelector("[data-copy-mail]");
  if (copyBtn) copyBtn.addEventListener("click", async () => {
    const addr = (window.siteEmail || ((s) => s))(copyBtn.getAttribute("data-copy-mail"));
    const label = copyBtn.querySelector(".collab-copy-label");
    try { await navigator.clipboard.writeText(addr); label.textContent = "Copied to clipboard ✓"; }
    catch (e) { label.textContent = addr; }
    copyBtn.classList.add("copied");
    setTimeout(() => { copyBtn.classList.remove("copied"); label.textContent = "Copy email address"; }, 2600);
  });

  // Network of points (canvas)
  const cv = sec.querySelector(".collab-net");
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, pts = [], mouse = null, running = false, visible = false;
  // Colours follow the theme: navy points on the light card, pale points on the dark card
  let GOLD = "231,182,90", WHITE = "220,232,250", LINE = .22, DOT = .55;
  const tone = () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    GOLD = dark ? "231,182,90" : "196,140,40";
    WHITE = dark ? "220,232,250" : "29,79,145";
    LINE = dark ? .22 : .16; DOT = dark ? .55 : .42;
  };
  tone();
  new MutationObserver(() => { tone(); if (!running) draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const size = () => {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, Math.max(28, W * H / 9000)));
    pts = Array.from({ length: n }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .8, gold: i % 7 === 0
    }));
  };
  const LINK = 130;
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      if (mouse) {   // gentle pull towards the mouse
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        if (d < 180 && d > 1) { p.x += dx / d * .35; p.y += dy / d * .35; }
      }
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) { ctx.strokeStyle = `rgba(${WHITE},${(1 - d / LINK) * LINE})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      if (mouse) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < 170) { ctx.strokeStyle = `rgba(${GOLD},${(1 - d / 170) * .55})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
    }
    for (const p of pts) {
      ctx.fillStyle = p.gold ? `rgba(${GOLD},.9)` : `rgba(${WHITE},${DOT})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.gold ? p.r + .8 : p.r, 0, Math.PI * 2); ctx.fill();
    }
  };
  const loop = () => { if (!running) return; draw(); requestAnimationFrame(loop); };
  const start = () => { if (running || reduce) return; running = true; requestAnimationFrame(loop); };
  const stop = () => { running = false; };
  size(); draw();
  window.addEventListener("resize", () => { size(); draw(); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting; visible && !document.hidden ? start() : stop(); })).observe(sec);
  } else start();
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : visible && start()));
  const card = sec.querySelector(".collab-card");
  card.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; if (reduce) draw(); });
  card.addEventListener("pointerleave", () => { mouse = null; if (reduce) draw(); });
})();
