import { getCurrentUser, isLoggedIn } from "../firebase/auth.js";

if (!isLoggedIn())
{
    window.location.href = "login.html";
}

// Get user data
const user = getCurrentUser();

// Time-based greeting
function getTimeGreeting()
{
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12)
        return "Good Morning";

    if (hours >= 12 && hours < 17)
        return "Good Afternoon";

    if (hours >= 17 && hours < 21)
        return "Good Evening";

    return "Good Night";
}

// Display greeting
function showGreeting()
{
    const welcomeEl = document.getElementById("welcomeMessage");

    if (welcomeEl && user)
    {
        const firstName = user.name ? user.name.split(" ")[0] : "User";
        const greeting = getTimeGreeting();

        welcomeEl.innerHTML = greeting + " " + firstName + "! Stay Safe ❤️";
    }
}

showGreeting();

// SOS Card
document.getElementById("sosCard").onclick = function()
{
    alert("🚨 SOS EMERGENCY TRIGGERED");
};

// Fake Call Card
document.getElementById("fakeCallCard").onclick = function()
{
    window.location.href = "fake-call.html";
};

// Help button
document.getElementById("helpBtn").onclick = function()
{
    window.location.href = "help.html";
};

// Footer Navigation
document.getElementById("homeBtn").onclick = function()
{
    window.location.href = "dashboard.html";
};

document.getElementById("contactsBtn").onclick = function()
{
    window.location.href = "contacts.html";
};

document.getElementById("addBtn").onclick = function()
{
    window.location.href = "add-contact.html";
};

document.getElementById("locationBtn").onclick = function()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            window.open("https://www.google.com/maps?q=" + lat + "," + lng);
        });
    }
};

// Account Button (FIXED)
document.getElementById("accountBtn").onclick = function()
{
    window.location.href = "account.html";
};

// Active footer icon
document.querySelectorAll(".icon-box").forEach(icon =>
{
    icon.addEventListener("click", function()
    {
        document.querySelectorAll(".icon-box").forEach(i => i.classList.remove("active"));
        this.classList.add("active");
    });
});