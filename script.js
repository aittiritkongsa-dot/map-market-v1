// สร้างแผนที่
const map = L.map('map').setView([13.7563, 100.5018], 12);

// โหลดแผนที่
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let currentLatLng = null;
let allMarkers = {}; // ใช้เก็บตัวแปร Marker บนแผนที่โดยอิงตาม ID

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

// ฟังก์ชันบันทึกหมุด
function savePin() {
    if (!currentLatLng) return;

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    if (!title || !price) { alert("กรุณากรอกชื่อและราคา"); return; }

    const pin = {
        id: Date.now(), // สร้าง ID แบบไม่ซ้ำด้วยเวลา
        name: title,
        price: price,
        detail: document.getElementById("detail").value,
        lat: currentLatLng.lat,
        lng: currentLatLng.lng
    };

    pins.push(pin);
    localStorage.setItem("pins", JSON.stringify(pins));
    createMarker(pin);

    // ล้างค่าและปิดฟอร์ม
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("detail").value = "";
    document.getElementById("formBox").style.display = "none";
}

// ฟังก์ชันสร้างหมุด (เพิ่มปุ่มขายแล้ว)
function createMarker(pin) {
    const marker = L.marker([pin.lat, pin.lng]).addTo(map);
    
    // เก็บตัวแปร marker ไว้ใน Object โดยใช้ ID เป็น key
    allMarkers[pin.id] = marker;

    const popupContent = `
        <div style="text-align:center;">
            <b>📦 ${pin.name}</b><br>
            <span style="color:green;">💰 ${pin.price} บาท</span><br>
            <small>${pin.detail || ""}</small><br>
            <button onclick="soldItem(${pin.id})" style="margin-top:10px; background:#ff4757; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">
                ✅ ขายแล้ว (ลบหมุด)
            </button>
        </div>
    `;

    marker.bindPopup(popupContent);
}

// ฟังก์ชันลบหมุดเมื่อขายแล้ว
function soldItem(id) {
    if (confirm("ยืนยันว่าสินค้าชิ้นนี้ขายแล้วใช่หรือไม่?")) {
        // 1. ลบออกจาก Array pins
        pins = pins.filter(pin => pin.id !== id);
        
        // 2. อัปเดต localStorage
        localStorage.setItem("pins", JSON.stringify(pins));

        // 3. ลบหมุดออกจากแผนที่
        if (allMarkers[id]) {
            map.removeLayer(allMarkers[id]); // สั่งลบหมุดตัวนั้น
            delete allMarkers[id]; // ลบข้อมูลออกจาก Object
        }
    }
}
