import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSE5Yw0y8CoHgaAbj97PPJjBv8LnX8BY",
  authDomain: "market-80d5b.firebaseapp.com",
  projectId: "market-80d5b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔑 รอ DOM โหลดก่อน
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const msg = document.getElementById("msg");

  if (!loginBtn) {
    console.error("❌ ไม่พบปุ่ม loginBtn");
    return;
  }

  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        msg.innerText = "✅ เข้าสู่ระบบสำเร็จ";
        msg.style.color = "lime";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      })
      .catch((error) => {
        msg.innerText = "❌ " + error.message;
        msg.style.color = "red";
      });
  });
});
