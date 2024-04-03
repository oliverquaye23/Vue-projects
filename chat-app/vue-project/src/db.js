import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDlzB8quEqB88SzmYVgj4i0aQEFoYb4Oyk",
    authDomain: "fleetchat-59d21.firebaseapp.com",
    projectId: "fleetchat-59d21",
    storageBucket: "fleetchat-59d21.appspot.com",
    messagingSenderId: "1014223276290",
    appId: "1:1014223276290:web:79afe871bb51063c859a1b"
}

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

