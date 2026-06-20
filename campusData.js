/**
 * Christ University Kengeri Campus - Navigation Database (Corrected Coordinates)
 * This file contains the precise geographic coordinates from OpenStreetMap
 * for the Mysore Road Kengeri Campus, along with indoor plans.
 */

const CAMPUS_DATA = {
  // Center of the map when it loads (Christ University Kengeri Campus)
  center: [12.8620, 77.4375],
  zoom: 18,

  // List of key landmarks & buildings on campus
  buildings: {
    gate: {
      id: "gate",
      name: "Main Entrance Gate",
      description: "Primary entrance on Mysore Road. Visitor registration and security check post.",
      coordinates: [12.863837, 77.434811],
      category: "admin",
      floors: {}
    },
    block_1: {
      id: "block_1",
      name: "Academic Block I",
      description: "Houses the School of Engineering and Technology, administrative offices, director's room, main library, and admissions reception.",
      coordinates: [12.863032, 77.437944],
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
      coordinates: [12.862849, 77.438309],
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
      coordinates: [12.862624, 77.438845],
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
      coordinates: [12.863000, 77.437850],
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
    second_gate: {
      id: "second_gate",
      name: "Second Gate",
      description: "Alternative entry gate on Mysore Road, close to the northern end of campus.",
      coordinates: [12.864695, 77.435465],
      category: "admin",
      floors: {}
    },
    block_4: {
      id: "block_4",
      name: "Academic Block IV",
      description: "Academic building featuring lecture halls, computer labs, and department offices.",
      coordinates: [12.862515, 77.439151],
      category: "academic",
      floors: {}
    },
    block_5: {
      id: "block_5",
      name: "Academic Block V",
      description: "Academic building containing faculty research offices, classrooms, and study rooms.",
      coordinates: [12.861892, 77.438475],
      category: "academic",
      floors: {}
    },
    block_6: {
      id: "block_6",
      name: "Academic Block VI",
      description: "New academic wing equipped with smart classrooms and research labs.",
      coordinates: [12.862243, 77.439843],
      category: "academic",
      floors: {}
    },
    jonas_hall: {
      id: "jonas_hall",
      name: "Jonas Hall (Women's Hostel)",
      description: "Secure residential hall for female students (PU/UG/PG). Includes shared study halls, gym, and in-house recreation center.",
      coordinates: [12.862598, 77.438893],
      category: "hostel",
      floors: {}
    },
    devadan: {
      id: "devadan",
      name: "Devadan Hall (Men's Hostel)",
      description: "Major on-campus residential hall for male students. Equipped with study halls, indoor sports room, and a gym.",
      coordinates: [12.859826, 77.440395],
      category: "hostel",
      floors: {}
    },
    devadan_ground: {
      id: "devadan_ground",
      name: "Devadan Ground",
      description: "Spacious outdoor sports ground located next to Devadan Hall hostel.",
      coordinates: [12.859826, 77.440395],
      category: "sports",
      floors: {}
    },
    mba_canteen: {
      id: "mba_canteen",
      name: "MBA Canteen",
      description: "Cafeteria offering meals, snacks, and beverages next to Block II.",
      coordinates: [12.863181, 77.437668],
      category: "food",
      floors: {}
    },
    south_canteen: {
      id: "south_canteen",
      name: "South Canteen",
      description: "Food counter serving authentic South Indian delicacies, snacks, and fresh juices.",
      coordinates: [12.862321, 77.439344],
      category: "food",
      floors: {}
    },
    north_canteen: {
      id: "north_canteen",
      name: "North Canteen",
      description: "Food court offering North Indian meals, street food, and beverages.",
      coordinates: [12.859523, 77.439172],
      category: "food",
      floors: {}
    },
    kns_canteen: {
      id: "kns_canteen",
      name: "KNS Canteen",
      description: "Cafeteria and snack shop located near the sports ground.",
      coordinates: [12.862556, 77.436801],
      category: "food",
      floors: {}
    },
    open_air_auditorium: {
      id: "open_air_auditorium",
      name: "Open Air Auditorium",
      description: "Large outdoor auditorium for student performances, events, and gatherings.",
      coordinates: [12.862758, 77.438612],
      category: "academic",
      floors: {}
    },
    sports: {
      id: "sports",
      name: "Sports Ground",
      description: "Main sports venue on the west side of campus, housing the football ground, running track, and basketball courts.",
      coordinates: [12.861767, 77.436512],
      category: "sports",
      floors: {}
    },
    pu_block: {
      id: "pu_block",
      name: "PU Block",
      description: "Academic building hosting Pre-University courses and classrooms.",
      coordinates: [12.860213, 77.437139],
      category: "academic",
      floors: {}
    },
    architecture_block: {
      id: "architecture_block",
      name: "Architecture Block",
      description: "Dedicated block containing drafting studios, labs, and classrooms for the School of Architecture.",
      coordinates: [12.860036, 77.438394],
      category: "academic",
      floors: {}
    },
    chapel: {
      id: "chapel",
      name: "St. Kuriakose Elias Chavara Chapel",
      description: "A serene prayer hall in the center of the campus, open to all students.",
      coordinates: [12.860192, 77.437745],
      category: "admin",
      floors: {}
    }
  },

  // Walks & intersection network for routing.
  // Each node is a physical point on the campus walkways.
  nodes: {},

  edges: []
};
