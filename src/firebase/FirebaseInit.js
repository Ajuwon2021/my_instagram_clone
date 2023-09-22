import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyA-n3v_8nzxjQvnrUA9Bm1eprISoisWY5o",
  authDomain: "myinstagram-2784f.firebaseapp.com",
  projectId: "myinstagram-2784f",
   storageBucket: "myinstagram-2784f.appspot.com",
  messagingSenderId: "43554401523",
  appId: "1:43554401523:web:7ab9bf1e50cef4523e5b86",
  measurementId: "G-TF0D983FQD",
});

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export { db, auth, storage, fb };

