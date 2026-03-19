import "../firebase/firebase-config.js";
import { getCurrentUser, isLoggedIn, logout } from "../firebase/auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

if(!isLoggedIn())
{
window.location.href="login.html";
}

const user=getCurrentUser();
const db=getFirestore();

async function loadUser()
{

const userDoc=await getDoc(doc(db,"users",user.userId));

if(userDoc.exists())
{

const data=userDoc.data();

document.getElementById("displayName").innerText=data.name;
document.getElementById("displayMobile").innerText=data.mobile;
document.getElementById("displayEmail").innerText=data.email;
document.getElementById("displayBlood").innerText=data.blood;

document.getElementById("editName").value=data.name;
document.getElementById("editMobile").value=data.mobile;
document.getElementById("editEmail").value=data.email;
document.getElementById("editBlood").value=data.blood;

}

}

loadUser();

document.getElementById("saveProfileBtn").onclick=async function()
{

const updatedData={
name:document.getElementById("editName").value,
mobile:document.getElementById("editMobile").value,
email:document.getElementById("editEmail").value,
blood:document.getElementById("editBlood").value
};

await updateDoc(doc(db,"users",user.userId),updatedData);

alert("Profile updated");

}

document.getElementById("logoutBtn").onclick=function()
{
logout();
}

const helpBtn=document.getElementById("helpBtn");
if(helpBtn){helpBtn.onclick=function(){window.location.href="help.html";}}

const homeBtn=document.getElementById("homeBtn");
if(homeBtn){homeBtn.onclick=function(){window.location.href="dashboard.html";}}

const contactsBtn=document.getElementById("contactsBtn");
if(contactsBtn){contactsBtn.onclick=function(){window.location.href="contacts.html";}}

const addBtn=document.getElementById("addBtn");
if(addBtn){addBtn.onclick=function(){window.location.href="add-contact.html";}}

const locationBtn=document.getElementById("locationBtn");
if(locationBtn){locationBtn.onclick=function(){window.location.href="dashboard.html#location";}}