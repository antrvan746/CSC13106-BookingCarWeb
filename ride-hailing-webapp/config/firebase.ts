import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDECPRqCxw35kktwbgPN7LagUCcJIhdKnM",
  authDomain: "ride-hailing-app-31cdf.firebaseapp.com",
  projectId: "ride-hailing-app-31cdf",
  storageBucket: "ride-hailing-app-31cdf.appspot.com",
  messagingSenderId: "231125397582",
  appId: "1:231125397582:web:e8cadae9bbce68f0a7d31f"
};

const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;