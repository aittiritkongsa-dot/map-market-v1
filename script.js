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
let selectedLatLng = null;
let isLoggedIn = true; // mock login ก่อน

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

/* ===============================
   MAP CLICK (เลือกตำแหน่ง + เปิดฟอร์ม)
================================ */
map.on("click", (e) => {
  if (!isLoggedIn) {
    alert("กรุณาเข้าสู่ระบบก่อนลงขาย");
    return;
  }

  selectedLatLng = e.latlng;
  openForm();
});

/* ===============================
   SAVE PIN
================================ */
function savePin() {
  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const detail = document.getElementById("detail").value.trim();

  if (!selectedLatLng || !title) {
    alert("กรุณากรอกข้อมูลและคลิกตำแหน่งบนแผนที่");
    return;
  }

  const marker = L.marker(selectedLatLng).addTo(map);

  const popupContent = `
    <b>${title}</b><br>
    💰 ${price || "-"} บาท<br>
    📝 ${detail || "-"}<br><br>
    <button onclick="sellDone(${marker._leaflet_id})">✅ ขายแล้ว</button>
  `;

  marker.bindPopup(popupContent).openPopup();

  markers[marker._leaflet_id] = marker;
  closeForm();
}

/* ===============================
   REMOVE MARKER
================================ */
const markers = {};

function sellDone(id) {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
}

/* ===============================
   IMAGE UPLOAD (≤ 5)
================================ */
const input = document.getElementById("images");
const preview = document.getElementById("preview");

if (input) {
  input.addEventListener("change", () => {
    preview.innerHTML = "";

    if (input.files.length > 5) {
      alert("อัปโหลดได้สูงสุด 5 รูป");
      input.value = "";
      return;
    }

    [...input.files].forEach(file => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.width = "60px";
      img.style.margin = "4px";
      preview.appendChild(img);
    });
  });
}

/* ===============================
   GEOLOCATION
================================ */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      map.setView([lat, lng], 15);

      L.circleMarker([lat, lng], {
        radius: 8,
        color: "blue"
      }).addTo(map).bindPopup("📍 ตำแหน่งของคุณ");
    },
    () => {
      alert("ไม่สามารถเข้าถึงตำแหน่งได้");
    }
  );
}
