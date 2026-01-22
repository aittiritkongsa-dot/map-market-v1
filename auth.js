import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "API_KEY_ของคุณ",
  authDomain: "market-80d5b.firebaseapp.com",
  projectId: "market-80d5b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      msg.innerText = "✅ เข้าสู่ระบบสำเร็จ";
      window.location.href = "index.html";
    })
    .catch(err => {
      msg.innerText = "❌ " + err.message;
    });
});
