/* =====================================================================
   Home page + News page behaviour: photo slider, "Latest" banner,
   News & Updates lists and the visitor box.
   You normally don't need to edit this file:
     • photos are listed in index.html  (search for ✏️ PHOTOS)
     • news items are listed in news.js
   ===================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = (typeof NEWS !== "undefined" && Array.isArray(NEWS)) ? NEWS : [];
  const plain = (html) => { const d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); };
  const escAttr = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isExternal = (url) => /^https?:/i.test(url);

  /* ---------------- 1. Photo slider ---------------- */
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector(".slides");
    const dotsBox = slider.querySelector(".slider-dots");
    const prevBtn = slider.querySelector(".slider-prev");
    const nextBtn = slider.querySelector(".slider-next");
    const DELAY = 5000;            // time each photo stays (milliseconds)
    let index = 0, timer = null, slides = [];

    const build = () => {
      slides = Array.from(track.children);
      dotsBox.innerHTML = slides.map((_, i) =>
        `<button type="button" role="tab" aria-label="Show photo ${i + 1}"></button>`).join("");
      slider.classList.toggle("single", slides.length < 2);
      if (index >= slides.length) index = 0;
      show(index);
    };
    const show = (i) => {
      if (!slides.length) return;
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(${-100 * index}%)`;
      slides.forEach((s, k) => s.setAttribute("aria-hidden", String(k !== index)));
      Array.from(dotsBox.children).forEach((d, k) => d.setAttribute("aria-selected", String(k === index)));
    };
    const play = () => { stop(); if (!reduceMotion && slides.length > 1) timer = setInterval(() => show(index + 1), DELAY); };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };

    // A photo listed in index.html but not uploaded yet is skipped automatically.
    track.querySelectorAll("img").forEach((img) => {
      const drop = () => { const fig = img.closest(".slide"); if (fig) { fig.remove(); build(); play(); } };
      if (img.complete && img.naturalWidth === 0) drop(); else img.addEventListener("error", drop);
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

    // Find extra photos automatically: image-2.jpg, image-3.jpg, … (.jpg, .jpeg or .png).
    // Stops at the first number that isn't uploaded.
    const prefix = slider.getAttribute("data-auto-photos");
    const maxN = parseInt(slider.getAttribute("data-auto-max"), 10) || 12;
    const EXTS = ["jpg", "jpeg", "png"];
    const probe = (n, e) => {
      if (!prefix || n > maxN || e >= EXTS.length) return;
      const src = `${prefix}${n}.${EXTS[e]}`;
      const test = new Image();
      test.onload = () => {
        const fig = document.createElement("figure");
        fig.className = "slide";
        fig.innerHTML = `<img src="${escAttr(src)}" alt="Photo ${n - 1} of Swarupananda Banerjee">`;
        track.appendChild(fig);
        build(); play();
        probe(n + 1, 0);
      };
      test.onerror = () => probe(n, e + 1);
      test.src = src;
    };
    if (prefix) probe(2, 0);
  }

  /* ---------------- 2. "Latest" moving banner ---------------- */
  const ticker = document.getElementById("ticker");
  if (ticker && items.length) {
    const pick = items.find((n) => n.ticker) || items[0];
    const text = `${pick.date} — ${plain(pick.text)}`;
    if (pick.link) {
      ticker.href = pick.link;
      if (isExternal(pick.link)) { ticker.target = "_blank"; ticker.rel = "noopener"; }
    } else {
      ticker.removeAttribute("href");
    }
    ticker.setAttribute("aria-label", `Latest update: ${text}`);
    ticker.title = text;
    const move = ticker.querySelector(".ticker-move");
    const unit = `<span class="ticker-item">${escAttr(text)}<span class="ticker-sep" aria-hidden="true">•</span></span>`;
    move.innerHTML = unit + unit;           // two copies → seamless loop
    // Constant reading speed whatever the text length (~55 px per second)
    requestAnimationFrame(() => {
      const w = move.scrollWidth / 2;
      move.style.animationDuration = `${Math.max(10, w / 55)}s`;
      ticker.classList.add("ready");
    });
  } else if (ticker) {
    ticker.hidden = true;
  }

  /* ---------------- 3. News & Updates lists ---------------- */
  document.querySelectorAll("[data-news]").forEach((list) => {
    const limit = parseInt(list.getAttribute("data-news"), 10) || items.length;
    const byYear = list.hasAttribute("data-group-by-year");
    let html = "", lastYear = null;
    items.slice(0, limit).forEach((n, i) => {
      const year = (String(n.date).match(/\d{4}/) || [""])[0];
      if (byYear && year !== lastYear) { html += `<li class="news-year" aria-hidden="false"><span>${escAttr(year)}</span></li>`; lastYear = year; }
      const live = i === 0 ? `<span class="live-badge" title="Most recent update"><span class="live-dot" aria-hidden="true"></span>Latest</span>` : "";
      const ext = n.link && isExternal(n.link) ? ' target="_blank" rel="noopener"' : "";
      const body = n.link
        ? `<a class="news-text" href="${escAttr(n.link)}"${ext}>${n.text}</a>`
        : `<span class="news-text">${n.text}</span>`;
      html += `<li class="news-item${i === 0 ? " is-latest" : ""}"><span class="date">${escAttr(n.date)}</span><span class="news-body">${live}${body}</span></li>`;
    });
    list.innerHTML = html;
  });
  const countEl = document.getElementById("news-count");
  if (countEl) countEl.textContent = String(items.length);

  /* ---------------- 4. Visitor box ---------------- */
  // Shows the "setup pending" placeholder until the ClustrMaps code is pasted in index.html.
  const vbox = document.querySelector("[data-visitor-slot]");
  if (vbox) {
    const hasWidget = !!vbox.querySelector("script, iframe, img, canvas");
    vbox.closest(".visitor-card").classList.toggle("has-widget", hasWidget);
  }
})();
