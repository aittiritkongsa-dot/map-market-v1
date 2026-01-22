import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export let currentUser = null;

export function register(email, password, name) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(res => {
      return updateProfile(res.user, {
        displayName: name
      });
    });
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

onAuthStateChanged(auth, user => {
  currentUser = user;
});
