const immagini = [];
let i = 0;
let j = -1;
let monologues = [];
const img = document.getElementById("coward_ending_img");
const textBox = document.getElementById("text-box");
const monologueText = document.getElementById("monologue_text");

fetch('../txt/coward_ending.json')
    .then(response => response.json())
    .then(data => {
        monologues = data.monologues;
    })
    .catch(error => {
        console.error('Errore nel caricamento dei testi', error);
    });

img.addEventListener("click", () => { //Quando clicci sull' pulsante avvia una funzione "monouso" creata sul momento che porta al avanzamento delle immagini e smette di esistere appena finisce la funzione
    i++;
    if (i < immagini.length) {
        img.src = immagini[i];
    } else {
        j++;
        if (j < monologues.length) {
            textBox.classList.remove("hidden");
            monologueText.textContent = monologues[j];
        } else {

        }
    }
});