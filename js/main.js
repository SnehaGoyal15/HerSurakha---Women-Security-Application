import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDbTUDZBPVhqZhNZ4B1KVDNc7crRS1BJEk",
    authDomain: "hersuraksha.firebaseapp.com",
    projectId: "hersuraksha",
    storageBucket: "hersuraksha.firebasestorage.app",
    messagingSenderId: "851245511690",
    appId: "1:851245511690:web:f2e2942fb64cc9b9b5dbf3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("✅ Firebase initialized");

// Logo Animation
document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.getElementById('logoContainer');
    
    // 1 second baad logo top-left move karega
    setTimeout(() => {
        logoContainer.classList.add('logo-top-left');
        logoContainer.classList.remove('logo-center');
        
        // 1 second baad login page open karo
        setTimeout(() => {
            window.location.href = 'pages/login.html';
        }, 1000);
    }, 1000);
});