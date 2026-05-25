export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  prompt: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  companyTags: string[];
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  questions: Question[];
};

export type Subject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  topics: Topic[];
};

export const subjects: Subject[] = [
  {
    id: "aptitude",
    slug: "aptitude",
    title: "Aptitude",
    description: "Placement-focused quantitative aptitude for service and product companies.",
    topics: [
      {
        id: "clock",
        slug: "clock",
        title: "Clock",
        summary: "Master angle, mirror image, and time-based clock questions.",
        questions: [
          {
            id: "clock-1",
            prompt: "What is the angle between the hour hand and minute hand at 3:30?",
            options: [
              { id: "clock-1-a", text: "60 degrees" },
              { id: "clock-1-b", text: "75 degrees" },
              { id: "clock-1-c", text: "90 degrees" },
              { id: "clock-1-d", text: "105 degrees" }
            ],
            correctOptionId: "clock-1-b",
            explanation: "At 3:30, the minute hand is at 180 degrees and the hour hand is at 105 degrees, so the angle is 75 degrees.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "clock-2",
            prompt: "How many times do the hands of a clock coincide in 12 hours?",
            options: [
              { id: "clock-2-a", text: "10" },
              { id: "clock-2-b", text: "11" },
              { id: "clock-2-c", text: "12" },
              { id: "clock-2-d", text: "24" }
            ],
            correctOptionId: "clock-2-b",
            explanation: "The hands coincide 11 times in every 12-hour cycle.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Wipro"]
          }
        ]
      },
      {
        id: "number-system",
        slug: "number-system",
        title: "Number System",
        summary: "Divisibility, remainders, factors, HCF, LCM, and number properties.",
        questions: []
      },
      {
        id: "time-and-work",
        slug: "time-and-work",
        title: "Time and Work",
        summary: "Work rate, efficiency, pipes, cisterns, and collaboration problems.",
        questions: []
      },
      {
        id: "percentage",
        slug: "percentage",
        title: "Percentage",
        summary: "Fast percentage changes, comparisons, and exam-style shortcuts.",
        questions: []
      },
      {
        id: "profit-and-loss",
        slug: "profit-and-loss",
        title: "Profit and Loss",
        summary: "Cost price, selling price, discount, markup, and loss calculations.",
        questions: []
      },
      {
        id: "ratio-and-proportion",
        slug: "ratio-and-proportion",
        title: "Ratio and Proportion",
        summary: "Ratios, shares, mixtures, and proportional reasoning.",
        questions: []
      }
    ]
  },
  {
    id: "cpp",
    slug: "cpp",
    title: "C++",
    description: "Core C++ concepts, OOP, memory, STL, and coding interview foundations.",
    topics: [
      {
        id: "cpp-oop",
        slug: "oop",
        title: "OOP",
        summary: "Classes, inheritance, polymorphism, and encapsulation.",
        questions: []
      }
    ]
  },
  {
    id: "python",
    slug: "python",
    title: "Python",
    description: "Python fundamentals, data structures, functions, and coding questions.",
    topics: [
      {
        id: "python-basics",
        slug: "basics",
        title: "Basics",
        summary: "Syntax, lists, dictionaries, loops, and functions.",
        questions: []
      }
    ]
  },
  {
    id: "java",
    slug: "java",
    title: "Java",
    description: "Java basics, OOP, collections, exceptions, and interview MCQs.",
    topics: [
      {
        id: "java-oop",
        slug: "oop",
        title: "OOP",
        summary: "Java classes, interfaces, inheritance, and polymorphism.",
        questions: []
      }
    ]
  },
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript",
    description: "JavaScript fundamentals for web and placement interview preparation.",
    topics: [
      {
        id: "js-basics",
        slug: "basics",
        title: "Basics",
        summary: "Variables, closures, arrays, objects, and async behavior.",
        questions: []
      }
    ]
  }
];

export const companies = [
  {
    slug: "tcs",
    name: "TCS",
    summary: "Aptitude, verbal ability, reasoning, coding basics, and interview readiness."
  },
  {
    slug: "google",
    name: "Google",
    summary: "Problem solving, data structures, algorithms, and system-thinking practice."
  },
  {
    slug: "amazon",
    name: "Amazon",
    summary: "Coding, logical thinking, leadership-principle style scenarios, and MCQ practice."
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    summary: "Programming fundamentals, debugging, data structures, and analytical practice."
  },
  {
    slug: "infosys",
    name: "Infosys",
    summary: "Quantitative aptitude, logical reasoning, programming basics, and HR prep."
  },
  {
    slug: "flipkart",
    name: "Flipkart",
    summary: "Coding foundations, analytical reasoning, and product-company interview practice."
  }
];

export function findSubject(subjectSlug: string) {
  return subjects.find((subject) => subject.slug === subjectSlug);
}

export function findTopic(subjectSlug: string, topicSlug: string) {
  return findSubject(subjectSlug)?.topics.find((topic) => topic.slug === topicSlug);
}

export function allTopics() {
  return subjects.flatMap((subject) =>
    subject.topics.map((topic) => ({
      ...topic,
      subjectSlug: subject.slug,
      subjectTitle: subject.title
    }))
  );
}
