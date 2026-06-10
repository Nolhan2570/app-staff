let job = "";
let isAdmin = false;

const ADMIN_ID = "r";
const ADMIN_MDP = "rr";

/* LOGIN */
function loginAdmin(){
const id = document.getElementById("adminId").value;
const mdp = document.getElementById("adminMdP").value;

if(id === ADMIN_ID && mdp === ADMIN_MDP){
document.getElementById("loginPanel").style.display = "none";
document.getElementById("adminPanel").style.display = "block";
isAdmin = true;
loadAdmin();
}
else{
alert("Erreur login");
}
}

/* OPEN FORM */
function openForm(j){
job = j;
document.getElementById("form").style.display = "flex";
}

/* SEND CANDIDATURE */
function send(e){
e.preventDefault();

const rp = document.getElementById("rp").value;
const exp = document.getElementById("exp").value;
const dispo = document.getElementById("dispo").value;
const discord = document.getElementById("discord").value;

let data = JSON.parse(localStorage.getItem("cvs") || "[]");

data.push({job,rp,exp,dispo,discord,date:new Date().toLocaleString()});

localStorage.setItem("cvs",JSON.stringify(data));

/* DISCORD WEBHOOK */
fetch("TON_WEBHOOK_DISCORD",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
embeds:[{
title:"Nouvelle candidature",
description:
`**Poste:** ${job}
**Nom:** ${rp}
**Exp:** ${exp}
**Discord:** ${discord}`
}]
})
});

document.getElementById("form").style.display = "none";
document.getElementById("overlay").style.display = "flex";

loadAdmin();
}

/* ADMIN LOAD */
function loadAdmin(){
let data = JSON.parse(localStorage.getItem("cvs") || "[]");

let html = "";

data.forEach((c,i)=>{
html += `
<div style="border:1px solid #5865F2;margin:10px;padding:10px;border-radius:10px">
<b>${c.job}</b><br>
${c.rp}<br>
${c.discord}<br>
<button onclick="deleteCV(${i})">Supprimer</button>
</div>
`;
});

document.getElementById("candidatures").innerHTML = html;
}

/* DELETE */
function deleteCV(i){
let data = JSON.parse(localStorage.getItem("cvs") || "[]");
data.splice(i,1);
localStorage.setItem("cvs",JSON.stringify(data));
loadAdmin();
}