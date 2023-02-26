import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqnULwRZa-oyZ20v40WZB7HtXyvpAME6w",
  authDomain: "myownnativeproect.firebaseapp.com",
  projectId: "myownnativeproect",
  storageBucket: "myownnativeproect.appspot.com",
  messagingSenderId: "190956711713",
  appId: "1:190956711713:web:d8d935967d4761473ad860",
  measurementId: "G-0LZZBK3GLY",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, db, storage };
