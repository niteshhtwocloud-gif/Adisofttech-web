import Blog from "../models/blog.model.js";

const STARTER_ARTICLES = [
  {
    title: "5 Signs Your Business Has Outgrown Spreadsheets",
    slug: "signs-your-business-outgrown-spreadsheets",
    excerpt: "If your team is copy-pasting data between sheets every morning, it might be time for dedicated business software.",
    content: `Spreadsheets are often where great businesses start. They are flexible, familiar, and virtually free. But as order volumes rise, headcount grows, and operations become more complex, spreadsheets quietly transform from your most versatile tool into your biggest operational bottleneck.

Here are the five critical signs that your business has outgrown Excel and Google Sheets, and is ready for dedicated business software:

**1. Multiple People Editing the Same File and Version Conflicts**
When two managers make updates at the same time, formulas break, rows get accidentally overwritten, and you find yourself emailing files named "Inventory_Final_v3_Updated_REAL.xlsx". A dedicated business management system gives everyone a unified single source of truth with role-based access control.

**2. Manual Copy-Pasting Is Eating Your Team's Week**
If your staff spends the first two hours of every morning copy-pasting order numbers, supplier invoices, or technician attendance records between disconnected sheets, that represents hundreds of lost productivity hours every month that should be focused on serving customers and closing deals.

**3. You Cannot See Live, Real-Time Status**
Spreadsheets are static snapshots of the past. When an executive or customer asks "what is the current status of order #420?" or "who is on leave today?", searching across multiple tabs takes minutes or hours. Purpose-built systems provide real-time dashboards with live metrics and automated updates.

**4. Reporting Takes Days of Formula Wrangling**
Month-end and quarterly financial reports shouldn't require days of manual VLOOKUPs, nested formulas, and manual recalculations. A dedicated web application or ERP compiles sales figures, expenses, taxes, and inventory reports in one click.

**5. Data Errors and Missing Backups Are Becoming Costly**
A single deleted row or a corrupted formula can result in dispatching wrong goods, under-billing a client, or miscalculating GST. Custom business software enforces data validation, automated backups, and detailed audit trails that track who changed what and when.

**The Solution: Dedicated Business Software**
At ADISOFTTECH, we specialize in helping growing companies transition away from fragile spreadsheets to secure, scalable software platforms tailored around your exact operations—including custom web applications, Tally ERP customization, and our unified Business OS platform.`,
    coverImage: "/images/blog/spreadsheets.jpg",
    category: "Business Software",
    author: "ADISOFTTECH Team",
    published: true,
    readTime: "5 min read",
  },
  {
    title: "Why Every Growing Business Needs a Modern Website",
    slug: "why-every-growing-business-needs-modern-website",
    excerpt: "A fast, responsive, and trustworthy website is no longer just a digital business card—it is your most powerful sales engine.",
    content: `In today's digital landscape, your website is often the very first interaction a potential client, partner, or investor has with your company. Yet many established businesses continue to rely on outdated, slow, or template-bloated websites that fail to convert visitors into inquiries.

Here is why investing in a modern, fast, and responsive website is essential for sustainable business growth:

**1. First Impressions Determine Trust and Credibility**
Visitors form an opinion about your company within 50 milliseconds of landing on your page. If your site looks outdated, broken on mobile devices, or sluggish, potential clients immediately question the quality and reliability of your actual services.

**2. Mobile-First Experience is Non-Negotiable**
Over 65% of business queries now occur on mobile devices. A modern website uses fluid responsive layouts, optimized typography, and touch-friendly controls ensuring prospects get a frictionless experience regardless of device.

**3. Direct Integration with Your Sales and CRM Pipeline**
Traditional websites collect basic emails that often get lost in inboxes. A modern web application connects contact forms directly into your database, triggers instant SMS/WhatsApp notifications, and feeds leads straight into your internal CRM for immediate follow-up.

**4. Search Engine Visibility and Technical SEO**
Modern web frameworks like Next.js provide server-side rendering, lightning-fast Core Web Vitals, and automated semantic metadata that search engines prioritize over sluggish legacy websites.

At ADISOFTTECH, we craft high-performance, conversion-focused websites that position your brand as an industry leader and turn everyday website visitors into paying clients.`,
    coverImage: "/images/blog/modern-website.jpg",
    category: "Web Development",
    author: "ADISOFTTECH Team",
    published: true,
    readTime: "4 min read",
  },
  {
    title: "Web App vs Mobile App: What Should Your Business Build First?",
    slug: "web-app-vs-mobile-app",
    excerpt: "Not every business needs a native app on day one. Here is how we help clients decide what platform to build first.",
    content: `One of the most frequent dilemmas founders and operational heads bring to our engineering team is: Should we build a web application, a native mobile app, or both simultaneously?

The answer directly impacts development cost, launch timeline, and user adoption. Here is our practical decision framework:

**When to Build a Web Application First**
- **Desk-based users:** If your core users are office managers, HR personnel, accounting teams, or desk workers, a web app provides maximum screen real estate for complex workflows, tables, and reporting.
- **Fastest time to market:** Web applications run in any modern browser across Windows, macOS, Android, and iOS from a single unified codebase.
- **Zero app-store friction:** Users access the platform immediately through a URL without needing app downloads or waiting for Apple and Google app review approvals.

**When to Build a Native Mobile App First**
- **Field workforce:** If your users are on-site technicians, delivery drivers, or door-to-door sales representatives who work on the move.
- **Device hardware access:** When you need deep integration with device capabilities like continuous GPS geofencing, hardware camera barcode scanners, or offline Bluetooth printing.
- **Push notification engagement:** When instant notifications and offline cached data are central to the daily workflow.

**The Hybrid Strategy: Web Dashboard + Companion Mobile App**
For many of our clients, the optimal solution is a unified backend paired with a desktop web portal for admin oversight and a lightweight React Native mobile app for staff in the field.

Our engineering team works closely with you to evaluate your team's operational habits and budget to choose the right technology roadmap.`,
    coverImage: "/images/blog/web-vs-mobile.jpg",
    category: "Mobile Development",
    author: "ADISOFTTECH Team",
    published: true,
    readTime: "6 min read",
  },
  {
    title: "How Tally Customization Can Improve Business Operations",
    slug: "how-tally-customization-improves-business-operations",
    excerpt: "TDL scripting and custom integrations let you adapt Tally around your exact business workflow rather than changing your workflow to fit the software.",
    content: `Tally is the trusted accounting backbone for thousands of businesses across India. However, off-the-shelf Tally often doesn't match the specific invoice formats, approval chains, or industry workflows that unique manufacturing and trading businesses require.

This is where Tally Definition Language (TDL) and custom API integrations unlock immense operational value:

**1. Custom Invoices and Specialized Print Layouts**
Standard Tally vouchers don't always meet the branding, barcode, or multi-item breakdown requirements of modern commerce. Custom TDL lets you design tailored invoice layouts, automated QR codes for e-invoicing, and branded customer receipts.

**2. Automated GST Reconciliation and E-Way Bill Generation**
Manual entry of GST data and e-way bill portals leads to compliance errors and costly penalties. Custom Tally scripting automates JSON export, direct portal syncing, and real-time validation of tax rates.

**3. Advanced Inventory and Warehouse Tracking**
For businesses with multi-branch warehouses or manufacturing batch tracking, custom modules add custom fields for batch expiry, serial numbers, and reorder thresholds directly on transaction screens.

**4. Bridge Tally with Your Web & Mobile Systems**
By building automated sync connectors between Tally and your custom web app or eCommerce portal, sales made on your website or field mobile app are automatically recorded in Tally without manual re-entry.

ADISOFTTECH provides end-to-end Tally customization services, custom TDL scripting, and cloud integrations that save accounting teams dozens of hours each week.`,
    coverImage: "/images/blog/tally-customization.jpg",
    category: "Tally & ERP",
    author: "ADISOFTTECH Team",
    published: true,
    readTime: "5 min read",
  },
  {
    title: "Cloud Solutions for Small and Growing Businesses",
    slug: "cloud-solutions-small-growing-businesses",
    excerpt: "Modern cloud architecture provides enterprise-grade security, 99.9% uptime, and frictionless scaling without the cost of physical on-premise servers.",
    content: `For decades, small and medium enterprises were forced to invest heavily in expensive physical on-premise servers, dedicated server rooms, noisy cooling units, and high maintenance AMC contracts.

Cloud computing has leveled the playing field, giving growing companies access to the same reliable, secure infrastructure used by global technology giants.

**Key Benefits of Cloud Solutions for Growing Firms:**

**1. Eliminate Costly Hardware Maintenance**
With cloud platforms like AWS, Google Cloud, and Firebase, there is zero upfront hardware expense. You pay only for the compute resources, storage, and bandwidth you actually consume.

**2. Automatic Backups and Disaster Recovery**
Physical hard drives fail, offices experience power outages, and local systems are vulnerable to theft or ransomware. Cloud architecture features multi-region automated backups and instant snapshot restoration.

**3. Remote Access for Hybrid and Distributed Teams**
Whether your managers are traveling, working from home, or visiting clients across cities, cloud-hosted software and databases provide secure encrypted access from anywhere on any device.

**4. Effortless Scalability**
When your business experiences a surge in traffic or doubles its team size, cloud resources scale up automatically without downtime or emergency hardware upgrades.

ADISOFTTECH architects secure, cost-effective cloud infrastructures tailored for growing Indian enterprises.`,
    coverImage: "/images/blog/cloud-solutions.jpg",
    category: "Cloud & Automation",
    author: "ADISOFTTECH Team",
    published: true,
    readTime: "5 min read",
  },
  {
    title: "How Business Automation Saves Time and Reduces Manual Work",
    slug: "how-business-automation-saves-time-reduces-manual-work",
    excerpt: "Smart workflow automation eliminates repetitive operational tasks, shortens response times, and cuts manual processing time by over 60%.",
    content: `In every growing business, there are repetitive operational loops: sending payment reminders, notifying managers of leave requests, assigning technician tasks, and emailing shipping tracking numbers.

When employees spend their days performing manual robotic tasks, innovation and customer experience suffer. Business automation is the discipline of connecting software tools and data streams to handle these workflows automatically.

**High-Impact Areas for Business Automation:**

**1. Automated Lead Routing and Instant Notifications**
When a prospect fills out an inquiry form on your website, automation immediately triggers an SMS and email notification to the sales lead and creates a deal card in your CRM within seconds.

**2. Multi-Level Approval Chains**
Instead of chasing physical signatures or email threads for expense claims and purchase orders, automated workflows route requests directly to the designated approver's smartphone with one-tap approve or reject buttons.

**3. Scheduled Data Sync and Reporting**
Nightly automated cron routines compile daily sales tallies, check overdue inventory levels, and send executive summary digests to company directors at 8:00 AM every morning.

**4. Customer Communication and Reminders**
Automate personalized WhatsApp and email reminders for service renewals, invoice payments, and technician dispatch updates without staff lifting a finger.

At ADISOFTTECH, we help businesses identify repetitive operational friction and deploy intelligent automation pipelines that eliminate errors and liberate staff to focus on real business growth.`,
    coverImage: "/images/blog/business-automation.jpg",
    category: "Cloud & Automation",
    author: "ADISOFTTECH Team",
    published: true,
    readTime: "6 min read",
  },
];

export const getAllBlogs = async ({
  page = 1,
  limit = 20,
  category = "",
  search = "",
  published = null,
} = {}) => {
  const query = {};

  if (published !== null && published !== undefined && published !== "") {
    query.published = published === true || published === "true";
  }

  if (category && category !== "All") {
    query.category = { $regex: new RegExp(`^${category}$`, "i") };
  }

  if (search) {
    const regex = { $regex: search, $options: "i" };
    query.$or = [{ title: regex }, { excerpt: regex }, { category: regex }, { content: regex }];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [blogs, total] = await Promise.all([
    Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Blog.countDocuments(query),
  ]);

  return {
    blogs,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
};

export const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug: slug.toLowerCase().trim() });
  if (!blog) {
    const error = new Error("Blog post not found");
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const createBlog = async (data) => {
  const { title, slug, excerpt, content, coverImage, category, author, published, readTime } = data;

  if (!title || !excerpt || !content) {
    const error = new Error("Title, excerpt, and content are required");
    error.statusCode = 400;
    throw error;
  }

  const finalSlug = (slug || title)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const existing = await Blog.findOne({ slug: finalSlug });
  if (existing) {
    const error = new Error("A blog with this slug or title already exists");
    error.statusCode = 409;
    throw error;
  }

  const blog = await Blog.create({
    title: title.trim(),
    slug: finalSlug,
    excerpt: excerpt.trim(),
    content,
    coverImage: coverImage || "",
    category: category || "General",
    author: author || "ADISOFTTECH Team",
    published: published !== undefined ? published : true,
    readTime: readTime || "5 min read",
  });

  return blog;
};

export const updateBlog = async (slug, data) => {
  const blog = await Blog.findOne({ slug: slug.toLowerCase().trim() });
  if (!blog) {
    const error = new Error("Blog post not found");
    error.statusCode = 404;
    throw error;
  }

  // If slug is being changed, verify uniqueness
  if (data.slug && data.slug.toLowerCase().trim() !== blog.slug) {
    const newSlug = data.slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    const conflict = await Blog.findOne({ slug: newSlug });
    if (conflict) {
      const error = new Error("Another blog with this slug already exists");
      error.statusCode = 409;
      throw error;
    }
    blog.slug = newSlug;
  }

  if (data.title !== undefined) blog.title = data.title.trim();
  if (data.excerpt !== undefined) blog.excerpt = data.excerpt.trim();
  if (data.content !== undefined) blog.content = data.content;
  if (data.coverImage !== undefined) blog.coverImage = data.coverImage;
  if (data.category !== undefined) blog.category = data.category;
  if (data.author !== undefined) blog.author = data.author;
  if (data.published !== undefined) blog.published = data.published;
  if (data.readTime !== undefined) blog.readTime = data.readTime;

  await blog.save();
  return blog;
};

export const deleteBlog = async (slug) => {
  const blog = await Blog.findOneAndDelete({ slug: slug.toLowerCase().trim() });
  if (!blog) {
    const error = new Error("Blog post not found");
    error.statusCode = 404;
    throw error;
  }
  return blog;
};

export const seedStarterBlogs = async () => {
  let count = 0;
  for (const article of STARTER_ARTICLES) {
    await Blog.findOneAndUpdate(
      { slug: article.slug },
      { ...article, published: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    count++;
  }
  return count;
};
