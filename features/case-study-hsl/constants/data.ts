import type {
  AudienceApproachEntry,
  ColorSwatch,
  DesignThinkingStep,
  EmpathyQuadrant,
  FontSample,
  HeroMeta,
  HeroStat,
  InterviewGroup,
  ModuleScope,
  OutcomeItem,
  RoleItem,
  TextSegment,
  TimelinePhase,
  UserGroup,
} from "@/features/case-study-hsl/types";

export const HERO_TAG = "Public Sector · Enterprise Ecosystem";
export const HERO_TITLE = "Hindustan Shipyard";
export const HERO_SUBTITLE = "Enterprise Digital Experience";

export const HERO_QUOTE =
  "The system already knew every status — but only a person could release it.";

export const HERO_SUMMARY =
  "Five disconnected modules wearing one logo. Applicants applied into silence, vendors waited on email, and HSL's own teams spent their days answering \"where does mine stand?\" by phone. I ran the stakeholder research across every branch and redesigned the ecosystem around a single rule: wherever someone was sending an email to find out where they stood, give them a screen that just tells them.";

export const HERO_METADATA: HeroMeta[] = [
  { label: "Role", value: "UX Researcher & Designer" },
  { label: "Also", value: "Stakeholder POC" },
  { label: "Client", value: "Hindustan Shipyard Ltd." },
  { label: "At", value: "Sweya Infotech" },
  { label: "Timeline", value: "12 weeks" },
  { label: "Year", value: "2024" },
];

export const HERO_STATS: HeroStat[] = [
  { value: "5", label: "Modules unified" },
  { value: "~5", label: "Stakeholders per module" },
  { value: "3", label: "User groups served" },
  { value: "Live", label: "Shipped to production" },
];

export const MODULE_SCOPE: ModuleScope[] = [
  {
    icon: "◈",
    title: "Recruitment / HRMS",
    description:
      "Candidate applications, status visibility, payroll and attendance for internal staff.",
  },
  {
    icon: "◎",
    title: "Tenders",
    description:
      "Live tender listings, requirements, and updates — moved out of email and onto the platform.",
  },
  {
    icon: "⬡",
    title: "Vendor Management",
    description: "Procurement and partnership touchpoints for suppliers working with the shipyard.",
  },
  {
    icon: "✦",
    title: "Vigilance",
    description: "Case raising and follow-up, with compliance-mandated content kept intact.",
  },
  {
    icon: "◇",
    title: "Company Portfolio",
    description: "Capability, projects, and contact routes for clients, partners, and the public.",
  },
  {
    icon: "◐",
    title: "Accessibility",
    description:
      "Treated as a cross-cutting baseline across every module rather than a finishing pass.",
  },
];

export const INTRO_PARAGRAPHS: TextSegment[][] = [
  [
    { text: "Hindustan Shipyard Limited builds and repairs ships for the Indian Navy and commercial fleets. Its digital presence, though, was ", highlight: false },
    { text: "five disconnected systems wearing one logo", highlight: true },
    { text: " — recruitment, tenders, vendor management, vigilance, and the public company portfolio. Whichever one you landed in, the experience ended the same way: ", highlight: false },
    { text: "send an email, then wait", highlight: true },
    { text: ".", highlight: false },
  ],
  [
    { text: "I worked on this at Sweya Infotech as the ", highlight: false },
    { text: "UX researcher and designer", highlight: true },
    { text: ", and as the point of contact for stakeholder management — the person who sat with each module's owners at HSL, worked out what their branch actually needed, and carried it back into design. I ran sessions with ", highlight: false },
    { text: "roughly five stakeholders per module", highlight: true },
    { text: " and turned what they told me into one connected ecosystem, built to a single design language. ", highlight: false },
    { text: "It went live.", highlight: true },
  ],
];

export const POSSIBLE_SOLUTION_DESCRIPTION =
  "The brief arrived as a website redesign. The stakeholder sessions turned it into something else: an ecosystem problem where five modules each expected the user to ask a human for information the system already had. So the redesign was organised around one rule — wherever someone was currently sending an email to find out where they stood, give them a screen that just tells them. That meant a candidate login for recruitment, where an applicant can see their submitted resume and whether they are selected, rejected, or still in process. It meant a tenders dashboard that puts live tenders, requirements, and updates on the site instead of in a mailbox. And it meant carrying the same navigation model, component set, and accessibility standard across HRMS, vendor management, vigilance, and the public portfolio, so that HSL read as one organisation rather than five.";

export const MY_ROLE_SUMMARY =
  "I was the UX researcher and designer on the engagement and the point of contact between our team and HSL. That meant running the discovery sessions with each module's stakeholders, reconciling requirements that often contradicted each other across branches, and owning the work from research through information architecture, flows, and high-fidelity design into engineering handoff.";

export const ROLE_ITEMS: RoleItem[] = [
  "Stakeholder Research",
  "Requirement Discovery",
  "Information Architecture",
  "User Flows & Wireframes",
  "Accessibility",
  "UI & Design System",
].map((label) => ({ label }));

export const PROBLEM_STATEMENT =
  "HSL's platform was outdated and non-responsive, but that was the symptom rather than the problem. The real cost was that none of the five modules could answer a question on its own. A candidate who applied for a job had no way to know whether anyone had opened their application — they applied, and then waited for an email that might never come. A vendor tracking a tender waited on email confirmations and updates rather than checking a status themselves. Internally, that turned HSL's HR and tender teams into a human status API: a meaningful share of their day went to answering phone calls and emails asking some version of 'where does my application/tender stand?' — questions a well-designed screen could have answered instantly. The objective was to redesign the ecosystem so that each audience could self-serve the answer they were currently chasing, on any device, to a standard accessible enough for a public-sector organisation serving the general public.";

export const AUDIENCE_APPROACH_ENTRIES: AudienceApproachEntry[] = [
  {
    id: "audience",
    kind: "list",
    listItems: [
      "Job applicants — applying to HSL and waiting on an outcome (Recruitment)",
      "Vendors and bidders — tracking live tenders and submission requirements (Tenders)",
      "HSL employees — payroll, attendance, internal communication (HRMS)",
      "Vigilance staff and complainants — raising and following up on cases (Vigilance)",
      "Clients, partners and the public — capability, projects, contact (Portfolio)",
    ],
  },
  {
    id: "approach",
    kind: "paragraph",
    paragraph:
      "I worked module by module rather than page by page. For each of the five modules I ran sessions with about five HSL stakeholders — the people who actually operated that branch day to day — and walked their current process step by step: what comes in, who touches it, where it stalls, and what they get asked on the phone. That framing is what surfaced the pattern across every module: the bottleneck was never the page layout, it was that status lived in someone's inbox instead of in the product. From there I mapped a shared information architecture, wireframed the flows that removed the email round-trip, and built out high-fidelity screens on a common component set so five modules could ship as one system. Requirements frequently conflicted between branches, so a large part of the role was reconciling them into one model before anything reached engineering.",
  },
];

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    phase: "UX Design",
    weeks: "Weeks 1–8",
    share: 67,
    steps: [
      "Strategy and research planning across the five modules",
      "Stakeholder sessions, empathy mapping, and user journey mapping",
      "Problem statement and goal statement, reframed around status visibility",
      "Competitive analysis and a shared information architecture",
    ],
  },
  {
    phase: "UI Design",
    weeks: "Weeks 9–12",
    share: 33,
    steps: [
      "Paper wireframes for the candidate and tender flows",
      "Visual design and prototyping on a common component set",
      "Usability checks and stakeholder review before handoff",
    ],
  },
];

export const QUALITATIVE_RESEARCH_SUMMARY =
  "Research here was stakeholder-led rather than survey-led. HSL is a public-sector shipyard, and the people who understood each workflow were the branch teams operating it — so instead of a broad user survey, I ran working sessions with roughly five stakeholders per module across recruitment, tenders, vendor management, vigilance, and the public portfolio. Each session was a walkthrough of the current process in their own words: what arrives, who handles it, where it waits, and which questions they end up answering by phone or email. Reconstructing those workflows out loud is what exposed the shared failure across modules — the system held the status, but only a person could release it.";

export const INTERVIEW_GROUPS: InterviewGroup[] = [
  {
    title: "Recruitment & HRMS teams",
    questions: [
      "Walk me through what happens from the moment a candidate submits an application to the moment they hear back.",
      "What do candidates call or email you to ask, and how often?",
      "At which point in the process does an application sit the longest, and who is waiting on whom?",
      "What would a candidate need to see on screen for that call not to happen?",
    ],
  },
  {
    title: "Tenders & vendor teams",
    questions: [
      "How does a vendor currently find out that a tender is live, and how do they learn when something about it changes?",
      "What information do you end up re-sending by email that already exists somewhere?",
      "Which parts of the tender process do vendors most often get wrong or misunderstand?",
      "If a vendor could check one screen instead of contacting you, what would need to be on it?",
    ],
  },
  {
    title: "Vigilance & public portfolio owners",
    questions: [
      "Who visits this section, and what are they trying to accomplish before they leave?",
      "What information are you obliged to publish, and what currently makes that hard to keep current?",
      "Where do people get stuck or contact the wrong department entirely?",
      "What has to stay exactly as it is for compliance reasons, and what is genuinely open to redesign?",
    ],
  },
];

export const KEY_INSIGHTS_FROM_RESEARCH: string[] = [
  "Applying to HSL was a black box. A candidate submitted an application and then had no signal of any kind — no acknowledgement, no stage, no outcome — until an email arrived, if one arrived. The anxiety wasn't caused by a slow process; it was caused by an invisible one. This became the single clearest design mandate in the project.",
  "Tender information lived in inboxes rather than on the platform. Vendors depended on email confirmations and updates to know where a tender stood, which meant the authoritative source of truth was a message thread — impossible to search, easy to miss, and inconsistent between recipients.",
  "HSL staff were being used as a status lookup. Across both recruitment and tenders, teams described spending a significant part of the day answering 'where does mine stand?' calls. That is a design problem showing up as a staffing cost — every one of those calls represented information the system had but never surfaced.",
  "Five modules meant five mental models. Recruitment, tenders, vendor management, vigilance, and the portfolio had each grown separately, with different navigation logic and terminology. Users crossing between them effectively had to relearn the site, and internal teams had no shared vocabulary to hand over between branches.",
  "Accessibility could not be a finishing pass. As a public-sector organisation serving applicants, vendors, and the general public across a wide range of devices and connection quality, HSL needed accessibility and mobile responsiveness treated as a baseline requirement across every module rather than as a polish item at the end of UI.",
];

export const EMPATHY_MAP: EmpathyQuadrant[] = [
  {
    title: "Says",
    items: [
      "Has anyone actually looked at my application?",
      "Can I see the tender documents without waiting for the mail?",
      "I just need to know which department handles this.",
    ],
  },
  {
    title: "Thinks",
    items: [
      "Is this information current, or is it last year's?",
      "Did my submission even go through?",
      "Will I be told if something changes, or do I have to keep checking?",
    ],
  },
  {
    title: "Does",
    items: [
      "Applies for a job opening, then waits with no confirmation.",
      "Calls or emails the office to ask for a status update.",
      "Re-checks the tenders page repeatedly for changes.",
      "Logs in to the employee portal for payroll or attendance.",
    ],
  },
  {
    title: "Feels",
    items: [
      "Anxious after applying, because silence is indistinguishable from rejection.",
      "Frustrated at having to phone a person to retrieve a fact.",
      "Reassured when a status is visible without asking anyone.",
      "Confident in the organisation when the platform looks and behaves current.",
    ],
  },
];

export const DESIGN_THINKING_STEPS: DesignThinkingStep[] = [
  {
    title: "Empathize",
    items: ["Stakeholder Sessions", "Workflow Walkthroughs", "Competitive Analysis"],
  },
  {
    title: "Define",
    items: ["User Groups", "Journey Mapping", "Goal Statement", "Empathy Map"],
  },
  {
    title: "Ideate",
    items: ["Brainstorming", "Card Sorting", "User Flows"],
  },
  {
    title: "Design",
    items: ["Paper Wireframes", "Visual Design", "Prototype"],
  },
  {
    title: "Test",
    items: ["Usability Checks", "Stakeholder Review", "Improvements"],
  },
];

export const DESIGN_THINKING_INTRO =
  "Five modules, five sets of stakeholders, and a brief that changed shape once research started — the process below is how that stayed manageable. The value wasn't the framework itself; it was that Empathize and Define ran long enough to reveal that this was a status-visibility problem rather than a visual one. Everything after that point was comparatively cheap, because the team was solving the right thing.";

export const USER_GROUPS: UserGroup[] = [
  {
    id: "applicants",
    name: "Job Applicants",
    module: "Recruitment / HRMS",
    summary:
      "Engineers and staff applying to HSL. They submit an application into a process with no visible stages, and then have no way to distinguish 'still under review' from 'never opened' from 'rejected'. Every follow-up requires contacting HSL directly.",
    sections: [
      {
        title: "Frustrations",
        items: [
          "No acknowledgement or reference after submitting an application.",
          "No visibility into whether the application has been reviewed.",
          "Outcomes communicated only by email, with no fallback if it is missed.",
        ],
      },
      {
        title: "Goals",
        items: [
          "Find and apply for relevant openings without ambiguity about what was submitted.",
          "Know the current stage of the application at any time.",
          "Understand the recruitment process and what happens next.",
        ],
      },
      {
        title: "What I designed",
        items: [
          "A candidate login where the submitted resume is visible on record.",
          "An explicit application status — selected, rejected, or in process — surfaced on the candidate's own dashboard.",
          "Status shown in the product rather than delivered only as an email, so a missed message is no longer a dead end.",
        ],
      },
    ],
  },
  {
    id: "vendors",
    name: "Vendors & Bidders",
    module: "Tenders / Vendor Management",
    summary:
      "Suppliers and contractors bidding for HSL work. Their view of a live tender depended on email — confirmations, documents, and updates all arrived in a thread, which made the mailbox the de facto system of record and put the burden of chasing changes on the vendor.",
    sections: [
      {
        title: "Frustrations",
        items: [
          "Tender details and updates arriving only by email, with no authoritative page to check.",
          "No way to confirm a submission was received without contacting the tender cell.",
          "Repeatedly re-checking the site for changes that were never announced there.",
        ],
      },
      {
        title: "Goals",
        items: [
          "See all live tenders and their requirements in one place.",
          "Confirm submission and current standing without making a phone call.",
          "Be confident the information on screen is the current version.",
        ],
      },
      {
        title: "What I designed",
        items: [
          "A tenders dashboard holding live tenders, requirements, and updates on the platform itself.",
          "Details surfaced on screen rather than distributed by email, so the site becomes the source of truth.",
          "A consistent structure across tenders so vendors stop relearning each listing.",
        ],
      },
    ],
  },
  {
    id: "internal",
    name: "HSL Internal Teams",
    module: "HR, Tender Cell, Vigilance",
    summary:
      "The branch teams operating each module. Because status was invisible to everyone outside the building, these teams absorbed the gap personally — fielding the calls and emails asking where an application or tender stood, and re-sending information that already existed.",
    sections: [
      {
        title: "Frustrations",
        items: [
          "A recurring share of the working day spent answering status questions by phone and email.",
          "Manually re-sending information the system already held.",
          "Each branch running its own terminology and process, with nothing shared between modules.",
        ],
      },
      {
        title: "Goals",
        items: [
          "Stop being the lookup mechanism for information the platform already has.",
          "Publish once and have it stay current for every audience.",
          "Keep compliance-mandated content intact while modernising everything around it.",
        ],
      },
      {
        title: "What I designed",
        items: [
          "Self-service status for applicants and vendors, removing the most common inbound question at its source.",
          "A shared navigation model and component set so five modules behave as one system.",
          "Accessibility and mobile responsiveness applied as a baseline across modules, not retrofitted per branch.",
        ],
      },
    ],
  },
];

export const OUTCOME_INTRO =
  "The redesigned ecosystem went live. The clearest signal of impact came from the teams who had been absorbing the problem: with candidate status and tender information now published in the product, HR and the tender cell reported a noticeable drop in inbound status calls — the work that had been done by phone was now being done by the interface.";

export const OUTCOMES: OutcomeItem[] = [
  {
    title: "Shipped to production",
    description:
      "The redesign went live across the modules in scope, rather than ending as a prototype or a pitch deck.",
  },
  {
    title: "Fewer status calls to HR and tenders",
    description:
      "Both teams reported reduced inbound calls and emails once applicants and vendors could check their own status. The support burden moved from people to the product.",
  },
  {
    title: "Applying is no longer a black box",
    description:
      "Candidates can log in and see their submitted resume and whether they are selected, rejected, or in process — replacing an indefinite wait for an email.",
  },
  {
    title: "Tender information left the inbox",
    description:
      "Live tenders, requirements, and updates moved onto the platform, making the site the authoritative source instead of a mail thread.",
  },
  {
    title: "Five modules, one system",
    description:
      "A shared IA, component set, and accessibility baseline across recruitment, tenders, vendor management, vigilance, and the public portfolio.",
  },
];

export const REFLECTION_POINTS: string[] = [
  "The brief was a website redesign; the problem was status visibility. Had I designed to the brief as written, HSL would have received a better-looking version of the same bottleneck. The stakeholder walkthroughs — asking what people get asked on the phone — are what reframed it, and that question is now the first one I ask on any operational product.",
  "Being the stakeholder point of contact was the harder half of the job. Five branches had five sets of requirements that regularly contradicted each other, and most of the design work was reconciling them into one model before a single screen reached engineering.",
  "What I would do differently: I did not instrument the launch. I have the qualitative signal from HR and the tender cell, but not the numbers behind it — call volume before and after, application-status page usage, drop-off in the tender flow. On later work I define those measures during design rather than hoping to reconstruct them afterwards.",
];

export const FONT_SAMPLES: FontSample[] = [
  { label: "Bold", text: "Noto Sans", weightClassName: "font-bold" },
  { label: "Regular", text: "Noto Sans", weightClassName: "font-normal" },
  { label: "Medium", text: "Noto Sans", weightClassName: "font-medium" },
  { label: "Light", text: "Noto Sans", weightClassName: "font-light" },
];

export const FONT_NAME = "Noto Sans";

export const FONT_DESCRIPTION =
  "A neutral, highly legible sans-serif chosen for reach rather than personality. HSL's platform has to work for applicants, vendors, and the general public across a wide range of devices and screen sizes, so the priority was clarity at small sizes and a full weight range to carry hierarchy through dense content like tender listings and HR records — without the typeface itself competing for attention.";

export const COLOR_SWATCHES: ColorSwatch[] = [
  { title: "Primary Color", value: "#2947a3" },
  { title: "Secondary Color", value: "#fff3f4" },
  { title: "Text Color", value: "#150202" },
  { title: "Text Color", value: "#595959" },
  { title: "Bg Color", value: "#f3f3f3" },
];
