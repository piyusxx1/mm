// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBOOG9I_EJpU36pomJ7-Dt60nTUnWdIeMg",
    authDomain: "fintra-3fb82.firebaseapp.com",
    projectId: "fintra-3fb82",
    storageBucket: "fintra-3fb82.firebasestorage.app",
    messagingSenderId: "414952069949",
    appId: "1:414952069949:web:abbdb328c5f790ab3d0354",
    measurementId: "G-SPHXTXVY12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };