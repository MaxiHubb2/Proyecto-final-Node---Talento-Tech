// Configuración de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener Firestore database
export const db = getFirestore(app);

console.log('🔥 Firebase conectado exitosamente');

export default app;
