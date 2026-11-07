export const config = {
  name: "Zain Ul Haseeb",
  title: "Full-Stack Web Developer (React · Next.js · TypeScript · SQL)",
  subtitle: "BS Software Engineering Student @ NFC IET Multan",
  bio: "I build fast, secure, end-to-end web applications with TypeScript, React and Next.js, backed by SQL databases (PostgreSQL on Supabase, plus MySQL and PHP from my certification). My shipped projects include a Pakistan-first online store, a five-portal school management system and a recipe platform. Python, Java and C++ are my engineering foundation from university. Certified web developer from Corvit Systems Multan.",
  email: "zaindev788@gmail.com",
  whatsapp: "923416314873",
  phoneDisplay: "+92 341 6314873",
  location: "Multan, Pakistan",
  github: "https://github.com/itszain78",
  linkedin: "",
  twitter: "",
  // Full public URL of the deployed site, e.g. "https://yourname.vercel.app" (no trailing slash).
  // Used for canonical URL, Open Graph image, sitemap.xml and robots.txt. Can also be set via VITE_SITE_URL.
  siteUrl: "https://zain-portfolio-wheat.vercel.app",
  cgpa: "3.62 / 4.00", // Displayed exclusively inside Resume Modal
  university: "NFC IET Multan (2024–2028)",
  degree: "BS Software Engineering",
  certification: "Web Development — Corvit Systems Multan",

  stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Supabase", "PostgreSQL", "Node.js", "PHP", "MySQL", "Python", "Java", "C++"],

  skills: [
    { cat: "Languages", items: [
      { name: "TypeScript (strict)", pct: 85 },
      { name: "JavaScript ES6+", pct: 88 },
      { name: "SQL (PostgreSQL & MySQL)", pct: 82 },
      { name: "PHP 8+", pct: 85 },
      { name: "Python", pct: 75 },
      { name: "Java (OOP)", pct: 72 },
      { name: "C / C++", pct: 75 },
    ]},
    { cat: "Frameworks & Runtimes", items: [
      { name: "React 19 & Vite", pct: 85 },
      { name: "Next.js 15 (App Router)", pct: 78 },
      { name: "Node.js (Next.js API routes)", pct: 75 },
      { name: "Tailwind CSS (v3 & v4)", pct: 90 },
    ]},
    { cat: "Frontend Engineering", items: [
      { name: "HTML5 & Semantic Structure", pct: 95 },
      { name: "CSS3 / Flexbox / Modern Grid", pct: 92 },
      { name: "Responsive, Mobile-First UI", pct: 95 },
      { name: "SEO & Accessibility (JSON-LD, metadata)", pct: 85 },
      { name: "Performance (lazy loading, code splitting)", pct: 85 },
    ]},
    { cat: "Backend & Database", items: [
      { name: "Supabase & PostgreSQL (RLS)", pct: 78 },
      { name: "REST APIs & Route Handlers", pct: 85 },
      { name: "Auth & Security (hashing, sessions, CSP)", pct: 86 },
      { name: "Validation with Zod", pct: 85 },
      { name: "MySQL Relational Design", pct: 90 },
    ]},
    { cat: "Tools & Software Design", items: [
      { name: "Git & Version Control", pct: 88 },
      { name: "Software Architecture & OOP", pct: 82 },
      { name: "Algorithms & Data Structures", pct: 86 },
      { name: "Testing (Vitest, Playwright)", pct: 75 },
      { name: "Deployment (Vercel, Docker, cPanel)", pct: 84 },
    ]},
  ],

  services: [
    { id: 5, icon: "code", title: "React & Next.js Applications", badge: "Full-Stack", desc: "Modern web apps with React, Next.js and TypeScript, server-side logic, secure sessions and database integration.", points: ["React + TypeScript UI", "Next.js App Router & API routes", "Secure sessions & role-based access", "Supabase / PostgreSQL"] },
    { id: 1, icon: "code", title: "E-Commerce & Business Platforms", badge: "Most Popular", desc: "Stores and management systems with admin panels, orders, payments and role-based portals, like BUYPAK and CampusFlow.", points: ["Cash on Delivery, JazzCash & Safepay", "Admin control panels", "Role-based portals", "Reports & audit logs"] },
    { id: 2, icon: "palette", title: "Modern UI Web Design", badge: "High Conversion", desc: "Clean, fast, mobile-first interfaces with smooth animations, accessible markup and strong SEO.", points: ["100% Mobile Responsive", "Ultra-Fast Page Load", "SEO & Accessibility Ready", "Cross-Browser Compatible"] },
    { id: 3, icon: "database", title: "Database & Backend Design", badge: "Engineering", desc: "Secure database schemas with PostgreSQL (Supabase) or MySQL, access control, validation and server configuration.", points: ["Supabase & Row-Level Security", "PostgreSQL / MySQL schemas", "Zod input validation", "Vercel & cPanel Deployment"] },
    { id: 4, icon: "wand", title: "Custom Web Applications", badge: "Tailored", desc: "Interactive tools, calculators, lead forms and dynamic data grids, with direct WhatsApp integration.", points: ["Interactive Calculators", "Dynamic Data Grids", "Form Validation", "WhatsApp Integration"] },
  ],

  projects: [
    { id: 1, title: "BUYPAK — Pakistan-First Online Store", cat: "Next.js Apps", img: "/projects-img/buypak.png", short: "Cash on Delivery store with order tracking, returns, reviews and a full admin panel.", full: "BUYPAK is an online store built around how Pakistan shops: Cash on Delivery by default, local courier tracking and genuine products. It covers the full journey from browsing to delivery, plus an admin panel so the owner can run the store without touching code. Mobile-first, with security headers, Zod validation and rate-limited endpoints.", tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Supabase"], features: ["Cash on Delivery checkout with optional JazzCash and Safepay", "Product variants, galleries, wishlist, reviews and returns", "Admin panel: products, orders, couriers, coupons, CSV import, audit log", "Signed admin session, CSP headers and rate-limited forms"], status: "", demo: "https://buypak-five.vercel.app", repo: "", pdf: "/pdfs/buypak.pdf" },
    { id: 2, title: "CampusFlow — School Management", cat: "React Apps", img: "/projects-img/campusflow.png", short: "Five role-based portals for admissions, attendance, exams, fees and parent communication.", full: "CampusFlow brings the everyday work of a school into one app, with separate portals for admin, teacher, accountant, parent and student. Every number on screen comes from a real record. It runs fully in the browser with validated, role-guarded actions; a Supabase schema with row-level security is included for the next stage.", tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4"], features: ["5 role-based portals with permission checks on every action", "Student directory, attendance register and printable ID cards", "Fees and accounting: invoices, receipts, ledger, budgets and payroll", "PBKDF2 password hashing, login lockout and session timeouts"], status: "", demo: "https://campus-flow-pied-eta.vercel.app", repo: "", pdf: "/pdfs/campusflow.pdf" },
    { id: 3, title: "RecipePro — Cook With What You Have", cat: "Next.js Apps", img: "/projects-img/recipepro.png", short: "Pick the ingredients you have and get a full recipe, plus Tea and Coffee brewing studios.", full: "RecipePro works backwards from the fridge: choose your ingredients and it builds a recipe with exact quantities and steps. Three studios (Food, Tea and Coffee) handle details like water temperature, steeping time and brew ratio. Includes serving scaling, cooking mode, a protected admin console, and SEO-ready static pages.", tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Zod"], features: ["Food, Tea and Coffee studios with timers and scaled quantities", "Recipe pages with cooking mode, share and print", "Static generation, JSON-LD, sitemap and manifest", "Signed HttpOnly admin session, rate limiting and 25 unit tests"], status: "", demo: "https://recipe-pro-eosin.vercel.app", repo: "", pdf: "/pdfs/recipepro.pdf" },
  ],

  // Prices are in USD. pkrRate is an approximate USD→PKR rate used by the estimator's PKR toggle; update it when needed.
  pkrRate: 280,
  pricing: [
    { id: "landing", label: "Landing Page", base: 40, time: "2–3 Days", days: [2, 3], example: "" },
    { id: "business", label: "Corporate Business Site", base: 80, time: "4–6 Days", days: [4, 6], example: "" },
    { id: "app", label: "PHP & SQL Web App", base: 150, time: "7–10 Days", days: [7, 10], example: "" },
    { id: "portal", label: "Custom Business Portal", base: 220, time: "8–12 Days", days: [8, 12], example: "" },
    { id: "fullstack", label: "React / Next.js Full-Stack App", base: 250, time: "10–14 Days", days: [10, 14], example: "Like RecipePro" },
    { id: "store", label: "E-Commerce Store", base: 350, time: "14–21 Days", days: [14, 21], example: "Like BUYPAK" },
    { id: "system", label: "Multi-Role Management System", base: 400, time: "18–28 Days", days: [18, 28], example: "Like CampusFlow" },
  ],
  addons: [
    { id: "db", label: "SQL Database (PostgreSQL / MySQL)", price: 20, days: 1 },
    { id: "supa", label: "Supabase Cloud Backend & Storage", price: 30, days: 2 },
    { id: "admin", label: "Custom Admin Panel", price: 35, days: 3 },
    { id: "auth", label: "Authentication & Roles", price: 25, days: 2 },
    { id: "pay", label: "Payments (COD, JazzCash, Safepay)", price: 40, days: 3 },
    { id: "api", label: "REST API & Third-Party Integrations", price: 30, days: 2 },
    { id: "email", label: "Email Notifications (Resend)", price: 15, days: 1 },
    { id: "resp", label: "Ultra Mobile Optimization", price: 10, days: 1 },
    { id: "seo", label: "SEO & Performance Speed", price: 12, days: 1 },
    { id: "test", label: "Automated Tests & Handover Docs", price: 20, days: 2 },
  ],

  faqs: [
    { q: "What technologies do you specialize in?", a: "I build full-stack web apps with TypeScript, React and Next.js, using SQL databases: PostgreSQL on Supabase, plus MySQL and PHP from my Corvit certification. Python, Java and C++ are my university foundation. I am studying Software Engineering at NFC IET Multan." },
    { q: "Can you build an online store or a management system?", a: "Yes. My projects include BUYPAK, a Cash on Delivery online store with an admin panel, and CampusFlow, a school management system with five role-based portals. I also build custom PHP and SQL applications." },
    { q: "Will my website be 100% mobile responsive?", a: "Absolutely! Every site I build is designed mobile-first and tested on phones, tablets, laptops, and wide desktop screens." },
    { q: "How can I contact you for a project?", a: "You can click the WhatsApp button on this site (+92 341 6314873), send an email to zaindev788@gmail.com, or use the project cost estimator tool!" },
  ],
};
