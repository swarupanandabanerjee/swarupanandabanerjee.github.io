/* =====================================================================
   QUOTATION BANNER — reusable on any page.

   HOW TO SHOW A QUOTE ON A PAGE (two lines in that page's .html file):
     1. Where the banner should appear, put:
          <section class="quote-banner" data-quote="gita-9-34"></section>
     2. Near the bottom, next to the other <script> lines, put:
          <script src="quote.js"></script>
   To use a different quotation on a page, change "gita-9-34" to the name
   of another entry below. To hide the banner on a page, delete line 1
   (or write data-quote="off").

   ✏️  TO EDIT OR ADD A QUOTATION: edit an entry below, or copy a whole
       entry (from  "name": {  to  },  ) and give it a new name.
       Put text between backticks ` `. In the verse, a new line in the
       text = a new line on the page.

   Each entry has:
     verse        : the main text (Sanskrit/Devanagari or any language)
     transliteration : the verse in English letters, shown just under
                    the verse ("" for none). A new line = a new line.
     translation  : the meaning, shown below in italics ("" for none)
     attribution  : small text at the bottom-right
     source       : (optional) web address the attribution links to
     illustration : picture on the left, e.g. "gita-chariot.jpg"
                    (any .jpg/.png/.svg uploaded to the repository)
                    ("" for no picture)
     background   : background picture, e.g. "quote-mountains.svg"
                    ("" for a plain pale background)
     lang         : leave "" (empty). Setting "sa" (Sanskrit) makes some
                    fonts switch to old-style joined letters (e.g. क्त
                    drawn like त्त), so the text would look different from
                    other websites.
   ===================================================================== */
const QUOTES = {

  "gita-9-34": {
    verse: `मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।
मामेवैष्यसि युक्त्वैवमात्मानं मत्परायण: ॥`,
    transliteration: `man-manā bhava mad-bhakto mad-yājī māṁ namaskuru
mām evaiṣhyasi yuktvaivam ātmānaṁ mat-parāyaṇaḥ`,
    translation: `Always think of Me, be devoted to Me, worship Me, and offer obeisance to Me. Having dedicated your mind and body to Me, you will certainly come to Me.`,
    attribution: "Bhagavad Gita – Chapter 9, Verse 34",
    source: "https://www.holy-bhagavad-gita.org/chapter/9/verse/34/",
    illustration: "gita-chariot.jpg",
    background: "quote-mountains.svg",
    lang: ""
  }

  // , "another-name": { verse: `…`, transliteration: `…`, translation: `…`, attribution: "…", source: "", illustration: "", background: "quote-mountains.svg", lang: "" }
};
/* ======================= END OF QUOTATIONS ========================== */

(function () {
  "use strict";
  const banners = document.querySelectorAll(".quote-banner[data-quote]");
  if (!banners.length) return;

  // Load the banner's stylesheet and fonts once (so a page needs only the two lines above)
  const addLink = (href, id) => {
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = href; l.id = id;
    document.head.appendChild(l);
  };
  addLink("quote.css", "quote-css");
  addLink("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,500&display=swap", "quote-fonts");

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const lines = (s) => String(s).trim().split(/\r?\n/).map((l) => `<span class="qb-line">${esc(l.trim())}</span>`).join("");

  banners.forEach((el) => {
    const key = el.getAttribute("data-quote");
    const q = QUOTES[key];
    if (!q || key === "off") { el.hidden = true; return; }

    const attribution = q.source
      ? `<a href="${esc(q.source)}" target="_blank" rel="noopener" title="Read this verse at the source">${esc(q.attribution)}</a>`
      : esc(q.attribution || "");

    el.classList.toggle("no-art", !q.illustration);
    el.setAttribute("aria-label", q.attribution ? `Quotation: ${q.attribution}` : "Quotation");
    el.innerHTML = `
      <div class="qb-bg"${q.background ? ` style="background-image:url('${esc(q.background)}')"` : ""}></div>
      <div class="qb-inner">
        ${q.illustration ? `<div class="qb-art"><img src="${esc(q.illustration)}" alt="" loading="lazy"></div>` : ""}
        <figure class="qb-text">
          <blockquote class="qb-verse"${q.lang ? ` lang="${esc(q.lang)}"` : ""}>${lines(q.verse)}</blockquote>
          ${q.transliteration ? `<p class="qb-translit">${lines(q.transliteration)}</p>` : ""}
          ${q.translation ? `<div class="qb-divider" aria-hidden="true"><span></span><i></i><span></span></div>
          <p class="qb-translation">${esc(q.translation)}</p>` : ""}
          ${q.attribution ? `<figcaption class="qb-attribution">${attribution}</figcaption>` : ""}
        </figure>
      </div>`;
  });
})();
