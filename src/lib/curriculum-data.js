/**
 * Comprehensive Curriculum Data Structure
 * Organized by Class (LKG to 12th/2nd Year) and Board (CBSE & State)
 */

export const CURRICULUM_STRUCTURE = {
  // Pre-Primary Education
  LKG: {
    name: "Lower Kindergarten",
    ageGroup: "3-4 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets A-Z", "Phonics", "Simple Words", "Rhymes"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-20", "Shapes", "Colors", "Patterns"] },
          { id: "evs", name: "Environmental Studies", topics: ["My Body", "My Family", "Animals", "Plants"] },
          { id: "art", name: "Art & Craft", topics: ["Drawing", "Coloring", "Clay Modeling"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets", "Simple Words", "Rhymes"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-20", "Shapes", "Colors"] },
          { id: "evs", name: "Environmental Studies", topics: ["My Body", "My Family", "Animals"] },
          { id: "regional", name: "Regional Language", topics: ["Alphabets", "Simple Words"] }
        ]
      }
    }
  },

  UKG: {
    name: "Upper Kindergarten",
    ageGroup: "4-5 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets", "Two-letter Words", "Three-letter Words", "Rhymes & Stories"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-50", "Addition", "Subtraction", "Measurement"] },
          { id: "evs", name: "Environmental Studies", topics: ["Seasons", "Transport", "Food", "Safety"] },
          { id: "art", name: "Art & Craft", topics: ["Drawing", "Coloring", "Paper Craft"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets", "Simple Words", "Stories"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-50", "Basic Addition", "Shapes"] },
          { id: "evs", name: "Environmental Studies", topics: ["Seasons", "Transport", "Food"] },
          { id: "regional", name: "Regional Language", topics: ["Alphabets", "Words", "Stories"] }
        ]
      }
    }
  },

  CLASS_1: {
    name: "Class 1",
    ageGroup: "5-6 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Writing", "Grammar Basics", "Comprehension"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-100", "Addition", "Subtraction", "Shapes", "Patterns"] },
          { id: "evs", name: "Environmental Studies", topics: ["Living & Non-living", "Plants", "Animals", "My Family"] },
          { id: "hindi", name: "Hindi", topics: ["Varnamala", "Matras", "Simple Words"] },
          { id: "art", name: "Art & Craft", topics: ["Drawing", "Coloring", "Craft Work"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Writing", "Simple Sentences"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-100", "Addition", "Subtraction"] },
          { id: "evs", name: "Environmental Studies", topics: ["Living Things", "Plants", "Animals"] },
          { id: "regional", name: "Regional Language", topics: ["Alphabets", "Words", "Sentences"] }
        ]
      }
    }
  },

  CLASS_2: {
    name: "Class 2",
    ageGroup: "6-7 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading Comprehension", "Grammar", "Vocabulary", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Numbers to 1000", "Addition", "Subtraction", "Multiplication Tables", "Time", "Money"] },
          { id: "evs", name: "Environmental Studies", topics: ["Good Habits", "Safety", "Water", "Air", "Community Helpers"] },
          { id: "hindi", name: "Hindi", topics: ["Varnamala", "Matras", "Reading", "Writing"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Grammar Basics", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Numbers to 1000", "Addition", "Subtraction", "Time"] },
          { id: "evs", name: "Environmental Studies", topics: ["Good Habits", "Water", "Air"] },
          { id: "regional", name: "Regional Language", topics: ["Reading", "Writing", "Grammar"] }
        ]
      }
    }
  },

  CLASS_3: {
    name: "Class 3",
    ageGroup: "7-8 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Comprehension", "Grammar", "Composition", "Vocabulary"] },
          { id: "math", name: "Mathematics", topics: ["Numbers to 10000", "Four Operations", "Fractions", "Geometry", "Measurement"] },
          { id: "evs", name: "Environmental Studies", topics: ["Plants", "Animals", "Food", "Shelter", "Water Resources"] },
          { id: "hindi", name: "Hindi", topics: ["Reading", "Writing", "Grammar", "Comprehension"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Grammar", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Operations", "Fractions", "Geometry"] },
          { id: "science", name: "Science", topics: ["Plants", "Animals", "Matter"] },
          { id: "social", name: "Social Studies", topics: ["Family", "Community", "Maps"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Writing"] }
        ]
      }
    }
  },

  CLASS_4: {
    name: "Class 4",
    ageGroup: "8-9 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Writing Skills", "Comprehension"] },
          { id: "math", name: "Mathematics", topics: ["Large Numbers", "Operations", "Fractions", "Decimals", "Geometry", "Symmetry"] },
          { id: "evs", name: "Environmental Studies", topics: ["Food & Nutrition", "Transport", "Communication", "Natural Resources"] },
          { id: "hindi", name: "Hindi", topics: ["Literature", "Grammar", "Composition"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Fractions", "Decimals", "Geometry"] },
          { id: "science", name: "Science", topics: ["Living Things", "Matter", "Energy", "Environment"] },
          { id: "social", name: "Social Studies", topics: ["History", "Geography", "Civics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_5: {
    name: "Class 5",
    ageGroup: "9-10 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Writing", "Comprehension"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Fractions", "Decimals", "Percentage", "Geometry", "Data Handling"] },
          { id: "evs", name: "Environmental Studies", topics: ["Super Senses", "Food", "Water", "Travel", "Maps"] },
          { id: "hindi", name: "Hindi", topics: ["Literature", "Grammar", "Composition"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Fractions", "Decimals", "Percentage", "Geometry"] },
          { id: "science", name: "Science", topics: ["Living Organisms", "Matter", "Force & Energy", "Environment"] },
          { id: "social", name: "Social Studies", topics: ["History of India", "Geography", "Civics", "Economics Basics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_6: {
    name: "Class 6",
    ageGroup: "10-11 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Honeysuckle", "A Pact with the Sun", "Grammar", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Number System", "Algebra", "Geometry", "Mensuration", "Data Handling"] },
          { id: "science", name: "Science", topics: ["Food", "Materials", "Living Organisms", "Motion", "Light"] },
          { id: "social", name: "Social Science", topics: ["History", "Geography", "Civics", "Economics"] },
          { id: "hindi", name: "Hindi", topics: ["Vasant", "Durva", "Grammar"] },
          { id: "sanskrit", name: "Sanskrit", topics: ["Ruchira Part-1"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Number System", "Algebra Basics", "Geometry", "Mensuration"] },
          { id: "science", name: "Science", topics: ["Food & Nutrition", "Materials", "Living World", "Motion & Measurement"] },
          { id: "social", name: "Social Science", topics: ["Ancient India", "Earth & Solar System", "Democracy", "Rural Economy"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_7: {
    name: "Class 7",
    ageGroup: "11-12 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Honeycomb", "An Alien Hand", "Grammar", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Integers", "Fractions", "Algebra", "Geometry", "Perimeter & Area", "Data Handling"] },
          { id: "science", name: "Science", topics: ["Nutrition", "Heat", "Motion", "Weather", "Acids & Bases", "Electricity"] },
          { id: "social", name: "Social Science", topics: ["Medieval India", "Environment", "Democracy", "Markets"] },
          { id: "hindi", name: "Hindi", topics: ["Vasant", "Durva", "Mahabharat"] },
          { id: "sanskrit", name: "Sanskrit", topics: ["Ruchira Part-2"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Integers", "Fractions", "Algebra", "Geometry", "Data Handling"] },
          { id: "science", name: "Science", topics: ["Nutrition", "Heat", "Motion", "Weather", "Chemistry Basics"] },
          { id: "social", name: "Social Science", topics: ["Medieval History", "Geography", "Civics", "Economics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_8: {
    name: "Class 8",
    ageGroup: "12-13 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Honeydew", "It So Happened", "Grammar", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Rational Numbers", "Linear Equations", "Quadrilaterals", "Mensuration", "Probability"] },
          { id: "science", name: "Science", topics: ["Crop Production", "Microorganisms", "Force & Pressure", "Light", "Sound", "Chemical Effects"] },
          { id: "social", name: "Social Science", topics: ["Modern India", "Resources", "Constitution", "Social Issues"] },
          { id: "hindi", name: "Hindi", topics: ["Vasant", "Durva", "Bharat ki Khoj"] },
          { id: "sanskrit", name: "Sanskrit", topics: ["Ruchira Part-3"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Rational Numbers", "Linear Equations", "Geometry", "Mensuration"] },
          { id: "science", name: "Science", topics: ["Biology", "Physics", "Chemistry"] },
          { id: "social", name: "Social Science", topics: ["Modern History", "Geography", "Civics", "Economics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_9: {
    name: "Class 9",
    ageGroup: "13-14 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Beehive", "Moments", "Grammar", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Number Systems", "Algebra", "Coordinate Geometry", "Euclid's Geometry", "Triangles", "Statistics"] },
          { id: "science", name: "Science", topics: ["Matter", "Atoms & Molecules", "Motion", "Force", "Gravitation", "Work & Energy", "Sound", "Living World"] },
          { id: "social", name: "Social Science", topics: ["French Revolution", "Nazism", "Forest Society", "Pastoralists", "Democracy", "Poverty"] },
          { id: "hindi", name: "Hindi A", topics: ["Kshitij", "Kritika", "Sparsh", "Sanchayan"] },
          { id: "it", name: "Information Technology", topics: ["Computer Basics", "Internet", "MS Office"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Number Systems", "Algebra", "Geometry", "Statistics"] },
          { id: "science", name: "Science", topics: ["Physics", "Chemistry", "Biology"] },
          { id: "social", name: "Social Science", topics: ["History", "Geography", "Civics", "Economics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_10: {
    name: "Class 10",
    ageGroup: "14-15 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["First Flight", "Footprints without Feet", "Grammar", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Real Numbers", "Polynomials", "Linear Equations", "Quadratic Equations", "Trigonometry", "Circles", "Statistics", "Probability"] },
          { id: "science", name: "Science", topics: ["Chemical Reactions", "Acids & Bases", "Metals", "Carbon Compounds", "Periodic Table", "Reflection", "Electricity", "Magnetic Effects", "Life Processes", "Heredity", "Environment"] },
          { id: "social", name: "Social Science", topics: ["Nationalism", "Industrialization", "Resources", "Agriculture", "Democracy", "Political Parties", "Federalism", "Development", "Globalization"] },
          { id: "hindi", name: "Hindi A", topics: ["Kshitij", "Kritika", "Sparsh", "Sanchayan"] },
          { id: "it", name: "Information Technology", topics: ["Programming", "Database", "Web Development"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Algebra", "Geometry", "Trigonometry", "Statistics"] },
          { id: "science", name: "Science", topics: ["Physics", "Chemistry", "Biology"] },
          { id: "social", name: "Social Science", topics: ["History", "Geography", "Civics", "Economics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_11: {
    name: "Class 11",
    ageGroup: "15-16 years",
    boards: {
      CBSE: {
        streams: {
          SCIENCE: {
            subjects: [
              { id: "physics", name: "Physics", topics: ["Units & Measurements", "Motion", "Laws of Motion", "Work & Energy", "Gravitation", "Thermodynamics", "Waves"] },
              { id: "chemistry", name: "Chemistry", topics: ["Atomic Structure", "Chemical Bonding", "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions", "Organic Chemistry"] },
              { id: "math", name: "Mathematics", topics: ["Sets", "Relations & Functions", "Trigonometry", "Complex Numbers", "Linear Inequalities", "Conic Sections", "3D Geometry", "Calculus"] },
              { id: "biology", name: "Biology", topics: ["Living World", "Cell", "Plant Physiology", "Human Physiology", "Structural Organization"] },
              { id: "english", name: "English", topics: ["Hornbill", "Snapshots", "Writing Skills"] },
              { id: "cs", name: "Computer Science", topics: ["Python", "Data Structures", "Database"] }
            ]
          },
          COMMERCE: {
            subjects: [
              { id: "accountancy", name: "Accountancy", topics: ["Accounting Basics", "Recording Transactions", "Trial Balance", "Financial Statements", "Bills of Exchange", "Depreciation"] },
              { id: "business", name: "Business Studies", topics: ["Nature of Business", "Forms of Business", "Private & Public Enterprises", "Business Services", "Emerging Modes"] },
              { id: "economics", name: "Economics", topics: ["Microeconomics", "Consumer Behavior", "Production", "Market Forms", "Indian Economy", "Development"] },
              { id: "math", name: "Mathematics", topics: ["Sets", "Relations", "Trigonometry", "Statistics", "Probability", "Linear Programming"] },
              { id: "english", name: "English", topics: ["Hornbill", "Snapshots", "Writing Skills"] }
            ]
          },
          ARTS: {
            subjects: [
              { id: "history", name: "History", topics: ["Early Societies", "Empires", "Nomadic Empires", "Medieval Society", "Modernization"] },
              { id: "geography", name: "Geography", topics: ["Physical Geography", "Climate", "Water", "Natural Vegetation", "Indian Geography"] },
              { id: "political", name: "Political Science", topics: ["Constitution", "Rights", "Elections", "Executive", "Legislature", "Judiciary"] },
              { id: "economics", name: "Economics", topics: ["Statistics", "Development", "Indian Economy"] },
              { id: "english", name: "English", topics: ["Hornbill", "Snapshots", "Writing Skills"] },
              { id: "sociology", name: "Sociology", topics: ["Introduction to Sociology", "Social Institutions", "Culture"] }
            ]
          }
        }
      },
      STATE: {
        streams: {
          SCIENCE: {
            subjects: [
              { id: "physics", name: "Physics", topics: ["Mechanics", "Thermodynamics", "Waves", "Optics"] },
              { id: "chemistry", name: "Chemistry", topics: ["Atomic Structure", "Bonding", "States of Matter", "Organic Chemistry"] },
              { id: "math", name: "Mathematics", topics: ["Algebra", "Trigonometry", "Calculus", "Geometry"] },
              { id: "biology", name: "Biology", topics: ["Cell Biology", "Plant Physiology", "Human Physiology"] },
              { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
              { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar"] }
            ]
          },
          COMMERCE: {
            subjects: [
              { id: "accountancy", name: "Accountancy", topics: ["Financial Accounting", "Trial Balance", "Financial Statements"] },
              { id: "business", name: "Business Studies", topics: ["Business Organization", "Management", "Marketing"] },
              { id: "economics", name: "Economics", topics: ["Microeconomics", "Macroeconomics", "Indian Economy"] },
              { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
              { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar"] }
            ]
          },
          ARTS: {
            subjects: [
              { id: "history", name: "History", topics: ["Ancient History", "Medieval History", "Modern History"] },
              { id: "geography", name: "Geography", topics: ["Physical Geography", "Human Geography", "Indian Geography"] },
              { id: "political", name: "Political Science", topics: ["Constitution", "Democracy", "Governance"] },
              { id: "economics", name: "Economics", topics: ["Development", "Indian Economy"] },
              { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
              { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar"] }
            ]
          }
        }
      }
    }
  },

  CLASS_12: {
    name: "Class 12",
    ageGroup: "16-17 years",
    boards: {
      CBSE: {
        streams: {
          SCIENCE: {
            subjects: [
              { id: "physics", name: "Physics", topics: ["Electrostatics", "Current Electricity", "Magnetism", "Electromagnetic Induction", "AC", "Electromagnetic Waves", "Optics", "Dual Nature", "Atoms", "Nuclei", "Semiconductors", "Communication"] },
              { id: "chemistry", name: "Chemistry", topics: ["Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics", "Surface Chemistry", "p-Block Elements", "d & f Block", "Coordination Compounds", "Haloalkanes", "Alcohols", "Aldehydes", "Carboxylic Acids", "Amines", "Biomolecules", "Polymers"] },
              { id: "math", name: "Mathematics", topics: ["Relations & Functions", "Inverse Trigonometry", "Matrices", "Determinants", "Continuity", "Differentiation", "Integration", "Differential Equations", "Vectors", "3D Geometry", "Linear Programming", "Probability"] },
              { id: "biology", name: "Biology", topics: ["Reproduction", "Genetics", "Evolution", "Human Health", "Microbes", "Biotechnology", "Organisms & Population", "Ecosystem", "Biodiversity", "Environmental Issues"] },
              { id: "english", name: "English", topics: ["Flamingo", "Vistas", "Writing Skills"] },
              { id: "cs", name: "Computer Science", topics: ["Python", "Data Structures", "Database Management", "Boolean Algebra", "Networking"] }
            ]
          },
          COMMERCE: {
            subjects: [
              { id: "accountancy", name: "Accountancy", topics: ["Partnership Accounts", "Company Accounts", "Analysis of Financial Statements", "Cash Flow Statement", "Computerized Accounting"] },
              { id: "business", name: "Business Studies", topics: ["Management", "Principles of Management", "Business Environment", "Planning", "Organizing", "Staffing", "Directing", "Controlling", "Financial Management", "Marketing", "Consumer Protection"] },
              { id: "economics", name: "Economics", topics: ["Microeconomics - Consumer Behavior", "Producer Behavior", "Market Forms", "Macroeconomics - National Income", "Money", "Banking", "Government Budget", "Balance of Payments", "Indian Economy"] },
              { id: "math", name: "Mathematics", topics: ["Relations", "Matrices", "Calculus", "Linear Programming", "Probability"] },
              { id: "english", name: "English", topics: ["Flamingo", "Vistas", "Writing Skills"] },
              { id: "entrepreneurship", name: "Entrepreneurship", topics: ["Entrepreneurial Opportunity", "Enterprise Planning", "Enterprise Marketing", "Enterprise Growth"] }
            ]
          },
          ARTS: {
            subjects: [
              { id: "history", name: "History", topics: ["Harappan Civilization", "Political & Economic History", "Kinship & Social History", "Bhakti-Sufi Traditions", "Mughal Court", "Colonial Cities", "Rebels & Raj", "Mahatma Gandhi", "Partition", "Constitution"] },
              { id: "geography", name: "Geography", topics: ["Human Geography", "Population", "Migration", "Human Settlements", "Resources", "Agriculture", "Industries", "Transport", "International Trade", "India - People & Economy"] },
              { id: "political", name: "Political Science", topics: ["Cold War", "US Hegemony", "Alternative Centres of Power", "Contemporary South Asia", "India's External Relations", "Security", "Environment", "Challenges to Democracy", "Crisis of Democratic Order", "Popular Movements", "Regional Aspirations", "Indian Politics"] },
              { id: "economics", name: "Economics", topics: ["Development", "Indian Economy 1950-1990", "Economic Reforms", "Poverty", "Human Capital", "Rural Development", "Employment", "Infrastructure", "Environment", "Comparative Development"] },
              { id: "english", name: "English", topics: ["Flamingo", "Vistas", "Writing Skills"] },
              { id: "psychology", name: "Psychology", topics: ["Introduction", "Methods", "Biological Basis", "Human Development", "Sensory & Perceptual Processes", "Learning", "Human Memory", "Thinking", "Motivation & Emotion", "Individual Differences"] },
              { id: "sociology", name: "Sociology", topics: ["Social Structure", "Social Institutions", "Social Change", "Indian Society", "Cultural Diversity", "Structural Change", "Cultural Change", "Social Movements"] }
            ]
          }
        }
      },
      STATE: {
        streams: {
          SCIENCE: {
            subjects: [
              { id: "physics", name: "Physics", topics: ["Electricity & Magnetism", "Optics", "Modern Physics", "Electronics"] },
              { id: "chemistry", name: "Chemistry", topics: ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry"] },
              { id: "math", name: "Mathematics", topics: ["Calculus", "Algebra", "Vectors", "3D Geometry", "Probability"] },
              { id: "biology", name: "Biology", topics: ["Genetics", "Evolution", "Biotechnology", "Ecology"] },
              { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
              { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar"] }
            ]
          },
          COMMERCE: {
            subjects: [
              { id: "accountancy", name: "Accountancy", topics: ["Partnership", "Company Accounts", "Financial Analysis"] },
              { id: "business", name: "Business Studies", topics: ["Management Principles", "Marketing", "Finance"] },
              { id: "economics", name: "Economics", topics: ["Microeconomics", "Macroeconomics", "Indian Economy"] },
              { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
              { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar"] }
            ]
          },
          ARTS: {
            subjects: [
              { id: "history", name: "History", topics: ["Ancient India", "Medieval India", "Modern India", "World History"] },
              { id: "geography", name: "Geography", topics: ["Human Geography", "Economic Geography", "Indian Geography"] },
              { id: "political", name: "Political Science", topics: ["International Relations", "Indian Politics", "Public Administration"] },
              { id: "economics", name: "Economics", topics: ["Development Economics", "Indian Economy"] },
              { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
              { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar"] }
            ]
          }
        }
      }
    }
  }
};


// Helper functions to access curriculum data
export const getCurriculumByClass = (className) => {
  return CURRICULUM_STRUCTURE[className];
};

export const getCurriculumByClassAndBoard = (className, board) => {
  const classData = CURRICULUM_STRUCTURE[className];
  return classData?.boards?.[board];
};

export const getCurriculumByClassBoardAndStream = (className, board, stream) => {
  const boardData = getCurriculumByClassAndBoard(className, board);
  return boardData?.streams?.[stream] || boardData;
};

export const getAllClasses = () => {
  return Object.keys(CURRICULUM_STRUCTURE);
};

export const getClassesByLevel = () => {
  return {
    prePrimary: ['LKG', 'UKG'],
    primary: ['CLASS_1', 'CLASS_2', 'CLASS_3', 'CLASS_4', 'CLASS_5'],
    middle: ['CLASS_6', 'CLASS_7', 'CLASS_8'],
    secondary: ['CLASS_9', 'CLASS_10'],
    seniorSecondary: ['CLASS_11', 'CLASS_12']
  };
};

export const getSubjectsByClassAndBoard = (className, board, stream = null) => {
  const curriculum = getCurriculumByClassBoardAndStream(className, board, stream);
  return curriculum?.subjects || [];
};

export const getAvailableStreams = (className, board) => {
  const boardData = getCurriculumByClassAndBoard(className, board);
  return boardData?.streams ? Object.keys(boardData.streams) : null;
};
