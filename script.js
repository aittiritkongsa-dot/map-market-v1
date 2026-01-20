// สร้างแผนที่
const map = L.map('map').setView([13.7563, 100.5018], 12);

// โหลดแผนที่
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let currentLatLng = null;

// โหลดหมุดที่เคยบันทึก
let pins = JSON.parse(localStorage.getItem("pins") || "[]");
pins.forEach(pin => createMarker(pin));

// คลิกปุ่มลงขาย
document.getElementById("sellBtn").onclick = () => {
  alert("👉 คลิกบนแผนที่เพื่อเลือกตำแหน่งสินค้า");
};

// คลิกแผนที่
map.on("click", e => {
  currentLatLng = e.latlng;
  document.getElementById("formBox").style.display = "block";
});

// บันทึกหมุด
function savePin() {
  if (!currentLatLng) return;

  const pin = {
    name: document.getElementById("title").value,
    price: document.getElementById("price").value,
    detail: document.getElementById("detail").value,
    lat: currentLatLng.lat,
    lng: currentLatLng.lng
  };

  pins.push(pin);
  localStorage.setItem("pins", JSON.stringify(pins));
  createMarker(pin);

  document.getElementById("formBox").style.display = "none";
}

// สร้างหมุด
function createMarker(pin) {
  L.marker([pin.lat, pin.lng])
    .addTo(map)
    .bindPopup(`
      <b>${pin.name}</b><br>
      💰 ${pin.price}<br>
      ${pin.detail || ""}
    `);
}
