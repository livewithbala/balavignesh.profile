/* ------------------------------------------------------------------
   EDIT ME. Everything you may want to change lives here.
   - Sections with empty lists (testimonials, decisions, metrics) stay hidden
     until you add content, so nothing half-finished shows up publicly.
   - Add real numbers only when you can stand behind them.
------------------------------------------------------------------- */
window.SITE = {
  email: ["baluviki00", "gmail.com"].join("@"),
  linkedin: "https://www.linkedin.com/in/bala-vignesh-742b55106/",
  resumeUrl: "Bala_Vignesh_Resume.pdf",
  // Paste a Calendly / Cal.com / Google Calendar booking link here.
  // While empty, "Book a chat" opens a pre-filled email instead.
  bookingUrl: "",

  /* Positioning chips under the hero */
  positioning: ["Regulated delivery", "Enterprise SaaS & ERP", "AI-assisted workflows", "Technical fluency"],

  /* 30-second version for skimmers */
  skim: [
    { h: "Right now", t: "Senior Product Owner on a clinical-trial site-activation platform for a CRO client, 12% faster to activation." },
    { h: "Known for", t: "Turning complex, regulated requirements into products people adopt, from 0→1 SaaS to a 13-app property ERP, with the technical depth to make architecture calls alongside engineers." },
    { h: "Open to", t: "Senior product roles where complexity is the point: regulated, enterprise and AI-assisted products." }
  ],

  /* Why product */
  story: [
    "I started as a builder: a computer science degree and an internship developing WordPress sites. Then I moved close to customers at OYO, managing enterprise accounts, where I learned what clients really ask for.",
    "At Pinkblue I owned growth and took online revenue from ₹50L to ₹1.5Cr a month. Each step gave me another lens: technology, customers, and revenue.",
    "I never lost the builder in me. I can follow an architecture discussion, weigh platform trade-offs and make technical decisions with engineers, which keeps requirements realistic and tech debt low.",
    "Product is where those three meet. At Crayon'd I built seven products for clients, and today at Expleo I bring that to regulated clinical-trial software, where a faster, safer process has real consequences."
  ],

  certifications: [
    { t: "ISTQB Certified Tester, Foundation Level", d: "Software testing fundamentals and quality practices" }
  ],

  education: [
    { t: "B.E. Computer Science and Engineering", d: "Park College of Engineering and Technology · 2014 – 2018" }
  ],

  /* How I work with you */
  how: [
    { n: "01", t: "Discover", d: "User research, surveys and interviews, plus stakeholder goals. I want the problem stated clearly before anyone proposes a solution." },
    { n: "02", t: "Define", d: "Detailed PRDs, wireframes with UX, and prioritization with RICE and MoSCoW, so the roadmap is something stakeholders trust." },
    { n: "03", t: "Deliver", d: "Scrum with a groomed backlog, sprint readiness and managed releases. I join technical and architecture talks to keep tech debt low." },
    { n: "04", t: "Prove", d: "UAT, release sign-off, product analytics and KPI tracking, to confirm what shipped matches what the business intended." }
  ],
  expect: [
    "Clear PRDs and decisions you can trace back to a reason",
    "Honest trade-offs early, not surprises at release",
    "Requirements that engineering, design and stakeholders read the same way"
  ],
  need: [
    "Access to real users early",
    "A named decision-maker for each product area",
    "Engineers and designers in discovery, not just delivery"
  ],

  /* Calls I'd make again. Edit or replace with specific stories. */
  calls: [
    { t: "Trace every requirement in regulated work", d: "In GxP and 21 CFR Part 11 environments I build requirement-to-test traceability (mRTM) from day one, so audits are a by-product, not a scramble." },
    { t: "Research before the roadmap", d: "Surveys and user interviews first, then features. It is the cheapest way to avoid building the wrong thing." },
    { t: "Use GenAI to remove toil, not judgment", d: "GenAI-assisted PDD and Jira ticket generation cut documentation turnaround by 30%. Product decisions stay with people." },
    { t: "Make architecture decisions with engineers, not around them", d: "I join technical and architecture planning early, so scope reflects what the platform can do well and tech debt stays minimal." },
    { t: "Prioritize with a framework so 'no' is explainable", d: "RICE and MoSCoW turn disagreements into a conversation about evidence rather than opinion." }
  ],

  /* Testimonials: leave empty to hide the section.
     Example: { q: "Bala made the roadmap make sense for everyone.", n: "Name", r: "Engineering Lead, Company" } */
  testimonials: [],

  /* Case studies (anonymized). Add `deep` to make a card open a full deep dive. */
  cases: [
    { k: "01", tag: "Clinical trials · Regulated · Current", t: "Clinical Trial Site Activation Platform", one: "Shrinking the time from discovering a site to dosing the first patient.", feature: true,
      p: "", a: "", o: "", c: ["Regulated (GxP)", "Risk management", "Site activation", "CRO client"],
      deep: {
        stats: [["12%", "overall time saved on the path to site activation"], ["30%", "faster documentation with GenAI-assisted PDDs"]],
        visual: "steps:Site discovery,Risks created and tracked,Site activated,Patients dosed",
        context: "For a CRO client, every day a clinical trial is delayed is expensive, and delays can cost millions a day. A large share of that time sits between discovering a site and activating it so patients can actually receive the drug or device. The goal was to shrink that window.",
        role: "Senior Product Owner (Senior Business Consultant at Expleo) on the site-activation stream of the client's clinical-trial programme. I own requirements, backlog readiness, UAT validation and release sign-off.",
        approach: [
          "Helped build a platform to create, manage, track and visualise risks across the site-activation journey, so teams see problems early instead of late.",
          "Covered the core objects teams manage every day, such as studies, sites, contracts and oversight, in one connected view.",
          "Translated complex requirements into compliant PDDs and mRTMs, keeping end-to-end regulatory traceability (GxP, 21 CFR Part 11).",
          "Solutioned system workflows and data flows to bridge business needs and the technical teams building them.",
          "Led backlog grooming and sprint readiness, and used GenAI-assisted Jira ticket and PDD generation to cut documentation turnaround by 30%.",
          "Owned UAT validation and release sign-off, so what shipped matched the business intent."
        ],
        decisions: [],
        outcome: "Around 12% of overall time saved on the path from site discovery to activation. In clinical trials, each day recovered is valuable.",
        metrics: [],
        tags: ["GxP", "21 CFR Part 11", "Risk management", "mRTM", "PDD", "UAT", "GenAI workflows"]
      } },

    { k: "02", tag: "Collaboration · 0→1", t: "All-in-One Collaboration Platform", one: "Took a product from idea to a working platform.",
      p: "Stakeholders had an idea and strategy but needed it turned into executable features.",
      a: "Ran surveys and user interviews to surface pain points, defined scope and resources, and prioritized with MoSCoW and RICE to balance user needs and business goals.",
      o: "Ideation to functional product, with features traced back to researched user pain points.", c: ["User research", "RICE", "MoSCoW", "0→1"] },

    { k: "03", tag: "PropTech ERP · 4+ years", t: "Property Management CRM", one: "13 interconnected apps covering finance, owner management, operations and more.", feature: true,
      p: "Real-estate operations span many departments and end-to-end use cases that have to work as one system.",
      a: "", o: "", c: ["PRDs", "Scrum", "13 apps", "17-person team"],
      deep: {
        stats: [["13", "interconnected apps"], ["17", "person cross-functional team"], ["4+", "years as product manager"]],
        visual: "apps",
        context: "Real-estate operations span many departments (finance, owner management, operations and more) and end-to-end use cases. They had to work as one connected system rather than 13 separate tools.",
        role: "Product Manager for 4+ years. I owned product scope, wireframing, resource management and project management, and managed a cross-functional team of 17.",
        approach: [
          "Defined scope department by department and use case by use case, and wireframed each flow.",
          "Documented requirements in detailed PRDs so development, design and stakeholders worked from the same page.",
          "Joined technical and architecture discussions to keep the platform scalable, robust and low on tech debt.",
          "Ran Agile Scrum to improve team velocity and reduce time to market."
        ],
        decisions: [],   // add real trade-offs here, e.g. { t: "What I cut", d: "..." }
        outcome: "A scalable platform of 13 connected applications supporting real-estate operations end to end, with improved team velocity and reduced time to market.",
        metrics: [],     // add real numbers here, e.g. ["-40% onboarding time"]
        tags: ["PRDs", "Wireframing", "Agile Scrum", "Architecture planning", "Stakeholder management"]
      } },

    { k: "04", tag: "PLM · Market entry", t: "Product Lifecycle Management Platform", one: "Found the market gap, then built the roadmap to fill it.",
      p: "A new PLM offering needed a clear market position and a technically sound foundation.",
      a: "Ran market research to identify gaps, worked with engineering on specs for scalability and security, and built a roadmap aligned to business objectives.",
      o: "Research-backed strategy that fed directly into strategic decisions and the product roadmap.", c: ["Market research", "Roadmap", "Scalability"] },

    { k: "05", tag: "Workforce", t: "Timesheet Management System", one: "Accurate time tracking for a manpower management company.",
      p: "Manual time tracking was inaccurate and inefficient.",
      a: "Owned the end-to-end build: scope, resources, wireframes and delivery.",
      o: "Improved accuracy and efficiency of time tracking.", c: ["Workflow design", "Wireframing"] },

    { k: "06", tag: "Fintech · Lending", t: "Credit Management System", one: "The full loan lifecycle, from application to repayment to legal.", feature: true,
      p: "", a: "", o: "", c: ["Fintech", "Security", "On-time delivery"],
      deep: {
        stats: [["3", "lifecycle stages in one system"], ["On time", "and within budget"]],
        visual: "steps:Application,Repayment,Legal management",
        context: "Lending runs a long chain, from application through repayment to legal management, and every step handles sensitive financial data. It needed to be one system, not three.",
        role: "Product Manager. I owned product scope, wireframing, resource management and project management, and led developers, designers and business analysts.",
        approach: [
          "Treated the entire loan lifecycle as a single product: application, repayment and legal management.",
          "Scoped and wireframed each stage, then sequenced delivery with the developers, designers and business analysts.",
          "Built data-security measures into the design to protect sensitive financial information.",
          "Managed the team to deliver on time and within budget."
        ],
        decisions: [],
        outcome: "A system managing the full loan lifecycle, delivered on time and within budget, with data security built in.",
        metrics: [],
        tags: ["Fintech", "Data security", "Cross-functional leadership", "Lifecycle design"]
      } },

    { k: "07", tag: "Billing", t: "Plan & Subscription Management", one: "Subscription lifecycle and billing, wired to payment gateways.",
      p: "The product needed reliable plan, subscription and billing management.",
      a: "Built the subscription lifecycle and billing system and integrated payment gateways.",
      o: "End-to-end subscription billing live with payment integration.", c: ["Billing", "Payments"] },

    { k: "08", tag: "Capital markets", t: "Capital Trading Platform", one: "Bonds and ETFs, designed with compliance in the room.",
      p: "A trading product had to meet compliance expectations and plug into live market data.",
      a: "Defined scope and wireframes, worked directly with compliance teams, and managed market-data integration.",
      o: "A compliant trading experience for bonds and ETFs.", c: ["Compliance", "Market data", "Fintech"] }
  ]
};
