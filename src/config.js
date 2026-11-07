export const config = {
  name: "Zain Ul Haseeb",
  title: "Full-Stack Web Developer (React · Node.js · PHP · MySQL)",
  subtitle: "BS Software Engineering Student @ NFC IET Multan",
  bio: "I build fast, secure, end-to-end web applications: React and TypeScript frontends, Node.js and PHP backends, and MySQL or PostgreSQL databases, with Python, Java and C++ as my engineering foundation. Certified web developer from Corvit Systems Multan with a passion for clean UI/UX and custom backend solutions.",
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

  stack: ["React", "TypeScript", "Node.js", "PHP 8+", "MySQL", "Python", "Java", "C++", "Tailwind CSS"],

  skills: [
    { cat: "Programming Languages", items: [
      { name: "JavaScript & TypeScript", pct: 85 },
      { name: "PHP 8+", pct: 85 },
      { name: "Python", pct: 75 },
      { name: "Java (OOP)", pct: 72 },
      { name: "C / C++", pct: 75 },
      { name: "SQL (MySQL / PostgreSQL)", pct: 82 },
    ]},
    { cat: "Frameworks & Runtimes", items: [
      { name: "React & Vite", pct: 82 },
      { name: "Node.js & Express", pct: 75 },
      { name: "Next.js (App Router)", pct: 65 },
      { name: "Tailwind CSS", pct: 90 },
    ]},
    { cat: "Frontend Engineering", items: [
      { name: "HTML5 & Semantic Structure", pct: 95 },
      { name: "CSS3 / Flexbox / Modern Grid", pct: 92 },
      { name: "JavaScript ES6+ & DOM API", pct: 88 },
      { name: "Tailwind CSS & Modern Styling", pct: 90 },
      { name: "100% Mobile Responsive UI", pct: 95 },
    ]},
    { cat: "Backend & Database", items: [
      { name: "PHP 8+ (OOP & Procedural)", pct: 88 },
      { name: "MySQL Relational DB Architecture", pct: 90 },
      { name: "RESTful API Development", pct: 85 },
      { name: "Authentication & Password Hashing", pct: 86 },
    ]},
    { cat: "Tools & Software Design", items: [
      { name: "Git & Version Control", pct: 88 },
      { name: "Software Architecture & OOP", pct: 82 },
      { name: "Algorithms & Data Structures", pct: 86 },
      { name: "cPanel & Web Server Hosting", pct: 84 },
    ]},
  ],

  services: [
    { id: 5, icon: "code", title: "React & Node.js Applications", badge: "Full-Stack", desc: "Modern single-page apps with React, REST APIs in Node.js or PHP, authentication and database integration.", points: ["React + TypeScript UI", "Node.js / PHP REST APIs", "JWT & Session Auth", "PostgreSQL / MySQL"] },
    { id: 1, icon: "code", title: "Full-Stack Web Development", badge: "Most Popular", desc: "Custom PHP & MySQL web applications with clean architecture, admin panels, and interactive frontends.", points: ["Custom PHP Backend", "MySQL Database Design", "Admin Control Panels", "REST API Integration"] },
    { id: 2, icon: "palette", title: "Modern UI Web Design", badge: "High Conversion", desc: "Clean, elegant, light linear gradient web interfaces engineered for high speed and 100% mobile compatibility.", points: ["100% Mobile Responsive", "Ultra-Fast Page Load", "Clean Semantic HTML", "Cross-Browser Compatible"] },
    { id: 3, icon: "database", title: "PHP & Database Backends", badge: "Engineering", desc: "Secure database schemas, user authorization systems, query optimization, and server configuration.", points: ["SQL Query Optimization", "Secure Session Handling", "User Access Control", "cPanel Deployment"] },
    { id: 4, icon: "wand", title: "Custom Web Applications", badge: "Tailored", desc: "Interactive calculators, lead forms, dynamic data grids, and direct WhatsApp integrations.", points: ["Interactive Calculators", "Dynamic Data Grids", "Form Validation", "WhatsApp Integration"] },
  ],

  projects: [
    { id: 1, title: "BUYPAK — Pakistan-First Online Store", cat: "Next.js Apps", img: "/projects-img/buypak.png", short: "Cash on Delivery store with order tracking, returns, reviews and a full admin panel.", full: "BUYPAK is an online store built around how Pakistan shops: Cash on Delivery by default, local courier tracking and genuine products. It covers the full journey from browsing to delivery, plus an admin panel so the owner can run the store without touching code. Mobile-first, with security headers, Zod validation and rate-limited endpoints.", tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Supabase"], features: ["Cash on Delivery checkout with optional JazzCash and Safepay", "Product variants, galleries, wishlist, reviews and returns", "Admin panel: products, orders, couriers, coupons, CSV import, audit log", "Signed admin session, CSP headers and rate-limited forms"], status: "", demo: "https://buypak-five.vercel.app", repo: "", pdf: "/pdfs/buypak.pdf" },
    { id: 2, title: "CampusFlow — School Management", cat: "React Apps", img: "/projects-img/campusflow.png", short: "Five role-based portals for admissions, attendance, exams, fees and parent communication.", full: "CampusFlow brings the everyday work of a school into one app, with separate portals for admin, teacher, accountant, parent and student. Every number on screen comes from a real record. It runs fully in the browser with validated, role-guarded actions; a Supabase schema with row-level security is included for the next stage.", tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4"], features: ["5 role-based portals with permission checks on every action", "Student directory, attendance register and printable ID cards", "Fees and accounting: invoices, receipts, ledger, budgets and payroll", "PBKDF2 password hashing, login lockout and session timeouts"], status: "", demo: "https://campus-flow-pied-eta.vercel.app", repo: "", pdf: "/pdfs/campusflow.pdf" },
    { id: 3, title: "RecipePro — Cook With What You Have", cat: "Next.js Apps", img: "/projects-img/recipepro.png", short: "Pick the ingredients you have and get a full recipe, plus Tea and Coffee brewing studios.", full: "RecipePro works backwards from the fridge: choose your ingredients and it builds a recipe with exact quantities and steps. Three studios (Food, Tea and Coffee) handle details like water temperature, steeping time and brew ratio. Includes serving scaling, cooking mode, a protected admin console, and SEO-ready static pages.", tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Zod"], features: ["Food, Tea and Coffee studios with timers and scaled quantities", "Recipe pages with cooking mode, share and print", "Static generation, JSON-LD, sitemap and manifest", "Signed HttpOnly admin session, rate limiting and 25 unit tests"], status: "", demo: "https://recipe-pro-eosin.vercel.app", repo: "", pdf: "/pdfs/recipepro.pdf" },
  ],

  pricing: [
    { id: "landing", label: "Landing Page", base: 40, time: "2–3 Days" },
    { id: "business", label: "Corporate Business Site", base: 80, time: "4–6 Days" },
    { id: "app", label: "PHP & SQL Web App", base: 150, time: "7–10 Days" },
    { id: "fullstack", label: "React + Node.js Full-Stack App", base: 250, time: "10–14 Days" },
    { id: "portal", label: "Custom Business Portal", base: 220, time: "8–12 Days" },
  ],
  addons: [
    { id: "db", label: "MySQL Database Integration", price: 20 },
    { id: "admin", label: "Custom Admin Panel", price: 35 },
    { id: "resp", label: "Ultra Mobile Optimization", price: 10 },
    { id: "api", label: "REST API & Third-Party Integrations", price: 30 },
    { id: "auth", label: "Authentication & Roles", price: 25 },
    { id: "seo", label: "SEO & Performance Speed", price: 12 },
  ],

  faqs: [
    { q: "What technologies do you specialize in?", a: "I am a full-stack developer working with React, TypeScript, Node.js, PHP, MySQL, and also Python, Java and C++. I am studying Software Engineering at NFC IET Multan and hold a Web Development Certification from Corvit Systems Multan." },
    { q: "Can you build custom PHP and SQL web applications?", a: "Yes! I build custom PHP backends, normalized MySQL databases, user login systems, and full admin management dashboards." },
    { q: "Will my website be 100% mobile responsive?", a: "Absolutely! Every site I build is thoroughly tested on mobile phones, tablets, laptops, and wide desktop screens." },
    { q: "How can I contact you for a project?", a: "You can click the WhatsApp button on this site (+92 341 6314873), send an email to zaindev788@gmail.com, or use the project cost estimator tool!" },
  ],
};
