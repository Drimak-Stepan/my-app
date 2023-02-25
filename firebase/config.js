import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBl_3wRzM5iwB6HI21KdbOYmH7HDy0tdns",
  authDomain: "mythefirstnativeproject.firebaseapp.com",
  projectId: "mythefirstnativeproject",
  storageBucket: "mythefirstnativeproject.appspot.com",
  messagingSenderId: "648399530062",
  appId: "1:648399530062:web:fd5775ed6fe08bb2ccfb1f",
  measurementId: "G-YYC5V2YJ1F",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
// const storageRef = ref(storage, "photo");
export { auth, database, storage };
