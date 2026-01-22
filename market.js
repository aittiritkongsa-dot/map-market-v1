import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveProduct(product) {
  await addDoc(collection(db, "products"), product);
}

export async function loadProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
