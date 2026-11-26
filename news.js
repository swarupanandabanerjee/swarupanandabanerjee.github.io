/* =====================================================================
   NEWS & UPDATES — one list used in three places:
     • the moving "Latest" banner under the photos on the Home page
     • the 5 newest items in "News & Updates" on the Home page
     • the full list on news.html ("View all")

   ✏️  TO ADD AN UPDATE: copy one whole block from {  to  }, (including
       the comma) and paste it at the TOP of the list, then change it.
       Newest first. The newest item automatically gets the "Latest"
       live dot and appears in the moving banner.

   Each item has:
     date  : shown on the left, e.g. "Dec 2026"
     text  : the sentence. Put it between backticks ` `  (you can then
             freely use ' and " inside). <em>…</em> makes italics.
     link  : (optional) the page the item opens, e.g. "publications.html",
             "talks.html", "teaching.html", "cv.html" or a full https://
             address. Delete the line if the item should not be clickable.
     ticker: (optional) true = show THIS item in the moving banner even if
             it is not the newest. Use it on at most one item.
   ===================================================================== */
const NEWS = [
  {
    date: "Oct 2026",
    text: `New preprint on arXiv: <em>The Vanishing-Diffusion Limit of an Incompressible Visco-Morphoelastic System: Weak Solutions and a Jaumann Defect</em>.`,
    link: "publications.html"
  },
  {
    date: "Aug 2026",
    text: `Joined Latexio as a LaTeX Research Intern (research and product support).`,
    link: "cv.html"
  },
  {
    date: "Jan 2026",
    text: `Started reviewing NPTEL video transcripts for Advanced Engineering Mathematics and Advanced Theory of ODEs.`,
    link: "teaching.html"
  },
  {
    date: "Oct 2025",
    text: `Joined the GATE&ndash;NPTEL project as a Subject Matter Expert for GATE Mathematics.`,
    link: "teaching.html"
  },
  {
    date: "Jul 2025",
    text: `Began serving as a teaching assistant for NPTEL courses and IIT Kharagpur mathematics courses.`,
    link: "teaching.html"
  },
  {
    date: "May 2025",
    text: `Attended the NCM Workshop on Theoretical Aspects of Incompressible Navier&ndash;Stokes Equations at IISER Kolkata.`,
    link: "talks.html"
  },
  {
    date: "Jul 2024",
    text: `Started my PhD in the Department of Mathematics, IIT Kharagpur.`,
    link: "research.html"
  }
];
