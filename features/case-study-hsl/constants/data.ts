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
export const HERO_SUBTITLE = "Unified Public Sector Portal";

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
    { text: "Hindustan Shipyard Limited builds and repairs ships for the Indian Navy and commercial fleets. Its digital presence was ", highlight: false },
    { text: "five disconnected systems wearing one logo", highlight: true },
    { text: " — recruitment, tenders, vendor management, vigilance and the public portfolio. Whichever one you landed in, it ended the same way: ", highlight: false },
    { text: "send an email, then wait", highlight: true },
    { text: ".", highlight: false },
  ],
  [
    { text: "I worked on this at Sweya Infotech as ", highlight: false },
    { text: "UX researcher, designer and stakeholder point of contact", highlight: true },
    { text: " — the person who sat with each module's owners, worked out what their branch needed, and carried it back into design. ", highlight: false },
    { text: "It went live.", highlight: true },
  ],
];

export const POSSIBLE_SOLUTION_DESCRIPTION =
  "The brief arrived as a website redesign. The stakeholder sessions turned it into an ecosystem problem, and the redesign was organised around one rule — wherever someone was emailing to find out where they stood, give them a screen that tells them. That meant a candidate login showing the submitted resume and whether the application is selected, rejected or in process; a tenders dashboard putting live tenders, requirements and updates on the site instead of in a mailbox; and one navigation model, component set and accessibility standard across all five modules, so HSL reads as one organisation.";

export const MY_ROLE_SUMMARY =
  "Sole UX researcher and designer, and the stakeholder point of contact across all five modules — research, information architecture, wireframes, high-fidelity screens and the shared component set.";

export const ROLE_ITEMS: RoleItem[] = [
  "Stakeholder Research",
  "Requirement Discovery",
  "Information Architecture",
  "User Flows & Wireframes",
  "Accessibility",
  "UI & Design System",
].map((label) => ({ label }));

export const PROBLEM_STATEMENT =
  "The platform was outdated and non-responsive, but that was the symptom. The problem was that none of the five modules could answer a question on its own. A candidate had no way to know whether anyone had opened their application. A vendor waited on email rather than checking a status. Internally that turned HR and the tender cell into a human status API, answering by phone what a screen could have answered instantly. The objective: let each audience self-serve the answer they were chasing, on any device, to a standard accessible enough for a public-sector organisation serving the general public.";

export const AUDIENCE_APPROACH_ENTRIES: AudienceApproachEntry[] = [
  {
    id: "audience",
    kind: "list",
    listItems: [
      "Job applicants — applying and waiting on an outcome (Recruitment)",
      "Vendors and bidders — tracking live tenders and requirements (Tenders)",
      "HSL employees — payroll, attendance, internal comms (HRMS)",
      "Vigilance staff and complainants — raising and following up cases (Vigilance)",
      "Clients, partners and the public — capability, projects, contact (Portfolio)",
    ],
  },
  {
    id: "approach",
    kind: "paragraph",
    paragraph:
      "I worked module by module rather than page by page, walking each branch through its current process step by step. From there I mapped a shared information architecture, wireframed the flows that removed the email round-trip, and built high-fidelity screens on a common component set so five modules could ship as one system. Requirements frequently conflicted between branches, so much of the role was reconciling them into one model before anything reached engineering.",
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
  "Research here was stakeholder-led rather than survey-led: the people who understood each workflow were the branch teams operating it. Each session was a walkthrough of the current process in their own words — what arrives, who handles it, where it waits, and which questions they end up answering by phone. Reconstructing those workflows out loud is what exposed the failure shared across every module: the system held the status, but only a person could release it.";

export const INTERVIEW_GROUPS: InterviewGroup[] = [
  {
    title: "Recruitment & HRMS teams",
    questions: [
      "Walk me through what happens from application submitted to candidate informed.",
      "What do candidates call to ask, and how often?",
      "Where does an application sit longest, and who is waiting on whom?",
      "What would a candidate need on screen for that call not to happen?",
    ],
  },
  {
    title: "Tenders & vendor teams",
    questions: [
      "How does a vendor find out a tender is live, and that something changed?",
      "What do you re-send by email that already exists somewhere?",
      "How does a vendor confirm you received their submission?",
      "Which questions could a page answer instead of you?",
    ],
  },
  {
    title: "Vigilance & portfolio owners",
    questions: [
      "What has to stay exactly as it is for compliance?",
      "Who reads this module, and what are they trying to find?",
      "Where does your terminology differ from the other branches?",
    ],
  },
];

export const KEY_INSIGHTS_FROM_RESEARCH: string[] = [
  "Applying was a black box. A candidate submitted, then got no signal of any kind — no acknowledgement, no stage, no outcome — until an email arrived, if one arrived. The anxiety came from an invisible process, not a slow one. This became the clearest design mandate in the project.",
  "Tender information lived in inboxes rather than on the platform, which made the authoritative record a message thread: impossible to search, easy to miss, inconsistent between recipients.",
  "Staff were being used as a status lookup. Teams described spending a significant part of the day on \"where does mine stand?\" calls — a design problem showing up as a staffing cost.",
  "Five modules meant five mental models. Each had grown separately, with its own navigation logic and terminology, so users crossing between them had to relearn the site.",
  "Accessibility could not be a finishing pass. A public-sector body serving applicants, vendors and the general public across a wide range of devices and connections has to start there.",
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
      "Engineers and staff applying to HSL. They submit into a process with no visible stages, and cannot tell \"still under review\" from \"never opened\" from \"rejected\". Every follow-up means contacting HSL directly.",
    sections: [
      {
        title: "Frustrations",
        items: [
          "No acknowledgement or reference after submitting.",
          "No visibility into whether the application was reviewed.",
          "Outcomes by email only, with no fallback if it is missed.",
        ],
      },
      {
        title: "Goals",
        items: [
          "Apply without ambiguity about what was submitted.",
          "Know the current stage at any time.",
          "Understand what happens next.",
        ],
      },
      {
        title: "What I designed",
        items: [
          "A candidate login with the submitted resume on record.",
          "Explicit status — selected, rejected or in process — on the candidate's own dashboard.",
          "Status in the product, not only in an email, so a missed message is not a dead end.",
        ],
      },
    ],
  },
  {
    id: "vendors",
    name: "Vendors & Bidders",
    module: "Tenders / Vendor Management",
    summary:
      "Suppliers and contractors bidding for HSL work. Confirmations, documents and updates all arrived in an email thread, which made the mailbox the system of record and put the burden of chasing changes on the vendor.",
    sections: [
      {
        title: "Frustrations",
        items: [
          "Tender updates by email, with no authoritative page to check.",
          "No way to confirm a submission without calling the tender cell.",
          "Re-checking the site for changes never announced there.",
        ],
      },
      {
        title: "Goals",
        items: [
          "See all live tenders and requirements in one place.",
          "Confirm submission and standing without a phone call.",
          "Trust that what is on screen is current.",
        ],
      },
      {
        title: "What I designed",
        items: [
          "A tenders dashboard holding live tenders, requirements and updates on the platform.",
          "Details on screen rather than distributed by email, making the site the source of truth.",
          "One consistent structure, so vendors stop relearning each listing.",
        ],
      },
    ],
  },
  {
    id: "internal",
    name: "HSL Internal Teams",
    module: "HR, Tender Cell, Vigilance",
    summary:
      "The branch teams operating each module. Because status was invisible outside the building, they absorbed the gap personally — fielding the calls and re-sending information the system already held.",
    sections: [
      {
        title: "Frustrations",
        items: [
          "A recurring share of the day spent answering status questions.",
          "Manually re-sending information the system already held.",
          "Each branch running its own terminology and process.",
        ],
      },
      {
        title: "Goals",
        items: [
          "Stop being the lookup mechanism for what the platform already has.",
          "Publish once and have it stay current for every audience.",
          "Keep compliance-mandated content intact while modernising around it.",
        ],
      },
      {
        title: "What I designed",
        items: [
          "Shared navigation and components, so five branches ship as one system.",
          "Status surfaced to the audience that needs it, removing the round-trip.",
          "One vocabulary across modules, agreed with the branches first.",
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
