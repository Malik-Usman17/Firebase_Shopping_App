import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZzeULDX_XlLgcbecjVU-TwZ3uy0jn-V0",
  authDomain: "fir-auth-7be2f.firebaseapp.com",
  projectId: "fir-auth-7be2f",
  storageBucket: "fir-auth-7be2f.appspot.com",
  messagingSenderId: "180812418171",
  appId: "1:180812418171:web:88c2ff1f9e363ede8066de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})

export { db, auth };

// const auth = firebase.auth();

// export { auth, firebase }