// สร้างแผนที่
const map = L.map('map').setView([13.736717, 100.523186], 13);

// แผนที่จาก OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let currentLatLng = null;

// คลิกแผนที่เพื่อเลือกตำแหน่ง
map.on('click', function (e) {
    currentLatLng = e.latlng;
    document.getElementById("formBox").style.display = "block";
});

// ฟังก์ชันบันทึกหมุด
function savePin() {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const detail = document.getElementById("detail").value;

    if (!currentLatLng || !title) {
        alert("กรุณาเลือกตำแหน่งและกรอกชื่อสินค้า");
        return;
    }

    // สร้าง marker
    const marker = L.marker(currentLatLng).addTo(map);

    // เนื้อหา popup + ปุ่มลบ
    const popupContent = `
        <b>${title}</b><br>
        💰 ${price} บาท<br>
        📝 ${detail}<br><br>
        <button onclick="sellDone()">ขายแล้ว</button>
    `;

    marker.bindPopup(popupContent);

    // ฟังก์ชันลบหมุด
    window.sellDone = function () {
        map.removeLayer(marker);
    };

    // รีเซ็ตฟอร์ม
    document.getElementById("formBox").style.display = "none";
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("detail").value = "";
}

