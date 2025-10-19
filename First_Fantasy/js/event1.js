let i = 0;
let j = -1;
let monologues = [];
const img = document.getElementById("img");
const textBox = document.getElementById("text-box");
const buttonBox = document.getElementById("button-box");
const monologueText = document.getElementById("monologue_text");

fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        monologues = data.monologues;
    })
    .catch(error => {
        console.error('Errore nel caricamento dei testi', error);
    });

document.body.addEventListener("click", () => { //Quando clicci sullo schermo avvia una funzione "monouso" creata sul momento che porta al avanzamento delle immagini e smette di esistere appena finisce la funzione
    i++;
    if (i < immagini.length) {
        img.src = immagini[i];
    } else {
        j++;
        if (j < monologues.length) {
            textBox.classList.remove("hidden");
            img.classList.remove("base_size");
            img.classList.add("shrink1");
            textBox.classList.add("box1");
            monologueText.textContent = monologues[j];
        } else {
            buttonBox.classList.remove("hidden");
            buttonBox.classList.add("button-box-showed");
            img.classList.remove("shrink1");
            img.classList.add("shrink2");
            textBox.classList.remove("box1");
            textBox.classList.add("box2");
        }
    }
});