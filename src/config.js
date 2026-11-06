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
    { id: 1, title: "Smart E-Commerce Portal", cat: "Full-Stack PHP/SQL", img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=640&q=70&auto=format&fit=crop", short: "Complete e-commerce platform with cart management, order tracking, and admin panel.", full: "Built using PHP 8 and MySQL. Includes product management, session-based cart, secure checkout flow, and admin dashboard.", tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"], features: ["Normalized MySQL database", "Secure authentication", "Dynamic shopping cart", "Admin panel"], status: "In Progress", demo: "", repo: "" },
    { id: 2, title: "CampusFlow — School ERP", cat: "Full-Stack React/Supabase", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&q=70&auto=format&fit=crop", short: "Multi-portal school ERP with Admin, Teacher, Student, Parent, and Accountant dashboards.", full: "CampusFlow is a production-ready school management ERP featuring role-based portals for Admins, Teachers, Students, Parents, and Accountants. Built with React, TypeScript, and Supabase for real-time authentication, fee vouchers, attendance register, timetable scheduler, and report cards.", tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"], features: ["5 Role-based portals (Admin, Teacher, Student, Parent, Accountant)", "Automated fee vouchers & invoice tracking", "Interactive timetable editor & attendance register", "Supabase cloud database & authentication"], status: "", demo: "https://campus-flow-pied-eta.vercel.app", repo: "" },
    { id: 3, title: "Modern Business Platform", cat: "Frontend & UI", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&q=70&auto=format&fit=crop", short: "Sleek landing page with light gradient aesthetics, interactive pricing, and animations.", full: "Light linear gradient aesthetic, smooth section reveal animations, interactive estimator, and high-converting contact forms.", tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"], features: ["100% Mobile responsive", "Interactive cost estimator", "Smooth scroll & animations", "Clean semantic structure"], status: "In Progress", demo: "", repo: "" },
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
