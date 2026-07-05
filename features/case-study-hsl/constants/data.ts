import type {
  AudienceApproachEntry,
  ColorSwatch,
  DesignThinkingStep,
  EmpathyQuadrant,
  FontSample,
  InterviewGroup,
  Persona,
  RoleItem,
  TextSegment,
  TimelineCard,
} from "@/features/case-study-hsl/types";

export const INTRO_PARAGRAPHS: TextSegment[][] = [
  [
    {
      text: "Product design is a dynamic and multifaceted discipline that blends aesthetics, functionality, and innovation to ",
      highlight: false,
    },
    { text: "create products", highlight: true },
    { text: " that enhance users' lives and experiences. Through a meticulous process of ", highlight: false },
    { text: "research", highlight: true },
    { text: ", ", highlight: false },
    { text: "ideation", highlight: true },
    { text: ", ", highlight: false },
    { text: "prototyping", highlight: true },
    { text: ", and ", highlight: false },
    { text: "iteration", highlight: true },
    {
      text: ", product designers transform concepts into tangible ",
      highlight: false,
    },
    { text: "solutions", highlight: true },
    { text: ", addressing both practical needs and emotional desires.", highlight: false },
  ],
  [
    { text: "Striking a delicate balance between ", highlight: false },
    { text: "form", highlight: true },
    { text: " and ", highlight: false },
    { text: "function", highlight: true },
    {
      text: ", product design continually evolves to adapt to emerging technologies, societal trends, and user preferences, ",
      highlight: false,
    },
    { text: "shaping the way", highlight: true },
    { text: " we interact with the world around us and defining the landscape of our everyday lives.", highlight: false },
  ],
];

export const POSSIBLE_SOLUTION_DESCRIPTION =
  "To address the challenges faced by Hindusthan Shipyard Limited (HSL), the website redesign will focus on creating a modern and visually appealing design that aligns with the company's brand identity, simplifying the navigation structure to enhance user experience, and ensuring full mobile responsiveness to cater to all device users. This includes reorganizing content to make important information easily accessible, integrating a search functionality for quick information retrieval, and conducting thorough usability testing to refine the design based on user feedback. By implementing these solutions, the redesigned website will improve user engagement, reduce bounce rates, and effectively communicate HSL's capabilities and services to its stakeholders.";

export const ROLE_ITEMS: RoleItem[] = [
  "Design Strategy",
  "Problem Solution",
  "Information Architecture",
  "Empathy Mapping",
  "Usability Testing",
  "User Flow",
  "Prototyping",
  "Wireframes",
  "Competitive Analysis",
  "Visual Design",
  "User Research",
  "User Persona",
].map((label) => ({ label }));

export const PROBLEM_STATEMENT =
  "Hindusthan Shipyard Limited (HSL) faced significant issues with its outdated and non-responsive website, which failed to reflect the company's modern capabilities and hindered user engagement. Users struggled with poor navigation and inefficient content organization, making it difficult to access crucial information quickly. Additionally, the lack of mobile optimization led to a subpar experience for users on smartphones and tablets. These problems collectively resulted in low user satisfaction and engagement, adversely affecting HSL's ability to effectively communicate with its stakeholders and showcase its services. The objective is to redesign the website to create a modern, user-friendly, and mobile-responsive platform that enhances user experience and effectively represents HSL's brand and services.";

export const AUDIENCE_APPROACH_ENTRIES: AudienceApproachEntry[] = [
  {
    id: "audience",
    heading: [
      { text: "Target", accent: false },
      { text: " Audience", accent: true },
    ],
    pillWidth: 374,
    imageSrc: "/figmaAssets/undraw-target-re-fi8j-1.svg",
    imageAlt: "Illustration representing target audience",
    imageFirstOnMobile: false,
    kind: "list",
    listItems: [
      "Potential Clients and Customers:",
      "Industry Partners and Suppliers",
      "Employees and Job Seekers",
      "Investors and Stakeholders",
      "Government and Regulatory Bodies",
      "Media and Press",
      "General Public and Community",
    ],
  },
  {
    id: "approach",
    heading: [
      { text: "The", accent: false },
      { text: " Approach", accent: true },
    ],
    pillWidth: 283,
    imageSrc: "/figmaAssets/undraw-logic-re-nyb4-1.svg",
    imageAlt: "Illustration representing a logical approach",
    imageFirstOnMobile: true,
    kind: "paragraph",
    paragraph:
      "For the Hindusthan Shipyard Limited (HSL) project, the approach will involve conducting comprehensive design research to understand the needs of various stakeholders, including clients, partners, employees, investors, and the general public. We will start with user surveys and usability testing on the current website to identify pain points and areas for improvement. Based on these insights, we'll create wireframes and high-fidelity prototypes focusing on a modern, intuitive design that enhances navigation and accessibility. Ensuring full mobile responsiveness, we will implement a streamlined content organization and robust search functionality. The design will undergo multiple iterations based on user feedback to ensure optimal usability and satisfaction, ultimately delivering a website that effectively represents HSL's brand and services while meeting the needs of its diverse audience.",
  },
];

const TIMELINE_TITLE_LG = "text-[32px] font-medium text-[#212121] font-body";
const TIMELINE_TITLE_SM = "text-[22px] leading-[28px] font-medium text-[#212121] font-body";

export const TIMELINE_WEEKS = Array.from({ length: 12 }, (_, i) => `${i + 1}${["st", "nd", "rd"][i] ?? "th"}`);

export const TIMELINE_CARDS: TimelineCard[] = [
  { title: "UX Design", color: "#ff66c4", colStart: 1, colSpan: 8, rowStart: 1, fontSizeClass: TIMELINE_TITLE_LG },
  { title: "UI Design", color: "#ff66c4", colStart: 9, colSpan: 4, rowStart: 1, fontSizeClass: TIMELINE_TITLE_LG },
  { title: "Strategy\n(Research)", color: "#a882fd", colStart: 1, colSpan: 2, rowStart: 2, fontSizeClass: TIMELINE_TITLE_SM },
  { title: "Paper\nWireframes", color: "#a882fd", colStart: 9, colSpan: 2, rowStart: 2, fontSizeClass: TIMELINE_TITLE_SM },
  { title: "Interview, Empathy Map,\nUser Journey Map", color: "#a882fd", colStart: 2, colSpan: 3, rowStart: 3, fontSizeClass: TIMELINE_TITLE_SM },
  { title: "Visual Design\n& Prototyping", color: "#a882fd", colStart: 9, colSpan: 2, rowStart: 3, fontSizeClass: TIMELINE_TITLE_SM },
  { title: "Problem Statement &\nGoal Statement", color: "#a882fd", colStart: 4, colSpan: 3, rowStart: 4, fontSizeClass: TIMELINE_TITLE_SM },
  { title: "Usability\nTesting Phase", color: "#a882fd", colStart: 11, colSpan: 2, rowStart: 4, fontSizeClass: TIMELINE_TITLE_SM },
  { title: "Competitive Analysis &\nInformation Architecture", color: "#a882fd", colStart: 5, colSpan: 3, rowStart: 5, fontSizeClass: TIMELINE_TITLE_SM },
];

export const QUALITATIVE_RESEARCH_SUMMARY =
  "Qualitative research for Hindusthan Shipyard Limited (HSL) involves conducting in-depth interviews, focus groups, observational studies, and usability tests to gain deep insights into stakeholder perceptions, behaviors, and needs related to the current website and its redesign. By exploring user experiences, preferences, and challenges through open-ended questions and direct observations, the research aims to uncover nuanced insights that inform a user-centered approach to improving website navigation, content accessibility, visual design, and overall user experience.";

export const INTERVIEW_GROUPS: InterviewGroup[] = [
  {
    title: "For Vendors",
    questions: [
      "How do you currently engage with HSL regarding procurement and partnership opportunities?",
      "What information or resources do you typically seek on the HSL website when considering collaboration?",
      "What are the key factors that influence your decision to partner with a shipyard like HSL?",
      "In what ways could the HSL website better facilitate communication and information exchange between suppliers and the shipyard?",
      "What improvements would you suggest to enhance the procurement process and transparency on the website?",
    ],
  },
  {
    title: "For Employees",
    questions: [
      "How would you describe the current effectiveness of the HSL website in communicating the company's capabilities and services?",
      "What feedback have you received from clients, partners, or other stakeholders regarding their experience with the website?",
      "Are there specific areas of the website's navigation or content organization that you believe could be improved?",
      "How does the website currently support internal processes such as HR communications, news updates, or corporate announcements?",
      "From your perspective, what are the key goals or objectives that the redesigned website should achieve?",
    ],
  },
  {
    title: "General Questions",
    questions: [
      "How often do you visit the HSL website, and for what specific purposes?",
      "What do you find most valuable about the current website, and what aspects do you find least helpful?",
      "Can you share a recent positive or negative experience you had while navigating or using the HSL website?",
      "How does the website compare to competitors or industry standards in terms of usability, design, and content?",
      "What suggestions or recommendations would you have for improving the overall user experience on the HSL website?",
    ],
  },
];

export const KEY_INSIGHTS_FROM_RESEARCH: string[] = [
  "Navigation Complexity: Users frequently encounter challenges with the current website's navigation, finding it complex and difficult to locate specific information such as services offered, project details, and contact information. Simplifying and streamlining navigation emerged as a top priority.",
  "Mobile Usability: Mobile users, including clients and vendors, face significant usability issues due to the website's lack of responsiveness and slow loading times on mobile devices. Enhancing mobile optimization is essential to improve accessibility and user experience across all devices.",
  "Content Accessibility: Stakeholders expressed a need for clearer and more organized content presentation. Important information is currently buried deep within the site, making it hard for users to find relevant details quickly. A structured and searchable content layout is essential for facilitating efficient information retrieval.",
  "Visual Design and Brand Representation: The outdated visual design of the current website does not align with HSL's modern capabilities and industry standards. Stakeholders emphasized the importance of a visually appealing and professional design that reflects HSL's brand identity as a leading shipyard.",
  "Communication Effectiveness: There is a strong consensus among stakeholders regarding the need for improved communication channels and transparency on the website. Clear and accessible contact information, along with responsive communication channels, are critical for fostering trust and facilitating business interactions.",
  "User Engagement and Interaction: Stakeholders value interactive elements and engaging features that enhance user experience and encourage exploration of the website. Incorporating interactive tools, client testimonials, and multimedia content can significantly enhance user engagement and satisfaction.",
];

export const EMPATHY_MAP: EmpathyQuadrant[] = [
  {
    title: "Says",
    items: [
      "I need easy access to tender details.",
      "How can I track my application?",
      "I want to connect with the right department quickly.",
    ],
  },
  {
    title: "Thinks",
    items: [
      "Is this information reliable and up-to-date?",
      "Is this process secure?",
      "Will I get timely updates on my application or tender?",
    ],
  },
  {
    title: "Does",
    items: [
      "Logs in to the employee portal for payroll or attendance tracking.",
      "Searches for current tenders.",
      "Applies for a job opening.",
      'Uses the "Contact Us" feature to ask a question or report an issue.',
    ],
  },
  {
    title: "Feels",
    items: [
      "Feels confused if the navigation isn't intuitive.",
      "Feels frustrated if there's no clear status tracking for tenders or job applications.",
      "Feels relieved when support is easily accessible.",
      "Feels satisfied when tasks are completed smoothly and promptly.",
    ],
  },
];

export const DESIGN_THINKING_STEPS: DesignThinkingStep[] = [
  {
    title: "Emphatize",
    iconSrc: "/figmaAssets/carbon-text-link-analysis.svg",
    iconAlt: "Research icon",
    connectorSrc: "/figmaAssets/group-387.png",
    items: ["User Research", "User Interview", "Entrant Analysis"],
  },
  {
    title: "Define",
    iconSrc: "/figmaAssets/fluent-calendar-search-16-regular.svg",
    iconAlt: "Definition icon",
    connectorSrc: "/figmaAssets/group-419.png",
    items: ["User Persona", "User Jouney Map", "Goal Statement", "Empathy Map"],
  },
  {
    title: "Ideate",
    iconSrc: "/figmaAssets/icons8-idea.svg",
    iconAlt: "Idea icon",
    connectorSrc: "/figmaAssets/group-420.png",
    items: ["Brainstorming", "Card Sorting", "User Flow"],
  },
  {
    title: "Design",
    iconSrc: "/figmaAssets/fluent-design-ideas-16-regular.svg",
    iconAlt: "Design icon",
    connectorSrc: "/figmaAssets/group-421.png",
    items: ["Paper Wireframes", "Visual Design", "Prototype"],
  },
  {
    title: "Test",
    iconSrc: "/figmaAssets/file-icons-testcafe.svg",
    iconAlt: "Testing icon",
    connectorSrc: null,
    items: ["CheckUsability", "Survey Insight", "Improvements"],
  },
];

export const DESIGN_THINKING_INTRO =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const PERSONAS: Persona[] = [
  {
    id: "persona-1",
    title: "User Persona 1",
    imageSrc: "/figmaAssets/ellipse-58.png",
    imageAlt: "Portrait of Rakesh Sharma",
    details: [
      { label: "Name", value: "Rakesh Sharma" },
      { label: "Age", value: "39" },
      { label: "Occupation", value: "Business Owner (Engineering Supplies)" },
      { label: "Location", value: "Mumbai, India" },
    ],
    story:
      "Rakesh Sharma, a successful business owner from Mumbai, is eager to expand his engineering supplies company by securing tenders with Hindustan Shipyard Limited (HSL). However, he struggles with the HSL website's complex navigation, slow tender updates, and unclear submission processes. Rakesh's primary goal is to streamline the bidding process, allowing him to efficiently manage tenders and track their progress in real time. Winning more contracts with HSL would significantly grow his business, and he is motivated by the prospect of more efficient tender management.",
    sections: [
      {
        title: "Goals",
        items: [
          "Successfully bid for tenders on the HSL website.",
          "Easily track the status of submitted tenders.",
          "Receive timely notifications about new tenders and bidding deadlines.",
        ],
      },
      {
        title: "Frustrations",
        items: [
          "Difficulty in finding current tenders quickly.",
          "Lack of clear, real-time updates on tender status.",
          "Complicated documentation upload process during tender submission.",
        ],
      },
      {
        title: "Needs",
        items: [
          "A simplified tender submission process.",
          "Clear guidelines and step-by-step instructions for bid submission.",
          "Easy access to tender history and updates.",
        ],
      },
      {
        title: "Motivations",
        items: [
          "Expanding his business by securing large-scale contracts.",
          "Ensuring that his company stays competitive in the industry.",
          "Winning more tenders efficiently without wasting time on administrative tasks.",
        ],
      },
    ],
  },
  {
    id: "persona-2",
    title: "User Persona 2",
    imageSrc: "/figmaAssets/ellipse-91.png",
    imageAlt: "Portrait of Meera Patel",
    details: [
      { label: "Name", value: "Meera Patel" },
      { label: "Age", value: "27" },
      { label: "Occupation", value: "Mechanical Engineer" },
      { label: "Location", value: "Visakhapatnam, India" },
    ],
    story:
      "Meera Patel, a mechanical engineer from Visakhapatnam, is keen to secure a job at Hindustan Shipyard Limited (HSL) but finds the application process difficult to navigate. The website's recruitment section is confusing, and the lack of communication after submitting her application leaves her anxious. Meera's goal is to land a stable engineering job, but she feels disconnected and frustrated by the unclear process. She wishes for a more transparent and responsive system that keeps candidates informed at every step, motivating her to pursue her career aspirations.",
    sections: [
      {
        title: "Goals",
        items: [
          "Find and apply for relevant job openings at HSL.",
          "Track the status of her job application.",
          "Understand the company's recruitment process and timelines.",
        ],
      },
      {
        title: "Frustrations",
        items: [
          "Difficulty navigating the recruitment section of the website.",
          "Lack of clear information on the status of her job application.",
          "Slow response times to inquiries regarding her application.",
        ],
      },
      {
        title: "Needs",
        items: [
          "A user-friendly application process with all steps clearly outlined.",
          "Immediate acknowledgment and regular updates after submitting an application.",
          "Easy access to FAQs or contact information for recruitment-related queries.",
        ],
      },
      {
        title: "Motivations",
        items: [
          "Securing a stable and well-paying job in a reputed organization.",
          "Finding a job that aligns with her engineering background.",
          "Receiving prompt communication and updates to reduce anxiety about her application status.",
        ],
      },
    ],
  },
];

export const FONT_SAMPLES: FontSample[] = [
  { label: "Bold", text: "Nato Sans", weightClassName: "font-bold" },
  { label: "Regular", text: "Nato SansG", weightClassName: "font-normal" },
  { label: "Medium", text: "Nato Sans", weightClassName: "font-medium" },
  { label: "Light", text: "Nato Sans", weightClassName: "font-light" },
];

export const FONT_DESCRIPTION =
  "font is a elegant and modern sans serif font. It is very neat and clean. It have more readability and variety of options. That's why I used this font.";

export const COLOR_SWATCHES: ColorSwatch[] = [
  { title: "Primary Color", value: "#2947a3" },
  { title: "Secondary Color", value: "#fff3f4" },
  { title: "Text Color", value: "#150202" },
  { title: "Text Color", value: "#595959" },
  { title: "Bg Color", value: "#f3f3f3" },
];
