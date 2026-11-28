/* =====================================================================
   NEWS & UPDATES — one list used in two places:
     • the rolling "News & Updates" column on the right of the Home page
       (the 8 newest items)
     • the full list on news.html ("View all")

   ✏️  TO ADD AN UPDATE: copy one whole block from {  to  }, (including
       the comma) and paste it at the TOP of the list, then change it.
       Newest first.

   Each item has:
     date  : shown on the left, e.g. "Dec 2026"
     text  : the sentence. Put it between backticks ` `  (you can then
             freely use ' and " inside). <em>…</em> makes italics.
     link  : (optional) the page the item opens, e.g. "publications.html",
             "talks.html", "teaching.html", "cv.html" or a full https://
             address. Delete the line if the item should not be clickable.
     type  : (optional) chooses the small icon and label. One of:
               "preprint", "paper", "talk", "workshop", "teaching",
               "position", "award", "milestone".
             Leave it out and the site guesses from the link.

   Items from the last two months get a green "New" badge by themselves,
   and the Home page shows "Last month", "3 months ago", … automatically.
   ===================================================================== */
const NEWS = [
  {
    date: "Oct 2026",
    type: "preprint",
    text: `New preprint added: <em>The Vanishing-Diffusion Limit of an Incompressible Visco-Morphoelastic System: Weak Solutions and a Jaumann Defect</em>.`,
    link: "publications.html"
  },
  {
    date: "Aug 2026",
    type: "position",
    text: `Joined Latexio as a LaTeX Research Intern (research and product support).`,
    link: "cv.html"
  },
  {
    date: "Jan 2026",
    type: "teaching",
    text: `Started reviewing NPTEL video transcripts for Advanced Engineering Mathematics and Advanced Theory of ODEs.`,
    link: "teaching.html"
  },
  {
    date: "Oct 2025",
    type: "teaching",
    text: `Joined the GATE&ndash;NPTEL project as a Subject Matter Expert for GATE Mathematics.`,
    link: "teaching.html"
  },
  {
    date: "Jul 2025",
    type: "teaching",
    text: `Began serving as a teaching assistant for NPTEL courses and IIT Kharagpur mathematics courses.`,
    link: "teaching.html"
  },
  {
    date: "May 2025",
    type: "workshop",
    text: `Attended the NCM Workshop on Theoretical Aspects of Incompressible Navier&ndash;Stokes Equations at IISER Kolkata.`,
    link: "talks.html"
  },
  {
    date: "Jul 2024",
    type: "milestone",
    text: `Started my PhD in the Department of Mathematics, IIT Kharagpur.`,
    link: "research.html"
  }
];
