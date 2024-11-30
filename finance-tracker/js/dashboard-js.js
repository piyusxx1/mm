// js/dashboard.js

import { auth, db } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { 
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error signing out:', error);
    }
});

// Add transaction
const transactionForm = document.getElementById('transactionForm');
transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    
    const user = auth.currentUser;
    
    if (user) {
        try {
            await addDoc(collection(db, 'transactions'), {
                userId: user.uid,
                description: description,
                amount: amount,
                type: type,
                timestamp: serverTimestamp()
            });
            
            transactionForm.reset();
            loadTransactions();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    }
});

// Load transactions
async function loadTransactions() {
    const transactionList = document.getElementById('transactionList');
    const user = auth.currentUser;
    
    if (user) {
        try {
            const q = query(
                collection(db, 'transactions'),
                where('userId', '==', user.uid),
                orderBy('timestamp', 'desc')
            );
            
            const querySnapshot = await getDocs(q);
            
            transactionList.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const transaction = doc.data();
                const div = document.createElement('div');
                div.className = 'transaction-item';
                div.innerHTML = `
                    <span>${transaction.description}</span>
                    <span class="${transaction.type}">${transaction.type === 'income' ? '+' : '-'}$${transaction.amount}</span>
                `;
                transactionList.appendChild(div);
            });
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    }
}

// Load transactions when page loads
auth.onAuthStateChanged(user => {
    if (user) {
        loadTransactions();
    }
});