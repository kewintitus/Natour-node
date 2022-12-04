// const map = document.getElementById('map');

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

let cSum = [0, 0];

const coordsSum = locations.forEach((loc, i) => {
  cSum[0] += loc.coordinates[1];
  cSum[1] += loc.coordinates[0];
});

console.log(locations.length);
const center = [cSum[0] / locations.length, cSum[1] / locations.length];
console.log(center);

const map = L.map('map', { scrollWheelZoom: false }).setView(center, 4);
console.log(map);
map.zoomControl.setPosition('topright');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

locations.forEach((location) => {
  console.log(location.coordinates);
  const marker = L.marker([
    location.coordinates[1],
    location.coordinates[0],
  ]).addTo(map);

  marker
    .bindPopup(
      `<b style="font-size: 12px">Day: ${location.day}: ${location.description}</b>`
    )
    .openPopup();
});
