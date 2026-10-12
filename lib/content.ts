export const contactEmail = "contact@thefoleycollective.com";
export const navigation = [
  { label: "What we do", href: "/#services" },
  { label: "Our approach", href: "/#approach" },
  { label: "The collective", href: "/#collective" },
];

export const services = [
  {
    number: "01",
    icon: "compass",
    title: "A clear product strategy.",
    description:
      "Start with the problem, not the feature list. We shape your idea into a focused roadmap that puts your users and business first.",
    tags: ["Discovery & strategy", "MVP planning"],
  },
  {
    number: "02",
    icon: "pen",
    title: "Design people connect with.",
    description:
      "Thoughtful flows. Intuitive interfaces. We design experiences that feel natural, then prototype them before writing the first line of code.",
    tags: ["UX research", "UI & prototyping"],
  },
  {
    number: "03",
    icon: "code",
    title: "Built to work. Built to grow.",
    description:
      "From mobile apps to web platforms, we turn designs into dependable products with a foundation for what comes next.",
    tags: ["Mobile & web apps", "Integrations"],
  },
  {
    number: "04",
    icon: "rocket",
    title: "Launch is just the beginning.",
    description:
      "Get your product ready for the real world. Then keep learning, refining, and building around the people who use it.",
    tags: ["Launch preparation", "Ongoing support"],
  },
] as const;

export const process = [
  {
    title: "Understand",
    description:
      "We get to know your idea, your audience, and what a successful first release should do.",
    output: "A shared direction",
  },
  {
    title: "Shape",
    description:
      "We map the essentials and make the experience tangible through design and prototypes.",
    output: "A product you can see",
  },
  {
    title: "Build",
    description:
      "We develop in focused iterations, keeping you close to the product as it takes shape.",
    output: "Progress you can follow",
  },
  {
    title: "Launch & evolve",
    description:
      "We prepare for release, gather real feedback, and plan the improvements that matter.",
    output: "A foundation to grow",
  },
];

export const faqs = [
  {
    question:
      "I have an idea, but no technical background. Can we work together?",
    answer:
      "Absolutely. Bring the problem you want to solve and what you know about your audience. We can help clarify the concept, prioritize the essentials, and explain the technical choices in plain language.",
  },
  {
    question: "Do you build both mobile and web apps?",
    answer:
      "Yes. Our focus covers mobile applications and web-based products. We choose the approach around your users, the experience you need, and the scope of your first release—not a one-size-fits-all stack.",
  },
  {
    question: "How do you scope and price a project?",
    answer:
      "We start with a conversation about your goals, current stage, budget, and timing. From there, we define a practical scope and proposal. Costs and schedules are agreed for your project rather than promised before we understand it.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch support and ongoing improvements can be scoped into the engagement. We discuss maintenance, feedback, and the next priorities with you so that the handoff and future responsibilities are clear.",
  },
];
