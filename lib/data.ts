export type ProjectPreview = "aps" | "self-survey" | "default";

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  tags: string[];
  highlight: boolean;
  featured?: boolean;
  year: string;
  role: string;
  features: string[];
  liveUrl?: string;
  screenshots?: ProjectScreenshot[];
  frontend?: {
    stack: string[];
    modules: string[];
  };
  backend?: {
    stack: string[];
    modules: string[];
  };
  preview: ProjectPreview;
}

export const siteConfig = {
  name: "Sudhir Gomase",
  title: "Sudhir Gomase | Backend Developer",
  description:
    "Backend Developer building scalable APIs, microservices, and cloud-native systems — crafted with Node.js, Fastify, SQL, and AWS.",
  email: "sudhirgomase2109@gmail.com",
  phone: "+91 8108320614",
  location: "Mumbai, India",
  github: "https://github.com/SudhirGomase",
  linkedin: "https://linkedin.com/in/sudhir-gomase-95210b201",
  resume: "/Resume.pdf",
};

export const typingPhrases = [
  "Node.js & Fastify at scale",
  "Microservices on AWS",
  "SQL tuned to the millisecond",
  "Redis-backed performance",
];

export const aboutContent = {
  bio: "I'm a Backend Developer at WE-Matter in Mumbai, focused on building reliable APIs, microservices, and data-heavy platforms. I turn complex business logic into clean, scalable systems — from HR performance tools to enterprise survey analytics.",
  highlights: [
    { value: "2+ yrs", label: "Production backend experience" },
    { value: "3", label: "Enterprise platforms shipped" },
    { value: "30%", label: "Average API speed improvement" },
    { value: "Mumbai", label: "Based in India · Open to remote" },
  ],
};

export const pillars = [
  {
    number: "01",
    title: "Scalability",
    description:
      "Architected modular backend systems with 25% reduced complexity. Designed RESTful APIs improving system interoperability by 40%.",
    metric: 40,
    suffix: "%",
    label: "API Interoperability",
  },
  {
    number: "02",
    title: "Security",
    description:
      "Implemented RBAC and secure API endpoints across enterprise HR platforms. Built authentication layers for multi-tenant survey systems.",
    metric: 99,
    suffix: ".9%",
    label: "Uptime Target",
  },
  {
    number: "03",
    title: "Performance",
    description:
      "Improved API response times by 30% with Redis caching. Optimized SQL queries reducing runtime errors by 35%.",
    metric: 35,
    suffix: "%",
    label: "Error Reduction",
  },
  {
    number: "04",
    title: "AI Integration",
    description:
      "Integrated enterprise HR systems including SAP SuccessFactors. Built engagement scoring engines for AI-driven analytics dashboards.",
    metric: 30,
    suffix: "%",
    label: "Faster Response",
  },
];

export const projects: Project[] = [
  {
    id: "aps",
    title: "Agile Performance System (APS)",
    subtitle: "Enterprise performance management platform",
    description:
      "Full-stack performance management system for KPIs, goals, appraisals, and executive dashboards — serving CEO, CFO, CHRO, and operations leaders.",
    longDescription:
      "Built as part of WE-Matter's internal Agile Performance Management platform. APS connects goal tracking, employee appraisals, bell-curve rating, and role-based dashboards into a single multi-tenant system used across enterprise accounts.",
    tags: ["Node.js", "Fastify", "Prisma", "React", "Redis", "BullMQ", "Swagger"],
    highlight: true,
    featured: true,
    year: "Ongoing",
    role: "Backend Developer — WE-Matter",
    liveUrl: "https://aps.we-matter.com/login",
    preview: "aps",
    screenshots: [
      { src: "/projects/aps-login.png", caption: "Secure sign-in — User & Admin roles" },
      { src: "/projects/aps-overview.png", caption: "Employee overview — KPIs, goals & tasks" },
      { src: "/projects/aps-appraisal.png", caption: "My Appraisal — competencies, KPIs & bell curve" },
      { src: "/projects/aps-team-goals.png", caption: "Team goals & tasks management" },
    ],
    features: [
      "Goal & task management with templates and work logs",
      "Employee appraisal cycles with competencies & bell-curve",
      "RBAC with permission management & access control",
      "Executive dashboards — CEO, CFO, CHRO, Sales, Operations",
      "Org hierarchy, grades, departments & employee management",
      "Automated deadline reminders via BullMQ job queues",
      "Multi-account client admin with custom app design",
      "Swagger-documented REST APIs with JWT authentication",
    ],
    frontend: {
      stack: ["React", "TypeScript", "Redux Toolkit", "React Router"],
      modules: [
        "Goals & Appraisals UI",
        "Multi-dashboard client views",
        "Employee & role management",
        "Appraisal settings — ratings, questionnaires, bell-curve",
        "Sales & operations dashboard components",
      ],
    },
    backend: {
      stack: ["Node.js", "Fastify", "Prisma", "MySQL", "Redis", "BullMQ"],
      modules: [
        "GoalRoutes & AppraisalRoutes",
        "EmployeeHierarchy & OrganizationalUnit",
        "CEODashboard / CFODashboard / CHRODashboard",
        "SalesDashboard & OperationManufacturing",
        "NotificationRoutes & FeatureSettingRoutes",
        "Auth-service microservice (JWT)",
      ],
    },
  },
  {
    id: "self-survey",
    title: "Self-Survey Platform",
    subtitle: "Multi-tenant employee engagement survey system",
    description:
      "Enterprise survey platform supporting 360° feedback, kiosk mode, HRIS mapping, scorecards, and automated email scheduling — built on Fastify with React.",
    longDescription:
      "Evolved from a PHP-based survey tool into a modern Fastify + React platform. Handles survey creation, recipient mapping, multi-language support, analytics exports, and super-admin multi-company management.",
    tags: ["Fastify", "React", "MySQL", "Redis", "BullMQ", "Knex.js", "TypeScript"],
    highlight: true,
    featured: true,
    year: "Ongoing",
    role: "Backend Developer — WE-Matter",
    liveUrl: "https://admin.we-matter.com/",
    preview: "self-survey",
    screenshots: [
      { src: "/projects/self-survey-login.png", caption: "Survey portal login" },
      { src: "/projects/self-survey-company-detail.png", caption: "Company setup — modules & survey types" },
      { src: "/projects/self-survey-questions.png", caption: "Survey creation — question management" },
      { src: "/projects/self-survey-hris.png", caption: "HRIS data — employee upload & mapping" },
    ],
    features: [
      "360° survey module with custom question options",
      "Survey kiosk mode for on-site data collection",
      "HRIS data mapping & auto-mapping for recipients",
      "Scorecard settings with driver/theme mapping",
      "Automated email scheduler with cron jobs",
      "Multi-language support via Google Translate API",
      "PPT & Excel report generation (Puppeteer, pptxgenjs)",
      "Super-admin, admin & client role-based portals",
    ],
    frontend: {
      stack: ["React", "TypeScript", "Redux", "React Query", "SCSS"],
      modules: [
        "Survey creation wizard (multi-step)",
        "360° recipient & question management",
        "Scorecard & master mapping settings",
        "Super-admin company & survey editor",
        "Survey kiosk page & HRIS integration UI",
      ],
    },
    backend: {
      stack: ["Fastify", "Knex.js", "MySQL", "Redis", "BullMQ", "Bull Board"],
      modules: [
        "Survey service — 16K+ lines of business logic",
        "Account & user management APIs",
        "HRIS mapping & kiosk attribute services",
        "Email templates & SendGrid integration",
        "CSV/Excel export & statistics engine",
        "Job queue processing with BullMQ workers",
      ],
    },
  },
  {
    id: "analytics",
    title: "Analytics Dashboard Module",
    subtitle: "Employee engagement & survey analytics platform",
    description:
      "Full-stack analytics dashboard for survey insights — trend lines, predictive analysis, heat maps, open-ended NLP, and driver diagnostics with real-time engagement scoring.",
    longDescription:
      "Built as part of WE-Matter's survey analytics suite. Delivers executive-ready dashboards with multi-filter demographics, predictive performance & attrition models, diagnostic scatter plots, and exportable heat map reports — powered by optimized Knex.js queries.",
    tags: ["Node.js", "Fastify", "Knex.js", "React", "MySQL", "Chart.js"],
    highlight: true,
    featured: true,
    year: "Ongoing",
    role: "Backend Developer — WE-Matter",
    liveUrl: "https://portal.we-matter.com/",
    preview: "default",
    screenshots: [
      { src: "/projects/analytics-login.png", caption: "Dashboard login — organization SSO" },
      { src: "/projects/analytics-trends.png", caption: "Trend line — performance, attrition & engagement" },
      { src: "/projects/analytics-predictive.png", caption: "Predictive & diagnostic analysis" },
      { src: "/projects/analytics-open-ended.png", caption: "Open-ended question — phrase cloud & comments" },
      { src: "/projects/analytics-heatmap.png", caption: "Heat map & driver analysis by department" },
    ],
    features: [
      "Trend line charts — performance, attrition & engagement over time",
      "Predictive analysis — performance distribution & attrition risk",
      "Diagnostic scatter plots with driver impact scoring",
      "Open-ended NLP — phrase cloud, sentiment & comment explorer",
      "Heat map with demographic filters & color-coded benchmarks",
      "Driver analysis with compare mode & benchmark overlays",
      "Multi-filter sidebar — department, gender, location & more",
      "Knex.js optimized queries for sub-second dashboard loads",
    ],
    frontend: {
      stack: ["React", "TypeScript", "Chart.js", "SCSS"],
      modules: [
        "Trend line & engagement KPI cards",
        "Donut charts & diagnostic quadrant plots",
        "Heat map table with delta/swap views",
        "Open-ended phrase cloud & comment panels",
      ],
    },
    backend: {
      stack: ["Node.js", "Fastify", "Knex.js", "MySQL", "Redis"],
      modules: [
        "Engagement scoring engine",
        "Predictive performance & attrition APIs",
        "Heat map & driver analysis endpoints",
        "Open-ended text aggregation & export",
      ],
    },
  },
];

export const stats = {
  yearsExperience: 2,
  performanceImprovement: 30,
  errorReduction: 35,
};
