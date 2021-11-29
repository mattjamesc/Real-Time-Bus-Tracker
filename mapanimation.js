// mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGpjYXJ0ZXIiLCJhIjoiY2t3Z3F0aXh6MHF3OTJxbTV4a3Vwa3NlcyJ9.t2r76V4VDUp0-sv4INpTqA';


// creates map instance centered and zoomed to show 101 bus route
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.09184516931423, 42.407203031272175],
  zoom: 13,
});

// adds zoom and rotation control buttons from mapbox api
map.addControl(new mapboxgl.NavigationControl());

async function run(){
  console.log('counter');
  //clears existing array of bus locations without creating new array (thanks stackoverflow!)
  busMarkers.forEach((marker) => marker.remove());
  // get bus data
  const location = await getBusLocations();
  addBus(location);
// timer with a delay of 15 seconds
setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=101&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}




// populates map with markers showing real-time locations of busses
let busMarkers = [];
function addBus(location) {
  for (let i = 0; i <= location.length - 1; i++) {
    var marker = new mapboxgl.Marker()
    .setLngLat([location[i].attributes.longitude, location[i].attributes.latitude])
    .addTo(map);
  busMarkers.push(marker);

  }
  return busMarkers;
}

run();