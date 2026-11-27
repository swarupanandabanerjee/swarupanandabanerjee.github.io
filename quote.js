/* =====================================================================
   QUOTATION BANNER — reusable on any page.

   HOW TO SHOW A QUOTE ON A PAGE (two lines in that page's .html file):
     1. Where the banner should appear, put:
          <section class="quote-banner" data-quote="gita-9-34"></section>
     2. Near the bottom, next to the other <script> lines, put:
          <script src="quote.js"></script>
   INNER PAGES show their verse inside the title band at the top:
          <div class="pb-verse" data-verse="gita-10-32"></div>
   (change the name to pick another entry; delete that line for none).

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
     match        : true = the banner background is made from the picture
                    itself (blurred), so the colours flow into each other.
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
    illustration: "gita-chariot-colour.jpg",
    background: "gita-chariot-colour.jpg",
    match: true,
    lang: ""
  }


  , "gita-10-32": {
    verse: `सर्गाणामादिरन्तश्च मध्यं चैवाहमर्जुन ।
अध्यात्मविद्या विद्यानां वाद: प्रवदतामहम् ॥`,
    transliteration: `sargāṇām ādir antaśh cha madhyaṁ chaivāham arjuna
adhyātma-vidyā vidyānāṁ vādaḥ pravadatām aham`,
    translation: `O Arjun, know Me to be the beginning, middle, and end of all creation. Amongst sciences I am the science of spirituality, and in debates I am the logical conclusion.`,
    attribution: "Bhagavad Gita – Chapter 10, Verse 32",
    source: "https://www.holy-bhagavad-gita.org/chapter/10/verse/32/",
    illustration: "", background: "", lang: ""
  }

  , "gita-5-18": {
    verse: `विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि ।
शुनि चैव श्वपाके च पण्डिता: समदर्शिन: ॥`,
    transliteration: `vidyā-vinaya-sampanne brāhmaṇe gavi hastini
śhuni chaiva śhva-pāke cha paṇḍitāḥ sama-darśhinaḥ`,
    translation: `The truly learned, with the eyes of divine knowledge, see with equal vision a Brahmin, a cow, an elephant, a dog, and a dog-eater.`,
    attribution: "Bhagavad Gita – Chapter 5, Verse 18",
    source: "https://www.holy-bhagavad-gita.org/chapter/5/verse/18/",
    illustration: "", background: "", lang: ""
  }

  , "gita-6-5": {
    verse: `उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।
आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मन: ॥`,
    transliteration: `uddhared ātmanātmānaṁ nātmānam avasādayet
ātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ`,
    translation: `Elevate yourself through the power of your mind, and not degrade yourself, for the mind can be the friend and also the enemy of the self.`,
    attribution: "Bhagavad Gita – Chapter 6, Verse 5",
    source: "https://www.holy-bhagavad-gita.org/chapter/6/verse/5/",
    illustration: "", background: "", lang: ""
  }

  , "gita-4-38": {
    verse: `न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ।
तत्स्वयं योगसंसिद्ध: कालेनात्मनि विन्दति ॥`,
    transliteration: `na hi jñānena sadṛiśhaṁ pavitramiha vidyate
tatsvayaṁ yogasansiddhaḥ kālenātmani vindati`,
    translation: `In this world, there is nothing as purifying as divine knowledge. One who has attained purity of mind through prolonged practice of Yog, receives such knowledge within the heart, in due course of time.`,
    attribution: "Bhagavad Gita – Chapter 4, Verse 38",
    source: "https://www.holy-bhagavad-gita.org/chapter/4/verse/38/",
    illustration: "", background: "", lang: ""
  }

  , "gita-3-20": {
    verse: `कर्मणैव हि संसिद्धिमास्थिता जनकादयः ।
लोकसङ्ग्रहमेवापि सम्पश्यन्कर्तुमर्हसि ॥`,
    transliteration: `karmaṇaiva hi sansiddhim āsthitā janakādayaḥ
loka-saṅgraham evāpi sampaśhyan kartum arhasi`,
    translation: `By performing their prescribed duties, King Janak and others attained perfection. You should also perform your duties to set an example for the good of the world.`,
    attribution: "Bhagavad Gita – Chapter 3, Verse 20",
    source: "https://www.holy-bhagavad-gita.org/chapter/3/verse/20/",
    illustration: "", background: "", lang: ""
  }

  , "gita-4-34": {
    verse: `तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया ।
उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिन: ॥`,
    transliteration: `tad viddhi praṇipātena paripraśhnena sevayā
upadekṣhyanti te jñānaṁ jñāninas tattva-darśhinaḥ`,
    translation: `Learn the Truth by approaching a spiritual master. Inquire from him with reverence and render service unto him. Such an enlightened Saint can impart knowledge unto you because he has seen the Truth.`,
    attribution: "Bhagavad Gita – Chapter 4, Verse 34",
    source: "https://www.holy-bhagavad-gita.org/chapter/4/verse/34/",
    illustration: "", background: "", lang: ""
  }

  // , "another-name": { verse: `…`, transliteration: `…`, translation: `…`, attribution: "…", source: "", illustration: "", background: "quote-mountains.svg", lang: "" }
};
/* ======================= END OF QUOTATIONS ========================== */

(function () {
  "use strict";
  const banners = document.querySelectorAll(".quote-banner[data-quote]");
  const bands = document.querySelectorAll("[data-verse]");   // verse inside the title band of inner pages
  if (!banners.length && !bands.length) return;

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
    el.classList.toggle("qb-match", !!q.match);   // background made from the picture itself, so the colours match
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

  // Title band on inner pages: <div class="pb-verse" data-verse="KEY"></div>
  bands.forEach((el) => {
    const q = QUOTES[el.getAttribute("data-verse")];
    if (!q) { el.hidden = true; el.closest(".page-band")?.classList.add("pb-plain"); return; }
    const attribution = q.source
      ? `<a href="${esc(q.source)}" target="_blank" rel="noopener" title="Read this verse at the source">${esc(q.attribution)}</a>`
      : esc(q.attribution || "");
    el.innerHTML = `
      <figure class="pbv">
        <blockquote class="pbv-verse"${q.lang ? ` lang="${esc(q.lang)}"` : ""}>${lines(q.verse)}</blockquote>
        ${q.transliteration ? `<p class="pbv-translit">${lines(q.transliteration)}</p>` : ""}
        ${q.translation ? `<p class="pbv-meaning">${esc(q.translation)}</p>` : ""}
        ${q.attribution ? `<figcaption class="pbv-ref">${attribution}</figcaption>` : ""}
      </figure>`;
  });
})();
