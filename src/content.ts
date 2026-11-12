export type Role = {
  /** Unique key, also used by the kite fight to mark a year as cut. */
  id: string;
  /** Date range shown on the thread. */
  when: string;
  /** Short year used as the rival kite's label. */
  short: string;
  place: string;
  href?: string;
  title: string;
  copy?: string;
  stack?: string[];
};

/** Newest first, as the thread reads. */
export const roles: Role[] = [
  {
    id: "loblaw",
    when: "Oct 2024 – present",
    short: "2024",
    place: "Loblaw Digital",
    href: "https://www.loblawdigital.co/",
    title: "Sr Developer, eComm",
    copy: "Loblaw Digital designs, builds, and runs the digital properties of Loblaw Companies, Canada's largest retailer. I build customer-facing web experiences for its retail brands.",
  },
  {
    id: "time-off",
    when: "Mar 2024 – Oct 2024",
    short: "2024",
    place: "Time off",
    title: "Between roles",
    copy: "Took time off between roles.",
  },
  {
    id: "vena",
    when: "Jan 2020 – Mar 2024",
    short: "2020",
    place: "Vena Solutions",
    href: "https://www.venasolutions.com/",
    title: "Senior Frontend Developer",
    copy: "A Microsoft-native financial planning and analysis (FP&A) platform for finance teams. I was a founding member of Kardia, the in-house design library that grew out of our Frontend Guild.",
  },
  {
    id: "nobul",
    when: "Jan 2019 – Dec 2019",
    short: "2019",
    place: "nobul",
    href: "https://nobul.com/",
    title: "Full-stack Developer",
    copy: "A real-estate marketplace for buyers, sellers, and agents. I worked across the stack, from React and Next.js on the client to Node, GraphQL, and PostgreSQL on GCP.",
    stack: ["React", "Next.js", "Node", "GraphQL", "Apollo", "PostgreSQL", "GCP"],
  },
  {
    id: "northern-block",
    when: "Sept 2018 – Jan 2019",
    short: "2018",
    place: "Northern Block",
    href: "https://northernblock.io/",
    title: "Front-end Developer",
    copy: "Technology for trusted digital interactions between people, organizations, and things. I built front ends for its blockchain products in React, Redux, and RxJS.",
    stack: ["React", "Redux", "Flux", "RxJS", "Context API", "Webpack", "Babel", "Jest", "Enzyme"],
  },
  {
    id: "clausehound",
    when: "Jan 2015 – Aug 2018",
    short: "2015",
    place: "Clausehound",
    href: "https://www.clausehound.com/",
    title: "Front-end Developer",
    copy: "Legal tech that turns statutes, regulations, and contracts into a versioned clause model, like git for the law. My first role in Toronto: I moved a legacy app onto React and Flux and integrated APIs across several products.",
    stack: ["React", "Flux", "Webpack", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "george-brown",
    when: "2014 – 2015",
    short: "2014",
    place: "George Brown College",
    href: "https://www.georgebrown.ca/",
    title: "Post-Graduate Certificate, Interactive Media Management",
    copy: "Back then the program was called Advanced Digital Design. It brought me from Jaipur to Toronto.",
  },
  {
    id: "veesys-2013",
    when: "Jun 2013 – Aug 2014",
    short: "2013",
    place: "Veesys Info Solutions",
    href: "http://www.veesys.com/",
    title: "Front-end Developer / Designer",
    copy: "An IT consulting and application development firm in Jaipur. I came back to design and build front ends, moving further from pure design.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery", "Photoshop", "Illustrator"],
  },
  {
    id: "digitize",
    when: "Nov 2012 – Jun 2013",
    short: "2012",
    place: "Digitize Software",
    title: "Front-end Developer / Designer",
    copy: "A software company in Jaipur. Eight months designing and building front ends, between my two stints at Veesys.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery", "Photoshop", "Illustrator"],
  },
  {
    id: "veesys-2012",
    when: "Jun 2012 – Nov 2012",
    short: "2012",
    place: "Veesys Info Solutions",
    href: "http://www.veesys.com/",
    title: "Front-end Developer / Designer",
    copy: "An IT consulting and application development firm in Jaipur. My first stint there, designing and building front ends with HTML, CSS, and jQuery.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery", "Photoshop", "Illustrator"],
  },
  {
    id: "doomshell",
    when: "May 2011 – Jun 2012",
    short: "2011",
    place: "Doomshell Software",
    href: "http://www.doomshell.com/",
    title: "Front-end Developer / Designer",
    copy: "A web, software, and mobile development company in Jaipur. Where I started leaning into development, from jQuery to ActionScript.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery", "ActionScript", "Photoshop", "Illustrator"],
  },
  {
    id: "a3logics",
    when: "Sept 2008 – Nov 2010",
    short: "2008",
    place: "A3Logics",
    href: "http://a3logics.com/",
    title: "Graphic Designer",
    copy: "A custom software and product engineering company in Jaipur. My first job in technology, as a graphic designer.",
  },
  {
    id: "smu",
    when: "2007 – 2010",
    short: "2007",
    place: "Sikkim Manipal University",
    title: "B.Sc., Information Technology",
    copy: "Studied IT while working as a designer.",
  },
];

/** Rival kites arrive oldest first, so a fight retells the story in order. */
const notJobs = new Set(["time-off", "george-brown", "smu"]);

export const fightRoster = [...roles]
  .filter((role) => !notJobs.has(role.id))
  .reverse()
  .map(({ id, short, place }) => ({ id, label: short, place }));

export const craft = [
  {
    title: "Interfaces",
    copy:
      "React since 2015, component by component. CSS from layout and Grid to the polish that makes a screen feel finished, a habit from starting out as a designer.",
  },
  {
    title: "Systems",
    copy:
      "Microfrontends that let teams ship on their own. GraphQL and Apollo shaped around what a screen actually needs, with Node services and Redux state behind them.",
  },
  {
    title: "People",
    copy:
      "Code reviews, pairing, and growing the engineers beside me. When a tool I build saves me time, I hand it to the team too.",
  },
];

export const motto = ["Learn.", "Build.", "Teach."];

export const tools = [
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "Next.js",
  "GraphQL",
  "Apollo",
  "Node",
  "CSS & SCSS",
  "Tailwind",
  "Jest",
  "Webpack",
  "Microfrontends",
  "Jenkins",
  "GitHub",
  "AI agents",
  "LLMs & prompts",
];

/**
 * Real sessions from the redesign of this site, shown as a small sample of
 * what the memory bank records.
 */
export const memory = [
  {
    date: "2026-11-11",
    title: "Bend2 feasibility",
    summary:
      "Checked what moving this site from React to Bend2 would take. Bend has no DOM or text rendering, so React stays.",
    tags: ["research", "bend"],
  },
  {
    date: "2026-11-11",
    title: "Patang redesign",
    summary:
      "Rebuilt the site around a kite on a string: rope physics on a canvas, words that lean as the string passes, a hidden kite fight.",
    tags: ["build", "canvas", "design"],
  },
  {
    date: "2026-11-11",
    title: "Wo kata",
    summary:
      "Swapped a Gujarati kite cry for the Hindi one a Jaipur rooftop would shout, with an English gloss.",
    tags: ["copy", "kite"],
  },
  {
    date: "2026-11-11",
    title: "LinkedIn sync",
    summary:
      "Pulled dates, stacks, and education from my LinkedIn export and listed every conflict with the site before changing it.",
    tags: ["content", "timeline"],
  },
  {
    date: "2026-11-11",
    title: "Timeline order",
    summary: "Split Veesys into its two stints so the thread runs in order around Digitize.",
    tags: ["fix", "timeline"],
  },
  {
    date: "2026-11-11",
    title: "The workshop",
    summary: "Added this section about the AI tools I build, with this search as the demo.",
    tags: ["build", "ai"],
  },
];

export const agentCliSteps = [
  {
    title: "List the repeats",
    copy: "The questions, lookups, file reads, and commands agents keep doing over and over.",
  },
  {
    title: "Build the CLI",
    copy: "One subcommand per repeat, each with --help and --json. No new dependencies.",
  },
  {
    title: "Use it first",
    copy: "A line in agents.md tells agents to reach for agent-cli before re-reading a file.",
  },
  {
    title: "Before and after",
    copy: "Measure how much faster, and how much cheaper in tokens, the repeated work got.",
  },
];
