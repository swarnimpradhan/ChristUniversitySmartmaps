// Global State Management
let map;
let activeMarkers = [];
let routePolyline = null;
let currentCategory = "all";
let highlightedRoomId = null;
let selectedBuildingId = null;

// Walkway Graph Editor State
let editorActive = false;
let editorMode = "add"; // 'add', 'connect', 'delete'
let selectedNodeId = null;
let customNodes = {};
let customEdges = [];
let editorMarkers = [];
let editorPolylines = [];
let pendingLatLng = null;

// Map building IDs (from campusData.js buildings list) 
// to pathway node IDs (from campusData.js nodes list)
const buildingToNodeMap = {
  gate: "gate",
  second_gate: "second_gate",
  block_1: "block1",
  block_2: "block2",
  block_3: "block3",
  block_4: "block4",
  block_5: "block5",
  block_6: "block6",
  library: "library",
  mba_canteen: "mba_canteen",
  south_canteen: "south_canteen",
  north_canteen: "north_canteen",
  kns_canteen: "kns_canteen",
  open_air_auditorium: "open_air_auditorium",
  devadan: "devadan",
  jonas_hall: "jonas_hall",
  sports: "sports",
  pu_block: "pu_block",
  architecture_block: "architecture_block",
  chapel: "chapel",
  devadan_ground: "devadan_ground"
};

// 1. Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initTheme();
  populateDropdowns();
  setupEventListeners();
  parseUrlParameters();
});


// 2. Map Setup
function initMap() {
  // Create Leaflet Map centered on Kengeri Campus
  map = L.map('map').setView(CAMPUS_DATA.center, CAMPUS_DATA.zoom);

  // Load OpenStreetMap Tiles (Standard open tile server)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add markers for the first time
  renderMarkers();

  // Coordinate Calibration Listener (click on map to get exact coords or add node in editor)
  map.on('click', (e) => {
    if (editorActive) {
      if (editorMode === "add") {
        pendingLatLng = e.latlng;
        // Open the node registration form
        document.getElementById("node-creation-form").style.display = "block";
        document.getElementById("new-node-id").value = `road_junction_${Date.now().toString().slice(-4)}`;
        document.getElementById("new-node-name").value = "";
        document.getElementById("new-node-id").focus();
        updateEditorStatus(`Clicked coord: [${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}]. Enter ID and Name below.`);
      }
      return;
    }
    
    // Avoid toast if click was on a marker pin or popup
    const target = e.originalEvent.target;
    if (target.classList.contains('marker-pin') || target.closest('.leaflet-popup')) {
      return;
    }
    const coordString = `[${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}]`;
    showCoordToast(coordString);
  });
}

// Render markers on map based on current filter category
function renderMarkers() {
  // Clear any existing markers
  activeMarkers.forEach(marker => map.removeLayer(marker));
  activeMarkers = [];

  // Loop through buildings and add marker pins
  for (const buildingId in CAMPUS_DATA.buildings) {
    const building = CAMPUS_DATA.buildings[buildingId];
    
    // Check if building matches selected category filter
    if (currentCategory !== "all" && building.category !== currentCategory) {
      continue;
    }

    // Define custom marker HTML pin based on category color
    const customIcon = L.divIcon({
      className: `custom-div-icon marker-${building.category}`,
      html: `<div class="marker-pin"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -38]
    });

    // Create marker
    const marker = L.marker(building.coordinates, { icon: customIcon })
      .bindPopup(`<strong>${building.name}</strong><br>${building.description.substring(0, 80)}...`)
      .addTo(map);

    // Event listener for marker click
    marker.on('click', () => {
      selectBuilding(buildingId);
    });

    activeMarkers.push(marker);
  }
}

// 3. Populate Sidebar Select Inputs
function populateDropdowns() {
  const startSelect = document.getElementById("start-select");
  const endSelect = document.getElementById("end-select");

  // Clear initial placeholders (except index 0)
  startSelect.innerHTML = '<option value="" disabled selected>Select Starting Point...</option>';
  endSelect.innerHTML = '<option value="" disabled selected>Select Destination...</option>';

  // Sort buildings alphabetically for the dropdown list
  const sortedBuildings = Object.values(CAMPUS_DATA.buildings).sort((a, b) => a.name.localeCompare(b.name));

  sortedBuildings.forEach(building => {
    // We only add items that are mapped to pathway graph nodes
    if (buildingToNodeMap[building.id]) {
      const option1 = new Option(building.name, building.id);
      const option2 = new Option(building.name, building.id);
      startSelect.add(option1);
      endSelect.add(option2);
    }
  });
}

// 4. Select and View Building Details
function selectBuilding(buildingId, activeFloorName = null) {
  selectedBuildingId = buildingId;
  const building = CAMPUS_DATA.buildings[buildingId];
  if (!building) return;

  // Zoom map to the clicked building
  map.setView(building.coordinates, 18);

  // Update Details Card content
  const detailsPanel = document.getElementById("details-panel");
  const detailsCategory = document.getElementById("details-category");
  const detailsTitle = document.getElementById("details-title");
  const detailsDesc = document.getElementById("details-desc");
  const floorButtonsContainer = document.getElementById("floor-buttons-container");

  detailsPanel.style.display = "block";
  detailsCategory.textContent = building.category.toUpperCase();
  detailsCategory.className = `category-tag marker-${building.category}`;
  detailsTitle.textContent = building.name;
  detailsDesc.textContent = building.description;

  // Populate floor selector buttons if the building has multi-story floor plans
  floorButtonsContainer.innerHTML = "";
  const floorNames = Object.keys(building.floors || {});
  
  if (floorNames.length > 0) {
    document.querySelector(".indoor-finder-section").style.display = "block";
    
    floorNames.forEach(floorName => {
      const btn = document.createElement("button");
      btn.className = "floor-btn";
      btn.textContent = floorName;
      
      // If a specific floor is requested (e.g. from timetable sync), make it active
      if (activeFloorName === floorName) {
        btn.classList.add("active");
        renderFloorPlan(buildingId, floorName);
      }

      btn.addEventListener("click", () => {
        // Toggle active button style
        document.querySelectorAll(".floor-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Render Floor SVG
        renderFloorPlan(buildingId, floorName);
      });
      
      floorButtonsContainer.appendChild(btn);
    });

    // Default to first floor plan if no floor was pre-selected
    if (!activeFloorName) {
      floorButtonsContainer.firstChild.classList.add("active");
      renderFloorPlan(buildingId, floorNames[0]);
    }
  } else {
    // Hide floor plan finder if no interior map is coded for this landmark
    document.querySelector(".indoor-finder-section").style.display = "none";
    document.getElementById("floor-plan-viewer").style.display = "none";
  }
}

// 5. Render SVG Floor Plan
function renderFloorPlan(buildingId, floorName) {
  const building = CAMPUS_DATA.buildings[buildingId];
  if (!building || !building.floors || !building.floors[floorName]) return;

  const floorPlanViewer = document.getElementById("floor-plan-viewer");
  const floorTitle = document.getElementById("floor-title");
  const svgCanvas = document.getElementById("floor-plan-svg");

  floorPlanViewer.style.display = "flex";
  floorTitle.textContent = `${building.name} - ${floorName}`;

  // Clear previous SVG content
  svgCanvas.innerHTML = "";

  const rooms = building.floors[floorName].rooms;

  // Draw rooms dynamically
  rooms.forEach(room => {
    // Create SVG Group element for room shape + text label
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Create Rectangle shape for the room boundary
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", room.x);
    rect.setAttribute("y", room.y);
    rect.setAttribute("width", room.w);
    rect.setAttribute("height", room.h);
    rect.setAttribute("rx", "4"); // Rounded corners
    rect.setAttribute("class", `svg-room ${room.type}`);
    rect.setAttribute("id", room.id);

    // If this room matches our highlight ID, mark it!
    if (highlightedRoomId === room.id) {
      rect.classList.add("highlighted");
    }

    // Click event on rooms to read or announce details
    rect.addEventListener("click", () => {
      alert(`Room details:\nName: ${room.name}\nType: ${room.type.toUpperCase()}`);
    });

    // Create Text label for room name
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", room.x + room.w / 2);
    text.setAttribute("y", room.y + room.h / 2);
    
    if (room.type === "corridor") {
      text.setAttribute("class", "svg-room-text corridor-text");
    } else {
      text.setAttribute("class", "svg-room-text");
    }

    // Split text or truncate if name is long to prevent visual overlap
    const displayName = room.name.length > 18 ? room.name.substring(0, 16) + "..." : room.name;
    text.textContent = displayName;

    // Append to group
    group.appendChild(rect);
    group.appendChild(text);
    svgCanvas.appendChild(group);
  });
}

// 6. Navigation Route Calculation
function getDirections() {
  const startVal = document.getElementById("start-select").value;
  const endVal = document.getElementById("end-select").value;

  if (!startVal || !endVal) {
    alert("Please select both a starting point and a destination!");
    return;
  }

  if (startVal === endVal) {
    alert("Start and destination are the same! Walk time: 0 minutes.");
    return;
  }

  // Get corresponding nodes
  const startNode = buildingToNodeMap[startVal];
  const endNode = buildingToNodeMap[endVal];

  // Call Dijkstra pathfinder from router.js
  const route = findShortestPath(startNode, endNode);

  if (route) {
    // Clear previous polyline
    if (routePolyline) {
      map.removeLayer(routePolyline);
    }

    // Draw route on map
    // We add a styled class name to create the dashed animation
    routePolyline = L.polyline(route.coordinates, {
      color: "#10b981", // Emerald green route color
      weight: 5,
      opacity: 0.8,
      className: "animated-path"
    }).addTo(map);

    // Zoom and pan map to fit the calculated route nicely
    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });

    // Show directions UI
    const routePanel = document.getElementById("route-panel");
    const distanceVal = document.getElementById("route-distance");
    const timeVal = document.getElementById("route-time");
    const directionsList = document.getElementById("directions-list");

    routePanel.style.display = "block";
    distanceVal.textContent = `${route.totalDistance} m`;
    timeVal.textContent = `${route.totalTime} min`;

    // Populate turn-by-turn lists
    directionsList.innerHTML = "";
    route.instructions.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      directionsList.appendChild(li);
    });

    document.getElementById("clear-route").disabled = false;
  } else {
    alert("Sorry, could not find a walking route between these locations.");
  }
}

// Clear currently rendered path and results
function clearRoute() {
  if (routePolyline) {
    map.removeLayer(routePolyline);
    routePolyline = null;
  }

  document.getElementById("route-panel").style.display = "none";
  document.getElementById("start-select").value = "";
  document.getElementById("end-select").value = "";
  document.getElementById("clear-route").disabled = true;

  // Reset zoom to campus center
  map.setView(CAMPUS_DATA.center, CAMPUS_DATA.zoom);
}

// 7. Search Engine Autocomplete & Selection
function handleSearchInput() {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  const suggestionsBox = document.getElementById("suggestions-box");
  const clearBtn = document.getElementById("clear-search");

  if (query.length < 1) {
    suggestionsBox.style.display = "none";
    clearBtn.style.display = "none";
    return;
  }

  clearBtn.style.display = "block";
  suggestionsBox.innerHTML = "";
  let matches = [];

  // Search through buildings
  for (const buildingId in CAMPUS_DATA.buildings) {
    const building = CAMPUS_DATA.buildings[buildingId];
    if (building.name.toLowerCase().includes(query) || building.description.toLowerCase().includes(query)) {
      matches.push({
        type: "building",
        id: buildingId,
        title: building.name,
        subtitle: `Campus Landmark • Category: ${building.category}`
      });
    }

    // Search through rooms inside floors
    for (const floorName in building.floors) {
      const rooms = building.floors[floorName].rooms;
      rooms.forEach(room => {
        if (room.name.toLowerCase().includes(query) && room.type !== "corridor") {
          matches.push({
            type: "room",
            id: room.id,
            buildingId: buildingId,
            floorName: floorName,
            title: room.name,
            subtitle: `${building.name} • ${floorName} (${room.type.toUpperCase()})`
          });
        }
      });
    }
  }

  // Cap results at 6 suggestions
  const slicedMatches = matches.slice(0, 6);

  if (slicedMatches.length > 0) {
    suggestionsBox.style.display = "block";
    slicedMatches.forEach(match => {
      const item = document.createElement("div");
      item.className = "suggestion-item";
      
      const titleSpan = document.createElement("span");
      titleSpan.className = "suggestion-title";
      titleSpan.textContent = match.title;

      const subSpan = document.createElement("span");
      subSpan.className = "suggestion-subtitle";
      subSpan.textContent = match.subtitle;

      item.appendChild(titleSpan);
      item.appendChild(subSpan);

      // Selection trigger
      item.addEventListener("click", () => {
        suggestionsBox.style.display = "none";
        document.getElementById("search-input").value = match.title;

        if (match.type === "building") {
          highlightedRoomId = null;
          selectBuilding(match.id);
        } else if (match.type === "room") {
          // Highlight room in SVG plan
          highlightedRoomId = match.id;
          selectBuilding(match.buildingId, match.floorName);
        }
      });

      suggestionsBox.appendChild(item);
    });
  } else {
    suggestionsBox.innerHTML = '<div class="suggestion-item"><span class="suggestion-title">No matches found</span></div>';
    suggestionsBox.style.display = "block";
  }
}

// 8. Event Listeners Setup
function setupEventListeners() {
  // Theme Toggle Button
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  });

  // Category Filter Chips
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentCategory = chip.dataset.category;
      renderMarkers();
    });
  });

  // Search inputs
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", handleSearchInput);

  const clearSearchBtn = document.getElementById("clear-search");
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    document.getElementById("suggestions-box").style.display = "none";
    clearSearchBtn.style.display = "none";
    highlightedRoomId = null;
  });

  // Click away closes suggestions
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-section")) {
      document.getElementById("suggestions-box").style.display = "none";
    }
  });

  // Swap Route Locations button
  const swapBtn = document.getElementById("swap-endpoints");
  swapBtn.addEventListener("click", () => {
    const startSelect = document.getElementById("start-select");
    const endSelect = document.getElementById("end-select");
    const temp = startSelect.value;
    startSelect.value = endSelect.value;
    endSelect.value = temp;
  });

  // Route Buttons
  document.getElementById("get-directions").addEventListener("click", getDirections);
  document.getElementById("clear-route").addEventListener("click", clearRoute);

  // Close details panel card
  document.getElementById("close-details").addEventListener("click", () => {
    document.getElementById("details-panel").style.display = "none";
    document.getElementById("floor-plan-viewer").style.display = "none";
    selectedBuildingId = null;
    highlightedRoomId = null;
  });

  // Close floor plan viewer overlay
  document.getElementById("close-floor-plan").addEventListener("click", () => {
    document.getElementById("floor-plan-viewer").style.display = "none";
    highlightedRoomId = null;
    
    // Clear floor button highlighting
    document.querySelectorAll(".floor-btn").forEach(b => b.classList.remove("active"));
  });

  // Timetable Synchronizer quick-navigate buttons
  const scheduleItems = document.querySelectorAll(".schedule-item");
  scheduleItems.forEach(item => {
    item.addEventListener("click", () => {
      const buildingId = item.dataset.building;
      const floorName = item.dataset.floor;
      const roomId = item.dataset.room;

      // Set starting location to Main Gate automatically (good fresher default)
      document.getElementById("start-select").value = "gate";
      document.getElementById("end-select").value = buildingId;
      
      // Calculate and draw the path
      getDirections();

      // Highlight target room and open floor blueprint
      highlightedRoomId = roomId;
      selectBuilding(buildingId, floorName);
    });
  });

  // Walkway Editor Listeners
  document.getElementById("editor-toggle").addEventListener("click", toggleEditor);
  document.getElementById("close-editor").addEventListener("click", toggleEditor);
  
  // Mode Selection Buttons
  const modeButtons = document.querySelectorAll(".editor-mode-btn");
  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      editorMode = btn.dataset.mode;
      selectedNodeId = null;
      document.getElementById("node-creation-form").style.display = "none";
      updateEditorStatus(`Switched to ${editorMode.toUpperCase()} mode.`);
      renderEditorGraph();
    });
  });

  // Save Node Form Button
  document.getElementById("save-new-node").addEventListener("click", () => {
    const nodeId = document.getElementById("new-node-id").value.trim();
    const nodeName = document.getElementById("new-node-name").value.trim();
    
    if (!nodeId || !nodeName) {
      alert("Please enter both a Node ID and a Display Name!");
      return;
    }
    
    if (customNodes[nodeId]) {
      alert("A node with this ID already exists! Please use a unique ID.");
      return;
    }
    
    // Create new node at clicked position
    customNodes[nodeId] = {
      id: nodeId,
      name: nodeName,
      latlng: [parseFloat(pendingLatLng.lat.toFixed(6)), parseFloat(pendingLatLng.lng.toFixed(6))]
    };
    
    document.getElementById("node-creation-form").style.display = "none";
    updateEditorStatus(`Created node "${nodeName}" (${nodeId}) at [${customNodes[nodeId].latlng.join(', ')}]`);
    renderEditorGraph();
  });

  // Export Modal Buttons
  document.getElementById("btn-export-json").addEventListener("click", exportGraphJSON);
  document.getElementById("close-export-modal").addEventListener("click", () => {
    document.getElementById("export-modal").style.display = "none";
  });
  
  // Copy Code Buttons inside export modal
  const copyButtons = document.querySelectorAll(".copy-code-btn");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const textarea = document.getElementById(targetId);
      textarea.select();
      navigator.clipboard.writeText(textarea.value);
      btn.innerHTML = `<i data-lucide="check" style="width: 12px; height: 12px; margin-right: 4px;"></i> Copied`;
      lucide.createIcons();
      setTimeout(() => {
        btn.innerHTML = `<i data-lucide="copy" style="width: 12px; height: 12px; margin-right: 4px;"></i> Copy`;
        lucide.createIcons();
      }, 2000);
    });
  });

  // Reset/Clear Graph Button
  document.getElementById("btn-clear-editor").addEventListener("click", resetCustomGraph);


}


// Check localStorage for saved user theme preference
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  if (savedTheme === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  } else {
    body.classList.add("dark-theme");
  }
  // Initialize Lucide Icons
  lucide.createIcons();
}

// Show a sleek, copyable coordinate toast
function showCoordToast(coordString) {
  let toast = document.getElementById("coord-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "coord-toast";
    toast.className = "coord-toast glass-panel";
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-title"><i data-lucide="compass" class="toast-icon"></i> Clicked Coordinates</span>
      <span class="toast-coords">${coordString}</span>
    </div>
    <div class="toast-actions">
      <button class="toast-btn copy-btn" onclick="navigator.clipboard.writeText('${coordString}'); alert('Copied: ${coordString}');">
        <i data-lucide="copy" style="width: 14px; height: 14px; margin-right: 4px;"></i> Copy
      </button>
      <button class="toast-btn close-btn" onclick="document.getElementById('coord-toast').style.display='none';">
        <i data-lucide="x" style="width: 14px; height: 14px;"></i>
      </button>
    </div>
  `;
  
  toast.style.display = "flex";
  lucide.createIcons();
}

// ==========================================
// WALKWAY GRAPH EDITOR CORE FUNCTIONALITY
// ==========================================

function toggleEditor() {
  const editorBtn = document.getElementById("editor-toggle");
  const editorPanel = document.getElementById("walkway-editor");
  
  editorActive = !editorActive;
  
  if (editorActive) {
    editorBtn.classList.add("active");
    editorPanel.style.display = "block";
    
    // Clear normal route drawing
    if (routePolyline) {
      map.removeLayer(routePolyline);
      routePolyline = null;
    }
    
    // Clear normal marker overlays
    activeMarkers.forEach(m => map.removeLayer(m));
    activeMarkers = [];
    
    // Hide details panel card
    document.getElementById("details-panel").style.display = "none";
    document.getElementById("floor-plan-viewer").style.display = "none";
    
    // Initialize custom nodes/edges if empty
    if (Object.keys(customNodes).length === 0) {
      customNodes = JSON.parse(JSON.stringify(CAMPUS_DATA.nodes));
      customEdges = JSON.parse(JSON.stringify(CAMPUS_DATA.edges));
    }
    
    updateEditorStatus("Graph Editor Active. Select mode: Add, Connect, or Delete.");
    renderEditorGraph();
  } else {
    editorBtn.classList.remove("active");
    editorPanel.style.display = "none";
    document.getElementById("node-creation-form").style.display = "none";
    
    // Remove all editor layers
    editorMarkers.forEach(m => map.removeLayer(m));
    editorPolylines.forEach(p => map.removeLayer(p));
    editorMarkers = [];
    editorPolylines = [];
    
    // Inject custom graph into live mapping runtime
    CAMPUS_DATA.nodes = customNodes;
    CAMPUS_DATA.edges = customEdges;
    
    // Restore normal map pins
    renderMarkers();
  }
}

function renderEditorGraph() {
  // Clear existing layers
  editorMarkers.forEach(m => map.removeLayer(m));
  editorPolylines.forEach(p => map.removeLayer(p));
  editorMarkers = [];
  editorPolylines = [];

  // Draw lines for edges
  customEdges.forEach(edge => {
    const fromNode = customNodes[edge.from];
    const toNode = customNodes[edge.to];
    if (fromNode && toNode) {
      let latlngs = [fromNode.latlng];
      if (edge.path && edge.path.length > 0) {
        latlngs = latlngs.concat(edge.path);
      }
      latlngs.push(toNode.latlng);

      const isHighlight = edge.from === selectedNodeId || edge.to === selectedNodeId;
      const poly = L.polyline(latlngs, {
        color: isHighlight ? "#10b981" : "#06b6d4",
        weight: isHighlight ? 5 : 3,
        opacity: 0.7,
        dashArray: isHighlight ? "5, 5" : null
      }).addTo(map);

      // Edge click deletion (delete mode)
      poly.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        if (editorMode === "delete") {
          if (confirm(`Delete connection between ${edge.from} and ${edge.to}?`)) {
            customEdges = customEdges.filter(e => e !== edge);
            renderEditorGraph();
            updateEditorStatus(`Deleted connection between ${edge.from} and ${edge.to}.`);
          }
        }
      });

      editorPolylines.push(poly);
    }
  });

  // Draw circular markers for nodes
  for (const nodeId in customNodes) {
    const node = customNodes[nodeId];
    const isSelected = nodeId === selectedNodeId;

    const marker = L.marker(node.latlng, {
      icon: L.divIcon({
        className: `mapper-node-marker ${isSelected ? 'selected' : ''}`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      }),
      draggable: true
    }).addTo(map);

    // Save coords on dragend
    marker.on("dragend", (e) => {
      const newLatLng = e.target.getLatLng();
      node.latlng = [parseFloat(newLatLng.lat.toFixed(6)), parseFloat(newLatLng.lng.toFixed(6))];
      
      // Update matching building metadata coordinate if it is a building
      if (CAMPUS_DATA.buildings[nodeId]) {
        CAMPUS_DATA.buildings[nodeId].coordinates = node.latlng;
      }
      
      renderEditorGraph();
      updateEditorStatus(`Dragged node "${node.name}" to: [${node.latlng.join(', ')}]`);
    });

    marker.on("click", (e) => {
      L.DomEvent.stopPropagation(e);
      handleNodeClick(nodeId);
    });

    marker.bindTooltip(`${node.name}<br><span style="font-family: monospace; font-size:10px;">${nodeId}</span>`, { 
      permanent: false, 
      direction: 'top',
      className: 'glass-panel'
    });

    editorMarkers.push(marker);
  }
}

function handleNodeClick(nodeId) {
  if (editorMode === "connect") {
    if (!selectedNodeId) {
      selectedNodeId = nodeId;
      updateEditorStatus(`Source node selected: ${nodeId}. Now click target node to create path.`);
      renderEditorGraph();
    } else {
      if (selectedNodeId === nodeId) {
        selectedNodeId = null;
        updateEditorStatus("Deselected source node.");
        renderEditorGraph();
      } else {
        connectNodes(selectedNodeId, nodeId);
        selectedNodeId = null;
        renderEditorGraph();
      }
    }
  } else if (editorMode === "delete") {
    deleteNode(nodeId);
  } else {
    // Inspect/Select Node
    selectedNodeId = nodeId;
    const node = customNodes[nodeId];
    updateEditorStatus(`Node: ${node.name} (${nodeId}) at [${node.latlng.join(', ')}]. Drag to move.`);
    renderEditorGraph();
  }
}

function connectNodes(fromId, toId) {
  // Check duplicates
  const exists = customEdges.some(e => 
    (e.from === fromId && e.to === toId) || (e.from === toId && e.to === fromId)
  );

  if (exists) {
    updateEditorStatus(`Walkway link already exists between ${fromId} and ${toId}!`);
    return;
  }

  const addCurve = confirm(`Do you want to add curve/corner coordinates for the path between ${fromId} and ${toId}?\n\nIf Yes, you can specify intermediate waypoints. If No, a straight line will connect them.`);
  let waypoints = [];
  if (addCurve) {
    const coordsStr = prompt("Enter intermediate coordinate waypoints as JSON array (e.g. [[12.8627, 77.4375]]):", "[]");
    try {
      if (coordsStr) {
        waypoints = JSON.parse(coordsStr);
      }
    } catch(err) {
      alert("Invalid JSON coordinates! Connecting directly instead.");
    }
  }

  const direction = prompt(`Enter directional walking text (optional):`, `Walk from ${customNodes[fromId].name} to ${customNodes[toId].name}.`);

  const newEdge = {
    from: fromId,
    to: toId,
    direction: direction || `Walk between ${fromId} and ${toId}.`
  };

  if (waypoints.length > 0) {
    newEdge.path = waypoints;
  }

  customEdges.push(newEdge);
  updateEditorStatus(`Connected path from ${fromId} to ${toId}.`);
}

function deleteNode(nodeId) {
  if (confirm(`Delete node "${nodeId}"? This deletes the node and all connected pathways.`)) {
    delete customNodes[nodeId];
    customEdges = customEdges.filter(e => e.from !== nodeId && e.to !== nodeId);
    if (selectedNodeId === nodeId) {
      selectedNodeId = null;
    }
    renderEditorGraph();
    updateEditorStatus(`Deleted node ${nodeId}.`);
  }
}

function updateEditorStatus(text) {
  const statusDiv = document.getElementById("editor-selection-status");
  if (statusDiv) {
    statusDiv.textContent = text;
  }
}

function exportGraphJSON() {
  const nodesCode = document.getElementById("export-nodes-code");
  const edgesCode = document.getElementById("export-edges-code");

  nodesCode.value = JSON.stringify(customNodes, null, 2);
  edgesCode.value = JSON.stringify(customEdges, null, 2);

  document.getElementById("export-modal").style.display = "flex";
  lucide.createIcons();
}

function resetCustomGraph() {
  if (confirm("Reset walkway editor to campusData.js defaults? All current unsaved workspace changes will be lost.")) {
    customNodes = JSON.parse(JSON.stringify(CAMPUS_DATA.nodes));
    customEdges = JSON.parse(JSON.stringify(CAMPUS_DATA.edges));
    selectedNodeId = null;
    renderEditorGraph();
    updateEditorStatus("Graph reset to campusData.js defaults.");
  }
}

function parseUrlParameters() {
  const params = new URLSearchParams(window.location.search);
  const searchVal = params.get('search');
  const startVal = params.get('start');
  const endVal = params.get('end');
  
  if (searchVal) {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.value = searchVal;
      handleSearchInput();
      setTimeout(() => {
        const suggestions = document.querySelectorAll(".suggestion-item");
        if (suggestions.length > 0) {
          suggestions[0].click();
        }
      }, 500);
    }
  } else if (startVal && endVal) {
    setTimeout(() => {
      const startSelect = document.getElementById("start-select");
      const endSelect = document.getElementById("end-select");
      if (startSelect && endSelect) {
        startSelect.value = startVal;
        endSelect.value = endVal;
        getDirections();
      }
    }, 200);
  }
}

