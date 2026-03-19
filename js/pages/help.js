import { getCurrentUser, isLoggedIn } from "../firebase/auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Check if user is logged in
if (!isLoggedIn()) {
    window.location.href = 'login.html';
}

// Get user data
const user = getCurrentUser();
const db = getFirestore();

console.log("Current user:", user); // Debug - check console

// Update header with user's first name
const headerTitle = document.querySelector('.header-title');
if (headerTitle && user) {
    const firstName = user.name ? user.name.split(' ')[0] : 'User';
    headerTitle.textContent = `Help & Support, ${firstName}`;
}

// ✅ GREETING - USER KA FIRST NAME AAYEGA
const greetingEl = document.getElementById('greetingMessage');
if (greetingEl) {
    if (user && user.name) {
        const firstName = user.name.split(' ')[0];
        greetingEl.innerHTML = `Hi ${firstName}, How can we help you today? 🤔`;
    } else {
        greetingEl.innerHTML = `Hi, How can we help you today? 🤔`;
    }
    console.log("Greeting updated to:", greetingEl.innerHTML);
}

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

// ===== FEEDBACK SYSTEM =====
let selectedRating = 0;

// Star rating functionality
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('selectedRating');

if (stars.length > 0) {
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            
            // Update star appearance
            stars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
            
            // Show selected rating
            if (ratingValue) {
                ratingValue.textContent = `You selected ${selectedRating} star${selectedRating > 1 ? 's' : ''}`;
            }
        });
        
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const hoverRating = parseInt(this.dataset.rating);
            stars.forEach((s, index) => {
                if (index < hoverRating) {
                    s.style.opacity = '1';
                    s.style.transform = 'scale(1.1)';
                } else {
                    s.style.opacity = '0.5';
                    s.style.transform = 'scale(1)';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            stars.forEach((s, index) => {
                s.style.opacity = index < selectedRating ? '1' : '0.5';
                s.style.transform = 'scale(1)';
            });
        });
    });
}

// Submit feedback
const submitBtn = document.getElementById('submitFeedback');
const feedbackText = document.getElementById('feedbackText');
const feedbackMessage = document.getElementById('feedbackMessage');

if (submitBtn) {
    submitBtn.addEventListener('click', async function() {
        const text = feedbackText ? feedbackText.value.trim() : '';
        
        // Validation
        if (!text && selectedRating === 0) {
            showFeedbackMessage('Please write feedback or select a rating', 'error');
            return;
        }
        
        // Disable button while submitting
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        try {
            // Save feedback to Firestore
            const feedbackData = {
                userId: user?.userId || 'anonymous',
                userName: user?.name || 'Unknown',
                userEmail: user?.email || 'No email',
                rating: selectedRating,
                feedback: text || 'No feedback text',
                timestamp: serverTimestamp()
            };
            
            await addDoc(collection(db, "feedback"), feedbackData);
            
            showFeedbackMessage('Thank you for your feedback! 🙏', 'success');
            
            // Clear form
            if (feedbackText) feedbackText.value = '';
            selectedRating = 0;
            stars.forEach(star => star.classList.remove('selected'));
            if (ratingValue) ratingValue.textContent = '';
            
        } catch (error) {
            console.error("Error submitting feedback:", error);
            showFeedbackMessage('Failed to submit feedback. Please try again.', 'error');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Feedback';
        }
    });
}

// Helper function to show feedback messages
function showFeedbackMessage(message, type) {
    if (!feedbackMessage) return;
    
    feedbackMessage.textContent = message;
    feedbackMessage.className = 'feedback-message ' + type;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        feedbackMessage.textContent = '';
        feedbackMessage.className = 'feedback-message';
    }, 5000);
}

// Footer Navigation
document.getElementById('homeBtn')?.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});

document.getElementById('contactsBtn')?.addEventListener('click', () => {
    window.location.href = 'contacts.html';
});

document.getElementById('addBtn')?.addEventListener('click', () => {
    window.location.href = 'add-contact.html';
});

document.getElementById('locationBtn')?.addEventListener('click', () => {
    window.location.href = 'dashboard.html#location';
});

document.getElementById('accountBtn')?.addEventListener('click', () => {
    window.location.href = 'account.html';
});

// Help button in header
document.getElementById('helpBtn')?.addEventListener('click', () => {
    window.location.href = 'help.html';
});

// Active state for footer icons
document.querySelectorAll('.icon-box').forEach(icon => {
    icon.addEventListener('click', function() {
        document.querySelectorAll('.icon-box').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});