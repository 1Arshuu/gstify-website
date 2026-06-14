// ─────────────────────────────────────────────────────────────────────────────
// Blog content — each post targets a long-tail keyword cluster for SEO.
// Plain data (no runtime dates) so it prerenders statically under Cache Components.
// ─────────────────────────────────────────────────────────────────────────────

export type BlogBlock = { h?: string; p?: string; ul?: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  /** ISO date for sitemap + structured data */
  date: string;
  /** human display label (fixed, to avoid locale/hydration drift) */
  dateLabel: string;
  readingMins: number;
  excerpt: string;
  tag: string;
  body: BlogBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: 'how-to-create-gst-invoice-on-mobile',
    title: 'How to Create a GST Invoice on Your Phone (Step-by-Step)',
    description:
      'Learn how to create a GST-compliant invoice on your Android phone in under a minute — add the customer, items and tax rates, and share a professional PDF.',
    keywords: ['how to create GST invoice', 'GST invoice on mobile', 'create GST bill on phone', 'GST invoice app', 'make GST invoice online'],
    date: '2026-05-02',
    dateLabel: '2 May 2026',
    readingMins: 4,
    tag: 'Guide',
    excerpt: 'A GST invoice on your phone takes under a minute. Here is exactly what to include and how to generate one.',
    body: [
      { p: 'You no longer need a desktop and accounting software to raise a GST invoice. With a billing app like GSTify you can create a fully GST-compliant invoice on your Android phone in under a minute — and share the PDF on WhatsApp before the customer leaves the counter.' },
      { h: 'What a GST invoice must include' },
      { p: 'Under GST rules, a valid tax invoice should carry a few mandatory fields. Getting these right is what makes the document compliant:' },
      { ul: [
        'Your business name, address and GSTIN',
        'A unique, sequential invoice number and the invoice date',
        'The customer’s name, address and GSTIN (for B2B)',
        'HSN/SAC code for each item or service',
        'Taxable value, the GST rate, and the CGST/SGST or IGST split',
        'The total invoice value in figures (and ideally in words)',
      ] },
      { h: 'Creating one on your phone with GSTify' },
      { p: 'The flow is built to be fast — no menus to hunt through:' },
      { ul: [
        'Open GSTify and tap “New” → Tax Invoice',
        'Pick a saved customer (or add a new one with their GSTIN)',
        'Add products from your catalog — HSN, rate and unit auto-fill',
        'GSTify calculates per-line GST and decides CGST/SGST vs IGST by state',
        'Tap Generate to get a clean PDF, then share it instantly',
      ] },
      { h: 'Tips for clean, professional invoices' },
      { p: 'Keep your invoice numbers sequential within each financial year, save your most-sold products to the catalog so billing is one tap, and connect Google Drive backup so a lost phone never means lost records. Choose a PDF template that matches your brand — a consistent look builds trust with customers.' },
      { p: 'That is it. A compliant GST invoice, generated and shared from your pocket. Download GSTify free and raise your first invoice today.' },
    ],
  },
  {
    slug: 'free-gst-billing-app-for-small-business',
    title: 'The Best Free GST Billing App for Small Businesses in India',
    description:
      'Looking for a free GST billing app for your small business in India? Here is what to look for — and how GSTify gives you GST invoices, challans and quotations at ₹0 to start.',
    keywords: ['free GST billing app', 'GST billing app for small business', 'free billing software India', 'GST invoice app free', 'billing app for shops'],
    date: '2026-04-18',
    dateLabel: '18 April 2026',
    readingMins: 5,
    tag: 'Comparison',
    excerpt: 'Not every “free” billing app is actually free. Here is what matters for an Indian SMB — and where GSTify fits.',
    body: [
      { p: 'Search for a “free GST billing app” and you will find dozens of options — but many lock the essentials behind a paywall, watermark your PDFs heavily, or stop working without internet. For a small business in India, the right app should let you bill confidently from day one without spending a rupee.' },
      { h: 'What to look for in a free GST billing app' },
      { ul: [
        'Genuine GST compliance — correct CGST/SGST/IGST handling and HSN/SAC support',
        'More than one document type — invoices, delivery challans, quotations and POS bills',
        'Offline support, because signal is never guaranteed at a shop or warehouse',
        'Secure backup you control, so a lost phone does not wipe your records',
        'A free tier you can actually run a small business on — not a 7-day trial',
      ] },
      { h: 'How GSTify’s free plan works' },
      { p: 'GSTify’s Free plan gives you 50 GST invoices a month, 50 saved customers and 30 products — no credit card and no trial countdown. You get GST-ready PDFs, per-line tax rates, and Google Drive backup. When your volume grows, Pro removes the limits and the watermark for ₹199/month — but plenty of small shops run entirely on the free tier.' },
      { h: 'Free vs paid: when should you upgrade?' },
      { p: 'Stay on Free while you are under ~50 invoices a month and billing from a single device. Move to Pro when you need unlimited invoices and customers, want watermark-free PDFs, or bill from more than one device. Either way, your data migrates to the cloud automatically the moment you upgrade — nothing to export.' },
      { p: 'If you want a free GST billing app that is built India-first and works offline, GSTify is free to download and free to start. Try it on Android today.' },
    ],
  },
  {
    slug: 'delivery-challan-vs-tax-invoice',
    title: 'Delivery Challan vs Tax Invoice: What’s the Difference?',
    description:
      'Delivery challan or tax invoice — which do you issue, and when? A simple explainer for Indian SMBs on the difference, with examples and GST rules.',
    keywords: ['delivery challan vs invoice', 'what is a delivery challan', 'delivery challan format', 'when to use delivery challan', 'GST delivery challan'],
    date: '2026-04-04',
    dateLabel: '4 April 2026',
    readingMins: 4,
    tag: 'GST Basics',
    excerpt: 'They look similar but serve very different purposes. Here is when to use a delivery challan and when to raise a tax invoice.',
    body: [
      { p: 'A tax invoice and a delivery challan are easy to confuse — both list goods, quantities and parties. But under GST they do different jobs, and using the wrong one can cause problems during transport or filing.' },
      { h: 'What is a tax invoice?' },
      { p: 'A tax invoice is the document that records a sale. It establishes the value of the supply, charges GST (CGST/SGST or IGST), and is the basis for your output tax and the buyer’s input tax credit. You issue it when ownership of the goods or services transfers and payment is due.' },
      { h: 'What is a delivery challan?' },
      { p: 'A delivery challan accompanies goods that are moving without an immediate sale — so it generally does not charge GST as a sale. Common cases include:' },
      { ul: [
        'Sending goods on approval or “sale or return”',
        'Moving stock between your own branches or to a job worker',
        'Transporting goods where the quantity is not yet known at dispatch',
        'Exhibitions, repairs, or returns',
      ] },
      { h: 'Quick rule of thumb' },
      { p: 'If the transaction is a sale and GST applies now, raise a tax invoice. If goods are simply moving and the sale has not happened (or will be billed later), use a delivery challan. With GSTify you can issue either in a couple of taps, with its own number series, and convert a challan into an invoice when the sale is confirmed.' },
      { p: 'Issue compliant invoices and delivery challans from your phone — download GSTify free.' },
    ],
  },
  {
    slug: 'gst-invoice-format-india',
    title: 'GST Invoice Format: What Every Indian Business Must Include',
    description:
      'The correct GST invoice format for Indian businesses — every mandatory field explained, plus common mistakes that make an invoice non-compliant.',
    keywords: ['GST invoice format', 'GST invoice rules', 'GST bill format India', 'mandatory fields GST invoice', 'tax invoice format'],
    date: '2026-03-20',
    dateLabel: '20 March 2026',
    readingMins: 5,
    tag: 'GST Basics',
    excerpt: 'Get the format right and your invoice is compliant; miss a field and it isn’t. Here is the full checklist.',
    body: [
      { p: 'A GST invoice is more than a bill — its format is defined by law, and a missing field can make it non-compliant. Whether you write invoices by hand or use an app, this is the checklist every Indian business should follow.' },
      { h: 'Mandatory fields in a GST invoice' },
      { ul: [
        'Supplier’s name, address and GSTIN',
        'A consecutive serial number unique for the financial year',
        'Date of issue',
        'Recipient’s name, address and GSTIN (for registered buyers)',
        'HSN code for goods or SAC code for services',
        'Description, quantity and unit of each item',
        'Taxable value and any discount',
        'GST rate and amount — CGST + SGST for intra-state, IGST for inter-state',
        'Whether tax is payable on reverse charge',
        'Signature or digital signature of the supplier',
      ] },
      { h: 'Common mistakes that break compliance' },
      { ul: [
        'Non-sequential or duplicate invoice numbers',
        'Charging CGST/SGST on an inter-state sale (it should be IGST), or vice-versa',
        'Missing or wrong HSN/SAC codes',
        'Forgetting the recipient GSTIN on B2B invoices',
      ] },
      { h: 'Let the app handle the format' },
      { p: 'The simplest way to never get the format wrong is to use software that enforces it. GSTify fills your GSTIN, numbers invoices sequentially, applies the correct CGST/SGST or IGST based on the place of supply, and keeps HSN/SAC with each product — so every PDF you generate is compliant by default.' },
      { p: 'Stop worrying about format. Download GSTify and generate correct GST invoices automatically.' },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const allSlugs = () => posts.map((p) => p.slug);
