/**
 * Christ University Kengeri Campus - Navigation Database (Corrected Coordinates)
 * This file contains the precise geographic coordinates from OpenStreetMap
 * for the Mysore Road Kengeri Campus, along with indoor plans.
 */

const CAMPUS_DATA = {
  // Center of the map when it loads (Christ University Kengeri Campus)
  center: [12.8625, 77.4375],
  zoom: 17,

  // List of key landmarks & buildings on campus
  buildings: {
    gate: {
      id: "gate",
      name: "Main Entrance Gate",
      description: "Primary entrance on Mysore Road. Visitor registration and security check post.",
      coordinates: [12.86259, 77.43381],
      category: "admin",
      floors: {}
    },
    block_1: {
      id: "block_1",
      name: "Academic Block I",
      description: "Houses the School of Engineering and Technology, administrative offices, director's room, main library, and admissions reception.",
      coordinates: [12.86301, 77.43799],
      category: "academic",
      floors: {
        "Ground Floor": {
          rooms: [
            { id: "b1_reception", name: "Main Reception & Enquiry Desk", x: 20, y: 20, w: 120, h: 60, type: "office" },
            { id: "b1_admissions", name: "Admissions Office", x: 150, y: 20, w: 100, h: 60, type: "office" },
            { id: "b1_dean", name: "Dean's Office (Engineering)", x: 260, y: 20, w: 90, h: 60, type: "office" },
            { id: "b1_corridor", name: "Central Corridor", x: 20, y: 90, w: 430, h: 20, type: "corridor" },
            { id: "b1_seminar_1", name: "Seminar Hall 1", x: 20, y: 120, w: 180, h: 90, type: "class" },
            { id: "b1_water_g", name: "Drinking Water Facility", x: 210, y: 120, w: 50, h: 40, type: "water" },
            { id: "b1_restroom_g", name: "Gents Restroom", x: 270, y: 120, w: 70, h: 90, type: "restroom" },
            { id: "b1_restroom_l", name: "Ladies Restroom", x: 350, y: 120, w: 70, h: 90, type: "restroom" },
            { id: "b1_stairs_1", name: "Main Staircase & Elevator", x: 430, y: 20, w: 40, h: 190, type: "stairs" }
          ]
        },
        "First Floor": {
          rooms: [
            { id: "b1_comp_lab_a", name: "Computer Lab A (Data Science)", x: 20, y: 20, w: 160, h: 60, type: "lab" },
            { id: "b1_electronics_lab", name: "Electronics & IoT Lab", x: 190, y: 20, w: 160, h: 60, type: "lab" },
            { id: "b1_corridor_1", name: "Corridor", x: 20, y: 90, w: 430, h: 20, type: "corridor" },
            { id: "b1_mech_lab", name: "Mechanical Engineering Lab", x: 20, y: 120, w: 180, h: 90, type: "lab" },
            { id: "b1_civil_lab", name: "Civil & Materials Lab", x: 210, y: 120, w: 180, h: 90, type: "lab" },
            { id: "b1_restroom_1", name: "Staff Restrooms", x: 400, y: 120, w: 50, h: 90, type: "restroom" },
            { id: "b1_stairs_2", name: "Staircase", x: 430, y: 20, w: 40, h: 60, type: "stairs" }
          ]
        },
        "Second Floor": {
          rooms: [
            { id: "b1_room_101", name: "Classroom 101 (CSE A)", x: 20, y: 20, w: 90, h: 60, type: "class" },
            { id: "b1_room_102", name: "Classroom 102 (CSE B)", x: 120, y: 20, w: 90, h: 60, type: "class" },
            { id: "b1_room_103", name: "Classroom 103 (ECE A)", x: 220, y: 20, w: 90, h: 60, type: "class" },
            { id: "b1_hod_cse", name: "HOD Office (Computer Science)", x: 320, y: 20, w: 100, h: 60, type: "office" },
            { id: "b1_corridor_2", name: "Corridor", x: 20, y: 90, w: 430, h: 20, type: "corridor" },
            { id: "b1_room_104", name: "Classroom 104 (MECH A)", x: 20, y: 120, w: 95, h: 90, type: "class" },
            { id: "b1_room_105", name: "Classroom 105 (CIVIL A)", x: 125, y: 120, w: 95, h: 90, type: "class" },
            { id: "b1_server_room", name: "Department Server Room", x: 230, y: 120, w: 100, h: 90, type: "office" },
            { id: "b1_water_2", name: "Water Cooler", x: 340, y: 120, w: 40, h: 40, type: "water" },
            { id: "b1_restroom_2", name: "Restrooms", x: 390, y: 120, w: 60, h: 90, type: "restroom" },
            { id: "b1_stairs_3", name: "Staircase", x: 430, y: 20, w: 40, h: 60, type: "stairs" }
          ]
        }
      }
    },
    block_2: {
      id: "block_2",
      name: "Academic Block II",
      description: "Houses the School of Business and Management, MBA classrooms, lecture halls, and faculty cabins.",
      coordinates: [12.86324, 77.43834],
      category: "academic",
      floors: {
        "Ground Floor": {
          rooms: [
            { id: "b2_reception", name: "MBA Admin & Help Desk", x: 20, y: 20, w: 120, h: 60, type: "office" },
            { id: "b2_placement", name: "Corporate Placement Cell", x: 150, y: 20, w: 140, h: 60, type: "office" },
            { id: "b2_faculty_lounge", name: "Business Faculty Lounge", x: 300, y: 20, w: 110, h: 60, type: "office" },
            { id: "b2_corridor", name: "Lobby Corridor", x: 20, y: 95, w: 410, h: 20, type: "corridor" },
            { id: "b2_mba_seminar", name: "MBA Seminar Auditorium", x: 20, y: 130, w: 220, h: 80, type: "class" },
            { id: "b2_water_g", name: "Drinking Water", x: 250, y: 130, w: 40, h: 40, type: "water" },
            { id: "b2_restroom", name: "Executive Restrooms", x: 300, y: 130, w: 100, h: 80, type: "restroom" },
            { id: "b2_stairs", name: "Lift & Stairs", x: 420, y: 20, w: 30, h: 190, type: "stairs" }
          ]
        },
        "First Floor": {
          rooms: [
            { id: "b2_finance_lab", name: "Bloomberg Finance Lab", x: 20, y: 20, w: 180, h: 60, type: "lab" },
            { id: "b2_bus_analytics", name: "Business Analytics Center", x: 210, y: 20, w: 180, h: 60, type: "lab" },
            { id: "b2_corridor_1", name: "Corridor", x: 20, y: 95, w: 410, h: 20, type: "corridor" },
            { id: "b2_room_201", name: "Classroom 201 (MBA Finance)", x: 20, y: 130, w: 110, h: 80, type: "class" },
            { id: "b2_room_202", name: "Classroom 202 (MBA Marketing)", x: 140, y: 130, w: 110, h: 80, type: "class" },
            { id: "b2_room_203", name: "Classroom 203 (MBA HR)", x: 260, y: 130, w: 110, h: 80, type: "class" },
            { id: "b2_restroom_1", name: "Restrooms", x: 380, y: 130, w: 50, h: 80, type: "restroom" },
            { id: "b2_stairs_1", name: "Staircase", x: 420, y: 20, w: 30, h: 60, type: "stairs" }
          ]
        }
      }
    },
    block_3: {
      id: "block_3",
      name: "Academic Block III",
      description: "Houses the School of Architecture, School of Humanities, Central Cafeteria, and the Campus Medical Room.",
      coordinates: [12.86281, 77.43909],
      category: "academic",
      floors: {
        "Ground Floor": {
          rooms: [
            { id: "b3_medical", name: "Campus Medical Room / First Aid", x: 20, y: 20, w: 150, h: 60, type: "health" },
            { id: "b3_security", name: "Internal Security & Lost & Found", x: 180, y: 20, w: 130, h: 60, type: "office" },
            { id: "b3_corridor", name: "Central Hallway", x: 20, y: 95, w: 410, h: 20, type: "corridor" },
            { id: "b3_canteen_counter", name: "Block III Quick Bites Café", x: 20, y: 130, w: 200, h: 80, type: "food" },
            { id: "b3_restrooms", name: "Public Restrooms", x: 230, y: 130, w: 80, h: 80, type: "restroom" },
            { id: "b3_water", name: "Water Facility", x: 320, y: 130, w: 40, h: 40, type: "water" },
            { id: "b3_stairs", name: "Staircase & Elevator", x: 410, y: 20, w: 40, h: 190, type: "stairs" }
          ]
        },
        "First Floor": {
          rooms: [
            { id: "b3_arch_studio_a", name: "Architecture Studio A (Design)", x: 20, y: 20, w: 180, h: 60, type: "lab" },
            { id: "b3_arch_studio_b", name: "Architecture Studio B (Drafting)", x: 210, y: 20, w: 180, h: 60, type: "lab" },
            { id: "b3_corridor_1", name: "Corridor", x: 20, y: 95, w: 410, h: 20, type: "corridor" },
            { id: "b3_humanities_office", name: "Humanities Dept Staff Room", x: 20, y: 130, w: 140, h: 80, type: "office" },
            { id: "b3_room_301", name: "Classroom 301 (B.Arch)", x: 170, y: 130, w: 110, h: 80, type: "class" },
            { id: "b3_room_302", name: "Classroom 302 (BA English)", x: 290, y: 130, w: 110, h: 80, type: "class" },
            { id: "b3_stairs_1", name: "Staircase", x: 410, y: 20, w: 40, h: 60, type: "stairs" }
          ]
        }
      }
    },
    library: {
      id: "library",
      name: "Engineering Library (Block I)",
      description: "Located within Academic Block I. Contains engineering literature, research papers, and digital study rooms.",
      coordinates: [12.8631, 77.4376],
      category: "academic",
      floors: {
        "Ground Floor": {
          rooms: [
            { id: "lib_reception", name: "Library Circulation Desk", x: 20, y: 20, w: 130, h: 60, type: "office" },
            { id: "lib_baggage", name: "Baggage Counter", x: 160, y: 20, w: 90, h: 60, type: "office" },
            { id: "lib_corridor", name: "Entrance Foyer", x: 20, y: 95, w: 410, h: 20, type: "corridor" },
            { id: "lib_reading_hall", name: "General Reading Hall & E-Resource", x: 20, y: 130, w: 280, h: 80, type: "class" },
            { id: "lib_restroom", name: "Restrooms", x: 310, y: 130, w: 80, h: 80, type: "restroom" },
            { id: "lib_stairs", name: "Staircase & Elevator", x: 410, y: 20, w: 40, h: 190, type: "stairs" }
          ]
        }
      }
    },
    canteen: {
      id: "canteen",
      name: "Main Cafeteria & Food Court",
      description: "Dining area located adjacent to Block III. Offers North/South Indian dishes, beverages, and snack counters.",
      coordinates: [12.8629, 77.4393],
      category: "food",
      floors: {}
    },
    devadan: {
      id: "devadan",
      name: "Devadan Hall (Men's Hostel)",
      description: "Major on-campus residential hall for male students. Equipped with study halls, indoor sports room, and a gym.",
      coordinates: [12.86095, 77.43884],
      category: "hostel",
      floors: {}
    },
    jonas_hall: {
      id: "jonas_hall",
      name: "Jonas Hall (Women's Hostel)",
      description: "Secure residential hall for female students (PU/UG/PG). Includes shared study halls, gym, and in-house recreation center.",
      coordinates: [12.86015, 77.43733],
      category: "hostel",
      floors: {}
    },
    sports: {
      id: "sports",
      name: "Sports Ground & Running Track",
      description: "Main sports venue on the west side of campus, housing the football ground, running track, and basketball courts.",
      coordinates: [12.8615, 77.4365],
      category: "sports",
      floors: {}
    },
    chapel: {
      id: "chapel",
      name: "University Chapel Plaza",
      description: "A serene prayer hall in the center of the campus, close to Block I and Block II, open to all students.",
      coordinates: [12.8623, 77.4382],
      category: "admin",
      floors: {}
    }
  },

  // Walks & intersection network for routing.
  // Each node is a physical point on the campus walkways.
  nodes: {
    gate: { id: "gate", name: "Main Gate Checkpost", latlng: [12.86259, 77.43381] },
    junc_sports: { id: "junc_sports", name: "Sports Complex Junction", latlng: [12.8622, 77.4355] },
    sports: { id: "sports", name: "Sports Complex Gate", latlng: [12.8615, 77.4365] },
    junc_chapel: { id: "junc_chapel", name: "Chapel Plaza Crossroads", latlng: [12.8623, 77.4382] },
    chapel: { id: "chapel", name: "Chapel Entrance", latlng: [12.8624, 77.4381] },
    block1: { id: "block1", name: "Block I Main Entrance", latlng: [12.86301, 77.43799] },
    junc_library: { id: "junc_library", name: "Block I Library Walkway", latlng: [12.8631, 77.4377] },
    library: { id: "library", name: "Library Entrance", latlng: [12.8631, 77.4376] },
    block2: { id: "block2", name: "Block II Main Entrance", latlng: [12.86324, 77.43834] },
    junc_canteen: { id: "junc_canteen", name: "Block III Food Court Path", latlng: [12.8629, 77.4392] },
    canteen: { id: "canteen", name: "Central Food Court Entrance", latlng: [12.8629, 77.4393] },
    block3: { id: "block3", name: "Block III Main Entrance", latlng: [12.86281, 77.43909] },
    junc_hostels: { id: "junc_hostels", name: "Hostel Zone Entryway", latlng: [12.8615, 77.4385] },
    devadan: { id: "devadan", name: "Devadan Hall Entrance", latlng: [12.86095, 77.43884] },
    jonas_hall: { id: "jonas_hall", name: "Jonas Hall Entrance", latlng: [12.86015, 77.43733] }
  },

  // Connections (edges) between walkway nodes.
  // Weight represents estimated distance in meters.
  // Direct text instructions assist in rendering readable directions.
  edges: [
    { from: "gate", to: "junc_sports", weight: 180, direction: "Walk straight from the entrance gate along the main tree-lined road." },
    { from: "junc_sports", to: "sports", weight: 80, direction: "Turn right onto the walkway leading towards the Sports Ground and running track." },
    { from: "junc_sports", to: "junc_chapel", weight: 280, direction: "Continue straight along the central avenue towards the academic blocks." },
    { from: "junc_chapel", to: "chapel", weight: 20, direction: "Take a left to reach the Chapel entrance." },
    { from: "junc_chapel", to: "block1", weight: 70, direction: "Walk straight onto the courtyard plaza of Academic Block I." },
    { from: "block1", to: "junc_library", weight: 35, direction: "Head west towards the side wing of Block I." },
    { from: "junc_library", to: "library", weight: 15, direction: "Walk straight into the Library lobby." },
    { from: "block1", to: "block2", weight: 40, direction: "Walk north-east across the shaded walkway directly into Block II." },
    { from: "block2", to: "junc_canteen", weight: 90, direction: "Exit Block II and take the pathway leading east towards the dining complex." },
    { from: "junc_canteen", to: "canteen", weight: 20, direction: "Walk straight through the main doors of the Food Court." },
    { from: "junc_canteen", to: "block3", weight: 25, direction: "Turn left and enter Academic Block III." },
    { from: "junc_chapel", to: "junc_hostels", weight: 100, direction: "Take the southern footpath leading past the garden lawns towards the residential zone." },
    { from: "junc_hostels", to: "devadan", weight: 60, direction: "Walk straight into the Devadan Men's Hostel lobby." },
    { from: "junc_hostels", to: "jonas_hall", weight: 170, direction: "Turn right and walk past the badminton courts to reach the Jonas Women's Hostel gate." }
  ]
};
