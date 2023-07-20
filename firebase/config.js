import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB2x_6Jek5Hx1pkKqywJttx90DezK1BkQg",
    authDomain: "rn-project-a817d.firebaseapp.com",
    databaseURL: 'https://rn-project-a817d-default-rtdb.firebaseio.com',
    projectId: "rn-project-a817d",
    storageBucket: "rn-project-a817d.appspot.com",
    messagingSenderId: "122383979277",
    appId: "1:122383979277:web:c18450c315f938f6a29644",
    measurementId: "G-LHM0PBLQDY"
}

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

