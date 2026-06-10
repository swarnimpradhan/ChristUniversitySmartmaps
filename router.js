/**
 * Dijkstra's Pathfinding Algorithm for Campus Navigator
 * 
 * What is Dijkstra's Algorithm?
 * It is a step-by-step method used to find the shortest path between a starting node
 * and all other nodes in a network (graph). In this file, we use it to guide students
 * along the campus walkways from their starting point to their destination.
 * 
 * How we represent the campus graph:
 * - Nodes: Landmarks or walkway intersections (defined in campusData.js).
 * - Edges: Paths connecting two nodes, with a 'weight' (the distance in meters).
 */

function findShortestPath(startNodeId, endNodeId) {
  // Helper to calculate Haversine distance in meters between two node coordinates
  function calculateDistance(nodeId1, nodeId2) {
    const n1 = CAMPUS_DATA.nodes[nodeId1];
    const n2 = CAMPUS_DATA.nodes[nodeId2];
    if (!n1 || !n2) return 50;

    const lat1 = n1.latlng[0];
    const lon1 = n1.latlng[1];
    const lat2 = n2.latlng[0];
    const lon2 = n2.latlng[1];

    const R = 6371000; // radius of Earth in meters
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  // 1. Build an "Adjacency List" graph representation.
  // This converts our simple list of edges into a dictionary of nodes where each node
  // maps to a list of its connected neighbors and the walking details.
  const graph = {};
  
  // Initialize empty neighbor lists for all nodes defined in campusData
  for (const nodeId in CAMPUS_DATA.nodes) {
    graph[nodeId] = [];
  }

  // Populate neighbors. Since walkways are bidirectional, we add the path both ways:
  // A to B AND B to A.
  CAMPUS_DATA.edges.forEach(edge => {
    // Determine weight: use defined weight or calculate dynamically using coordinates
    const weight = edge.weight || calculateDistance(edge.from, edge.to);

    // Forward direction (from -> to)
    if (graph[edge.from]) {
      graph[edge.from].push({
        to: edge.to,
        weight: weight,
        direction: edge.direction
      });
    }
    // Reverse direction (to -> from)
    if (graph[edge.to]) {
      graph[edge.to].push({
        to: edge.from,
        weight: weight,
        direction: edge.direction
      });
    }
  });

  // 2. Setup the helper datasets for Dijkstra's tracking
  const distances = {};    // Keeps track of the shortest distance from START to each node
  const previous = {};     // Keeps track of the node we came from, so we can trace the path back
  const directions = {};   // Keeps track of the walk instructions used to reach this node
  const visited = new Set(); // Tracks nodes we have fully examined

  // Initialize all distances to Infinity, and previous pointers to null
  for (const nodeId in CAMPUS_DATA.nodes) {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    directions[nodeId] = "";
  }
  
  // The distance from the starting point to itself is always zero!
  distances[startNodeId] = 0;

  // 3. Main Dijkstra Loop
  while (true) {
    let currentNodeId = null;
    let shortestDistance = Infinity;

    // Find the UNVISITED node that currently has the smallest known distance
    for (const nodeId in CAMPUS_DATA.nodes) {
      if (!visited.has(nodeId) && distances[nodeId] < shortestDistance) {
        shortestDistance = distances[nodeId];
        currentNodeId = nodeId;
      }
    }

    // If we can't find a node, or the shortest distance is Infinity, 
    // it means all reachable nodes have been visited, or there's no path.
    if (currentNodeId === null || shortestDistance === Infinity) {
      break;
    }

    // If we've reached our destination node, we can stop early!
    if (currentNodeId === endNodeId) {
      break;
    }

    // Mark the selected node as visited so we don't look at it again
    visited.add(currentNodeId);

    // Look at all neighbors of the current node
    const neighbors = graph[currentNodeId];
    for (const neighbor of neighbors) {
      // If we've already visited this neighbor, skip it
      if (visited.has(neighbor.to)) {
        continue;
      }

      // Calculate the alternative distance to this neighbor through the current node
      const alternativeDistance = distances[currentNodeId] + neighbor.weight;

      // If this new path is shorter than the best path we found before:
      if (alternativeDistance < distances[neighbor.to]) {
        distances[neighbor.to] = alternativeDistance; // Save the shorter distance
        previous[neighbor.to] = currentNodeId;        // Save how we got here
        directions[neighbor.to] = neighbor.direction; // Save the text instruction
      }
    }
  }

  // 4. Backtrack to reconstruct the shortest path
  // If the destination distance is still Infinity, no path exists!
  if (distances[endNodeId] === Infinity) {
    return null;
  }

  const path = [];
  const textDirections = [];
  let stepNodeId = endNodeId;

  // Walk backwards from the destination to the starting point
  while (stepNodeId !== null) {
    path.unshift(stepNodeId); // Insert at the beginning of the path array
    
    // Grab the instruction that was used to reach this step
    const stepInstruction = directions[stepNodeId];
    if (stepInstruction) {
      // Calculate how long this step is
      const prevNodeId = previous[stepNodeId];
      const stepWeight = distances[stepNodeId] - distances[prevNodeId];
      textDirections.unshift(`${stepInstruction} (${stepWeight}m)`);
    }

    // Move to the previous node
    stepNodeId = previous[stepNodeId];
  }

  // 5. Gather geographic coordinates for drawing the line on the map (Leaflet Polyline)
  const pathCoordinates = [];
  if (path.length > 0) {
    // Add the start node coordinate
    pathCoordinates.push(CAMPUS_DATA.nodes[path[0]].latlng);
    
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i+1];
      
      // Find the edge connecting u and v
      const edge = CAMPUS_DATA.edges.find(e => 
        (e.from === u && e.to === v) || (e.from === v && e.to === u)
      );
      
      if (edge && edge.path && edge.path.length > 0) {
        if (edge.from === u) {
          // Forward direction: append path coordinates as defined
          edge.path.forEach(pt => pathCoordinates.push(pt));
        } else {
          // Reverse direction: append path coordinates in reverse order
          for (let j = edge.path.length - 1; j >= 0; j--) {
            pathCoordinates.push(edge.path[j]);
          }
        }
      }
      
      // Add the destination node coordinate of this segment
      pathCoordinates.push(CAMPUS_DATA.nodes[v].latlng);
    }
  }

  // Calculate estimated walking time (average walking speed is roughly 1.3 meters per second)
  const totalDistanceMeters = distances[endNodeId];
  const walkingSpeedMps = 1.3;
  const timeInSeconds = totalDistanceMeters / walkingSpeedMps;
  const timeInMinutes = Math.ceil(timeInSeconds / 60);

  return {
    nodeIds: path,                       // Array of visited node IDs in order
    coordinates: pathCoordinates,       // LatLng list for Leaflet to draw the path
    instructions: textDirections,       // Array of human-readable text turns
    totalDistance: totalDistanceMeters, // Total distance in meters
    totalTime: timeInMinutes            // Estimated walking time in minutes
  };
}
