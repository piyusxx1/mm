// js/auth.js

import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { 
    doc, 
    setDoc,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Sign up functionality
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Password validation
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        if (password.length < 6) {
            alert("Password should be at least 6 characters long!");
            return;
        }
        
        try {
            // Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile with name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            // Create user document in Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name: name,
                email: email,
                createdAt: serverTimestamp()
            });

            window.location.href = 'dashboard.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Check auth state
onAuthStateChanged(auth, user => {
    if (user) {
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
    }
});