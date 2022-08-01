import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZOooj-DQRqntgvVITK3xlGQd-7n26nFU",
  authDomain: "miniblog-3290f.firebaseapp.com",
  projectId: "miniblog-3290f",
  storageBucket: "miniblog-3290f.appspot.com",
  messagingSenderId: "729357337942",
  appId: "1:729357337942:web:581bb0a442dfb2a79242f7",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
