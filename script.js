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
    currentLatLng = e.latlng;
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
    closeForm();
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("detail").value = "";
}
