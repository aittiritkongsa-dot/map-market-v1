import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSE5YwOy8CoHpgaAbi97PPJjBv8lnX8BY",
  authDomain: "market-80d5b.firebaseapp.com",
  projectId: "market-80d5b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// สมัครสมาชิก
const regBtn = document.getElementById("register");
if (regBtn) {
  regBtn.onclick = async () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("msg");
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      msg.innerHTML = "✅ สมัครสำเร็จ กำลังเข้าสู่ระบบ...";
      setTimeout(()=>location.href="index.html",1200);
    } catch (e) {
      msg.innerHTML = "❌ " + e.message;
    }
  };
}

// ล็อกอิน
const loginBtn = document.getElementById("login");
if (loginBtn) {
  loginBtn.onclick = async () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("msg");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      msg.innerHTML = "✅ เข้าสู่ระบบสำเร็จ";
      setTimeout(()=>location.href="index.html",800);
    } catch (e) {
      msg.innerHTML = "❌ อีเมลหรือรหัสผ่านผิด";
    }
  };
}
