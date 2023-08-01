
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


import 'firebase/compat/storage'
import firebase from 'firebase/compat/app'




const firebaseConfig = {
  apiKey: "AIzaSyAZB6hC_YCTGwYpckhBjVXZzNQ0Lg428aM",
  authDomain: "olx-clone-668d4.firebaseapp.com",
  projectId: "olx-clone-668d4",
  storageBucket: "olx-clone-668d4.appspot.com",
  messagingSenderId: "731231304816",
  appId: "1:731231304816:web:e1861870e312eff7eec8b5",
  measurementId: "G-T6PPYPNPLY",
};

 const app=initializeApp(firebaseConfig);
  export const auth=getAuth(app)

  

firebase.initializeApp(firebaseConfig);
export const storage=firebase.storage();
