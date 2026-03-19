import { getCurrentUser } from '../firebase/auth.js';
import { getContacts } from '../firebase/firestore.js';
import { getLocation } from '../utils/location.js';

export function initSOSButton() {
    const sosBtn = document.getElementById('sosButton');
    if (sosBtn) {
        sosBtn.addEventListener('click', handleSOS);
    }
}

async function handleSOS() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login first');
        return;
    }
    
    const result = await getContacts(user.userId);
    const contacts = result.success ? result.contacts : [];
    
    if (contacts.length === 0) {
        alert('Please add emergency contacts first!');
        return;
    }
    
    const location = await getLocation();
    
    if (location.success) {
        const message = `🚨 EMERGENCY! ${user.name} needs help. Location: ${location.url}`;
        
        contacts.forEach(contact => {
            console.log(`Sending SOS to ${contact.name} (${contact.phone}): ${message}`);
        });
        
        alert(`✅ SOS sent to ${contacts.length} contacts with your location!`);
    } else {
        alert('Could not get location. Please enable location services.');
    }
}