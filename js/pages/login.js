import { loginAnonymously } from "../firebase/auth.js";

document.getElementById('loginBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const blood = document.getElementById('blood').value.trim();

    if (!name || !mobile || !email || !blood) {
        document.getElementById('message').innerText = '❌ All fields required';
        return;
    }

    const result = await loginAnonymously({ name, mobile, email, blood });

    if (result.success) {
        document.getElementById('message').innerText = '✅ Login successful!';
        setTimeout(() => window.location.href = 'dashboard.html', 1000);
    } else {
        document.getElementById('message').innerText = '❌ ' + result.error;
    }
});

// Redirect if already logged in
import { isLoggedIn } from "../firebase/auth.js";
if (isLoggedIn()) {
    window.location.href = 'dashboard.html';
}