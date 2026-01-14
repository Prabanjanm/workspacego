import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAAUSGho28kgnlKfiEysdgEq7LyXQzcUlw",
    authDomain: "workspacego-50c0c.firebaseapp.com",
    projectId: "workspacego-50c0c",
    storageBucket: "workspacego-50c0c.appspot.com",
    messagingSenderId: "418866552058",
    appId: "1:418866552058:web:f4734fc20ffdf3b5b83d43"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
