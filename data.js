/* ==========================================================================
   Naveen Kumar, Portfolio
   data.js, the single source of truth for all site content
   --------------------------------------------------------------------------
   Everything on the homepage, every case study and the whole sidequests
   gallery is rendered from this file. To add a project or a photo, add an
   entry here and (if it has media) drop the files into assets/.
   See README.md for step-by-step instructions.

   Conventions
   - Text supports **bold** spans (rendered safely, never raw HTML).
   - Any field set to null is treated as "no data" and simply not rendered.
   - projectType is one of: "Shipped product" | "Internal initiative" | "Concept"
   ========================================================================== */

const portfolioData = {

  /* ------------------------------------------------------------------
     Site-wide metadata (titles, canonical URLs, Open Graph)
     ------------------------------------------------------------------ */
  meta: {
    siteName: "Naveen Kumar | Product Designer",
    siteUrl: "https://www.mrnk.in",              // no trailing slash
    tagline: "I make complex products feel simple.",
    description: "Naveen Kumar is a Product Designer in Chennai, India, working across B2B SaaS, AI/LLM experiences, design systems and complex enterprise workflows.",
    ogImage: "assets/og-image.png"
  },

  /* ------------------------------------------------------------------
     Profile
     ------------------------------------------------------------------ */
  profile: {
    name: "Naveen Kumar",
    brand: "NK",
    title: "Product Designer / Design Engineer",
    location: "Chennai, India",
    email: "naveenmm26@gmail.com",
    linkedin: "https://www.linkedin.com/in/naveenux/",
    portfolioUrl: "https://www.mrnk.in/",
    statement: "I make complex products feel simple.",
    heroIntro: "I design B2B SaaS, AI tools and design systems, then work with engineers to bring them to life.",
    personalNote: "I like understanding how things work, then figuring out how to make them work better.",
    photo: "assets/profile/naveen.jpg",
    photoAlt: "Naveen Kumar smiling in a black shirt, black-and-white portrait with a sticker-style outline",
    // Drop the resume PDF at assets/resume/Naveen-Kumar-Resume.pdf and set
    // this to "assets/resume/Naveen-Kumar-Resume.pdf" to make the Resume
    // links appear in the navigation and the contact section.
    resume: null
  },

  /* ------------------------------------------------------------------
     Hero, sticky notes arranged around the headline (desktop canvas).
     x / y are percentages of the hero canvas, rot is in degrees.
     `href` turns a note into a link. Colours: yellow, blue, lilac, mint, coral.
     ------------------------------------------------------------------ */
  heroNotes: [
    { id: "n1", text: "B2B SaaS",                    color: "yellow", x: 5,  y: 15, rot: -3 },
    { id: "n2", text: "AI / LLM experiences",        color: "blue",   x: 74, y: 9,  rot: 2 },
    { id: "n3", text: "Design systems",              color: "lilac",  x: 79, y: 47, rot: -2 },
    { id: "n4", text: "From problem to prototype",   color: "mint",   x: 6,  y: 58, rot: 2.5 },
    { id: "n5", text: "Curiosity outside the screen",color: "coral",  x: 67, y: 76, rot: -1.5, href: "sidequests.html" }
  ],
  heroNoteCard: { x: 31, y: 72, rot: -1.5 },

  /* ------------------------------------------------------------------
     About
     ------------------------------------------------------------------ */
  about: {
    heading: "I care about what happens between the idea and the experience.",
    lead: "I'm a product designer who likes making **complicated products easier to use**. I work across product thinking, interaction design and implementation with engineers.",
    body: "I've worked on B2B SaaS, education products and AI features. I enjoy making complex workflows clear and useful.",
    facts: [
      { hand: "5+ years", text: "in product design, 4+ of them in UX/UI and product work.", color: "yellow", rot: -1.5 },
      { hand: "Before design", text: "I edited video and post-production. Stories first, screens second.", color: "coral", rot: 1.2 },
      { hand: "Toolkit", text: "Figma · HTML · CSS · JavaScript · React · Claude · ChatGPT · AI-assisted prototyping.", color: "blue", rot: -1 },
      { hand: "Collaboration", text: "I've worked with engineers, founders and teachers to shape product decisions.", color: "mint", rot: 1.8 }
    ]
  },

  /* ------------------------------------------------------------------
     How I work, three-part process
     ------------------------------------------------------------------ */
  process: {
    heading: "Make the complex feel obvious.",
    intro: "I learn how people work, explore a few directions, then prototype and refine with engineering.",
    steps: [
      { index: "01", title: "Understand", text: "Understand the problem, users, product behaviour and constraints before jumping into screens.", color: "yellow" },
      { index: "02", title: "Explore",    text: "Explore information structures, flows and interaction patterns before committing to a solution.", color: "blue" },
      { index: "03", title: "Prototype",  text: "Make the experience tangible, validate decisions and work closely with engineering.", color: "lilac" }
    ],
    footnote: "A default starting point, not a rigid recipe, every project bends it a little."
  },

  /* ------------------------------------------------------------------
     Experience, confirmed timeline
     ------------------------------------------------------------------ */
  experience: [
    {
      company: "Integrate, USA",
      role: "Product Designer",
      period: "Jun 2024 - Sep 2026",
      location: "Chennai, India",
      description: "B2B SaaS across lead management, integrations, user administration and complex workflows, with a strong focus on design systems and design–engineering collaboration.",
      tags: ["B2B SaaS", "Design systems", "Complex workflows"],
      color: "yellow"
    },
    {
      company: "Innerscore",
      role: "Senior UX/UI Designer",
      period: "Mar 2024 - Jun 2024",
      location: "Hyderabad, India",
      description: "Native LLM-based educational assistant, conversational UX and usability testing. A reported result from the project was a 40% reduction in navigation errors.",
      tags: ["AI / LLM", "Conversational UX", "Usability testing"],
      color: "blue"
    },
    {
      company: "Hurrey Tech",
      role: "Product Designer",
      period: "May 2022 - Jan 2024",
      location: "Bengaluru, India",
      description: "Education SaaS spanning school administration, admissions workflows and design systems, including voice-assistant experiences.",
      tags: ["Education SaaS", "Administration", "Voice UX"],
      color: "lilac"
    },
    {
      company: "Blackdoor Studio",
      role: "Post-production Editor",
      period: "Oct 2020 - Mar 2022",
      location: "Chennai, India",
      description: "Video editing and post-production, where I learned to shape stories with pacing, structure and clarity.",
      tags: ["Video", "Post-production"],
      color: "coral"
    }
  ],

  /* ------------------------------------------------------------------
     Sidequests preview (homepage), pulls the first N items from
     portfolioData.sidequests below, so there is a single place to edit.
     ------------------------------------------------------------------ */
  sidequestsPreview: {
    heading: "Not everything happens in a Figma file.",
    sub: "I love taking photos and saving small moments from wherever I go.",
    count: 4
  },

  /* ------------------------------------------------------------------
     Projects
     ------------------------------------------------------------------
     section.block types the case-study template understands:
       paragraph | list | quote | cards | steps | metrics
       image | gallery | video | link
     Only populate what is genuinely known, empty fields stay hidden.     */
  projects: [
    {
      slug: "designos",
      title: "DesignOS",
      category: "AI / Design Systems",
      projectType: "Concept",
      featured: true,
      summary: "An AI-native operating system concept connecting design systems, research, product decisions and team knowledge.",
      more: "Explored as a fully interactive product experience, not static screens.",
      tags: ["AI", "Product Design", "Design Systems"],
      role: "Product Designer, concept & interaction design",
      team: "Independent, solo",
      timeline: null,
      heroImage: "assets/projects/designos/cover.png",
      heroAlt: "DesignOS concept, a design workspace with an 'Ask DesignOS' AI assistant panel suggesting context-aware questions",
      links: [
        { note: "Interactive concept", label: "Explore the full interactive DesignOS experience", url: "https://www.mrnk.in/designos/" }
      ],
      snapshot: {
        context: { text: "An independent product concept exploring what AI-native design tooling could feel like.", color: "yellow" },
        problem: { text: "Design knowledge is fragmented across tools, so context is lost exactly when decisions are being made.", color: "blue" },
        contribution: { text: "Concept, product and interaction design for an AI-native design environment, including a fully interactive prototype.", color: "lilac" },
        outcome: { text: "A published, walkable concept experience used to communicate the idea end-to-end.", color: "mint" }
      },
      sections: [
        {
          id: "problem",
          heading: "We don't have a lack of tools. We have too many.",
          blocks: [
            { type: "paragraph", text: "A single design decision can involve Figma, a design system, research notes, Notion, Slack, GitHub and an AI tool, all at once." },
            { type: "paragraph", text: "The information exists, but the **context is fragmented**. Designers spend time searching for existing patterns, revisiting decisions, understanding guidelines and answering questions the team may have already solved." },
            { type: "quote", text: "When AI enters the workflow, the problem becomes bigger: how can AI actually understand the way a product team designs?" }
          ]
        },
        {
          id: "gap",
          heading: "Knowledge exists. Intelligence is missing.",
          blocks: [
            { type: "paragraph", text: "Our tools store knowledge. Design systems maintain consistency. AI generates answers. But they rarely work together **at the moment a design decision is being made**." },
            { type: "cards", items: [
              { title: "Tools", text: "Store information across separate places and workflows." },
              { title: "Systems", text: "Provide consistency, but mostly wait for designers to refer to them." },
              { title: "AI", text: "Can generate answers, but needs product context to make them useful." }
            ]}
          ]
        },
        {
          id: "concept",
          heading: "Introducing DesignOS.",
          blocks: [
            { type: "paragraph", text: "DesignOS connects four sources of team knowledge into one contextual layer:" },
            { type: "cards", items: [
              { title: "Design Systems", text: "Components, tokens, patterns and guidelines become contextual knowledge." },
              { title: "Research", text: "Evidence and user insights become part of the decision context." },
              { title: "Product Decisions", text: "Past decisions and rationale become discoverable instead of forgotten." },
              { title: "Team Knowledge + AI", text: "AI connects the information and helps surface what matters." }
            ]},
            { type: "quote", text: "Instead of asking \u201CWhere is the guideline for this?\u201D you can ask \u201CWhat should I use here, and why?\u201D" }
          ]
        },
        {
          id: "intelligence",
          heading: "A system that can learn with the team.",
          blocks: [
            { type: "paragraph", text: "Traditional design systems document **components → tokens → guidelines**. DesignOS explores **context → AI → decisions → learning**." },
            { type: "steps", items: [
              { title: "Context" }, { title: "AI" }, { title: "Decisions" }, { title: "Learning" }, { title: "System evolves" }
            ]},
            { type: "paragraph", text: "It can identify repeated patterns, connect decisions to research and surface opportunities to improve the system itself." }
          ]
        },
        {
          id: "build",
          heading: "Not static screens, a real product experience.",
          blocks: [
            { type: "paragraph", text: "Rather than presenting DesignOS as a collection of static screens, I created a **fully interactive SaaS product experience** to explore how the idea could work as a real product." },
            { type: "paragraph", text: "The concept explores AI contextual assistance, design system intelligence, AI Skills, research context, evidence-backed recommendations, design decision workflows, human-in-the-loop AI and interactive product dashboards." },
            { type: "image", src: "assets/projects/designos/overview.png", alt: "DesignOS concept overview", caption: "DesignOS, concept overview" },
            { type: "link", note: "Interactive website", label: "Step inside the concept and experience how an AI-native design system could support real product decisions", url: "https://www.mrnk.in/designos/" }
          ]
        },
        {
          id: "idea",
          heading: "From something designers refer to, to something they work with.",
          blocks: [
            { type: "paragraph", text: "Design systems have traditionally been something designers **refer to**. DesignOS explores what happens when they become something designers can **work with**." },
            { type: "quote", text: "AI recommends. Designers decide., The goal is not to automate design judgement, but to make the team's existing knowledge more accessible, contextual and useful when decisions are being made." },
            { type: "paragraph", text: "**Not another AI chatbot**, a contextual intelligence layer for product design." }
          ]
        },
        {
          id: "reflection",
          heading: "What I took from this concept.",
          blocks: [
            { type: "paragraph", text: "DesignOS sharpened how I think about AI in product design: the interesting question is not what AI can generate, but how a team's existing knowledge can become usable at the moment a decision is made." },
            { type: "paragraph", text: "It also became a sandbox for ideas I now bring into day-to-day design-systems work, evidence-backed recommendations, decision context and human-in-the-loop workflows." }
          ]
        }
      ]
    },

    {
      slug: "design-engineering",
      title: "Design × Engineering Collaboration",
      category: "Design Systems / Collaboration",
      projectType: "Internal initiative",
      featured: false,
      summary: "A two-track model for clearer handoffs between design and engineering.",
      more: "Component lifecycle, Dev SPOC ownership and reusable AI Skills.",
      tags: ["Design Systems", "Process", "AI Workflow"],
      role: "Product Designer, design systems",
      team: "Design & Engineering (Pixel team)",
      timeline: null,
      heroImage: "assets/projects/design-engineering/collaboration.png",
      heroAlt: "Design and engineering collaboration model overview",
      links: [],
      metrics: [
        { value: "6", label: "Stages in the component lifecycle" },
        { value: "1", label: "Clear Dev SPOC model" },
        { value: "10+", label: "Product areas supported by reusable prototyping" }
      ],
      snapshot: {
        context: { text: "Day-to-day collaboration between Design and Engineering around shared UI components.", color: "yellow" },
        problem: { text: "Component work lacked a shared lifecycle, ownership, documentation and handoffs depended on individual communication.", color: "coral" },
        contribution: { text: "A six-stage component lifecycle, a Dev SPOC ownership model, lightweight documentation and reusable AI Skills for repeatable system work.", color: "blue" },
        outcome: { text: "A more predictable workflow: clearer ownership, consistent handoffs and less repetitive documentation work.", color: "mint" }
      },
      sections: [
        {
          id: "challenge",
          heading: "The handoff was only one part of the problem.",
          blocks: [
            { type: "paragraph", text: "As the design system evolved, component work became harder to manage consistently. Designers could define a component in design, while engineers maintained the implementation separately. Without a clear lifecycle, small changes created uncertainty around ownership, documentation, implementation and communication." },
            { type: "list", items: [
              "Component updates were not always consistent across Design and Engineering.",
              "Documentation required repeated manual effort and was difficult to keep current.",
              "Handoffs depended too much on individual communication and context.",
              "It was not always clear who should drive or validate a component change."
            ]},
            { type: "quote", text: "The opportunity was to make the workflow clearer, repeatable and easier to scale." }
          ]
        },
        {
          id: "lifecycle",
          heading: "A component is not a deliverable. It is a lifecycle.",
          blocks: [
            { type: "paragraph", text: "I treated a shared component as something that moves through a lifecycle rather than as a one-time design or development task." },
            { type: "steps", items: [
              { title: "Define", text: "Design, define the component, states, behaviours, usage and guidance." },
              { title: "Align", text: "Review, align Design and Engineering before implementation." },
              { title: "Implement", text: "Build, engineering implements against the agreed design and behaviour." },
              { title: "Capture", text: "Document, capture what designers and developers need to reuse it." },
              { title: "Share", text: "Release, make the update available with the right communication." },
              { title: "Evolve", text: "Maintain, treat components as evolving product assets." }
            ]},
            { type: "image", src: "assets/projects/design-engineering/component-lifecycle.png", alt: "Component lifecycle diagram", caption: "The six-stage component lifecycle" }
          ]
        },
        {
          id: "approach",
          heading: "From documentation to a system for healthy components.",
          blocks: [
            { type: "paragraph", text: "Rather than treating the problem as a documentation exercise, I mapped the key stages, **design → review → engineering → documentation → release → maintenance**, and identified where ownership or communication could break down." },
            { type: "paragraph", text: "This shifted the conversation from \u201CHow do we document this component?\u201D to \u201CHow do we make sure this component stays healthy throughout its lifecycle?\u201D" },
            { type: "cards", items: [
              { title: "Shared mental model", text: "Both disciplines can see where a component is in its lifecycle and what needs to happen next." },
              { title: "Clear handoff", text: "Design intent and implementation context are aligned before work reaches production." },
              { title: "Continuous ownership", text: "A component remains useful after release through maintenance, updates and communication." }
            ]}
          ]
        },
        {
          id: "ownership",
          heading: "Clear ownership without adding another process layer.",
          blocks: [
            { type: "paragraph", text: "One of the important changes was introducing clearer ownership around component updates through a **Dev SPOC (Single Point of Contact)** model." },
            { type: "paragraph", text: "This gave engineering-side questions, implementation decisions and updates a clearer owner. It also made it easier for designers to know where to go when a component needed to change." },
            { type: "paragraph", text: "The model was designed to support collaboration rather than create another layer of process. Design remained responsible for design intent and experience, while Engineering provided implementation ownership and technical context." },
            { type: "image", src: "assets/projects/design-engineering/overview.png", alt: "Design and engineering collaboration overview", caption: "The collaboration model at a glance" }
          ]
        },
        {
          id: "documentation",
          heading: "Documentation should live inside the workflow.",
          blocks: [
            { type: "paragraph", text: "I created a lightweight workflow using **Confluence** to make component documentation easier to maintain, capturing useful information at the right point in the lifecycle, instead of treating documentation as a separate task at the end." },
            { type: "cards", items: [
              { title: "Design intent", text: "Why the component exists and what experience it is meant to support." },
              { title: "Behaviour", text: "States, interactions, usage and important edge cases." },
              { title: "Implementation", text: "Engineering context needed to build and reuse the component." },
              { title: "Ownership", text: "Who to talk to when the component needs to change." }
            ]},
            { type: "quote", text: "Someone encountering a component later should be able to understand what it is, how it should be used, and who to talk to." }
          ]
        },
        {
          id: "ai-workflow",
          heading: "AI became part of how I made the system repeatable.",
          blocks: [
            { type: "paragraph", text: "A key part of this project was exploring how to use **Claude more intentionally as a design and systems tool**, rather than as a chatbot. I designed my workflow around clear inputs, expected outputs and constraints." },
            { type: "paragraph", text: "Instead of repeatedly explaining the same context and process, I structured that knowledge into reusable **Claude Skills**, packaging repeatable design-system knowledge and working methods into a reusable workflow. The exact Skill is internal, but the pattern is simple:" },
            { type: "quote", text: "Prompt → one-off answer, becomes Skill → repeatable workflow → consistent output." },
            { type: "image", src: "assets/projects/design-engineering/claude-skill.png", alt: "Claude custom Skill workflow", caption: "Structuring repeatable system work as a reusable Skill" }
          ]
        },
        {
          id: "division",
          heading: "Designed by me. Accelerated by AI.",
          blocks: [
            { type: "paragraph", text: "I used Claude to support areas such as:" },
            { type: "list", items: [
              "Structuring and drafting component documentation.",
              "Transforming existing design-system information into reusable formats.",
              "Checking consistency across component information.",
              "Reducing repetitive documentation work.",
              "Exploring and refining repeatable design-system workflows."
            ]},
            { type: "paragraph", text: "The important distinction is that **I designed the workflow and Skills, while Claude handled the repetitive execution**. Design judgement, system decisions and validation remained with me." },
            { type: "cards", items: [
              { title: "Context", text: "Decide what information the model needs to produce useful work." },
              { title: "Constraints", text: "Define what should be standardized and what remains open to judgement." },
              { title: "Human in the loop", text: "Keep design decisions, validation and quality control with the designer." }
            ]}
          ]
        },
        {
          id: "outcome",
          heading: "A more predictable Design × Engineering workflow.",
          blocks: [
            { type: "paragraph", text: "The result was a more predictable workflow around shared components, connecting ownership, lifecycle, documentation, collaboration and AI-assisted system tasks into a clearer operating model." },
            { type: "cards", items: [
              { title: "Ownership", text: "Clearer ownership for component changes and engineering questions." },
              { title: "Handoffs", text: "More consistent communication between Design and Engineering." },
              { title: "Lifecycle", text: "A defined path for components beyond initial implementation." },
              { title: "Efficiency", text: "Less repetitive work through AI-assisted documentation and system tasks." }
            ]},
            { type: "gallery", images: [
              { src: "assets/projects/design-engineering/workflow-before.png", alt: "Workflow before the collaboration model", caption: "Before, handoffs depended on individuals" },
              { src: "assets/projects/design-engineering/workflow-after.png", alt: "Workflow after the collaboration model", caption: "After, a defined, shared operating model" }
            ]}
          ]
        },
        {
          id: "reflection",
          heading: "Design systems are as much about the system around the component as the component itself.",
          blocks: [
            { type: "paragraph", text: "This project reinforced an important lesson: the quality of a component is influenced as much by the system around it as by the component itself." },
            { type: "paragraph", text: "Good collaboration does not necessarily require more meetings or more process. It requires **clear ownership, shared language and a workflow that makes the right behaviour easy**." },
            { type: "paragraph", text: "For me, this was an opportunity to operate beyond individual UI decisions and think about how Design and Engineering can work together at a systems level." }
          ]
        }
      ]
    },

    {
      slug: "teacher-experience",
      title: "Teacher Experience Redesign",
      category: "Education SaaS / AI",
      projectType: "Shipped product",
      featured: false,
      summary: "A redesign of a connected classroom product around teacher workflows and clarity.",
      more: "Sole designer, dashboards, class view, syllabus and AI features. Passed WCAG 2.0.",
      tags: ["Education SaaS", "IA", "AI Features", "WCAG 2.0"],
      role: "Sole Product Designer",
      team: "Designers (feedback), developers (build), new design system",
      timeline: null,
      heroImage: "assets/projects/teacher-experience/cover.jpg",
      heroAlt: "Teacher Experience redesign case study cover",
      links: [],
      snapshot: {
        context: { text: "Hurrey, an AI-enabled, IoT-based SaaS product connecting classrooms. Admin, Teacher and Student logins; this work focused on the teacher experience.", color: "yellow" },
        problem: { text: "Even simple flows created doubts and confusion for teachers. Information architecture and functionality needed rework.", color: "coral" },
        contribution: { text: "Ground-up redesign of the teacher application as sole designer, onboarding, dashboard, class view, syllabus, student profiles and supporting workflows.", color: "blue" },
        outcome: { text: "Qualitative validation with teachers: easier navigation and clearer functionality. The redesigned experience passed WCAG 2.0 compliance.", color: "mint" }
      },
      sections: [
        {
          id: "context",
          heading: "One interconnected classroom network, with the teacher at the center.",
          blocks: [
            { type: "paragraph", text: "Hurrey provides equal learning opportunities through an interconnected classroom network. I was the sole designer from start to finish, collaborating with others throughout the project." },
            { type: "cards", items: [
              { title: "Designers", text: "Worked together for timely feedback and design direction." },
              { title: "Developers", text: "Worked closely to ensure the final output matched the design accurately." },
              { title: "Design system", text: "The teacher product was one of the first experiences to adopt the new design system." }
            ]}
          ]
        },
        {
          id: "starting-point",
          heading: "The old experience created friction in simple flows.",
          blocks: [
            { type: "paragraph", text: "Teachers struggled to use the application at one go. Even simple flows created doubts and confusion, and the existing experience had clear opportunities in information architecture and functionality." },
            { type: "image", src: "assets/projects/teacher-experience/before.jpg", alt: "Older version of the teacher application", caption: "Older version · Teacher application" }
          ]
        },
        {
          id: "onboarding",
          heading: "Use onboarding to teach the product.",
          blocks: [
            { type: "paragraph", text: "I explored an application tour during onboarding. Onboarding is the one flow where a user is expected to move through a linear path, the right moment to introduce the application." },
            { type: "image", src: "assets/projects/teacher-experience/app-tour.gif", alt: "Application tour animation", caption: "Application tour during onboarding" },
            { type: "quote", text: "The goal was to reduce the learning curve, not add another layer of UI." }
          ]
        },
        {
          id: "dashboard",
          heading: "Make the current class the starting point for decisions.",
          blocks: [
            { type: "paragraph", text: "Hurrey was adding more AI features, recommendations based on prerequisites and performance, AI attendance and other intelligent classroom capabilities. The product needed to communicate its AI SaaS positioning without affecting usability." },
            { type: "image", src: "assets/projects/teacher-experience/dashboard.jpg", alt: "New version of the teacher dashboard", caption: "New version · Teacher's dashboard" },
            { type: "gallery", images: [
              { src: "assets/projects/teacher-experience/dashboard-card.jpg", alt: "Teacher dashboard card design", caption: "Dashboard cards · at-a-glance metrics" },
              { src: "assets/projects/teacher-experience/konnect.jpg", alt: "Hurrey Konnect screen", caption: "Hurrey Konnect · dedicated screen" }
            ]},
            { type: "paragraph", text: "The dashboard dynamically reflects the teacher's current class based on assigned classes and time. Each card was designed to be valuable and informative, syllabus progress, assessment and exam performance, and percentage changes that help teachers make decisions at a glance." },
            { type: "paragraph", text: "AI recommendations were brought out of the class view so they could be seen earlier, and AI attendance using facial recognition was surfaced at both class and student level. Compared with the previous design, the dashboard saw more engagement because teachers could view and edit more details directly." }
          ]
        },
        {
          id: "konnect",
          heading: "Give a connected classroom product the space to explain itself.",
          blocks: [
            { type: "paragraph", text: "Hurrey Konnect turns a normal TV into a Smart Class TV, teachers can cast learning aids while the device connects to the app. The old Konnect experience used a floating menu that hid features; a dedicated screen made the product's potential and features visible." },
            { type: "paragraph", text: "The redesign made device connection status visible, allowed the whiteboard to mirror mobile to TV, clarified supported file formats and introduced class or subject-specific features, for example, a math solver shown specifically to a math teacher. Separating the dashboard and Konnect also created a clearer product model and improved teaching efficiency." }
          ]
        },
        {
          id: "class-view",
          heading: "The most complex screen needed the clearest information architecture.",
          blocks: [
            { type: "paragraph", text: "The class view was the most cluttered area of the application. Teacher testing showed that users struggled to navigate it, so I gathered information from teachers in different schools." },
            { type: "image", src: "assets/projects/teacher-experience/class-view-before.jpg", alt: "Old version of the class view", caption: "Old version · Class view" },
            { type: "paragraph", text: "The old experience created confusion between Syllabus and Insights even though they contained similar information. Teachers had to move through multiple steps to understand the class, switch between syllabus and insights and inspect students." },
            { type: "image", src: "assets/projects/teacher-experience/class-view.jpg", alt: "New version of the class view", caption: "New version · Class view" },
            { type: "paragraph", text: "I iterated through different layouts and selected the final structure based on clarity and usability. Class performance became visible at a glance, reducing the steps needed to understand what was happening. AI recommendations at topic-level performance helped teachers make decisions, and teacher notes and homework could be added directly, with the potential for notes to evolve into a lesson planner." },
            { type: "paragraph", text: "Cross-subject performance broke the silo between subjects and showed the broader class standard." }
          ]
        },
        {
          id: "syllabus",
          heading: "Turn performance data into something a teacher can act on.",
          blocks: [
            { type: "image", src: "assets/projects/teacher-experience/syllabus.jpg", alt: "Class view syllabus experience", caption: "Syllabus · chapter-level performance" },
            { type: "paragraph", text: "The syllabus tab enables teachers to view, edit and map content while seeing chapter-specific performance data. A period prediction estimates how many periods may be needed to complete a chapter, based on performance and knowledge-grasping capacity." }
          ]
        },
        {
          id: "students",
          heading: "Bring academic and non-academic information together without losing clarity.",
          blocks: [
            { type: "paragraph", text: "Academic and non-academic data ultimately ends up in the student profile. I designed sections so future sections could be added, and gave AI recommendations more emphasis in the profile." },
            { type: "image", src: "assets/projects/teacher-experience/universal-card.jpg", alt: "Universal teacher card design", caption: "Universal card design" },
            { type: "paragraph", text: "The universal card design decreased cognitive load, remained visually appealing, was easy to scan and emphasized the important data points." }
          ]
        },
        {
          id: "supporting",
          heading: "Build the supporting workflows as one system.",
          blocks: [
            { type: "cards", items: [
              { title: "Leave management", text: "A dedicated workflow for teacher leave." },
              { title: "Attendance + events", text: "Combined attendance and events in one experience." },
              { title: "Teacher profile", text: "A structured profile for teacher information." },
              { title: "Timetable", text: "A clearer view of the teacher's schedule and daily context." },
              { title: "More supporting flows", text: "Designed as part of the same information architecture and product system." }
            ]},
            { type: "image", src: "assets/projects/teacher-experience/other-features.jpg", alt: "Other teacher product features", caption: "Supporting workflows across the product" }
          ]
        },
        {
          id: "testing",
          heading: "Validate whether the redesign actually made the product easier to use.",
          blocks: [
            { type: "paragraph", text: "I interviewed teachers about the new AI and application functionality, explaining how the app works and asking their opinion on the new and old versions." },
            { type: "metrics", note: "Qualitative observations from teacher interviews, not production metrics.", items: [
              { value: "Better", label: "Overall usability was good compared with the old experience." },
              { value: "Faster", label: "Teachers found navigation easier and needed less explanation." },
              { value: "Clearer", label: "Functionality was easier to understand, while OCR and face recognition remained harder to understand." }
            ]},
            { type: "paragraph", text: "The testing also helped me understand how teachers think about lesson planners and Konnect usage, while revealing upcoming feature opportunities." }
          ]
        },
        {
          id: "reflection",
          heading: "Complex products become clearer when information, intelligence and workflow work together.",
          blocks: [
            { type: "list", items: [
              "Learned more about backend processes, percentages and the data points behind the UI.",
              "Teacher interviews revealed opportunities around lesson planners and Konnect usage.",
              "Discussing upcoming features helped shape the product foundation for future capabilities.",
              "Improved my WCAG and accessibility knowledge, the project passed WCAG 2.0 compliance."
            ]},
            { type: "paragraph", text: "The biggest learning: AI features only create value when they appear at the right moment and are presented in a way teachers can understand and act on. AI helped me move faster throughout, but product direction, UX decisions, iterations and validation remained mine." }
          ]
        }
      ]
    },

    {
      slug: "school-admissions",
      title: "School Admissions Platform",
      category: "Education SaaS / Administration",
      projectType: "Shipped product",
      featured: false,
      summary: "A school administration experience designed to simplify the admissions journey for administrators and parents.",
      more: "Journey mapping, field research across 20 schools, QR forms and trackable applications.",
      tags: ["Education SaaS", "Research", "Administration"],
      role: "Sole Product Designer",
      team: "Founder, web developer, data scientist, design interns",
      timeline: null,
      heroImage: "assets/projects/school-admissions/hero.jpg",
      heroAlt: "School Admissions platform overview",
      links: [],
      metrics: [
        { value: "20", label: "Schools' application forms studied" },
        { value: "10 → 6", label: "Onboarding questions, simplified" },
        { value: "3–4 months", label: "The admissions cycle the product had to support" }
      ],
      snapshot: {
        context: { text: "The Hurrey school administration portal. Admissions run 3–4 months; school administrators are the primary users and parents the intermediary.", color: "yellow" },
        problem: { text: "Tracking applications, understanding reach and communicating status relied on manual, paper-heavy processes.", color: "coral" },
        contribution: { text: "End-to-end product design as sole designer, journey mapping, research with school staff and principals, flows, onboarding, dashboard, form system and application management.", color: "blue" },
        outcome: { text: "A digital admissions journey with shareable QR forms, trackable applications and business-intelligence features designed with the founder, developer and data scientist.", color: "mint" }
      },
      sections: [
        {
          id: "context",
          heading: "Admissions is a months-long operational journey.",
          blocks: [
            { type: "paragraph", text: "School admissions typically last three to four months. The primary user is the school administration, while parents are the intermediary users. My goal was to make the process easier and more efficient while improving functionality and user experience, as the sole designer from start to finish." },
            { type: "cards", items: [
              { title: "Founder", text: "Understood the product, scope and business case." },
              { title: "Web Developer", text: "Understood technical limitations and aligned the final output with implementation." },
              { title: "Data Scientist", text: "Understood the data points needed and what could be surfaced to users." },
              { title: "Design Interns", text: "Used different perspectives to challenge and improve design decisions." },
              { title: "My role", text: "Owned the product design from initial problem framing through the final experience." }
            ]}
          ]
        },
        {
          id: "journey",
          heading: "Start with the journey, not the interface.",
          blocks: [
            { type: "paragraph", text: "I mapped the user journey to understand pain points, opportunities and emotions throughout the admission process, from promoting the school and communicating with parents, to receiving, evaluating and updating applications." },
            { type: "image", src: "assets/projects/school-admissions/user-journey.jpg", alt: "School admission user journey map", caption: "User journey" }
          ]
        },
        {
          id: "research",
          heading: "Understand the operational reality behind admissions.",
          blocks: [
            { type: "paragraph", text: "I interviewed school staff and school principals to understand how the process actually works." },
            { type: "list", items: [
              "Schools typically assign staff to handle admissions.",
              "Schools struggle to keep track of applications issued.",
              "The admission cycle typically lasts 3–4 months.",
              "Schools often hire advertising agencies or handle marketing themselves.",
              "After parents submit forms, calls increase as parents ask for updates.",
              "Parents look for education, discipline and etiquette, student results, sports and other activities."
            ]},
            { type: "quote", text: "The admission queue revealed an important human and business context: schools sometimes use queues to communicate brand value." },
            { type: "cards", items: [
              { title: "New schools", text: "Newly commenced schools looking to establish and scale." },
              { title: "Tech-savvy schools", text: "Schools ready to adopt digital workflows." },
              { title: "APS", text: "Affordable Private Schools that may have good infrastructure but struggle to scale." }
            ]}
          ]
        },
        {
          id: "competitive",
          heading: "Find the pattern, then find the opportunity.",
          blocks: [
            { type: "paragraph", text: "I reviewed existing patterns across Uniapply, Ezyschooling, Edustoke and Yelloslate. These platforms had similar functionality and higher average monthly traffic, but focused on a limited set of branded schools or specific areas." }
          ]
        },
        {
          id: "direction",
          heading: "Make business intelligence part of the product.",
          blocks: [
            { type: "paragraph", text: "In a brainstorming session with the founder, developer and data scientist, we identified new features that could make the product stand out and provide useful business intelligence." },
            { type: "cards", items: [
              { title: "Potential Around You", text: "Helps schools estimate the number of students they can target in an area." },
              { title: "Popularity Score", text: "An approximate score based on the school's popularity in its area." },
              { title: "QR generation", text: "After creating an application form, schools receive a QR code to share it effortlessly." }
            ]}
          ]
        },
        {
          id: "flow",
          heading: "Map the flow before designing the screens.",
          blocks: [
            { type: "paragraph", text: "After creating the task flow and user flow, I approached the problem statements and created initial wireframes to understand how each screen should work." },
            { type: "image", src: "assets/projects/school-admissions/user-flow.jpg", alt: "School admissions user flow", caption: "User flow" }
          ]
        },
        {
          id: "onboarding",
          heading: "Reduce the questions without reducing the context.",
          blocks: [
            { type: "list", items: [
              "Initially there were 10 questions to ask the end user.",
              "We reduced them to 6.",
              "We explored list versus step-by-step layouts.",
              "We chose step-by-step, because the information was crucial and would reflect in the parent portal."
            ]},
            { type: "image", src: "assets/projects/school-admissions/onboarding.gif", alt: "School admissions onboarding experience", caption: "Onboarding experience" }
          ]
        },
        {
          id: "dashboard",
          heading: "Turn a content-heavy dashboard into an action surface.",
          blocks: [
            { type: "paragraph", text: "The dashboard shows applications received, shortlisted, rejected and application-fee payments. Because it is a content-heavy page with high cognitive load, information needed the right level of emphasis." },
            { type: "list", title: "The problem", items: [
              "Difficulty tracking applications issued to parents.",
              "Difficulty understanding how many parents were aware of the school.",
              "Difficulty targeting the right parents, reducing applications sold."
            ]},
            { type: "list", title: "The solution", items: [
              "Potential Around You is accessible directly from the dashboard.",
              "Popularity Score is calculated from profile views, and the number of views is visible.",
              "Schools can copy a link or QR code and share it with parents directly."
            ]},
            { type: "image", src: "assets/projects/school-admissions/dashboard.jpg", alt: "School administration dashboard", caption: "School administration dashboard" }
          ]
        },
        {
          id: "create-form",
          heading: "Turn a lengthy paper process into a reusable form system.",
          blocks: [
            { type: "paragraph", text: "Schools can create class-wise application forms with an admission fee, opening date, closing date, extended date and allocated seats. Before this, physical forms required discussions with administration, labels and fields, government requirements, hiring a typist, printing, and issuing forms only to parents visiting the school." },
            { type: "paragraph", text: "I researched Google Forms, Typeform and Nopaperforms, then studied 20 different schools' online and offline applications. The result: pre-built fields categorized into student, parent, previous school and document details." },
            { type: "cards", items: [
              { title: "Pre-built fields", text: "Select commonly required fields instead of creating everything from scratch." },
              { title: "Custom fields", text: "Add additional fields when the school needs something specific." },
              { title: "Share + scale", text: "Generate a link or QR code after creating the form and share it with anyone." }
            ]},
            { type: "image", src: "assets/projects/school-admissions/create-form.gif", alt: "Create application form experience", caption: "Create application form" }
          ]
        },
        {
          id: "manage",
          heading: "Make application management trackable.",
          blocks: [
            { type: "list", title: "The problem", items: [
              "Piles of applications are difficult to maintain and communicate updates about.",
              "Selecting a student manually is difficult.",
              "The selection process takes a lot of time."
            ]},
            { type: "list", title: "The solution", items: [
              "Every application receives a unique application number.",
              "Viewing, accepting, shortlisting and rejecting an application digitally reflects directly in the parent portal, reducing communication issues.",
              "Field-based filters let users create conditions to help select the right student."
            ]},
            { type: "image", src: "assets/projects/school-admissions/manage-applications.jpg", alt: "Manage school admission applications", caption: "Manage applications" }
          ]
        },
        {
          id: "profile",
          heading: "Use the school profile to improve discovery.",
          blocks: [
            { type: "paragraph", text: "I also created the school profile page. With school details in place, the product can suggest potential areas and calculate the correct popularity score." },
            { type: "image", src: "assets/projects/school-admissions/school-profile.jpg", alt: "School profile page", caption: "School profile" }
          ]
        },
        {
          id: "reflection",
          heading: "More than interface design, I learned to think in systems.",
          blocks: [
            { type: "list", items: [
              "For QR code generation, I explored Paytm, BharatPe, Starbucks and Walmart QR strategies.",
              "I gained technical knowledge by brainstorming and collaborating with various teams.",
              "I spent most of my time on design thinking and learning about backend processes and structuring.",
              "I worked with the data science team on the new features described above.",
              "I learned about APS, Affordable Private Schools, including how they work and their business case."
            ]}
          ]
        }
      ]
    },

    {
      slug: "typography-system",
      title: "Scalable Typography System",
      category: "Design Systems / Design-to-code",
      projectType: "Internal initiative",
      featured: false,
      summary: "A token-based typography foundation connecting Figma variables to CSS.",
      more: "25+ inconsistent styles distilled into one shared scale for design and code.",
      tags: ["Design Systems", "Tokens", "Figma Variables", "CSS"],
      role: "Product Designer, design systems",
      team: "Design & engineering",
      timeline: null,
      heroImage: "assets/projects/typography-system/cover.jpg",
      heroAlt: "Scalable Typography System case study cover",
      links: [],
      metrics: [
        { value: "25+ → 10", label: "Typography styles reduced" },
        { value: "100%", label: "Design and dev working from the same values" },
        { value: "50%", label: "Faster implementation" }
      ],
      snapshot: {
        context: { text: "The product's design system needed a typography foundation built for consistency, scalability and developer handoff.", color: "yellow" },
        problem: { text: "25+ typography styles were in use, with inconsistent font sizes and line heights drifting between design and code.", color: "coral" },
        contribution: { text: "Audited existing screens, benchmarked against Material and Tailwind, then built a token scale in Figma variables mapped to CSS custom properties.", color: "blue" },
        outcome: { text: "A minimal, token-based typography library that designers and developers use, adopt and scale together.", color: "mint" }
      },
      sections: [
        {
          id: "outcome",
          heading: "A typography library built to scale.",
          blocks: [
            { type: "paragraph", text: "The outcome was a **typography library** that standardises text styles across the product, improves developer efficiency with ready-to-use tokens, and stays scalable when styles are added or modified in the future." },
            { type: "cards", items: [
              { title: "Consistency", text: "One shared language for typography across the product." },
              { title: "Efficiency", text: "Ready-to-use tokens reduce repetitive decisions and handoff friction." },
              { title: "Scalability", text: "A system that can grow without introducing new inconsistencies." }
            ]}
          ]
        },
        {
          id: "starting-point",
          heading: "How did I start?",
          blocks: [
            { type: "list", items: [
              "I audited the **existing screens and typography styles** across the product.",
              "I noticed **inconsistent usage** of font sizes and line heights.",
              "To validate my approach, I compared with **industry-leading design systems** like Material Design and Tailwind.",
              "Then I mapped everything into a **clean, minimal scale**."
            ]},
            { type: "quote", text: "Typography inconsistencies cause confusion for both designers and developers. Creating tokens reduces duplication and enforces consistency across the product." }
          ]
        },
        {
          id: "references",
          heading: "Framework inspirations.",
          blocks: [
            { type: "gallery", images: [
              { src: "assets/projects/typography-system/framework-1.png", alt: "Framework inspiration 1", caption: "Reference · Material Design" },
              { src: "assets/projects/typography-system/framework-2.png", alt: "Framework inspiration 2", caption: "Reference · Tailwind" },
              { src: "assets/projects/typography-system/framework-3.png", alt: "Framework inspiration 3", caption: "Reference · framework scales" },
              { src: "assets/projects/typography-system/framework-4.png", alt: "Framework inspiration 4", caption: "Reference · type scales" }
            ]},
            { type: "paragraph", text: "How our product can stand out:" },
            { type: "list", items: [
              "By keeping the **token system minimal yet scalable**.",
              "By making it **developer-first** (CSS custom properties).",
              "By providing a **clear mapping** between design (Figma) and code."
            ]},
            { type: "image", src: "assets/projects/typography-system/stand-out.png", alt: "How our product can stand out", caption: "The positioning of our token system" }
          ]
        },
        {
          id: "figma",
          heading: "Figma variable setup.",
          blocks: [
            { type: "gallery", images: [
              { src: "assets/projects/typography-system/figma-1.png", alt: "Figma variable setup 1", caption: "Figma variables · collection" },
              { src: "assets/projects/typography-system/figma-2.png", alt: "Figma variable setup 2", caption: "Figma variables · type scale" },
              { src: "assets/projects/typography-system/figma-3.png", alt: "Figma variable setup 3", caption: "Figma variables · modes" }
            ]}
          ]
        },
        {
          id: "css",
          heading: "Global CSS setup.",
          blocks: [
            { type: "gallery", images: [
              { src: "assets/projects/typography-system/css-1.png", alt: "Global CSS setup 1", caption: "CSS custom properties · root" },
              { src: "assets/projects/typography-system/css-2.png", alt: "Global CSS setup 2", caption: "CSS custom properties · scale" },
              { src: "assets/projects/typography-system/css-3.png", alt: "Global CSS setup 3", caption: "CSS custom properties · usage" }
            ]},
            { type: "quote", text: "For this version, I considered only one frame size (1920px). Next step: extend the system for multiple breakpoints, so typography adapts across devices." }
          ]
        },
        {
          id: "implementation",
          heading: "From library to styles and classes.",
          blocks: [
            { type: "paragraph", text: "Once the library was created, it was time to create the styles in Figma and the classes in CSS, each token has an exact counterpart on both sides. An example:" },
            { type: "gallery", images: [
              { src: "assets/projects/typography-system/implementation-1.png", alt: "Typography implementation example 1", caption: "Example · Figma style" },
              { src: "assets/projects/typography-system/implementation-2.png", alt: "Typography implementation example 2", caption: "Example · CSS class" }
            ]}
          ]
        },
        {
          id: "impact",
          heading: "Impact and results.",
          blocks: [
            { type: "paragraph", text: "The typography system created measurable improvements across design consistency, developer productivity, scalability and accessibility." },
            { type: "cards", items: [
              { title: "Consistency", text: "Designers and developers work with the same values." },
              { title: "Efficiency", text: "Fewer design and development sync issues." },
              { title: "Scalability", text: "Adding a new size or weight is easy." },
              { title: "Accessibility", text: "Paired line heights keep the platform readable." }
            ]}
          ]
        },
        {
          id: "reflection",
          heading: "What I learned from this project.",
          blocks: [
            { type: "list", items: [
              "Learned how **small inconsistencies in typography** create big problems for product teams.",
              "Understood the importance of **tokens as a bridge between design and code**.",
              "Learned that keeping the system **minimal and flexible** is more effective than having too many styles.",
              "Improved my knowledge of **accessibility and readability** by pairing font sizes with appropriate line heights."
            ]}
          ]
        },
        {
          id: "how-i-worked",
          heading: "AI, design and engineering.",
          blocks: [
            { type: "paragraph", text: "I used AI as a force multiplier throughout the project, while keeping design decisions, validation and implementation alignment grounded in the needs of the product and team." },
            { type: "cards", items: [
              { title: "Claude + Figma Agent", text: "AI-assisted exploration, accelerate exploration, structure ideas, validate approaches and reduce repetitive work while I owned the design direction." },
              { title: "Consistent collaboration", text: "Worked closely with developers to make sure Figma variables translated cleanly into CSS custom properties and production-ready patterns." },
              { title: "Built for the team", text: "Focused on a smaller, reusable system that designers and developers could understand, adopt and scale together." }
            ]}
          ]
        }
      ]
    },

    {
      slug: "revenue-optimization",
      title: "Revenue Optimization Insights",
      category: "Analytics / Data Visualisation",
      projectType: "Concept",
      featured: false,
      summary: "An analytics concept designed to surface revenue loss, possible causes and opportunities.",
      more: "From five separate modules to one connected decision-making view.",
      tags: ["Analytics", "Data Visualisation", "Decision Support"],
      role: "Product Designer",
      team: "Solo concept",
      timeline: null,
      heroImage: "assets/projects/revenue-optimization/cover.jpg",
      heroAlt: "Revenue Optimization Insights dashboard concept cover",
      links: [],
      snapshot: {
        context: { text: "A high-fidelity payments analytics dashboard concept for merchants.", color: "yellow" },
        problem: { text: "Merchants need to understand where revenue is being lost, why it is happening and where there is an opportunity to improve, not just see a collection of charts.", color: "coral" },
        contribution: { text: "User story, reference research, wireframes, filter-interaction exploration and high-fidelity desktop design.", color: "blue" },
        outcome: { text: "A decision-oriented dashboard concept: understand what changed, investigate the cause, then identify an action.", color: "mint" }
      },
      sections: [
        {
          id: "user-story",
          heading: "Design around the merchant's decision.",
          blocks: [
            { type: "paragraph", text: "I drafted a user story to ground the design decisions around a representative target user. **Sarah Merchant, E-Com** is a small e-commerce business owner managing multiple products and most aspects of the business. She is tech-savvy, but not an expert in data analysis or payment processing." },
            { type: "cards", items: [
              { title: "Monitor", text: "See revenue, recent transactions and top-performing revenue sources." },
              { title: "Identify", text: "Understand fluctuations caused by failures, chargebacks, fees and leaks." },
              { title: "Improve", text: "Compare performance and find opportunities to improve revenue strategy." }
            ]}
          ]
        },
        {
          id: "reference",
          heading: "Before designing the dashboard, I looked outside it.",
          blocks: [
            { type: "paragraph", text: "I explored visual and interaction references across Mobbin, Dribbble, Behance and Google to understand how complex data could be visualized clearly, and looked at competitors with similar analytics capabilities to understand existing dashboard patterns and where the experience could be simplified." },
            { type: "quote", text: "The reference exercise was not about copying a visual language. It was about understanding patterns for hierarchy, comparison, filtering and data density." }
          ]
        },
        {
          id: "wireframing",
          heading: "From separate modules to one connected view.",
          blocks: [
            { type: "paragraph", text: "My first wireframe separated the dashboard into five areas: Total Revenue, Revenue Breakdown, Revenue Loss Analysis, Comparative Analysis and Revenue Improvement Recommendations. After iterating, I grouped related information based on how the user would consume it." },
            { type: "cards", items: [
              { title: "Overview", text: "Total revenue, transactions, breakdown and comparative analysis live together." },
              { title: "Insights", text: "Revenue losses and top contributors are brought together as diagnostic signals." },
              { title: "Recommendations", text: "Improvement opportunities sit close to the insights that explain why they matter." }
            ]}
          ]
        },
        {
          id: "filters",
          heading: "The hardest question was not what to show. It was how to control time.",
          blocks: [
            { type: "paragraph", text: "The dashboard needed an overall time selector, while comparative analytics also needed its own independent time selection. I explored three solutions before committing to the final interaction." },
            { type: "cards", items: [
              { title: "Solution 1", text: "Tabs for weekly, monthly and yearly views. Simple, but the UI jumps between states and there is no room for a custom date range." },
              { title: "Solution 2", text: "Give each feature its own filter. Flexible, but more choices make it harder to remember which filters are active." },
              { title: "Solution 3 ✓", text: "Let core metrics respond to their own filter while other metrics respond to theirs. Control without unnecessary movement or cognitive load." }
            ]},
            { type: "quote", text: "Solution 3 ticked all the boxes: control, clarity, no unnecessary jumping and fewer clicks." }
          ]
        },
        {
          id: "explorations",
          heading: "Exploring the three directions.",
          blocks: [
            { type: "gallery", images: [
              { src: "assets/projects/revenue-optimization/solution-1.jpg", alt: "Solution 1 dashboard filter exploration", caption: "Solution 1 · tab-based time controls" },
              { src: "assets/projects/revenue-optimization/solution-2.jpg", alt: "Solution 2 dashboard filter exploration", caption: "Solution 2 · per-feature filters" },
              { src: "assets/projects/revenue-optimization/solution-3.jpg", alt: "Solution 3 dashboard filter exploration", caption: "Solution 3 · scoped filters (chosen)" }
            ]},
            { type: "paragraph", text: "The selected approach lets core metrics change based on their own filter while other metrics retain their own context. The dashboard stays predictable, and users keep control of the data they are exploring, with lower cognitive load and a stable interface that preserves visual context." }
          ]
        },
        {
          id: "desktop",
          heading: "A desktop foundation for high-density analytics.",
          blocks: [
            { type: "image", src: "assets/projects/revenue-optimization/desktop-1440.jpg", alt: "Revenue optimization desktop design at 1440 pixels", caption: "Desktop foundation · 1440px" },
            { type: "paragraph", text: "The 1440px desktop design establishes the information hierarchy, content density and filtering model before moving into the final high-fidelity screens." }
          ]
        },
        {
          id: "hifi",
          heading: "Turning the structure into a decision tool.",
          blocks: [
            { type: "paragraph", text: "While designing the high-fidelity version, I changed the layout structure as the product requirements became clearer. The final direction brings the key revenue signals into a more coherent hierarchy, so a merchant can move from overview to diagnosis and then to improvement." },
            { type: "gallery", images: [
              { src: "assets/projects/revenue-optimization/hifi-2.jpg", alt: "Revenue optimization high-fidelity mockup, frame 2", caption: "High fidelity · overview to insights" },
              { src: "assets/projects/revenue-optimization/hifi-3.jpg", alt: "Revenue optimization high-fidelity mockup, frame 3", caption: "High fidelity · recommendations" }
            ]}
          ]
        },
        {
          id: "reflection",
          heading: "Analytics are useful when they help someone decide.",
          blocks: [
            { type: "paragraph", text: "This project changed how I think about analytics dashboards. The challenge was not simply to fit more information into one screen, it was to create relationships between metrics, filters and insights that reduce the work required from the user." },
            { type: "cards", items: [
              { title: "Hierarchy", text: "Information needs a clear order so users know where to look first." },
              { title: "Comparison", text: "Comparative data needs enough context to make changes meaningful." },
              { title: "Filtering", text: "Flexible controls should not force users to remember the entire dashboard state." },
              { title: "Action", text: "The value of an insight increases when it points toward a useful next step." }
            ]}
          ]
        }
      ]
    },
    {
      slug: "more-retail",
      title: "One Home for Store Employees",
      category: "Retail Operations / Android",
      projectType: "Personal Project",
      featured: false,
      summary: "A mobile-first employee experience bringing Receiving, Stowing and Inventory Audit into one place.",
      more: "Self-initiated concept · Retail operations",
      scope: "Unified employee task experience",
      tags: ["Product Design", "Retail Operations", "Android"],
      role: "Product Designer",
      focus: "Product Design, UX Research, Interaction Design",
      platform: "Native Android direction",
      domain: "Retail Operations",
      primaryWorkflow: "Receiving",
      heroImage: "assets/projects/more-retail/screens/home.png",
      cardImage: "assets/projects/more-retail/more-retail-thumbnail.png",
      cardAlt: "More Retail employee task app displayed on a phone in a warm orange store environment",
      heroImageWidth: 412,
      heroImageHeight: 917,
      heroAlt: "More Retail employee app home screen showing current tasks, assigned tasks, daily progress and task priority",
      intro: "Most of my work has been in B2B SaaS, so I started this personal project to learn how store teams handle daily work. I designed a mobile task experience and built a functional prototype. Its visuals differ from these screens, but the core flows match.",
      heroCallouts: [
        { title: "A quick read on the day", text: "Five tasks, three completed and one needing attention give the associate a quick overview." },
        { title: "Current work", text: "The active delivery stays visible, with progress and a clear way to continue." },
        { title: "Progress by product", text: "The associate can see how many products are checked and how many remain." },
        { title: "Priority at a glance", text: "The delivery is marked high priority in this product concept." },
        { title: "The rest of the queue", text: "Other assigned work sits below the current task, ready for the associate to choose next." }
      ],
      links: [
        { note: "Functional prototype · visuals differ from this case study", label: "Try the interactive store app", url: "https://b1f899ejuz70-d.space-z.ai/app/index.html" }
      ],
      snapshot: {
        context: { text: "A self-initiated exploration of store operations in a new domain.", color: "yellow" },
        problem: { text: "Store associates need a clear view of what is active, what is next and what needs attention.", color: "blue" },
        contribution: { text: "I explored a mobile employee home and a complete receiving journey, including issue reporting and offline states.", color: "coral" },
        outcome: { text: "A product concept and functional prototype to discuss with store teams. It is not a launched product.", color: "mint" }
      },
      sections: [
        {
          id: "understanding-retail",
          heading: "I needed to see the work before designing it.",
          blocks: [
            { type: "paragraph", text: "Coming from B2B SaaS, retail was a new domain. I used NCERT material, retail operations reading and the company overview to understand procurement, purchase orders, receiving, stowing and inventory audits." },
            { type: "paragraph", text: "I also spoke with my uncle, who runs a small supermarket. His store still uses notebooks and spreadsheets for parts of inventory management. That conversation helped me picture the everyday work involved in receiving and tracking stock. It was an informal conversation with one small supermarket owner, not research with More Retail employees or a view of every store." },
            { type: "flow-diagram", label: "From purchase order to stock audit", items: ["Purchase order", "Delivery arrives", "Receive and verify", "Stow products", "Audit inventory"], caption: "A learning map from my research and conversation, not an official More Retail process." }
          ]
        },
        {
          id: "people-and-scope",
          heading: "I focused on the handoff between assigning and doing.",
          blocks: [
            { type: "paragraph", text: "As I learned more, the coordination between a store manager and the people working on the floor became the part I wanted to understand. I kept the scope to those two perspectives so I could follow one task all the way through." },
            { type: "cards", items: [
              { kicker: "Sets the work", title: "Store manager", text: "Assigns operational tasks, sets priority, monitors progress and steps in when something needs attention.", image: "assets/projects/more-retail/illustrations/store-manager.png", imageAlt: "Doodle of a store manager checking a clipboard beside a shelf" },
              { kicker: "Completes the work", title: "Store associate", text: "Receives stock, stows products, completes inventory audits and reports product or quantity issues.", image: "assets/projects/more-retail/illustrations/store-associate.png", imageAlt: "Doodle of a store associate handling stock in a store" }
            ]},
            { type: "flow-diagram", label: "The relationship I kept in view", items: ["Manager assigns and monitors", "Associate completes the task", "Progress or issues stay visible"] },
            { type: "quote", text: "I chose Receiving because it let me follow one job from an incoming delivery to a checked and submitted record." }
          ]
        },
        {
          id: "home-and-tasks",
          heading: "The first screen should answer: what should I do next?",
          blocks: [
            { type: "paragraph", text: "Some work in a store may be assigned in person. I wanted the app to make that work visible too, so an associate can return to a task already in progress and see what is still waiting." },
            { type: "cards", items: [
              { title: "Current tasks", text: "Work the associate has started stays prominent, so unfinished work is easy to pick up again." },
              { title: "Assigned tasks", text: "Other tasks sit in a separate queue. The manager can plan them ahead or add work when needed." },
              { title: "Two active slots", text: "In this concept, an associate can have up to two active tasks. Finishing one opens a slot, but the next task does not start by itself. The associate chooses what to do next." },
              { title: "Manager-set priority", text: "The manager assigns High, Medium or Low. The system may suggest a distribution, while the manager makes the final call." }
            ]},
            { type: "paragraph", text: "Each type of work has its own colour. Receiving uses orange, Stowing blue and Inventory Audit violet. I kept those separate from status colours, which signal completion, a warning or an error. The two-task limit and priority rules are design decisions to validate, not confirmed store policy." },
            { type: "swatches", items: [
              { name: "Receiving", color: "#D83E10" },
              { name: "Stowing", color: "#2563EB" },
              { name: "Inventory Audit", color: "#7C3AED" }
            ] }
          ]
        },
        {
          id: "receiving-journey",
          heading: "I kept Receiving simple and guided, one product at a time.",
          blocks: [
            { type: "paragraph", text: "The employee can check the delivery, update each product and report a mismatch without losing the original count." },
            { type: "device-sequence", images: [
              { src: "assets/projects/more-retail/screens/receiving-delivery.png", width: 412, height: 1018, title: "Receiving delivery", alt: "Receiving screen showing a delivery, saved offline notice, product list and four of six products checked", captionTitle: "Receiving delivery overview", captionText: "Progress and expected products stay in view." },
              { src: "assets/projects/more-retail/screens/edit-product.png", width: 412, height: 917, title: "Edit product quantity", alt: "Edit product screen for Aashirvaad atta, showing expected units, received quantity, damaged units and calculated accepted, short and excess totals", captionTitle: "Edit product", captionText: "Enter received and damaged units to calculate totals." },
              { src: "assets/projects/more-retail/screens/report-issue.png", width: 412, height: 917, title: "Report an issue", alt: "Report an issue screen with options for incorrect product and barcode not recognized, plus an optional note", captionTitle: "Report an issue", captionText: "Record a mismatch without overwriting the count." }
            ]},
            { type: "quantity-strip", label: "One product", items: [
              { label: "Expected", value: "12" },
              { label: "Received", value: "12" },
              { label: "Damaged", value: "1" },
              { label: "Accepted", value: "11", emphasis: true },
              { label: "Short", value: "0" },
              { label: "Excess", value: "0" }
            ]},
            { type: "paragraph", text: "Accepted equals received minus damaged. Short and excess are calculated against the expected quantity. These are example values from the design, not measured results." }
          ]
        },
        {
          id: "stock-and-exceptions",
          heading: "Checking products is one thing. Making sure the final record is right is another.",
          blocks: [
            { type: "paragraph", text: "Before submission, the employee can review delivery totals and any item that needs attention." },
            { type: "device-sequence", images: [
              { src: "assets/projects/more-retail/screens/receiving-complete.png", width: 412, height: 1018, title: "All products checked", alt: "Receiving screen with all six products checked and one product needing attention", captionTitle: "All products checked", captionText: "The physical check is complete." },
              { src: "assets/projects/more-retail/screens/receiving-review.png", width: 412, height: 1018, title: "Receiving review", alt: "Review screen summarising expected, physical received, damaged, accepted and short quantities with a report detail", captionTitle: "Review receiving", captionText: "Totals and reported issues are visible before submission." },
              { src: "assets/projects/more-retail/screens/receiving-submitted.png", width: 412, height: 917, title: "Receiving submitted", alt: "Receiving submitted confirmation with delivery totals and a back to home button", captionTitle: "Submitted", captionText: "A clear confirmation closes the task." }
            ]},
            { type: "cards", items: [
              { title: "Quantity visibility", text: "Received, damaged and accepted quantities stay separate." },
              { title: "Issue traceability", text: "Items needing verification remain visible with the original entry." },
              { title: "Clear completion", text: "Checking, review and supervisor approval stay distinct steps." }
            ]}
          ]
        },
        {
          id: "duplicate-records",
          heading: "If two records do not agree, keep both visible.",
          blocks: [
            { type: "paragraph", text: "If two employees record overlapping quantities while working with different network conditions, I would preserve both entries and compare the delivery, product, time and context. If they appear to overlap, the team can recount or run an independent check. A supervisor would approve the final record, with the original entries kept in the audit history." },
            { type: "flow-diagram", variant: "reconciliation", label: "A proposed way to resolve a mismatch", items: ["Keep both records", "Compare delivery, product and time", "Recount if needed", "Supervisor review"], caption: "The final quantity would follow verification and supervisor approval." }
          ]
        },
        {
          id: "offline-and-network",
          heading: "Keep work moving when the connection drops.",
          blocks: [
            { type: "paragraph", text: "Store networks can be unreliable. I designed for supported work to save on the Android device, then sync when the connection returns." },
            { type: "status-flow", label: "What the employee sees", steps: [
              { tone: "connected", title: "Connected", text: "Load tasks and product details." },
              { tone: "offline", title: "Connection drops", text: "Keep supported work moving." },
              { tone: "saved", title: "Saved on device", text: "Show changes waiting to sync." },
              { tone: "syncing", title: "Connection returns", text: "Retry sync and check for conflicts." }
            ], outcomes: [
              { tone: "connected", title: "Synced" },
              { tone: "review", title: "Needs review" },
              { tone: "confirmed", title: "Confirmed" }
            ]},
            { type: "network-diagram", label: "A possible connectivity model", image: "assets/projects/more-retail/illustrations/network-doodle.png", alt: "Hand-drawn doodle of an associate's phone connecting through store Wi-Fi to cloud services, with an optional store gateway branching below.", nodes: [
              { icon: "phone", tone: "device", kicker: "On device", title: "Associate phone", text: "Save changes locally." },
              { icon: "wifi", tone: "store", kicker: "Store network", title: "Wi-Fi and access points", text: "Extend coverage across the store." },
              { icon: "cloud", tone: "cloud", kicker: "When connected", title: "Cloud / head office", text: "Sync saved work and confirm its status." }
            ], optional: { kicker: "Optional idea to test", title: "Store edge gateway", text: "Could support local services during an internet outage. Needs engineering validation." }, caption: "Mesh or Wi-Fi extends the signal, not storage. This is a concept, not More Retail's current infrastructure." }
          ]
        },
        {
          id: "next-steps",
          heading: "The next version needs time on an actual store floor.",
          blocks: [
            { type: "paragraph", text: "This concept grew from secondary research and an informal conversation with a small supermarket owner. Next, I would like to visit six stores across different sales volumes. That would be exploratory, not a representative sample." },
            { type: "cards", items: [
              { title: "Watch the work", text: "See how deliveries are checked, where goods are stowed, how inventory differences are handled and how managers distribute tasks." },
              { title: "Understand the setting", text: "Observe connectivity across the store and how many jobs associates handle at the same time." },
              { title: "Test the assumptions", text: "Validate the two-task limit, priority rules, scanning and manual lookup, quantity checks, duplicate handling, offline sync and the edge network idea." }
            ]},
            { type: "quote", text: "This project pushed me into a new business domain and made me think beyond the screen. I would like to learn from store teams and take the design further with them." }
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------
     Sidequests, photography, videography & experiments
     ------------------------------------------------------------------
     Personal photographs for the Sidequests gallery. The first four are
     also used in the homepage preview. See README.md for adding items.    */
  sidequests: [
    {
      slug: "red-porsche-display",
      title: "Porsche in the showroom",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/red-porsche-display.jpg",
      alt: "A red Porsche displayed behind glass in a modern showroom.",
      caption: "A bright red detail in a quiet showroom.",
      color: "blue"
    },
    {
      slug: "latte-art",
      title: "Latte art",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/latte-art.jpg",
      alt: "A cup of coffee with leaf-shaped foam art on a stone table.",
      caption: "A small pause for coffee.",
      color: "mint"
    },
    {
      slug: "restaurant-interior",
      title: "Restaurant interior",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/restaurant-interior.jpg",
      alt: "A multi-level restaurant with warm wooden screens and dining tables.",
      caption: "Looking down into a busy dining room.",
      color: "lilac"
    },
    {
      slug: "mercedes-f1-model",
      title: "A little F1 car",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/mercedes-f1-model.jpg",
      alt: "A miniature Mercedes Formula One car on a wooden table.",
      caption: "A small model, ready for the grid.",
      color: "yellow"
    },
    {
      slug: "mercedes-f1-model-detail",
      title: "Race car details",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/mercedes-f1-model-detail.jpg",
      alt: "Close-up of a miniature Mercedes Formula One car and its driver.",
      caption: "A closer look at the tiny details.",
      color: "blue"
    },
    {
      slug: "red-bull-f1-display",
      title: "Formula One display",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/red-bull-f1-display.jpg",
      alt: "The rear of a Formula One car in a public display space.",
      caption: "A racing car tucked beneath the city lights.",
      color: "coral"
    },
    {
      slug: "red-bull-garage",
      title: "Red Bull garage",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/red-bull-garage.jpg",
      alt: "A hand holding a drink in front of a Red Bull racing display.",
      caption: "A quick stop by the racing display.",
      color: "yellow"
    },
    {
      slug: "restaurant-greenery",
      title: "An indoor garden",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/restaurant-greenery.jpg",
      alt: "A restaurant corner filled with leafy plants and warm lighting.",
      caption: "Greenery tucked into a cozy restaurant corner.",
      color: "mint"
    },
    {
      slug: "street-scene-through-doorway",
      title: "A view through the doorway",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/street-scene-through-doorway.jpg",
      alt: "A black car and flowering plants seen through a glass doorway.",
      caption: "The street, framed by the entrance.",
      color: "lilac"
    },
    {
      slug: "restaurant-table-setting",
      title: "Dinner table",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/restaurant-table-setting.jpg",
      alt: "A restaurant table set with patterned plates, folded napkins and cutlery.",
      caption: "A carefully set table before dinner.",
      color: "blue"
    },
    {
      slug: "appam-and-curry",
      title: "Appam and curry",
      category: "Photography",
      mediaType: "image",
      src: "assets/sidequests/photography/appam-and-curry.jpg",
      alt: "Appam served with curry on a banana leaf plate.",
      caption: "A favorite meal, served fresh.",
      color: "yellow"
    }
  ]
};

