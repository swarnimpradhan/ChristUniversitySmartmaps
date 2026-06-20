// campusData.js
// Aligned with the Christ University Kengeri Campus Navigation Database

export const CAMPUS_DATA = {
  center: [12.8620, 77.4375],
  zoom: 18,
  buildings: {
    gate: {
      id: "gate",
      name: "Main Entrance Gate",
      description: "Primary entrance on Mysore Road. Visitor registration and security check post.",
      coordinates: [12.863837, 77.434811],
      category: "admin"
    },
    block_1: {
      id: "block_1",
      name: "Academic Block I",
      description: "Houses the School of Engineering and Technology, administrative offices, director's room, main library, and admissions reception.",
      coordinates: [12.863032, 77.437944],
      category: "academic"
    },
    block_2: {
      id: "block_2",
      name: "Academic Block II",
      description: "Houses the School of Business and Management, MBA classrooms, lecture halls, and faculty cabins.",
      coordinates: [12.862849, 77.438309],
      category: "academic"
    },
    block_3: {
      id: "block_3",
      name: "Academic Block III",
      description: "Houses the School of Architecture, School of Humanities, Central Cafeteria, and the Campus Medical Room.",
      coordinates: [12.862624, 77.438845],
      category: "academic"
    },
    block_4: {
      id: "block_4",
      name: "Academic Block IV",
      description: "Academic building featuring lecture halls, computer labs, and department offices.",
      coordinates: [12.862515, 77.439151],
      category: "academic"
    },
    block_5: {
      id: "block_5",
      name: "Academic Block V",
      description: "Academic building containing faculty research offices, classrooms, and study rooms.",
      coordinates: [12.861892, 77.438475],
      category: "academic"
    },
    block_6: {
      id: "block_6",
      name: "Academic Block VI",
      description: "New academic wing equipped with smart classrooms and research labs.",
      coordinates: [12.862243, 77.439843],
      category: "academic"
    },
    library: {
      id: "library",
      name: "Engineering Library (Block I)",
      description: "Located within Academic Block I. Contains engineering literature, research papers, and digital study rooms.",
      coordinates: [12.863000, 77.437850],
      category: "academic"
    },
    jonas_hall: {
      id: "jonas_hall",
      name: "Jonas Hall (Women's Hostel)",
      description: "Secure residential hall for female students. Includes shared study halls, gym, and in-house recreation center.",
      coordinates: [12.862598, 77.438893],
      category: "hostel"
    },
    devadan: {
      id: "devadan",
      name: "Devadan Hall (Men's Hostel)",
      description: "Major on-campus residential hall for male students. Equipped with study halls, indoor sports room, and a gym.",
      coordinates: [12.859826, 77.440395],
      category: "hostel"
    },
    mba_canteen: {
      id: "mba_canteen",
      name: "MBA Canteen",
      description: "Cafeteria offering meals, snacks, and beverages next to Block II.",
      coordinates: [12.863181, 77.437668],
      category: "food"
    },
    south_canteen: {
      id: "south_canteen",
      name: "South Canteen",
      description: "Food counter serving authentic South Indian delicacies, snacks, and fresh juices.",
      coordinates: [12.862321, 77.439344],
      category: "food"
    },
    north_canteen: {
      id: "north_canteen",
      name: "North Canteen",
      description: "Food court offering North Indian meals, street food, and beverages.",
      coordinates: [12.859523, 77.439172],
      category: "food"
    },
    kns_canteen: {
      id: "kns_canteen",
      name: "KNS Canteen",
      description: "Cafeteria and snack shop located near the sports ground.",
      coordinates: [12.862556, 77.436801],
      category: "food"
    },
    sports: {
      id: "sports",
      name: "Sports Ground",
      description: "Main sports venue on the west side of campus, housing the football ground, running track, and basketball courts.",
      coordinates: [12.861767, 77.436512],
      category: "sports"
    },
    pu_block: {
      id: "pu_block",
      name: "PU Block",
      description: "Academic building hosting Pre-University courses and classrooms.",
      coordinates: [12.860213, 77.437139],
      category: "academic"
    },
    architecture_block: {
      id: "architecture_block",
      name: "Architecture Block",
      description: "Dedicated block containing drafting studios, labs, and classrooms for the School of Architecture.",
      coordinates: [12.860036, 77.438394],
      category: "academic"
    },
    chapel: {
      id: "chapel",
      name: "St. Kuriakose Elias Chavara Chapel",
      description: "A serene prayer hall in the center of the campus, open to all students.",
      coordinates: [12.860192, 77.437745],
      category: "admin"
    }
  }
};

export const FACULTY_DATA = [
  {
    id: "f1",
    name: "Dr. Anjali J",
    designation: "Associate Professor",
    department: "CSE",
    email: "anjali.j@christuniversity.in",
    cabin: "Block 1 - Room 101",
    status: "AVAILABLE",
    statusNotice: "Available in cabin for project evaluations.",
    timetable: [
      { day: "Mon", p1: "CS202", p2: "CS202", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Tue", p1: "FREE", p2: "FREE", p3: "CS202", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Wed", p1: "CS202", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Thu", p1: "FREE", p2: "CS202", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Fri", p1: "FREE", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "CS202", p6: "CS202" },
      { day: "Sat", p1: "FREE", p2: "FREE", p3: "FREE", p4: "HALF DAY", p5: "HALF DAY", p6: "HALF DAY" }
    ]
  },
  {
    id: "f2",
    name: "Dr. Smith K",
    designation: "Assistant Professor",
    department: "CSE",
    email: "smith.k@christuniversity.in",
    cabin: "Block 1 - Room 102",
    status: "IN_CLASS",
    statusNotice: "Conducting Data Structures Lab in CSE Lab A.",
    timetable: [
      { day: "Mon", p1: "FREE", p2: "CS305", p3: "CS305", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Tue", p1: "CS305", p2: "CS305", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Wed", p1: "FREE", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "CS305", p6: "CS305" },
      { day: "Thu", p1: "CS305", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Fri", p1: "FREE", p2: "FREE", p3: "CS305", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Sat", p1: "FREE", p2: "FREE", p3: "FREE", p4: "HALF DAY", p5: "HALF DAY", p6: "HALF DAY" }
    ]
  },
  {
    id: "f3",
    name: "Prof. Rajan Kumar",
    designation: "Professor & HOD",
    department: "BBA",
    email: "rajan.kumar@christuniversity.in",
    cabin: "Block 2 - Room 201",
    status: "IN_MEETING",
    statusNotice: "Board of Studies meeting at MBA Dean's Office.",
    timetable: [
      { day: "Mon", p1: "FREE", p2: "MBA105", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Tue", p1: "FREE", p2: "FREE", p3: "MBA105", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Wed", p1: "MBA105", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Thu", p1: "FREE", p2: "MBA105", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Fri", p1: "FREE", p2: "FREE", p3: "MBA105", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Sat", p1: "FREE", p2: "FREE", p3: "FREE", p4: "HALF DAY", p5: "HALF DAY", p6: "HALF DAY" }
    ]
  },
  {
    id: "f4",
    name: "Dr. Priya Sen",
    designation: "Associate Professor",
    department: "Architecture",
    email: "priya.sen@christuniversity.in",
    cabin: "Architecture Block - Room 301",
    status: "AWAY",
    statusNotice: "Attending National Architecture Conference in Bangalore City.",
    timetable: [
      { day: "Mon", p1: "ARCH101", p2: "ARCH101", p3: "ARCH101", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Tue", p1: "FREE", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "ARCH101", p6: "ARCH101" },
      { day: "Wed", p1: "FREE", p2: "ARCH101", p3: "ARCH101", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Thu", p1: "ARCH101", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Fri", p1: "FREE", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "ARCH101", p6: "ARCH101" },
      { day: "Sat", p1: "ARCH101", p2: "FREE", p3: "FREE", p4: "HALF DAY", p5: "HALF DAY", p6: "HALF DAY" }
    ]
  },
  {
    id: "f5",
    name: "Dr. George Mathew",
    designation: "Assistant Professor",
    department: "Sciences & Humanities",
    email: "george.mathew@christuniversity.in",
    cabin: "Block 3 - Room 302",
    status: "PHD_VIVA",
    statusNotice: "Conducting PhD viva in Seminar Hall 1.",
    timetable: [
      { day: "Mon", p1: "MAT101", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Tue", p1: "FREE", p2: "MAT101", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Wed", p1: "FREE", p2: "FREE", p3: "MAT101", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Thu", p1: "MAT101", p2: "FREE", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Fri", p1: "FREE", p2: "MAT101", p3: "FREE", p4: "LUNCH", p5: "FREE", p6: "FREE" },
      { day: "Sat", p1: "FREE", p2: "FREE", p3: "FREE", p4: "HALF DAY", p5: "HALF DAY", p6: "HALF DAY" }
    ]
  }
];

// Helper to compute Levenshtein distance for fuzzy matching
export function getLevenshteinDistance(a, b) {
  const tmp = [];
  let i, j, alen = a.length, blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;
  for (i = 0; i <= alen; i++) tmp[i] = [i];
  for (j = 0; j <= blen; j++) tmp[0][j] = j;
  for (i = 1; i <= alen; i++) {
    for (j = 1; j <= blen; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[alen][blen];
}

// Smart chatbot query processing engine
export function processChatQuery(rawQuery) {
  const query = rawQuery.trim().toLowerCase();
  
  if (!query) {
    return {
      text: "Please ask a question! For example: 'Where is Dr. Anjali?' or 'Which buildings are available?'",
      type: "empty"
    };
  }

  // Greetings check
  const greetings = ["hi", "hello", "hey", "hola", "greetings", "good morning", "good afternoon", "good evening"];
  if (greetings.some(g => query === g || query.startsWith(g + " "))) {
    return {
      text: "Hello! I am your Christ University Kengeri Campus Smart Assistant. How can I help you today? You can ask me about faculty locations, classroom layouts, canteens, or directions!",
      type: "greeting",
      suggestions: [
        "Where is Dr. Anjali?",
        "Show available canteens",
        "Where is Block 1?",
        "Who is available in CSE?"
      ]
    };
  }

  // Check for Teacher queries
  let matchedTeacher = null;
  let minDistance = 999;
  
  // Try to extract teacher name (looking for Dr. or Prof. or just names)
  for (const faculty of FACULTY_DATA) {
    const cleanName = faculty.name.replace(/^(dr\.|prof\.)\s*/i, "").toLowerCase();
    const queryWords = query.split(/\s+/);
    
    // Exact or partial name match
    if (query.includes(cleanName) || cleanName.includes(query)) {
      matchedTeacher = faculty;
      break;
    }
    
    // Fuzzy matching words
    queryWords.forEach(word => {
      if (word.length > 3) {
        const dist = getLevenshteinDistance(word, cleanName.split(/\s+/)[0]);
        if (dist <= 1 && dist < minDistance) {
          minDistance = dist;
          matchedTeacher = faculty;
        }
      }
    });
  }

  if (matchedTeacher) {
    const statusMap = {
      AVAILABLE: "🟢 Available Now",
      IN_CLASS: "🔴 In Class",
      IN_MEETING: "🟡 In a Meeting",
      AWAY: "⚪ Away from Campus",
      PHD_VIVA: "🔵 Conducting a PhD Viva"
    };
    
    return {
      text: `Here is the current information for **${matchedTeacher.name}** (${matchedTeacher.designation}, ${matchedTeacher.department} Dept):`,
      type: "teacher_info",
      teacher: matchedTeacher,
      statusStr: statusMap[matchedTeacher.status] || matchedTeacher.status,
      suggestions: [
        `Show timetable for ${matchedTeacher.name.split(' ')[1]}`,
        `Where is ${matchedTeacher.cabin.split(' - ')[0]}?`
      ]
    };
  }

  // Check for timetable request
  if (query.includes("timetable") || query.includes("schedule") || query.includes("classes")) {
    // Find who this timetable is for
    let target = null;
    for (const faculty of FACULTY_DATA) {
      const lastName = faculty.name.split(' ').slice(-1)[0].toLowerCase();
      const firstName = faculty.name.replace(/^(dr\.|prof\.)\s*/i, "").split(' ')[0].toLowerCase();
      if (query.includes(lastName) || query.includes(firstName)) {
        target = faculty;
        break;
      }
    }
    
    if (target) {
      return {
        text: `Here is the digital timetable schedule for **${target.name}**:`,
        type: "timetable",
        teacher: target
      };
    } else {
      return {
        text: "Whose timetable would you like to see? Try asking: 'Show timetable for Dr. Anjali' or 'Prof. Rajan timetable'.",
        type: "timetable_ask"
      };
    }
  }

  // Check for building/block queries
  let matchedBuilding = null;
  for (const bId in CAMPUS_DATA.buildings) {
    const building = CAMPUS_DATA.buildings[bId];
    if (query.includes(building.name.toLowerCase()) || query.includes(building.id.replace('_', ' ')) || (bId.startsWith("block") && query.includes("block " + bId.split("_")[1]))) {
      matchedBuilding = building;
      break;
    }
  }

  // Extra check for "Block 1", "Block 2", etc.
  if (!matchedBuilding) {
    const blockMatch = query.match(/block\s*([1-6])/i);
    if (blockMatch) {
      const num = blockMatch[1];
      matchedBuilding = CAMPUS_DATA.buildings[`block_${num}`];
    }
  }
  
  if (!matchedBuilding) {
    if (query.includes("devdan")) {
      matchedBuilding = CAMPUS_DATA.buildings["devdan"];
    } else if (query.includes("jonas")) {
      matchedBuilding = CAMPUS_DATA.buildings["jonas_hall"];
    } else if (query.includes("chapel")) {
      matchedBuilding = CAMPUS_DATA.buildings["chapel"];
    } else if (query.includes("library")) {
      matchedBuilding = CAMPUS_DATA.buildings["library"];
    } else if (query.includes("sports") || query.includes("ground")) {
      matchedBuilding = CAMPUS_DATA.buildings["sports"];
    }
  }

  if (matchedBuilding) {
    return {
      text: `I found **${matchedBuilding.name}** on campus:`,
      type: "building_info",
      building: matchedBuilding,
      suggestions: [
        `How do I go to ${matchedBuilding.name}?`,
        `Who is in ${matchedBuilding.name}?`
      ]
    };
  }

  // Check for Canteen / Food queries
  if (query.includes("canteen") || query.includes("food") || query.includes("cafeteria") || query.includes("eat")) {
    const canteens = Object.values(CAMPUS_DATA.buildings).filter(b => b.category === "food");
    return {
      text: `Here are the canteens and dining spots located on the Kengeri Campus:`,
      type: "list_canteens",
      canteens: canteens
    };
  }

  // Check for Sports queries
  if (query.includes("sports") || query.includes("play") || query.includes("ground") || query.includes("football") || query.includes("gym")) {
    const sportsSpots = Object.values(CAMPUS_DATA.buildings).filter(b => b.category === "sports");
    return {
      text: `Here are the sports and fitness facilities on campus:`,
      type: "list_sports",
      sportsSpots: sportsSpots
    };
  }

  // Check for department queries (e.g. "CSE department", "MBA faculty")
  const departments = ["CSE", "BBA", "Architecture", "Sciences & Humanities"];
  let matchedDept = null;
  for (const dept of departments) {
    if (query.includes(dept.toLowerCase())) {
      matchedDept = dept;
      break;
    }
  }
  
  if (matchedDept) {
    const members = FACULTY_DATA.filter(f => f.department.toLowerCase() === matchedDept.toLowerCase());
    return {
      text: `Here are the faculty members in the **${matchedDept}** department:`,
      type: "department_faculty",
      department: matchedDept,
      members: members
    };
  }

  // Check for availability queries
  if (query.includes("available") || query.includes("free") || query.includes("present")) {
    // See if they specified a block or department
    const availableFaculty = FACULTY_DATA.filter(f => f.status === "AVAILABLE");
    if (availableFaculty.length > 0) {
      return {
        text: `Here are the faculty members currently **Available** in their cabins:`,
        type: "available_faculty",
        members: availableFaculty
      };
    } else {
      return {
        text: "Currently, no teachers are marked as AVAILABLE. Try checking their timetable schedules instead.",
        type: "simple"
      };
    }
  }

  // Directions/Navigation query (e.g. "how to go from gate to block 1")
  if (query.includes("how to go") || query.includes("directions") || query.includes("route") || query.includes("navigate") || query.includes("how do i get")) {
    // Look for landmarks
    let startLoc = "gate"; // default start
    let endLoc = null;
    
    // Find end landmark
    for (const bId in CAMPUS_DATA.buildings) {
      const bName = CAMPUS_DATA.buildings[bId].name.toLowerCase();
      const bShort = bId.replace('_', ' ');
      if (query.includes(bName) || query.includes(bShort) || (bId.startsWith("block") && query.includes("block " + bId.split("_")[1]))) {
        endLoc = bId;
        // Don't pick the start as the end if both are in query
        if (query.indexOf(bName) < query.indexOf(" to ") && query.includes(" from ")) {
          startLoc = bId;
        }
      }
    }
    
    if (endLoc && startLoc !== endLoc) {
      const startName = CAMPUS_DATA.buildings[startLoc]?.name || "Main Gate";
      const endName = CAMPUS_DATA.buildings[endLoc]?.name;
      return {
        text: `I can help you navigate from **${startName}** to **${endName}**:`,
        type: "route_info",
        startId: startLoc,
        endId: endLoc,
        startName: startName,
        endName: endName
      };
    } else {
      return {
        text: "Where would you like to navigate to? Ask me something like: 'Directions to Block 1' or 'Route from gate to Block 2'.",
        type: "route_ask"
      };
    }
  }

  // Default fallback response
  return {
    text: "I'm not sure I fully understood. You can ask me things like:\n- *'Where is Dr. Anjali's cabin?'*\n- *'Show canteens on campus'*\n- *'Directions to Devdan Hostel'*\n- *'Is anyone available in CSE?'*",
    type: "fallback",
    suggestions: [
      "Where is Dr. Anjali?",
      "Directions to Block 2",
      "List available faculty",
      "Show canteens"
    ]
  };
}
