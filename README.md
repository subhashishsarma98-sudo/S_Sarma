# Subhashish Sarma — Academic Website

A four-page personal academic website with a reusable article/PDF reader. It is built using plain HTML, CSS and JavaScript: no framework, build step, database or paid service is required to preview it.

## 1. Pages included

- **Home** (`index.html`) — profile photograph, introduction, biography, research interests, latest publications and latest blog previews.
- **Publications** (`publications.html`) — year-wise publication archive with search, year/type filters, abstracts and DOI links.
- **Blog** (`blog.html`) — searchable article archive. It intentionally shows an empty state until the first article is added.
- **Article reader** (`article.html`) — reusable page opened by a blog card; embeds the article PDF and provides a download/open link.
- **Contact** (`contact.html`) — email, postal address and ResearchGate profile link, with copy-to-clipboard buttons.

All pages share `styles.css` and the content stored in `site-data.js`.

## 2. Preview the website on Windows

1. Download and extract the ZIP file.
2. Open the extracted `researcher-homepage` folder.
3. Double-click `start-local-server.bat`.
4. Open the address shown in the terminal (normally `http://localhost:8000`) in your browser.
5. To stop the local server, return to the terminal and press `Ctrl+C`.

**Alternative:** Open PowerShell in this folder and run:

```powershell
py -m http.server 8000
```

Then visit `http://localhost:8000`.

### macOS / Linux

Open Terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 3. Main editing file — `site-data.js`

Most of the information you are likely to change is kept in one file: `site-data.js`. Open it in Visual Studio Code or another text editor.

| What to change | Exact key/section in `site-data.js` |
|---|---|
| Your name | `name` |
| Your academic designation | `role` |
| University and department | `affiliation` |
| Homepage introductory sentence | `heroDescription` |
| About Me biography | `aboutLead` and `aboutBody` |
| Research-interest cards | `interests` array |
| Publications | `publications` array |
| Blog/article previews | `articles` array |
| Email address | `email` |
| Postal address | `postalAddress` |
| ResearchGate link | `researchGateUrl` |

Keep quotation marks, commas and square brackets intact when editing JavaScript data.

## 4. Change your photograph

Replace `assets/profile.png` with your new photograph, keeping the exact filename `profile.png`. If you change the filename, also update the image `src` in `index.html` near the element with `id="profile-photo"`.

## 5. Add or update a publication

In `site-data.js`, find the `publications` array. Each publication is one object. Add new records near the top, keeping the list in newest-first order.

```js
{
  year: "2026",
  type: "journal-article", // journal-article or review-article
  title: "Exact published title",
  journal: "Journal name",
  volume: "Volume and issue, if available",
  pages: "Page range or article number, if available",
  authors: "Full author list in published order",
  abstract: "Published abstract or a concise, accurate summary",
  doi: "10.xxxx/xxxxx",
  url: "https://doi.org/10.xxxx/xxxxx"
}
```

The present archive contains three journal publications. Preprints and book chapters have been excluded as requested. Confirm publication metadata, author order and DOI against the publisher record before adding or changing an entry. If an article has no DOI, omit `doi` and `url` or leave them as empty strings; do not invent a DOI.

The homepage automatically displays the first three items in the `publications` array. The Publications page sorts and groups all entries by year and supports search and filters.

## 6. Add your first blog article

No blog article has been added yet, so the Blog page correctly displays a “first article is waiting” message. To publish one:

1. Put the PDF in `assets/pdfs/`, for example `assets/pdfs/my-first-article.pdf`.
2. In `site-data.js`, find the `articles` array and add an object:

```js
{
  id: "my-first-article",
  date: "11 November 2026",
  category: "MICROBIAL ECOLOGY",
  readTime: "6 min read",
  title: "Your article title",
  excerpt: "A short preview that introduces the article to visitors.",
  pdf: "assets/pdfs/my-first-article.pdf"
}
```

3. Save the file and refresh the website.

The new article will appear in the Blog archive and in the homepage's latest-articles section. Clicking its preview opens `article.html?id=my-first-article`, where the PDF can be read or downloaded.

Use a unique, lowercase `id` with hyphens for every article. The date, category, estimated reading time, title, excerpt and PDF path can all be edited in the same article object.

## 7. Change contact details

In `site-data.js`, edit the three values in the `CONTACT` section:

```js
email: "Subhashish.sarma98@gmail.com",
postalAddress: "Barpeta Road, Milan Nagar, Ward No. 08\nPost Office: Simlaguri\nPIN: 781315\nAssam, India",
researchGateUrl: "https://www.researchgate.net/profile/Subhashish-Sarma-2?ev=hdr_xprf"
```

The website does not currently show a phone number because no phone number was supplied. No Google Scholar link has been included.

## 8. Where to change the design or behaviour

| Change | File and section |
|---|---|
| Main colours and typography | `styles.css` → `:root` variables at the beginning |
| Home-page layout | `index.html` for structure; `styles.css` for appearance |
| Publications-page layout | `publications.html` and `styles.css` |
| Publication search/filter behaviour | `publications.js` |
| Blog-page layout | `blog.html` and `styles.css` |
| Blog search/filter behaviour | `blog.js` |
| Individual article/PDF reader | `article.html`, `article.js`, and `.pdf-reader` rules in `styles.css` |
| Contact-page layout | `contact.html` and the Contact styles near the end of `styles.css` |
| Copy email/address behaviour | `contact.js` |
| Homepage dynamic content and mobile menu | `script.js` |
| Navigation destinations | Each HTML page's `<nav id="primary-nav">` block |

The HTML controls page structure and labels, CSS controls appearance, JavaScript controls interactions, and `site-data.js` controls most personal content.

## 9. Project files

```text
researcher-homepage/
├── index.html
├── publications.html
├── blog.html
├── article.html
├── contact.html
├── styles.css
├── site-data.js
├── script.js
├── publications.js
├── blog.js
├── article.js
├── contact.js
├── README.md
├── start-local-server.bat
├── start-local-server.sh
└── assets/
    ├── profile.png
    └── pdfs/
        └── README.txt
```

## 10. Current limitations and deployment note

- This is a **static front-end website**. It has not yet been published to a public domain.
- There is no password-protected admin panel or content-management dashboard. To add content for now, edit `site-data.js` and place PDFs in `assets/pdfs/`.
- The Contact page's email links open the visitor's email application. It does not submit messages to a server or store contact-form submissions.
- PDF display depends on the visitor's browser PDF support; an open/download link is also provided.
- Before public launch, check that all publication metadata and public contact details are correct and that you are comfortable making the postal address public.
