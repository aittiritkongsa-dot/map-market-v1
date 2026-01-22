import { login, register, currentUser } from "./auth.js";
import { saveProduct, loadProducts } from "./market.js";

/* MAP */
const map = L.map("map").setView([13.7367, 100.5231], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let selectedLatLng = null;

/* AUTH */
loginBtn.onclick = () => {
  const email = prompt("Email");
  const pass = prompt("Password");
  login(email, pass).then(() => alert("เข้าสู่ระบบสำเร็จ"));
};

registerBtn.onclick = () => {
  const email = prompt("Email");
  const pass = prompt("Password");
  const name = prompt("ชื่อบัญชี");
  register(email, pass, name).then(() => alert("สมัครสมาชิกสำเร็จ"));
};

/* MAP CLICK */
map.on("click", e => {
  if (!currentUser) {
    alert("กรุณาเข้าสู่ระบบก่อนลงขาย");
    return;
  }
  selectedLatLng = e.latlng;
  formBox.style.display = "block";
});

/* SAVE PRODUCT */
document.querySelector(".save-btn").onclick = async () => {
  const product = {
    title: title.value,
    price: price.value,
    detail: detail.value,
    lat: selectedLatLng.lat,
    lng: selectedLatLng.lng,
    seller: currentUser.uid,
    sellerName: currentUser.displayName,
    createdAt: Date.now()
  };

  await saveProduct(product);
  location.reload();
};

/* LOAD PRODUCTS */
loadProducts().then(products => {
  products.forEach(p => {
    const marker = L.marker([p.lat, p.lng]).addTo(map);
    marker.bindPopup(`
      <b>${p.title}</b><br>
      💰 ${p.price} บาท<br>
      👤 ${p.sellerName}<br>
      <button onclick="alert('แชทกำลังพัฒนา')">💬 แชท</button>
    `);
  });
});
