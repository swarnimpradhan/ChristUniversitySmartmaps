/**
 * Christ University Kengeri Campus - Navigation Database (Corrected Coordinates)
 * This file contains the precise geographic coordinates from OpenStreetMap
 * for the Mysore Road Kengeri Campus, along with indoor plans.
 */

const CAMPUS_DATA = {
  // Center of the map when it loads (Christ University Kengeri Campus)
  center: [12.8615, 77.4370],
  zoom: 18,

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
      coordinates: [12.86141, 77.43773],
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
      coordinates: [12.86196, 77.43855],
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
      coordinates: [12.86275, 77.43715],
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
      coordinates: [12.8615, 77.4376],
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
      coordinates: [12.8627, 77.43715],
      category: "food",
      floors: {}
    },
    devadan: {
      id: "devadan",
      name: "Devadan Hall (Men's Hostel)",
      description: "Major on-campus residential hall for male students. Equipped with study halls, indoor sports room, and a gym.",
      coordinates: [12.86037, 77.43943],
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
      coordinates: [12.86154, 77.43503],
      category: "sports",
      floors: {}
    },
    chapel: {
      id: "chapel",
      name: "University Chapel Plaza",
      description: "A serene prayer hall in the center of the campus, close to Block I and Block II, open to all students.",
      coordinates: [12.86149, 77.43815],
      category: "admin",
      floors: {}
    }
  },

  // Walks & intersection network for routing.
  // Each node is a physical point on the campus walkways.
  nodes: {
    gate: { id: "gate", name: "Main Gate Checkpost", latlng: [12.86259, 77.43381] },
    junc_gate_bend: { id: "junc_gate_bend", name: "Main Driveway Curve", latlng: [12.86292, 77.43511] },
    mulsanne_south: { id: "mulsanne_south", name: "Sports Complex Crossroads", latlng: [12.86232, 77.43656] },
    sports: { id: "sports", name: "Sports Complex Gate", latlng: [12.86154, 77.43503] },
    block3_road: { id: "block3_road", name: "Block III Southern Access Path", latlng: [12.86244, 77.43757] },
    block3: { id: "block3", name: "Block III Main Entrance", latlng: [12.86275, 77.43715] },
    canteen: { id: "canteen", name: "Central Food Court Entrance", latlng: [12.8627, 77.43715] },
    academic_plaza: { id: "academic_plaza", name: "Academic Central Courtyard", latlng: [12.86265, 77.43816] },
    block1: { id: "block1", name: "Block I Main Entrance", latlng: [12.86141, 77.43773] },
    block2: { id: "block2", name: "Block II Main Entrance", latlng: [12.86196, 77.43855] },
    library: { id: "library", name: "Library Entrance", latlng: [12.8615, 77.4375] },
    chapel: { id: "chapel", name: "Chapel Entrance", latlng: [12.86149, 77.43815] },
    junc_hostels: { id: "junc_hostels", name: "Hostel Zone Footpath", latlng: [12.86064, 77.43692] },
    jonas_hall: { id: "jonas_hall", name: "Jonas Hall Entrance", latlng: [12.86015, 77.43733] },
    hamilton_straight: { id: "hamilton_straight", name: "Hamilton Straight Walkway", latlng: [12.86058, 77.43865] },
    devadan: { id: "devadan", name: "Devadan Hall Entrance", latlng: [12.86037, 77.43943] }
  },

  // Connections (edges) between walkway nodes.
  // Weight represents estimated distance in meters.
  // Direct text instructions assist in rendering readable directions.
  edges: [
    { from: "gate", to: "junc_gate_bend", weight: 145, direction: "Walk south-east from the main entrance gate along the tree-lined driveway." },
    { from: "junc_gate_bend", to: "mulsanne_south", weight: 170, direction: "Continue east along the main campus road towards the sports field." },
    { from: "mulsanne_south", to: "sports", weight: 186, direction: "Walk south down the pathway adjacent to the sports ground." },
    { from: "mulsanne_south", to: "block3_road", weight: 110, direction: "Walk east along the paved walkway south of the Mango Grove." },
    { from: "block3_road", to: "block3", weight: 57, direction: "Head north to reach the Academic Block III entrance." },
    { from: "block3_road", to: "canteen", weight: 57, direction: "Head north-west to reach the Food Court entrance." },
    { from: "block3_road", to: "academic_plaza", weight: 68, direction: "Continue east into the main academic courtyard plaza." },
    { from: "academic_plaza", to: "block2", weight: 87, direction: "Walk north-east across the courtyard directly into Academic Block II." },
    { from: "academic_plaza", to: "block1", weight: 145, direction: "Walk south-west across the courtyard plaza towards Academic Block I." },
    { from: "block1", to: "chapel", weight: 46, direction: "Walk east towards the Chapel Plaza." },
    { from: "block1", to: "library", weight: 14, direction: "Step directly inside the Block I side wing to enter the library." },
    { from: "block1", to: "junc_hostels", weight: 122, direction: "Walk south along the pedestrian pathway leading towards the hostel zone." },
    { from: "junc_hostels", to: "jonas_hall", weight: 70, direction: "Continue south-west to reach the Jonas Hall Women's Hostel gate." },
    { from: "junc_hostels", to: "hamilton_straight", weight: 187, direction: "Walk east along Hamilton Straight pathway." },
    { from: "hamilton_straight", to: "devadan", weight: 87, direction: "Turn north-east into the Devadan Men's Hostel entryway." }
  ]
};
