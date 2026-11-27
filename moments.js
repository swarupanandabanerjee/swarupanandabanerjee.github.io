/* =====================================================================
   LIFE & BEYOND — everything shown on life.html comes from this list.

   ✏️  TO ADD SOMETHING: copy one whole block from {  to  }, (including
       the comma) of the same kind, paste it at the TOP of the list, and
       change it. Newest first. To remove one, delete its whole block.

   PHOTOS: upload the picture to the repository (top level, like your
   other images), e.g.  moment-puri-beach.jpg  — small letters, hyphens,
   no spaces. Then write that name in  image: "…".
   Landscape or portrait both work; about 1600 px wide is plenty.

   There are four kinds (type):

   "photo"  : a photograph
       image   : file name, e.g. "moment-sunset.jpg"
       caption : one line under the photo
       place   : (optional) where
       date    : (optional) e.g. "Dec 2026"

   "travel" : a trip or visit
       image   : file name (cover photo)
       title   : e.g. "A week in Darjeeling"
       place   : e.g. "Darjeeling, West Bengal"
       date    : e.g. "May 2026"
       text    : (optional) a few lines about it

   "quote"  : words you like
       text    : the quotation, between backticks ` `
       author  : who said it

   "vlog"   : a YouTube video
       youtube : the video ID — the part after  v=  in the link.
                 For https://www.youtube.com/watch?v=dQw4w9WgXcQ
                 the ID is  dQw4w9WgXcQ   (for youtu.be/XXXX it is XXXX)
       title   : video title
       date    : (optional)

   If a photo has no image yet (image: ""), a placeholder picture is shown.
   ===================================================================== */
/* ----- COPY-READY TEMPLATES (copy one, paste it inside the list below) -----

  {
    type: "photo",
    image: "moment-name.jpg",
    caption: "A caption for your photo",
    place: "Place",
    date: "Dec 2026"
  },
  {
    type: "travel",
    image: "moment-trip.jpg",
    title: "Title of the trip",
    place: "Place, State",
    date: "Dec 2026",
    text: `A few lines about the visit.`
  },
  {
    type: "quote",
    text: `The quotation.`,
    author: "Name"
  },
  {
    type: "vlog",
    youtube: "VIDEO_ID",
    title: "Title of the vlog",
    date: "Dec 2026"
  },

   (Paste the template you need inside the list below, at the top.) ----- */
const MOMENTS = [
  {
    type: "quote",
    text: `Arise, awake, and stop not till the goal is reached.`,
    author: "Swami Vivekananda"
  },
  {
    type: "quote",
    text: `An equation for me has no meaning unless it expresses a thought of God.`,
    author: "Srinivasa Ramanujan"
  }
];

/* ======================= END OF LIST ==================================
   You normally don't need to edit anything below this line.
   ===================================================================== */
(function () {
  "use strict";
  const grid = document.getElementById("moments-grid");
  if (!grid) return;
  const filters = document.getElementById("moments-filters");
  const box = document.getElementById("moments-lightbox");

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const SVG = (d, extra) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"${extra || ""}>${d}</svg>`;
  const ICON = {
    photo: SVG('<rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/>'),
    travel: SVG('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    quote: SVG('<path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3"/>'),
    vlog: SVG('<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="m10 9 5 3-5 3V9Z"/>'),
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>'
  };
  const LABEL = { photo: "Photos", travel: "Travels", quote: "Quotes", vlog: "Vlogs" };

  // Placeholder picture for sample items (no file needed)
  function placeholder(kind, text) {
    const hue = { photo: 212, travel: 168, vlog: 352 }[kind] || 212;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 ${kind === "photo" ? 600 : 450}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},45%,82%)"/><stop offset="1" stop-color="hsl(${hue + 25},40%,62%)"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><path d="M0 ${kind === "photo" ? 470 : 350} L220 250 L360 380 L500 220 L800 ${kind === "photo" ? 450 : 330} V${kind === "photo" ? 600 : 450} H0Z" fill="hsla(${hue},35%,35%,.35)"/><circle cx="620" cy="130" r="48" fill="hsla(45,90%,70%,.85)"/><text x="400" y="${kind === "photo" ? 300 : 225}" font-family="Arial,sans-serif" font-size="34" fill="#fff" text-anchor="middle" opacity=".95">${text}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  const imgSrc = (m) => m.image ? m.image : placeholder(m.type, "Your photo here");
  const ytThumb = (m) => m.youtube ? `https://i.ytimg.com/vi/${encodeURIComponent(m.youtube)}/hqdefault.jpg` : placeholder("vlog", "");

  function meta(m) {
    const bits = [];
    if (m.place) bits.push(`<span class="m-place">${ICON.travel}${esc(m.place)}</span>`);
    if (m.date) bits.push(`<span class="m-date">${esc(m.date)}</span>`);
    return bits.length ? `<p class="m-meta">${bits.join("")}</p>` : "";
  }

  function card(m, i) {
    const tag = `<span class="m-kind">${ICON[m.type] || ""}${esc(LABEL[m.type] ? LABEL[m.type].replace(/s$/, "") : "")}</span>`;
    if (m.type === "quote") {
      return `<article class="m-card m-quote" data-type="quote">
        ${tag}
        <blockquote><p>${m.text}</p></blockquote>
        <p class="m-author">&mdash; ${esc(m.author)}</p>
      </article>`;
    }
    if (m.type === "vlog") {
      return `<article class="m-card m-vlog" data-type="vlog">
        <button type="button" class="m-media" data-open="${i}" aria-label="Play video: ${esc(m.title)}">
          <img src="${ytThumb(m)}" alt="" loading="lazy">
          <span class="m-play">${ICON.play}</span>
        </button>
        <div class="m-body">${tag}<h3>${esc(m.title)}</h3>${meta(m)}</div>
      </article>`;
    }
    const title = m.type === "travel" ? `<h3>${esc(m.title)}</h3>` : "";
    const text = m.type === "travel" && m.text ? `<p class="m-text">${m.text}</p>` : "";
    const cap = m.type === "photo" ? `<p class="m-caption">${esc(m.caption)}</p>` : "";
    return `<article class="m-card m-${m.type}" data-type="${m.type}">
      <button type="button" class="m-media" data-open="${i}" aria-label="Open photo: ${esc(m.title || m.caption || "")}">
        <img src="${imgSrc(m)}" alt="${esc(m.title || m.caption || "")}" loading="lazy">
      </button>
      <div class="m-body">${tag}${title}${cap}${meta(m)}${text}</div>
    </article>`;
  }

  grid.innerHTML = MOMENTS.map(card).join("");

  // Filter chips with counts
  const counts = MOMENTS.reduce((c, m) => (c[m.type] = (c[m.type] || 0) + 1, c), {});
  const kinds = ["photo", "travel", "quote", "vlog"].filter((k) => counts[k]);
  filters.innerHTML = [`<button type="button" class="m-chip is-on" data-filter="all" aria-pressed="true">All <span>${MOMENTS.length}</span></button>`]
    .concat(kinds.map((k) => `<button type="button" class="m-chip" data-filter="${k}" aria-pressed="false">${ICON[k]}${LABEL[k]} <span>${counts[k]}</span></button>`)).join("");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".m-chip"); if (!b) return;
    filters.querySelectorAll(".m-chip").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", String(x === b)); });
    const f = b.dataset.filter;
    grid.querySelectorAll(".m-card").forEach((c) => { c.hidden = f !== "all" && c.dataset.type !== f; });
  });

  // Lightbox (photos, travels, vlogs)
  const stage = box.querySelector(".lb-stage");
  const capEl = box.querySelector(".lb-caption");
  function openItem(i) {
    const m = MOMENTS[i];
    if (m.type === "vlog") {
      stage.innerHTML = m.youtube
        ? `<div class="lb-video"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.youtube)}?autoplay=1&rel=0" title="${esc(m.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`
        : `<img src="${ytThumb(m)}" alt="">`;
    } else {
      stage.innerHTML = `<img src="${imgSrc(m)}" alt="${esc(m.title || m.caption || "")}">`;
    }
    capEl.innerHTML = `<strong>${esc(m.title || m.caption || "")}</strong>${[m.place, m.date].filter(Boolean).map((x) => ` &middot; ${esc(x)}`).join("")}`;
    if (box.showModal) box.showModal(); else box.setAttribute("open", "");
  }
  function closeBox() { stage.innerHTML = ""; if (box.close) box.close(); else box.removeAttribute("open"); }
  grid.addEventListener("click", (e) => { const b = e.target.closest("[data-open]"); if (b) openItem(+b.dataset.open); });
  box.querySelector(".lb-close").addEventListener("click", closeBox);
  box.addEventListener("click", (e) => { if (e.target === box) closeBox(); });
  box.addEventListener("close", () => { stage.innerHTML = ""; });
})();
