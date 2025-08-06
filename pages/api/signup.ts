// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Cors from "cors"

// 🔧 CORS 설정
const cors = Cors({
  origin: "*",
  methods: ["POST", "OPTIONS"],
})
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result)
      return resolve(result)
    })
  })
}

// 🔥 Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyBx2iJEmdd8NCQ46Y2Ynt60eXHIaBt9Zx4",
  authDomain: "tomatodle.firebaseapp.com",
  projectId: "tomatodle",
  storageBucket: "tomatodle.firebasestorage.app",
  messagingSenderId: "983292207376",
  appId: "1:983292207376:web:6852135ff9b62312570595",
}
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors)

  if (req.method !== "POST") return res.status(405).end()

  const { email, password } = req.body

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const token = await userCredential.user.getIdToken()

    return res.status(200).json({ success: true, token })
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
