const ringtone=document.getElementById("ringtone")

// Load settings from account page
const fakeName=localStorage.getItem("fakeCallName") || "Mom"
const fakeNumber=localStorage.getItem("fakeCallNumber") || "+91 9876543210"

// Update UI
document.getElementById("callerName").innerText=fakeName
document.getElementById("callerNumber").innerText=fakeNumber

// Accept call
document.getElementById("acceptBtn").onclick=function(){

ringtone.pause()

setTimeout(function(){

window.location.href="call-screen.html"

},1000)

}

// Decline call
document.getElementById("declineBtn").onclick=function(){

ringtone.pause()

window.location.href="dashboard.html"

}