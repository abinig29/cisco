import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyABb_6NTNPv_vocfnWd5La_-aYTBj-7uow",
  authDomain: "aait-cisco-course-registration.firebaseapp.com",
  projectId: "aait-cisco-course-registration",
  storageBucket: "aait-cisco-course-registration.appspot.com",
  messagingSenderId: "663832859793",
  appId: "1:663832859793:web:be1094d79c50c26e409b30",
  measurementId: "G-KLHCRR77YY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
