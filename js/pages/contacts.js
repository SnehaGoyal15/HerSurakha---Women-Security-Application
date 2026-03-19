import "../firebase/firebase-config.js";

import { getCurrentUser, isLoggedIn } from "../firebase/auth.js";

import {
getFirestore,
collection,
query,
where,
deleteDoc,
doc,
onSnapshot
} from "firebase/firestore";


if(!isLoggedIn())
{
window.location.href="login.html";
}


const user=getCurrentUser();

const db=getFirestore();

const container=document.getElementById("contactsList");



function loadContacts()
{

const q=query(
collection(db,"contacts"),
where("userId","==",user.userId)
);


onSnapshot(q,(snapshot)=>{

container.innerHTML="";

if(snapshot.empty)
{
container.innerHTML="<div class='loading'>No contacts added yet</div>";
return;
}


snapshot.forEach((docItem)=>{

const data=docItem.data();


const card=document.createElement("div");

card.className="contact-card";


card.innerHTML=`

<div class="contact-info">

<div class="contact-name">${data.name}</div>

<div class="contact-details">

<div class="contact-phone">
${data.phone}
</div>

<div class="contact-relation">
${data.relation}
</div>

</div>

</div>


<div class="action-buttons">

<button class="action-btn call-btn">

<svg viewBox="0 0 24 24">
<path d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.1 22 2 13.9 2 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1l-2.2 2.2z"/>
</svg>

</button>


<button class="action-btn msg-btn">

<svg viewBox="0 0 24 24">
<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
</svg>

</button>


<button class="action-btn edit-btn">

<svg viewBox="0 0 24 24">
<path d="M3 17.2V21h3.8L19.7 8.1l-3.8-3.8L3 17.2zM21.4 6.7c.4-.4.4-1 0-1.4l-2.7-2.7c-.4-.4-1-.4-1.4 0l-2.1 2.1 3.8 3.8 2.4-2.1z"/>
</svg>

</button>


<button class="action-btn delete-btn">

<svg viewBox="0 0 24 24">
<path d="M6 7h12v14H6zM9 4h6l1 2H8l1-2z"/>
</svg>

</button>

</div>
`;


card.querySelector(".call-btn").onclick=function()
{
window.location.href="tel:"+data.phone;
}


card.querySelector(".msg-btn").onclick=function()
{
window.location.href="sms:"+data.phone;
}


card.querySelector(".edit-btn").onclick=function()
{
window.location.href="edit-contact.html?id="+docItem.id;
}


card.querySelector(".delete-btn").onclick=async function()
{
await deleteDoc(doc(db,"contacts",docItem.id));
}


container.appendChild(card);

});

});

}

loadContacts();



document.getElementById("addNewContact").onclick=function()
{
window.location.href="add-contact.html";
};


document.getElementById("homeBtn").onclick=function()
{
window.location.href="dashboard.html";
};


document.getElementById("addBtn").onclick=function()
{
window.location.href="add-contact.html";
};


document.getElementById("accountBtn").onclick=function()
{
window.location.href="account.html";
};


document.getElementById("locationBtn").onclick=function()
{

if(navigator.geolocation)
{

navigator.geolocation.getCurrentPosition(function(position){

const lat=position.coords.latitude;
const lng=position.coords.longitude;

window.open("https://www.google.com/maps?q="+lat+","+lng);

});

}

};


document.getElementById("helpBtn").onclick=function()
{
window.location.href="help.html";
};