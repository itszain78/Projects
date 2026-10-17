<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Academic Management System — Portfolio Demo | Zain Ul Haseeb</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background: linear-gradient(135deg, #e7edf4 0%, #dbe4ee 35%, #d4e0f0 70%, #e7edf4 100%);
      font-family: system-ui, -apple-system, sans-serif;
    }
    .glass {
      background: rgba(241, 245, 249, 0.85);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.4);
    }
    .grad-text {
      background: linear-gradient(135deg, #0284c7 0%, #4338ca 50%, #0d9488 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</head>
<body class="min-h-screen text-slate-900 p-4 sm:p-8">

  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <header class="glass p-6 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
      <div>
        <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-full mb-2">FULL-STACK PHP / MYSQL SECURE APP</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Academic Management Portal</h1>
        <p class="text-slate-600 text-xs sm:text-sm mt-1">Built with Role-Based Access Control, PDO Prepared Statements & Security Middleware</p>
      </div>
      <div class="flex items-center gap-3">
        <a href="/" class="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors">
          ← Back to Portfolio
        </a>
      </div>
    </header>

    <!-- Security Highlights Bar -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <div class="glass p-4 rounded-2xl text-center">
        <div class="text-xs font-bold text-emerald-700 uppercase">SQLi Immunity</div>
        <div class="text-xs text-slate-600 mt-1">PDO Prepared Statements</div>
      </div>
      <div class="glass p-4 rounded-2xl text-center">
        <div class="text-xs font-bold text-blue-700 uppercase">XSS Escaped</div>
        <div class="text-xs text-slate-600 mt-1">Output Encoding</div>
      </div>
      <div class="glass p-4 rounded-2xl text-center">
        <div class="text-xs font-bold text-indigo-700 uppercase">CSRF Guard</div>
        <div class="text-xs text-slate-600 mt-1">Cryptographic Token</div>
      </div>
      <div class="glass p-4 rounded-2xl text-center">
        <div class="text-xs font-bold text-amber-700 uppercase">Password Hash</div>
        <div class="text-xs text-slate-600 mt-1">BCRYPT Cost 12</div>
      </div>
    </div>

    <!-- Live Demo Simulator -->
    <div class="glass p-6 sm:p-8 rounded-3xl shadow-lg">
      <div class="flex items-center justify-between border-b border-slate-200 pb-5 mb-6 flex-wrap gap-3">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Student Grade Report (Demo View)</h2>
          <p class="text-xs text-slate-500 font-medium">Demonstrates normalized SQL queries and IDOR protection</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Authenticated: Zain Ul Haseeb (Student)
          </span>
        </div>
      </div>

      <!-- CGPA Overview Card -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="p-5 rounded-2xl bg-slate-100/90 border border-slate-300">
          <div class="text-xs font-bold text-slate-500 uppercase">Cumulative GPA</div>
          <div class="text-3xl font-extrabold grad-text mt-1">3.83 / 4.00</div>
        </div>
        <div class="p-5 rounded-2xl bg-slate-100/90 border border-slate-300">
          <div class="text-xs font-bold text-slate-500 uppercase">Completed Credits</div>
          <div class="text-3xl font-extrabold text-slate-900 mt-1">10 Cr. Hours</div>
        </div>
        <div class="p-5 rounded-2xl bg-slate-100/90 border border-slate-300">
          <div class="text-xs font-bold text-slate-500 uppercase">Academic Standing</div>
          <div class="text-3xl font-extrabold text-emerald-600 mt-1">Honors</div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="border-b border-slate-300 text-slate-500 uppercase text-[11px] font-bold">
              <th class="py-3 px-4">Course Code</th>
              <th class="py-3 px-4">Course Name</th>
              <th class="py-3 px-4">Department</th>
              <th class="py-3 px-4">Semester</th>
              <th class="py-3 px-4">Credits</th>
              <th class="py-3 px-4">Grade</th>
              <th class="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr class="hover:bg-slate-200/50 transition-colors">
              <td class="py-4 px-4 font-bold text-blue-700">SE-301</td>
              <td class="py-4 px-4 font-semibold text-slate-900">Software Architecture & Design</td>
              <td class="py-4 px-4 text-slate-600">Software Engineering</td>
              <td class="py-4 px-4 text-slate-600">Fall 2024</td>
              <td class="py-4 px-4 font-medium text-slate-800">3 Cr</td>
              <td class="py-4 px-4 font-bold text-emerald-700">A (3.80)</td>
              <td class="py-4 px-4"><span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Completed</span></td>
            </tr>
            <tr class="hover:bg-slate-200/50 transition-colors">
              <td class="py-4 px-4 font-bold text-blue-700">DB-204</td>
              <td class="py-4 px-4 font-semibold text-slate-900">Relational Database Systems</td>
              <td class="py-4 px-4 text-slate-600">Computer Science</td>
              <td class="py-4 px-4 text-slate-600">Fall 2024</td>
              <td class="py-4 px-4 font-medium text-slate-800">4 Cr</td>
              <td class="py-4 px-4 font-bold text-emerald-700">A+ (4.00)</td>
              <td class="py-4 px-4"><span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Completed</span></td>
            </tr>
            <tr class="hover:bg-slate-200/50 transition-colors">
              <td class="py-4 px-4 font-bold text-blue-700">WEB-105</td>
              <td class="py-4 px-4 font-semibold text-slate-900">Full-Stack Web Engineering</td>
              <td class="py-4 px-4 text-slate-600">Software Engineering</td>
              <td class="py-4 px-4 text-slate-600">Spring 2025</td>
              <td class="py-4 px-4 font-medium text-slate-800">3 Cr</td>
              <td class="py-4 px-4 font-bold text-blue-700">A- (3.70)</td>
              <td class="py-4 px-4"><span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Enrolled</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</body>
</html>
