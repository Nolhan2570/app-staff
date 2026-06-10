let job = "";
let blocked = false;

function openForm(poste){
if(blocked){
alert("Vous avez déjà candidaté.");
return;
}

job = poste;
document.getElementById("form").style.display = "flex";
}

function send(e){
e.preventDefault();

const rp = document.getElementById("rp").value;
const exp = document.getElementById("exp").value;
const dispo = document.getElementById("dispo").value;
const discord = document.getElementById("discord").value;

blocked = true;
document.querySelectorAll(".btn").forEach(b=>{
b.disabled = true;
b.innerText = "Déjà candidaté";
});

document.getElementById("form").style.display = "none";

/* DISCORD WEBHOOK */
fetch("https://discord.com/api/webhooks/1513868624350417077/bvusMy1irtyp7MrRLQoNmZXD4F1gngZS81RyYzCrRa3mSXhPvLfUfCPYvbWH0vWAOexc", {
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({
embeds:[{
title:"CANDIDATURE RECRUTEMENT",
color:5793266,
description:
`**POSTE :** ${job}
**Nom RP :** ${rp}
**Expérience :** ${exp}
**Disponibilité :** ${dispo}
**Discord :** ${discord}`
}]
})
});
}