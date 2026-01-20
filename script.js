// สร้างแผนที่ (เริ่มที่ประเทศไทย)
const map = L.map('map').setView([13.7563, 100.5018], 12);

// โหลดแผนที่ OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// หมุดสินค้าตัวอย่าง
const items = [
    {
        name: "จักรยานมือสอง",
        price: "2,500 บาท",
        lat: 13.7563,
        lng: 100.5018
    },
    {
        name: "โต๊ะคอมพิวเตอร์",
        price: "1,200 บาท",
        lat: 13.7463,
        lng: 100.4918
    }
];

// วนลูปสร้างหมุด
items.forEach(item => {
    L.marker([item.lat, item.lng])
        .addTo(map)
        .bindPopup(`
            <b>${item.name}</b><br>
            ราคา: ${item.price}
        `);
});

// ปุ่มลงขาย (ยังไม่ทำจริง)
document.getElementById("sellBtn").onclick = () => {
    alert("เวอร์ชันแรก: ระบบลงขายกำลังพัฒนา");
};
