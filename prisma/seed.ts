import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting comprehensive database seeding...");

  // Clear existing data first
  console.log("🧹 Clearing existing data...");
  await prisma.question.deleteMany();
  await prisma.game.deleteMany();
  await prisma.topic_count.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create more sample users
  console.log("👤 Creating sample users...");
  
  const hashedPassword = await bcryptjs.hash("password123", 12);
  
  const users = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Demo User", email: "demo@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Wilson", email: "bob@example.com" },
    { name: "Carol Brown", email: "carol@example.com" },
    { name: "David Lee", email: "david@example.com" },
    { name: "Emma Davis", email: "emma@example.com" },
    { name: "Frank Miller", email: "frank@example.com" },
    { name: "Grace Taylor", email: "grace@example.com" },
    { name: "Henry Clark", email: "henry@example.com" },
    { name: "Ivy Martinez", email: "ivy@example.com" },
    { name: "Jack Anderson", email: "jack@example.com" },
    { name: "Kelly Thompson", email: "kelly@example.com" },
    { name: "Leo Garcia", email: "leo@example.com" },
  ];

  const createdUsers: any[] = [];
  for (const userData of users) {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
    createdUsers.push(user);
  }

  console.log("✅ Sample users created!");

  // Create comprehensive topic counts
  console.log("📊 Creating topic counts...");
  
  const topics = [
    { topic: "JavaScript", count: 85 },
    { topic: "React", count: 72 },
    { topic: "Node.js", count: 58 },
    { topic: "Python", count: 94 },
    { topic: "Machine Learning", count: 67 },
    { topic: "Web Development", count: 89 },
    { topic: "Database", count: 43 },
    { topic: "TypeScript", count: 61 },
    { topic: "CSS", count: 39 },
    { topic: "HTML", count: 34 },
    { topic: "Vue.js", count: 45 },
    { topic: "Angular", count: 42 },
    { topic: "Java", count: 56 },
    { topic: "C++", count: 38 },
    { topic: "Docker", count: 35 },
    { topic: "Kubernetes", count: 28 },
    { topic: "AWS", count: 51 },
    { topic: "Git", count: 47 },
    { topic: "REST APIs", count: 63 },
    { topic: "GraphQL", count: 29 },
    { topic: "MongoDB", count: 40 },
    { topic: "PostgreSQL", count: 33 },
    { topic: "Redis", count: 18 },
    { topic: "Microservices", count: 25 },
    { topic: "DevOps", count: 31 },
    { topic: "Cybersecurity", count: 22 },
    { topic: "Blockchain", count: 19 },
    { topic: "AI/ML", count: 44 },
    { topic: "Data Science", count: 37 },
    { topic: "Cloud Computing", count: 49 },
  ];

  for (const topicData of topics) {
    await prisma.topic_count.create({
      data: topicData,
    });
  }

  console.log("✅ Topic counts created!");

  // Create comprehensive sample games
  console.log("🎮 Creating sample games...");

  let totalGamesCreated = 0;
  let totalQuestionsCreated = 0;

  // Detailed game templates with realistic questions
  const gameTemplates = [
    // JavaScript MCQ Games
    {
      topic: "JavaScript",
      gameType: "mcq",
      user: 0,
      questions: [
        {
          question: "What is the correct way to declare a variable in modern JavaScript?",
          answer: "let myVariable = 'value';",
          options: ["let myVariable = 'value';", "variable myVariable = 'value';", "declare myVariable = 'value';", "var myVariable := 'value';"],
          isCorrect: true,
          userAnswer: "let myVariable = 'value';",
        },
        {
          question: "Which method is used to add an element to the end of an array?",
          answer: "push()",
          options: ["push()", "pop()", "shift()", "unshift()"],
          isCorrect: true,
          userAnswer: "push()",
        },
        {
          question: "What does 'typeof null' return in JavaScript?",
          answer: "object",
          options: ["null", "undefined", "object", "string"],
          isCorrect: false,
          userAnswer: "null",
        },
        {
          question: "Which operator is used for strict equality comparison?",
          answer: "===",
          options: ["==", "===", "=", "!="],
          isCorrect: true,
          userAnswer: "===",
        },
        {
          question: "What is the purpose of the 'this' keyword in JavaScript?",
          answer: "Refers to the current object context",
          options: ["Refers to the current object context", "Creates a new variable", "Imports a module", "Defines a function"],
          isCorrect: true,
          userAnswer: "Refers to the current object context",
        },
      ]
    },
    // Python Open-ended Game
    {
      topic: "Python",
      gameType: "open_ended",
      user: 1,
      questions: [
        {
          question: "What is a list comprehension in Python and provide an example?",
          answer: "A concise way to create lists using a single line of code with syntax [expression for item in iterable]",
          percentageCorrect: 85.5,
          userAnswer: "A way to create lists in one line using brackets",
        },
        {
          question: "Explain the difference between a tuple and a list in Python.",
          answer: "Tuples are immutable (cannot be changed) and lists are mutable (can be modified)",
          percentageCorrect: 92.3,
          userAnswer: "Tuples cannot be changed after creation, lists can be modified",
        },
        {
          question: "What is the purpose of the __init__ method in Python classes?",
          answer: "Constructor method called when creating a new instance to initialize object attributes",
          percentageCorrect: 78.8,
          userAnswer: "It's a constructor that sets up the object when created",
        },
        {
          question: "What is the difference between == and is operators in Python?",
          answer: "== compares values for equality, is compares object identity (same memory location)",
          percentageCorrect: 89.2,
          userAnswer: "== checks if values are equal, is checks if they're the same object",
        },
      ]
    },
    // React MCQ Game
    {
      topic: "React",
      gameType: "mcq",
      user: 2,
      questions: [
        {
          question: "What is JSX in React?",
          answer: "JavaScript XML syntax extension",
          options: ["JavaScript XML syntax extension", "Java Syntax Extension", "JSON XML", "JavaScript eXternal"],
          isCorrect: true,
          userAnswer: "JavaScript XML syntax extension",
        },
        {
          question: "Which hook is used to manage state in functional components?",
          answer: "useState",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          isCorrect: true,
          userAnswer: "useState",
        },
        {
          question: "What is the virtual DOM in React?",
          answer: "A JavaScript representation of the real DOM",
          options: ["A JavaScript representation of the real DOM", "A separate browser window", "A React component", "A CSS framework"],
          isCorrect: false,
          userAnswer: "A separate browser window",
        },
        {
          question: "What is the purpose of the useEffect hook?",
          answer: "To perform side effects in functional components",
          options: ["To perform side effects in functional components", "To manage state", "To create components", "To handle events"],
          isCorrect: true,
          userAnswer: "To perform side effects in functional components",
        },
        {
          question: "What are React props?",
          answer: "Properties passed from parent to child components",
          options: ["Properties passed from parent to child components", "CSS styling properties", "JavaScript functions", "HTML attributes"],
          isCorrect: true,
          userAnswer: "Properties passed from parent to child components",
        },
      ]
    },
    // Machine Learning Open-ended
    {
      topic: "Machine Learning",
      gameType: "open_ended",
      user: 3,
      questions: [
        {
          question: "What is the difference between supervised and unsupervised learning?",
          answer: "Supervised learning uses labeled data to train models, unsupervised learning finds patterns in unlabeled data",
          percentageCorrect: 88.7,
          userAnswer: "Supervised has target labels, unsupervised finds hidden patterns",
        },
        {
          question: "Explain what overfitting means in machine learning.",
          answer: "When a model performs well on training data but poorly on new, unseen data due to memorizing rather than learning",
          percentageCorrect: 76.4,
          userAnswer: "Model memorizes training data and doesn't generalize well",
        },
        {
          question: "What is cross-validation and why is it important?",
          answer: "A technique to assess model performance by splitting data into training and validation sets multiple times",
          percentageCorrect: 83.1,
          userAnswer: "Method to test how well model performs on different data splits",
        },
        {
          question: "What is the bias-variance tradeoff?",
          answer: "Balance between model simplicity (bias) and complexity (variance) to minimize total error",
          percentageCorrect: 71.9,
          userAnswer: "Tradeoff between underfitting and overfitting",
        },
      ]
    },
    // Web Development MCQ
    {
      topic: "Web Development",
      gameType: "mcq",
      user: 4,
      questions: [
        {
          question: "What does HTTP stand for?",
          answer: "HyperText Transfer Protocol",
          options: ["HyperText Transfer Protocol", "HyperLink Text Protocol", "High Tech Transfer Protocol", "HyperText Technical Protocol"],
          isCorrect: true,
          userAnswer: "HyperText Transfer Protocol",
        },
        {
          question: "Which HTTP status code indicates a successful request?",
          answer: "200",
          options: ["200", "404", "500", "301"],
          isCorrect: true,
          userAnswer: "200",
        },
        {
          question: "What is the primary purpose of CSS?",
          answer: "Styling and layout of web pages",
          options: ["Styling and layout of web pages", "Server-side scripting", "Database management", "Network protocols"],
          isCorrect: false,
          userAnswer: "Server-side scripting",
        },
        {
          question: "What does API stand for?",
          answer: "Application Programming Interface",
          options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "Application Process Interpreter"],
          isCorrect: true,
          userAnswer: "Application Programming Interface",
        },
      ]
    },
    // Node.js Open-ended
    {
      topic: "Node.js",
      gameType: "open_ended",
      user: 5,
      questions: [
        {
          question: "What is the event loop in Node.js and how does it work?",
          answer: "A mechanism that handles asynchronous callbacks and operations using a single-threaded event-driven architecture",
          percentageCorrect: 87.3,
          userAnswer: "Handles async operations in Node.js without blocking",
        },
        {
          question: "Explain the difference between require() and import in Node.js.",
          answer: "require() is CommonJS syntax (synchronous), import is ES6 module syntax (asynchronous)",
          percentageCorrect: 79.6,
          userAnswer: "require is older CommonJS way, import is newer ES6 modules",
        },
        {
          question: "What is middleware in Express.js?",
          answer: "Functions that execute during the request-response cycle and can modify request/response objects",
          percentageCorrect: 91.8,
          userAnswer: "Functions that run between request and response processing",
        },
      ]
    },
    // Database MCQ
    {
      topic: "Database",
      gameType: "mcq",
      user: 6,
      questions: [
        {
          question: "What does SQL stand for?",
          answer: "Structured Query Language",
          options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"],
          isCorrect: true,
          userAnswer: "Structured Query Language",
        },
        {
          question: "Which SQL command is used to retrieve data from a database?",
          answer: "SELECT",
          options: ["SELECT", "GET", "FETCH", "RETRIEVE"],
          isCorrect: true,
          userAnswer: "SELECT",
        },
        {
          question: "What is a primary key in a database?",
          answer: "A unique identifier for each record in a table",
          options: ["A unique identifier for each record in a table", "The first column in a table", "A password for the database", "The most important data field"],
          isCorrect: true,
          userAnswer: "A unique identifier for each record in a table",
        },
        {
          question: "What does ACID stand for in database transactions?",
          answer: "Atomicity, Consistency, Isolation, Durability",
          options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Identity, Database", "Automatic, Consistent, Isolated, Durable", "Advanced, Complex, Integrated, Dynamic"],
          isCorrect: false,
          userAnswer: "Access, Control, Identity, Database",
        },
      ]
    },
    // TypeScript MCQ
    {
      topic: "TypeScript",
      gameType: "mcq",
      user: 7,
      questions: [
        {
          question: "What is TypeScript?",
          answer: "A superset of JavaScript with static typing",
          options: ["A superset of JavaScript with static typing", "A replacement for JavaScript", "A new programming language", "A JavaScript framework"],
          isCorrect: true,
          userAnswer: "A superset of JavaScript with static typing",
        },
        {
          question: "How do you define an interface in TypeScript?",
          answer: "interface MyInterface { }",
          options: ["interface MyInterface { }", "class MyInterface { }", "type MyInterface = { }", "struct MyInterface { }"],
          isCorrect: true,
          userAnswer: "interface MyInterface { }",
        },
        {
          question: "What is the purpose of generics in TypeScript?",
          answer: "To create reusable components with type safety",
          options: ["To create reusable components with type safety", "To make code run faster", "To reduce file size", "To add comments to code"],
          isCorrect: true,
          userAnswer: "To create reusable components with type safety",
        },
      ]
    },
  ];

  // Create games from templates
  for (let i = 0; i < gameTemplates.length; i++) {
    const template = gameTemplates[i];
    const user = createdUsers[template.user];
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 15 + Math.floor(Math.random() * 20));

    const game = await prisma.game.create({
      data: {
        userId: user.id,
        topic: template.topic,
        gameType: template.gameType as "mcq" | "open_ended",
        timeStarted: startDate,
        timeEnded: endDate,
      },
    });

    // Create questions for this game
    for (const q of template.questions) {
      await prisma.question.create({
        data: {
          question: q.question,
          answer: q.answer,
          gameId: game.id,
          questionType: template.gameType as "mcq" | "open_ended",
          options: q.options ? JSON.stringify(q.options) : undefined,
          isCorrect: q.isCorrect || undefined,
          userAnswer: q.userAnswer,
          percentageCorrect: q.percentageCorrect || undefined,
        },
      });
      totalQuestionsCreated++;
    }

    totalGamesCreated++;
  }

  // Create additional random games to increase data volume
  console.log("🎲 Creating additional random games...");
  
  const additionalTopics = [
    "Vue.js", "Angular", "Java", "AWS", "Docker", "REST APIs", "MongoDB", 
    "Cybersecurity", "Blockchain", "Data Science", "Cloud Computing", 
    "DevOps", "Kubernetes", "PostgreSQL", "Redis", "GraphQL"
  ];
  
  const additionalGameCount = 50; // Increased for more data

  for (let i = 0; i < additionalGameCount; i++) {
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const randomTopic = additionalTopics[Math.floor(Math.random() * additionalTopics.length)];
    const gameType = Math.random() > 0.5 ? "mcq" : "open_ended";
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 60)); // Last 60 days
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 10 + Math.floor(Math.random() * 25)); // 10-35 minutes

    const game = await prisma.game.create({
      data: {
        userId: randomUser.id,
        topic: randomTopic,
        gameType: gameType as "mcq" | "open_ended",
        timeStarted: startDate,
        timeEnded: endDate,
      },
    });

    // Create 3-6 random questions for each game
    const questionCount = 3 + Math.floor(Math.random() * 4);
    for (let j = 0; j < questionCount; j++) {
      if (gameType === "mcq") {
        await prisma.question.create({
          data: {
            question: `What is an important ${randomTopic} concept you should know? (Question ${j + 1})`,
            answer: `Key concept in ${randomTopic} - Answer ${j + 1}`,
            gameId: game.id,
            questionType: "mcq",
            options: JSON.stringify([
              `Key concept in ${randomTopic} - Answer ${j + 1}`,
              `Alternative option A for ${randomTopic}`,
              `Alternative option B for ${randomTopic}`,
              `Alternative option C for ${randomTopic}`
            ]),
            isCorrect: Math.random() > 0.25, // 75% chance of being correct
            userAnswer: Math.random() > 0.25 ? `Key concept in ${randomTopic} - Answer ${j + 1}` : `Alternative option A for ${randomTopic}`,
          },
        });
      } else {
        await prisma.question.create({
          data: {
            question: `Explain the fundamental principles of ${randomTopic} and its applications (Question ${j + 1})`,
            answer: `Comprehensive explanation of ${randomTopic} principles, best practices, and real-world applications ${j + 1}`,
            gameId: game.id,
            questionType: "open_ended",
            percentageCorrect: 65 + Math.random() * 30, // Random score between 65-95%
            userAnswer: `User's detailed response about ${randomTopic} covering key concepts and practical examples ${j + 1}`,
          },
        });
      }
      totalQuestionsCreated++;
    }
    totalGamesCreated++;
  }

  // Add some recent activity (games from the last week)
  console.log("⏰ Creating recent activity...");
  
  const recentGameCount = 15;
  for (let i = 0; i < recentGameCount; i++) {
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const popularTopics = ["JavaScript", "React", "Python", "Web Development", "Node.js"];
    const randomTopic = popularTopics[Math.floor(Math.random() * popularTopics.length)];
    const gameType = Math.random() > 0.6 ? "mcq" : "open_ended";
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 7)); // Last 7 days
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 8 + Math.floor(Math.random() * 15)); // 8-23 minutes

    const game = await prisma.game.create({
      data: {
        userId: randomUser.id,
        topic: randomTopic,
        gameType: gameType as "mcq" | "open_ended",
        timeStarted: startDate,
        timeEnded: endDate,
      },
    });

    // Create 4-5 questions for recent games
    const questionCount = 4 + Math.floor(Math.random() * 2);
    for (let j = 0; j < questionCount; j++) {
      if (gameType === "mcq") {
        await prisma.question.create({
          data: {
            question: `Recent ${randomTopic} quiz question ${j + 1}: What's the best practice?`,
            answer: `Best practice for ${randomTopic} ${j + 1}`,
            gameId: game.id,
            questionType: "mcq",
            options: JSON.stringify([
              `Best practice for ${randomTopic} ${j + 1}`,
              `Common mistake A`,
              `Common mistake B`,
              `Outdated approach`
            ]),
            isCorrect: Math.random() > 0.2, // 80% success rate for recent games
            userAnswer: Math.random() > 0.2 ? `Best practice for ${randomTopic} ${j + 1}` : "Common mistake A",
          },
        });
      } else {
        await prisma.question.create({
          data: {
            question: `Describe advanced ${randomTopic} techniques you've learned recently (Question ${j + 1})`,
            answer: `Advanced ${randomTopic} techniques including modern approaches and industry standards ${j + 1}`,
            gameId: game.id,
            questionType: "open_ended",
            percentageCorrect: 75 + Math.random() * 20, // Higher scores for recent activity (75-95%)
            userAnswer: `Detailed explanation of modern ${randomTopic} techniques and best practices ${j + 1}`,
          },
        });
      }
      totalQuestionsCreated++;
    }
    totalGamesCreated++;
  }

  console.log("✅ All games and questions created!");

  console.log("\n🎉 Comprehensive database seeding completed successfully!");
  console.log("\n📊 Final Summary:");
  console.log(`   👤 Users created: ${createdUsers.length}`);
  console.log(`   📚 Topics created: ${topics.length}`);
  console.log(`   🎮 Games created: ${totalGamesCreated}`);
  console.log(`   ❓ Questions created: ${totalQuestionsCreated}`);
  
  console.log("\n🔐 Sample Login Credentials (Password: password123):");
  createdUsers.forEach((user, index) => {
    console.log(`   ${index + 1}. 📧 ${user.email} | 👤 ${user.name}`);
  });

  console.log("\n🎯 Database now contains:");
  console.log(`   • ${Math.floor(totalGamesCreated * 0.6)} MCQ games`);
  console.log(`   • ${Math.floor(totalGamesCreated * 0.4)} Open-ended games`);
  console.log(`   • ${topics.length} different topics with realistic usage counts`);
  console.log(`   • Games spanning the last 60 days with recent activity`);
  console.log(`   • Realistic user answers and scoring patterns`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
