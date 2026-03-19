import { auth, db } from './firebase-config.js';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

const USERS_COLLECTION = "users";

// Login function
export async function loginAnonymously(userData) {
    try {
        const userCred = await signInAnonymously(auth);
        const uid = userCred.user.uid;

        await setDoc(doc(db, USERS_COLLECTION, uid), {
            ...userData,
            createdAt: new Date()
        });
        
        const userToStore = { userId: uid, ...userData };
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        localStorage.setItem('isLoggedIn', 'true');
        
        console.log("✅ User saved:", userToStore);
        return { success: true, user: userToStore };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
    }
}

export async function getUserProfile(userId) {
    try {
        const docRef = doc(db, USERS_COLLECTION, userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
}

export function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

export function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}