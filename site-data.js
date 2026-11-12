/* =====================================================================
   YOUR WEBSITE CONTENT — EDIT THIS FILE TO UPDATE MOST TEXT AND CONTENT
   =====================================================================
   1. Replace the sample name, role, affiliation and biography below.
   2. Add your real publication details to the `publications` array.
   3. Add your blog articles to the `articles` array. Put PDFs in assets/pdfs/.
   4. Do not delete commas or quotation marks while editing the lists.
*/

window.SITE_DATA = {
  // ---------- PERSONAL / HOME PAGE DETAILS ----------
  name: "Subhashish Sarma",
  monogram: "SS",
  heroKicker: "ACADEMIC PROFILE · ZOOLOGY",
  role: "PhD Scholar in Zoology",
  affiliation: "Department of Zoology · Rabindranath Thakur Vishwavidyalaya, Hojai, Assam",
  photoCaption: "Ph.D. Scholar · Zoology",
  heroDescription: "Investigating bacterial communities associated with lepidopteran gut systems through an integrated approach combining microbiology and genomics.",

  // Short paragraph shown prominently in the About section.
  aboutLead: "I am a Ph.D. scholar in the Department of Zoology at Rabindranath Thakur Vishwavidyalaya. My doctoral research investigates the bacterial communities associated with the gut of lepidopteran insects using an integrated approach that combines microbiology and genomics.",
  // Supporting About paragraph. Add your education, experience and other details here.
  aboutBody: "I hold a Master’s degree from Cotton University, where I specialised in Entomology. My broader research interests include antimicrobial resistance (AMR), bacteriophages, bioprospecting, pollution ecology, and the effects of climate change on biodiversity. Beyond academia, I enjoy cooking, photography, and watching films and web series.",

  // ---------- RESEARCH INTEREST CARDS ----------
  interests: [
    {
      number: "01",
      icon: "◉",
      title: "Lepidopteran gut bacteriomes",
      description: "Investigating bacterial communities associated with lepidopteran insects through microbiological and genomic approaches."
    },
    {
      number: "02",
      icon: "⌁",
      title: "AMR & bacteriophages",
      description: "Exploring antimicrobial resistance and bacteriophages, including their relevance to bacterial control."
    },
    {
      number: "03",
      icon: "❋",
      title: "Bioprospecting",
      description: "Exploring biological resources and microorganisms for their potential scientific and practical applications."
    },
    {
      number: "04",
      icon: "⌬",
      title: "Environmental ecology",
      description: "Examining pollution ecology and the effects of climate change on biodiversity and ecological communities."
    }
  ],

  // ---------- LATEST PUBLICATIONS ----------
  // Add newest publications first. `doi` can be entered as 10.xxxx/xxxxx.
  // `url` should be the DOI URL, e.g. https://doi.org/10.xxxx/xxxxx
  // Verified journal articles only. Preprints and book chapters are intentionally excluded.
  // Records are displayed newest first. Abstracts below are concise summaries.
  publications: [
    {
      year: "2026",
      type: "journal-article",
      title: "Developing candy from silkworm protein for bridging waste management and sustainable development",
      journal: "Discover Food",
      volume: "6",
      pages: "Article 83",
      authors: "Sweta Das, Priyanku Sarma, Mrigakshee Phookan, Kumar Aditya Narayan Deb, Kamal Kashyap, Subhashish Sarma, Riya Lahkar, Arindam Dutta, Sangeeta Mili, Sangita Das, Ankita Saharia and Tarali Kalita",
      abstract: "This study explores the use of Eri silkworm (Samia ricini) pre-pupal protein as a sustainable food ingredient. The authors developed a protein-rich candy and evaluated its nutritional properties, sensory acceptability, allergenicity and toxicity, highlighting the potential to valorise sericulture by-products and support food sustainability.",
      doi: "10.1007/s44187-025-00771-2",
      url: "https://doi.org/10.1007/s44187-025-00771-2"
    },
    {
      year: "2026",
      type: "review-article",
      title: "Climate Change and Insect Pollination: A Review of Consequences for Pollination Services and Food Security",
      journal: "Indian Journal of Entomology",
      volume: "88",
      pages: "1096–1102",
      authors: "Hiramani Talukdar, Subhashish Sarma, Kamal Kashyap, Sreyashi Ghosh, Rezina Ahmed and Rabindra Hazarika",
      abstract: "This review examines how climate change affects insect pollinators, pollination services and food security, with particular attention to India. It synthesises recent evidence on extreme weather, phenological mismatches and shifts in species distributions, and discusses conservation and adaptation strategies.",
      doi: "10.55446/IJE.2025.2966",
      url: "https://doi.org/10.55446/IJE.2025.2966"
    },
    {
      year: "2025",
      type: "review-article",
      title: "Resistance Mechanisms in Aquatic Insects against Environmental Stressors: A Review",
      journal: "Uttar Pradesh Journal of Zoology",
      volume: "46",
      pages: "70–77",
      authors: "Hiramani Talukdar, Subhashish Sarma, Kamal Kashyap and Rabindra Hazarika",
      abstract: "This review discusses the roles of aquatic insects in freshwater ecosystems and examines how environmental stressors—including pollution, habitat degradation, temperature fluctuations and low oxygen—can affect their immune defences and resistance to biological challenges.",
      doi: "10.56557/UPJOZ/2025/v46i135088",
      url: "https://doi.org/10.56557/upjoz/2025/v46i135088"
    }
  ],

  // ---------- LATEST BLOG ARTICLES ----------
  // Put each PDF inside assets/pdfs/ and enter its relative path in `pdf`.
  // Add newest articles first. These will appear as preview cards on the home page.
  articles: [],

  // Example format for an article (copy this object inside the array):
  // {
  //   date: "11 November 2026",
  //   category: "MICROBIAL ECOLOGY",
  //   readTime: "5 min read",
  //   title: "Your article title goes here",
  //   excerpt: "A short preview that encourages visitors to read the complete article.",
  //   pdf: "assets/pdfs/your-article.pdf"
  // },

  // ---------- CONTACT ----------
  // Update these values whenever your public contact details change.
  email: "Subhashish.sarma98@gmail.com",
  postalAddress: "Barpeta Road, Milan Nagar, Ward No. 08\nPost Office: Simlaguri\nPIN: 781315\nAssam, India",
  researchGateUrl: "https://www.researchgate.net/profile/Subhashish-Sarma-2?ev=hdr_xprf"
};
