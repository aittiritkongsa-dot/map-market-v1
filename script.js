/* ===============================
   MAP INIT
================================ */
const map = L.map("map").setView([13.736717, 100.523186], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

/* ===============================
   STATE
================================ */
let currentUser = JSON.parse(localStorage.getItem("user"));
let selectedLatLng = null;
let userLocation = null;
const markers = {};

/* ===============================
   AUTH (Prototype)
================================ */
document.getElementById("loginBtn").onclick = () => {
  const name = prompt("ชื่อผู้ใช้:");
  if (!name) return;
  currentUser = { id: Date.now(), name };
  localStorage.setItem("user", JSON.stringify(currentUser));
  alert("เข้าสู่ระบบสำเร็จ");
};

document.getElementById("registerBtn").onclick = () => {
  const name = prompt("ตั้งชื่อบัญชี:");
  if (!name) return;
  currentUser = { id: Date.now(), name };
  localStorage.setItem("user", JSON.stringify(currentUser));
  alert("สมัครสมาชิกสำเร็จ");
};

/* ===============================
   FORM CONTROL
================================ */
function openForm() {
  document.getElementById("formBox").style.display = "block";
}

function closeForm() {
  document.getElementById("formBox").style.display = "none";
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("detail").value = "";
  selectedLatLng = null;
}

document.querySelector(".save-btn").onclick = savePin;
document.querySelector(".cancel-btn").onclick = closeForm;

/* ===============================
   MAP CLICK
================================ */
map.on("click", (e) => {
  if (!currentUser) {
    alert("กรุณาเข้าสู่ระบบก่อนลงขาย");
    return;
  }
  selectedLatLng = e.latlng;
  openForm();
});

/* ===============================
   DISTANCE
================================ */
function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2)**2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(2);
}

/* ===============================
   SAVE PIN
================================ */
function savePin() {
  const title = titleInput.value.trim();
  if (!title || !selectedLatLng) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const distance = userLocation
    ? calcDistance(
        userLocation.lat,
        userLocation.lng,
        selectedLatLng.lat,
        selectedLatLng.lng
      )
    : "-";

  const marker = L.marker(selectedLatLng).addTo(map);
  marker.bindPopup(`
    <b>${title}</b><br>
    💰 ${price.value || "-"} บาท<br>
    📍 ห่างคุณ ${distance} กม.<br>
    📝 ${detail.value || "-"}<br><br>
    <button onclick="openChat('${currentUser.name}')">💬 แชทผู้ขาย</button>
  `);

  markers[marker._leaflet_id] = marker;
  closeForm();
}

/* ===============================
   CHAT (Prototype)
================================ */
function openChat(name) {
  alert("เริ่มแชทกับผู้ขาย: " + name);
}

/* ===============================
   GEOLOCATION
================================ */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    userLocation = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };

    L.circleMarker([userLocation.lat, userLocation.lng], {
      radius: 8,
      color: "blue"
    }).addTo(map).bindPopup("📍 ตำแหน่งของคุณ");

    map.setView([userLocation.lat, userLocation.lng], 15);
  });
}
