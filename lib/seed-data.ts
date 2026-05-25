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
        id: "average",
        slug: "average",
        title: "Average",
        summary: "Practice average, total sum, replacement, consecutive number, and score-improvement questions.",
        questions: [
          {
            id: "average-1",
            prompt: "What is the average of 10, 20, and 30?",
            options: [
              { id: "average-1-a", text: "15" },
              { id: "average-1-b", text: "20" },
              { id: "average-1-c", text: "25" },
              { id: "average-1-d", text: "30" }
            ],
            correctOptionId: "average-1-b",
            explanation: "Average = (10 + 20 + 30) / 3 = 60 / 3 = 20.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-2",
            prompt: "The average of 5, 10, and 15 is:",
            options: [
              { id: "average-2-a", text: "8" },
              { id: "average-2-b", text: "10" },
              { id: "average-2-c", text: "12" },
              { id: "average-2-d", text: "15" }
            ],
            correctOptionId: "average-2-b",
            explanation: "Average = (5 + 10 + 15) / 3 = 30 / 3 = 10.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-3",
            prompt: "What is the average of 12, 18, 24, and 30?",
            options: [
              { id: "average-3-a", text: "18" },
              { id: "average-3-b", text: "20" },
              { id: "average-3-c", text: "21" },
              { id: "average-3-d", text: "24" }
            ],
            correctOptionId: "average-3-c",
            explanation: "Average = (12 + 18 + 24 + 30) / 4 = 84 / 4 = 21.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-4",
            prompt: "The average of 8 and 16 is:",
            options: [
              { id: "average-4-a", text: "10" },
              { id: "average-4-b", text: "12" },
              { id: "average-4-c", text: "14" },
              { id: "average-4-d", text: "16" }
            ],
            correctOptionId: "average-4-b",
            explanation: "Average = (8 + 16) / 2 = 24 / 2 = 12.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-5",
            prompt: "Find the average of 25, 35, 45, and 55.",
            options: [
              { id: "average-5-a", text: "35" },
              { id: "average-5-b", text: "40" },
              { id: "average-5-c", text: "45" },
              { id: "average-5-d", text: "50" }
            ],
            correctOptionId: "average-5-b",
            explanation: "Average = (25 + 35 + 45 + 55) / 4 = 160 / 4 = 40.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-6",
            prompt: "The average of 6 numbers is 10. What is their total sum?",
            options: [
              { id: "average-6-a", text: "50" },
              { id: "average-6-b", text: "60" },
              { id: "average-6-c", text: "70" },
              { id: "average-6-d", text: "80" }
            ],
            correctOptionId: "average-6-b",
            explanation: "Total sum = average x number of values = 10 x 6 = 60.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-7",
            prompt: "What is the average of 14, 16, 18, and 20?",
            options: [
              { id: "average-7-a", text: "15" },
              { id: "average-7-b", text: "16" },
              { id: "average-7-c", text: "17" },
              { id: "average-7-d", text: "18" }
            ],
            correctOptionId: "average-7-c",
            explanation: "Average = (14 + 16 + 18 + 20) / 4 = 68 / 4 = 17.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-8",
            prompt: "The average age of 4 students is 15 years. What is the total age?",
            options: [
              { id: "average-8-a", text: "45" },
              { id: "average-8-b", text: "50" },
              { id: "average-8-c", text: "60" },
              { id: "average-8-d", text: "75" }
            ],
            correctOptionId: "average-8-c",
            explanation: "Total age = 4 x 15 = 60 years.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-9",
            prompt: "What is the average of 50 and 70?",
            options: [
              { id: "average-9-a", text: "55" },
              { id: "average-9-b", text: "60" },
              { id: "average-9-c", text: "65" },
              { id: "average-9-d", text: "70" }
            ],
            correctOptionId: "average-9-b",
            explanation: "Average = (50 + 70) / 2 = 120 / 2 = 60.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-10",
            prompt: "The average of 9, 11, 13, and 15 is:",
            options: [
              { id: "average-10-a", text: "11" },
              { id: "average-10-b", text: "12" },
              { id: "average-10-c", text: "13" },
              { id: "average-10-d", text: "14" }
            ],
            correctOptionId: "average-10-b",
            explanation: "Average = (9 + 11 + 13 + 15) / 4 = 48 / 4 = 12.",
            difficulty: "BEGINNER",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-11",
            prompt: "The average of 8 numbers is 25. If one number 35 is removed, what will be the new average?",
            options: [
              { id: "average-11-a", text: "22" },
              { id: "average-11-b", text: "23.57" },
              { id: "average-11-c", text: "24" },
              { id: "average-11-d", text: "25" }
            ],
            correctOptionId: "average-11-b",
            explanation: "Old total = 8 x 25 = 200. New total = 200 - 35 = 165. New average = 165 / 7 = 23.57.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-12",
            prompt: "The average of 5 consecutive numbers is 20. What is the largest number?",
            options: [
              { id: "average-12-a", text: "21" },
              { id: "average-12-b", text: "22" },
              { id: "average-12-c", text: "23" },
              { id: "average-12-d", text: "24" }
            ],
            correctOptionId: "average-12-b",
            explanation: "The five consecutive numbers are 18, 19, 20, 21, and 22, so the largest is 22.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-13",
            prompt: "The average marks of 10 students is 60. If one student scored 80 marks, what is the total marks of all students?",
            options: [
              { id: "average-13-a", text: "500" },
              { id: "average-13-b", text: "550" },
              { id: "average-13-c", text: "600" },
              { id: "average-13-d", text: "650" }
            ],
            correctOptionId: "average-13-c",
            explanation: "Total marks = average x number of students = 60 x 10 = 600.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-14",
            prompt: "The average of 7 numbers is 45. If a new number is added, the average becomes 50. Find the new number.",
            options: [
              { id: "average-14-a", text: "70" },
              { id: "average-14-b", text: "80" },
              { id: "average-14-c", text: "85" },
              { id: "average-14-d", text: "90" }
            ],
            correctOptionId: "average-14-c",
            explanation: "Old total = 7 x 45 = 315. New total = 8 x 50 = 400. New number = 400 - 315 = 85.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-15",
            prompt: "The average age of 6 boys is 12 years. If the age of one boy is 14 years, what is the total age of remaining boys?",
            options: [
              { id: "average-15-a", text: "58" },
              { id: "average-15-b", text: "60" },
              { id: "average-15-c", text: "72" },
              { id: "average-15-d", text: "74" }
            ],
            correctOptionId: "average-15-a",
            explanation: "Total age = 6 x 12 = 72. Remaining total = 72 - 14 = 58.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-16",
            prompt: "The average of first 10 natural numbers is:",
            options: [
              { id: "average-16-a", text: "5" },
              { id: "average-16-b", text: "5.5" },
              { id: "average-16-c", text: "6" },
              { id: "average-16-d", text: "6.5" }
            ],
            correctOptionId: "average-16-b",
            explanation: "The first 10 natural numbers sum to 55, so average = 55 / 10 = 5.5.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-17",
            prompt: "The average salary of 20 workers is Rs. 15,000. If one worker with salary Rs. 25,000 leaves, what is the new average salary?",
            options: [
              { id: "average-17-a", text: "Rs. 14,474" },
              { id: "average-17-b", text: "Rs. 14,000" },
              { id: "average-17-c", text: "Rs. 15,000" },
              { id: "average-17-d", text: "Rs. 15,500" }
            ],
            correctOptionId: "average-17-a",
            explanation: "Old total = 20 x 15000 = 300000. New total = 300000 - 25000 = 275000. New average = 275000 / 19 = 14473.68, about Rs. 14,474.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-18",
            prompt: "The average of three numbers is 40. If two numbers are 35 and 45, find the third number.",
            options: [
              { id: "average-18-a", text: "35" },
              { id: "average-18-b", text: "40" },
              { id: "average-18-c", text: "45" },
              { id: "average-18-d", text: "50" }
            ],
            correctOptionId: "average-18-b",
            explanation: "Total = 3 x 40 = 120. Third number = 120 - 35 - 45 = 40.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-19",
            prompt: "A batsman scored 50 runs on average in 8 matches. How many runs must he score in the 9th match to raise the average to 52?",
            options: [
              { id: "average-19-a", text: "60" },
              { id: "average-19-b", text: "66" },
              { id: "average-19-c", text: "68" },
              { id: "average-19-d", text: "70" }
            ],
            correctOptionId: "average-19-c",
            explanation: "Old total = 8 x 50 = 400. New total = 9 x 52 = 468. Required runs = 468 - 400 = 68.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          },
          {
            id: "average-20",
            prompt: "The average weight of 5 persons is 60 kg. If one person weighing 70 kg is replaced by another person, the average becomes 58 kg. What is the weight of the new person?",
            options: [
              { id: "average-20-a", text: "50 kg" },
              { id: "average-20-b", text: "55 kg" },
              { id: "average-20-c", text: "58 kg" },
              { id: "average-20-d", text: "60 kg" }
            ],
            correctOptionId: "average-20-d",
            explanation: "Old total = 5 x 60 = 300. New total = 5 x 58 = 290. Other four people total 300 - 70 = 230, so new person = 290 - 230 = 60 kg.",
            difficulty: "ADVANCED",
            companyTags: ["TCS", "Infosys"]
          }
        ]
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
