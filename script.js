const map = L.map('map').setView([13.736717, 100.523186], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let currentLatLng = null;

// เปิดฟอร์ม
document.getElementById("sellBtn").onclick = () => {
    document.getElementById("formBox").style.display = "block";
};


// ปิดฟอร์ม
function closeForm() {
    document.getElementById("formBox").style.display = "none";
}

// คลิกแผนที่เพื่อเลือกจุด
map.on('click', (e) => {
    if (document.getElementById("formBox").style.display === "block") {
        currentLatLng = e.latlng;
    }
});

// บันทึกหมุด
function savePin() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const detail = document.getElementById("detail").value;

    if (!currentLatLng || !title) {
        alert("กรุณากรอกข้อมูลและเลือกตำแหน่งบนแผนที่");
        return;
    }

    const marker = L.marker(currentLatLng).addTo(map);

    const popupContent = `
        <b>${title}</b><br>
        💰 ${price} บาท<br>
        📝 ${detail}<br><br>
        <button onclick="sellDone()">✅ ขายแล้ว</button>
    `;

    marker.bindPopup(popupContent);

    // ลบหมุด
    window.sellDone = function () {
        map.removeLayer(marker);
    };

    // รีเซ็ต
   function closeForm() {
    document.getElementById("formBox").style.display = "none";

    // รีเซ็ตฟอร์ม
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("detail").value = "";

    // รีเซ็ตตำแหน่งที่เลือก
    currentLatLng = null;
}
let isLoggedIn = true; // mock ก่อน
let selectedLatLng = null;

map.on("click", (e) => {
  if (!isLoggedIn) {
    alert("กรุณาเข้าสู่ระบบก่อนลงขาย");
    return;
  }

  selectedLatLng = e.latlng;
  openForm();
});
    function openForm() {
  document.getElementById("formBox").style.display = "block";
}
const input = document.getElementById("images");
const preview = document.getElementById("preview");

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

