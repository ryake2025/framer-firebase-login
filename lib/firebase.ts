// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBx2iJEmdd8NCQ46Y2Ynt60eXHIaBt9Zx4",
  authDomain: "tomatodle.firebaseapp.com",
  projectId: "tomatodle",
  storageBucket: "tomatodle.firebasestorage.app",
  messagingSenderId: "983292207376",
  appId: "1:983292207376:web:6852135ff9b62312570595",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
