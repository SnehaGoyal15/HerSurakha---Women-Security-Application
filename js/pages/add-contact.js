import "../firebase/firebase-config.js";
import { getCurrentUser, isLoggedIn } from "../firebase/auth.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";

if(!isLoggedIn())
{
    window.location.href="login.html";
}

const user=getCurrentUser();
const db=getFirestore();

/* HEADER MESSAGE */

const welcome=document.getElementById("welcomeMessage");

if(welcome && user)
{
    const firstName=user.name ? user.name.split(" ")[0] : "User";
    welcome.innerHTML="Hi "+firstName+"! Add your emergency contacts";
}

/* SAVE CONTACT */

const saveBtn=document.getElementById("saveContact");

if(saveBtn)
{
    saveBtn.onclick=async function()
    {

        const name=document.getElementById("contactName").value;
        const phone=document.getElementById("contactPhone").value;
        const relation=document.getElementById("contactRelation").value;
        const email=document.getElementById("contactEmail").value;

        if(name=="" || phone=="")
        {
            alert("Enter name and phone");
            return;
        }

        try
        {

            await addDoc(collection(db,"contacts"),{
                userId:user.userId,
                name:name,
                phone:phone,
                relation:relation,
                email:email
            });

            alert("Contact saved");

            window.location.href="contacts.html";

        }
        catch(error)
        {
            console.log(error);
            alert("Error saving contact");
        }

    }
}

/* HELP BUTTON */

const helpBtn=document.getElementById("helpBtn");

if(helpBtn)
{
    helpBtn.onclick=function()
    {
        window.location.href="help.html";
    }
}

/* FOOTER NAVIGATION */

const homeBtn=document.getElementById("homeBtn");
if(homeBtn) homeBtn.onclick=function(){window.location.href="dashboard.html";};

const contactsBtn=document.getElementById("contactsBtn");
if(contactsBtn) contactsBtn.onclick=function(){window.location.href="contacts.html";};

const locationBtn=document.getElementById("locationBtn");
if(locationBtn) locationBtn.onclick=function(){window.location.href="dashboard.html#location";};

const accountBtn=document.getElementById("accountBtn");
if(accountBtn) accountBtn.onclick=function(){window.location.href="account.html";};