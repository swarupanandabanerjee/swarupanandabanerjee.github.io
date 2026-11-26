# Swarupananda Banerjee: academic website

Live site: **https://swarupanandabanerjee.github.io**

The site is plain HTML and CSS. It has no build step, so every change you save on GitHub goes live within 1–2 minutes.

---

## Part 1: First-time upload (only once)

1. **Unzip** the zip file on your computer (Windows: right-click → *Extract All*. Mac: double-click). You will get a folder called `website`.
2. Open your repository in the browser:
   https://github.com/swarupanandabanerjee/swarupanandabanerjee.github.io
3. Click **Add file → Upload files**.
4. Open the unzipped `website` folder, select **everything inside it** (Ctrl + A on Windows, Cmd + A on Mac), and **drag it all** onto the GitHub upload page.
   - Drag the *contents* of the folder, **not** the `website` folder itself.
   - Use drag-and-drop, because the "choose your files" button cannot upload folders (`assets`, `files`).
   - On a Mac, you don't need to worry about hidden files. Nothing hidden is required.
5. Wait until every file appears in the list. Then, at the bottom, type a message such as `Add website`, keep **Commit directly to the main branch** selected, and click **Commit changes**.
6. Check that your repository's main page now shows `index.html`, `research.html`, … and the folders `assets` and `files` at the top level. (If you see only one folder called `website`, the folder itself was dragged. See *Troubleshooting* below.)
7. Go to **Settings → Pages** and make sure that **Source** is *Deploy from a branch*, **Branch** is `main`, and the folder is `/ (root)`. Click **Save** if you changed anything.
8. Wait 1–3 minutes (you can watch progress in the **Actions** tab), then open https://swarupanandabanerjee.github.io. If you still see an old page, press Ctrl + F5 (Cmd + Shift + R on Mac).

> Your existing `README.md` will be replaced by this one, which is intended.

---

## Part 2: Making changes in the browser

**How to edit any file:** open the file on GitHub → click the **pencil icon** (✏️ *Edit this file*) → make your change → click **Commit changes…** → **Commit changes**. The site updates in 1–2 minutes.

Inside the files, every place you are expected to edit is marked with **✏️** in a comment. To find it, press Ctrl + F (Cmd + F) in the GitHub editor and search for `✏️`.

| I want to… | Edit this file | What to do |
|---|---|---|
| **Add a paper** | `publications.html` | Find `ADD A NEW PAPER HERE`. Copy the TEMPLATE block below it (from `<li class="pub">` to `</li>`), paste it on the empty line under the note, and change the text. Newest papers go first. |
| **Add a news item** | `index.html` | Find `ADD NEWS HERE`. Copy one `<li>…</li>` line, paste it at the top of the list, and change the date and text. |
| **Add a talk** | `talks.html` | Find `TALKS YOU GIVE`. The first time, delete the lines `START-HIDDEN` and `END-HIDDEN` and replace the example talk with your talk. After that, copy the `<li class="entry">…</li>` block for each new talk. |
| **Add a workshop/conference** | `talks.html` | Copy one `<li class="entry">…</li>` block in the "attended" list and edit it. |
| **Add a teaching role** | `teaching.html` | Copy one `<li class="entry">…</li>` block and edit it. |
| **Add a job / research position** | `experience.html` | Find `RESEARCH EXPERIENCE` or `PROFESSIONAL EXPERIENCE`. Copy one `<li class="entry edu">…</li>` block, paste it at the top of that list, and edit it. |
| **Change bio / research text** | `index.html`, `research.html` | Edit the sentences directly. |
| **Change position, profile links, menu, or "Last updated"** | `assets/js/site.js` | Edit only the `SITE = { … }` block at the top. Every page updates automatically. |
| **Replace the CV PDF** | `files/` folder | Rename your new PDF to exactly `Swarupananda_Banerjee_CV.pdf`, then open the `files` folder → **Add file → Upload files** → drop it in → **Commit changes**. The old file is replaced. |
| **Replace the photo** | `assets/img/` folder | Upload a square photo named exactly `profile.jpg` (about 480 × 480 px) into `assets/img`. |
| **Change colours** | `assets/css/style.css` | Edit the colour values at the top (`--accent` is the main blue). |

### Writing maths (LaTeX)

MathJax is enabled on every page:

- Inline: `$u_\varepsilon \rightharpoonup u_0$`
- Displayed: `$$\int_\Omega |\nabla u|^2\,dx$$`
- To show a real dollar sign, write `\$`.

### Small rules that prevent problems

- Copy **whole blocks**, from the opening tag (`<li …>`) to its closing tag (`</li>`).
- Text between `<!--` and `-->` is a hidden note. It does not appear on the site.
- If something looks broken after an edit, open the file → **History** (clock icon) → open the previous version → copy its contents back into the file.

---

## Part 3: Help Google find the site (optional, recommended)

1. Add `https://swarupanandabanerjee.github.io` to your Google Scholar, ORCID, LinkedIn and ResearchGate profiles.
2. Go to [Google Search Console](https://search.google.com/search-console) → *Add property* → **URL prefix** → enter the site address → choose **HTML tag**. Paste the tag into `index.html` where it says *Google Search Console verification* (and delete the `<!--` and `-->` around that line), commit, then click *Verify*.
3. In Search Console → **Sitemaps**, submit `sitemap.xml`.

If you add a new page later, also add it to `sitemap.xml` and to the `menu` list in `assets/js/site.js`.

---

## Troubleshooting

- **The site shows the README instead of the homepage:** `index.html` is not at the top level. Make sure the files are not inside a `website` folder in the repository.
- **Everything ended up inside a `website` folder:** the simplest fix is to upload the *contents* again at the top level (Part 1, step 4). Then delete the extra folder: open each file inside it → **⋯ → Delete file**. Ask a friend who uses Git, or Claude, if there are too many files.
- **A change isn't showing:** wait 2 minutes, check the **Actions** tab for a green tick, then hard-refresh (Ctrl + F5).

## File map

```
index.html          Home / About (bio, interests, news)
research.html       Research themes and projects
publications.html   Papers, preprints, theses
talks.html          Talks, workshops and conferences
teaching.html       Teaching assistantships and education work
experience.html     Research experience (JRF positions) and professional roles
cv.html             CV summary + PDF download
contact.html        Email, address, profiles
404.html            "Page not found" page
assets/css/style.css   Look and feel (colours, fonts, layout)
assets/js/site.js      Menu, sidebar and footer settings (shared by all pages)
assets/img/            Profile photo
files/                 CV PDF (and any slides/papers you want to share)
favicon.svg, robots.txt, sitemap.xml   Browser icon and search-engine files
```
